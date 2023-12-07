#!/usr/bin/env python3

import ipdb

from flask import Flask, make_response, request
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, Hotel, Customer, Review

app = Flask(__name__)

# configure a database connection to the local file hotels.db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hotels.db'

# disable modification tracking to use less memory
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# create a Migrate object to manage schema modifications
migrate = Migrate(app, db)

# initialize the Flask application to use the database
db.init_app(app)

api = Api(app)

class AllHotels(Resource):

    def get(self):
        hotels = Hotel.query.all()

        response_body = []

        for hotel in hotels:
            response_body.append(hotel.to_dict(only=('id', 'name')))
            
        return make_response(response_body, 200)
    
    def post(self):
        new_hotel = Hotel(name=request.json.get('name'))
        db.session.add(new_hotel)
        db.session.commit()
        response_body = new_hotel.to_dict(only=('id', 'name'))
        return make_response(response_body, 201)

api.add_resource(AllHotels, '/hotels')

class HotelById(Resource):

    def get(self, id):
        hotel = Hotel.query.filter(Hotel.id == id).first()

        if hotel:
            response_body = hotel.to_dict(only=('id', 'name', 'reviews.id', 'reviews.rating', 'reviews.hotel_id', 'reviews.customer_id'))
            response_body['customers'] = [customer.to_dict(only=('id', 'first_name', 'last_name')) for customer in list(set(hotel.customers))]
            return make_response(response_body, 200)
        else:
            response_body = {
                'error': 'Hotel Not Found'
            }
            return make_response(response_body, 404)
    
api.add_resource(HotelById, '/hotels/<int:id>')

# @app.route('/hotels', methods=["GET", "POST"])
# def all_hotels():
    # if request.method == 'GET':
    #     hotels = Hotel.query.all()

    #     response_body = []

    #     for hotel in hotels:
    #         response_body.append(hotel.to_dict(only=('id', 'name')))
            
    #     return make_response(response_body, 200)
    
    # elif request.method == 'POST':
    #     new_hotel = Hotel(name=request.json.get('name'))
    #     db.session.add(new_hotel)
    #     db.session.commit()
    #     response_body = new_hotel.to_dict(only=('id', 'name'))
    #     return make_response(response_body, 201)

# @app.route('/hotels/<int:id>')
# def hotel_by_id(id):
#     hotel = Hotel.query.filter(Hotel.id == id).first()

#     if hotel:
#         response_body = hotel.to_dict(only=('id', 'name', 'reviews.id', 'reviews.rating', 'reviews.hotel_id', 'reviews.customer_id'))
#         return make_response(response_body, 200)
#     else:
#         response_body = {
#             'error': 'Hotel Not Found'
#         }
#         return make_response(response_body, 404)

@app.route('/customers')
def get_customers():
    customers = Customer.query.all()

    response_body = []

    for customer in customers:
        response_body.append(customer.to_dict(only=('id', 'first_name', 'last_name')))

    return make_response(response_body, 200)

@app.route('/customers/<int:id>')
def customer_by_id(id):
    customer = Customer.query.filter(Customer.id == id).first()

    if customer:
        response_body = customer.to_dict(only=('id', 'first_name', 'last_name', 'reviews.id', 'reviews.rating', 'reviews.hotel_id', 'reviews.customer_id'))
        return make_response(response_body, 200)
    else:
        response_body = {
            'error': 'Customer Not Found'
        }
        return make_response(response_body, 404)

@app.route('/reviews')
def get_reviews():
    reviews = Review.query.all()

    response_body = []

    for review in reviews:
        response_body.append(review.to_dict(rules=('-hotel', '-customer')))

    return make_response(response_body, 200)

@app.route('/reviews/<int:id>')
def review_by_id(id):
    review = Review.query.filter(Review.id == id).first()

    if review:
        response_body = review.to_dict(rules=('-hotel.reviews', ('-customer.reviews')))
        return make_response(response_body, 200)
    else:
        response_body = {
            'error': 'Review Not Found'
        }
        return make_response(response_body, 404)

if __name__ == "__main__":
    app.run(port=7777, debug=True)