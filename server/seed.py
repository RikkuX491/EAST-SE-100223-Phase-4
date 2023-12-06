#!/usr/bin/env python3

from app import app
from models import db, Hotel, Customer, Review

with app.app_context():

    Hotel.query.delete()
    Customer.query.delete()
    Review.query.delete()

    hotel1 = Hotel(name = "Marriott")
    hotel2 = Hotel(name = "Hampton Inn")
    hotel3 = Hotel(name = "Hilton Resort")

    customer1 = Customer(first_name = "Alice", last_name = "Baker")
    customer2 = Customer(first_name = "Bruce", last_name = "Wayne")
    customer3 = Customer(first_name = "Fred", last_name = "Flintstone")

    review1 = Review(rating = 5, hotel = hotel1, customer = customer1)
    review2 = Review(rating = 4, hotel = hotel2, customer = customer1)
    review3 = Review(rating = 3, hotel = hotel2, customer = customer1)
    review4 = Review(rating = 2, hotel = hotel2, customer = customer2)

    db.session.add_all([hotel1, hotel2, hotel3])
    db.session.add_all([customer1, customer2, customer3])
    db.session.add_all([review1, review2, review3, review4])
    db.session.commit()

    print("🌱 Hotels, Customers, and Reviews successfully seeded! 🌱")