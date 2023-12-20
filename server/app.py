#!/usr/bin/env python3

import ipdb

from flask import Flask, make_response, request, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_bcrypt import Bcrypt

from models import db, Hotel, Customer, Review

app = Flask(__name__)

app.secret_key = b'\x9f7w\x91\x1drVp\xd74\xa4v\x96\x04\xf3\xdd'

# configure a database connection to the local file hotels.db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hotels.db'

# disable modification tracking to use less memory
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)

# create a Migrate object to manage schema modifications
migrate = Migrate(app, db)

# initialize the Flask application to use the database
db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)

# @app.before_request
# def check_if_customer_is_vip():
#     if (condition goes here):
#         return {'error': 'Unauthorized'}, 401

class AllHotels(Resource):

    def get(self):
        hotels = Hotel.query.all()

        response_body = []

        for hotel in hotels:
            response_body.append(hotel.to_dict(rules=('-reviews',)))
            
        return make_response(response_body, 200)
    
    def post(self):

        # Authorization (Lines 55 - 60) - Customer must be a VIP customer, otherwise they cannot add a new hotel
        customer = Customer.query.filter_by(id=session.get('customer_id')).first()
        if (not customer) or (customer.customer_type != 'VIP'):
            response_body = {
                'error': 'Only VIP customers can add hotels!'
            }
            return make_response(response_body, 401)
        
        try:
            new_hotel = Hotel(name=request.json.get('name'), image=request.json.get('image'))
            db.session.add(new_hotel)
            db.session.commit()
            response_body = new_hotel.to_dict(rules=('-reviews',))
            return make_response(response_body, 201)
        except:
            response_body = {
                "error": "Invalid value for hotel!"
            }
            return make_response(response_body, 422)

api.add_resource(AllHotels, '/hotels')

class HotelById(Resource):

    def get(self, id):
        hotel = Hotel.query.filter(Hotel.id == id).first()

        if hotel:
            response_body = hotel.to_dict(only=('id', 'name', 'image', 'reviews.id', 'reviews.rating', 'reviews.hotel_id', 'reviews.customer_id'))
            response_body['customers'] = [customer.to_dict(only=('id', 'first_name', 'last_name')) for customer in list(set(hotel.customers))]
            return make_response(response_body, 200)
        else:
            response_body = {
                'error': 'Hotel Not Found'
            }
            return make_response(response_body, 404)
        
    def patch(self, id):
        hotel = Hotel.query.filter(Hotel.id == id).first()
        
        if hotel:
            try:
                for attr in request.json:
                    setattr(hotel, attr, request.json.get(attr))
                
                db.session.commit()
                response_body = hotel.to_dict(rules=('-reviews',))
                return make_response(response_body, 200)
            except:
                response_body = {
                    "error": "Invalid value for hotel!"
                }
                return make_response(response_body, 422)
        else:
            response_body = {
                'error': 'Hotel Not Found'
            }
            return make_response(response_body, 404)
        
    def delete(self, id):
        hotel = Hotel.query.filter(Hotel.id == id).first()
        
        if hotel:
            db.session.delete(hotel)
            db.session.commit()
            response_body = {}
            return make_response(response_body, 204)
        else:
            response_body = {
                'error': 'Hotel Not Found'
            }
            return make_response(response_body, 404)
    
api.add_resource(HotelById, '/hotels/<int:id>')

class AllCustomers(Resource):

    def get(self):
        customers = Customer.query.all()

        response_body = []

        for customer in customers:
            response_body.append(customer.to_dict(rules=('-reviews',)))

        return make_response(response_body, 200)
    
api.add_resource(AllCustomers, '/customers')

class CustomerById(Resource):

    def get(self, id):
        customer = Customer.query.filter(Customer.id == id).first()

        if customer:
            response_body = customer.to_dict(only=('id', 'first_name', 'last_name', 'username', 'reviews.id', 'reviews.rating', 'reviews.hotel_id', 'reviews.customer_id'))
            return make_response(response_body, 200)
        else:
            response_body = {
                'error': 'Customer Not Found'
            }
            return make_response(response_body, 404)
        
    def patch(self, id):
        customer = Customer.query.filter(Customer.id == id).first()

        if customer:
            for attr in request.json:
                setattr(customer, attr, request.json.get(attr))

            db.session.commit()

            response_body = customer.to_dict(rules=('-reviews',))
            return make_response(response_body, 200)
        else:
            response_body = {
                'error': 'Customer Not Found'
            }
            return make_response(response_body, 404)
        
    def delete(self, id):
        customer = Customer.query.filter(Customer.id == id).first()

        if customer:
            db.session.delete(customer)
            db.session.commit()
            response_body = {}
            return make_response(response_body, 204)
        else:
            response_body = {
                'error': 'Customer Not Found'
            }
            return make_response(response_body, 404)

api.add_resource(CustomerById, '/customers/<int:id>')

class AllReviews(Resource):

    def get(self):
        reviews = Review.query.all()

        response_body = []

        for review in reviews:
            response_body.append(review.to_dict(rules=('-hotel', '-customer')))

        return make_response(response_body, 200)
    
    def post(self):
        new_review = Review(rating=request.json.get('rating'), hotel_id=request.json.get('hotel_id'), customer_id=request.json.get('customer_id'))
        db.session.add(new_review)
        db.session.commit()
        response_body = new_review.to_dict(only=('id', 'rating', 'hotel_id', 'customer_id'))
        return make_response(response_body, 201)
    
api.add_resource(AllReviews, '/reviews')

class ReviewById(Resource):

    def get(self, id):
        review = Review.query.filter(Review.id == id).first()

        if review:
            response_body = review.to_dict(rules=('-hotel.reviews', ('-customer.reviews')))
            return make_response(response_body, 200)
        else:
            response_body = {
                'error': 'Review Not Found'
            }
            return make_response(response_body, 404)
        
api.add_resource(ReviewById, '/reviews/<int:id>')

class Login(Resource):

    def post(self):
        customer_username = request.json.get('username')
        customer_password = request.json.get('password')

        customer = Customer.query.filter_by(username=customer_username).first()
        
        if customer and bcrypt.check_password_hash(customer.password_hash, customer_password):
            session['customer_id'] = customer.id
            response_body = customer.to_dict(rules=('-reviews',))
            return make_response(response_body, 201)
        else:
            response_body = {
                "error": "Invalid username or password!"
            }
            return make_response(response_body, 401)

api.add_resource(Login, '/login')

class CheckSession(Resource):

    def get(self):
        customer = Customer.query.filter_by(id=session.get('customer_id')).first()

        if customer:
            response_body = customer.to_dict(rules=('-reviews',))
            return make_response(response_body, 200)
        else:
            response_body = {
                "error": "Please log in!"
            }
            return make_response(response_body, 401)

api.add_resource(CheckSession, '/check_session')

class Logout(Resource):

    def delete(self):
        session['customer_id'] = None
        print(session)
        response_body = {}
        return make_response(response_body, 204)

api.add_resource(Logout, '/logout')

class Signup(Resource):

    def post(self):
        customer_first_name = request.json.get('first_name')
        customer_last_name = request.json.get('last_name')
        customer_username = request.json.get('username')
        customer_password = request.json.get('password')
        # type_of_customer = request.json.get('customer_type')
        pw_hash = bcrypt.generate_password_hash(customer_password).decode('utf-8')
        new_customer = Customer(first_name=customer_first_name, last_name=customer_last_name, username=customer_username, customer_type='Standard', password_hash=pw_hash)
        db.session.add(new_customer)
        db.session.commit()

        # Also set the session / cookie for logging in the customer and keeping them logged in
        session['customer_id'] = new_customer.id

        response_body = new_customer.to_dict(rules=('-reviews',))
        return make_response(response_body, 201)
    
api.add_resource(Signup, '/signup')

if __name__ == "__main__":
    app.run(port=7000, debug=True)