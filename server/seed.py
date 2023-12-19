#!/usr/bin/env python3

from app import app
from models import db, Hotel, Customer, Review

with app.app_context():

    Hotel.query.delete()
    Customer.query.delete()
    Review.query.delete()

    hotel1 = Hotel(name = "Marriott", image="https://www.travelandleisure.com/thmb/D-J3iY0h_IBxkZmTQldWUXAuHQg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/renaissance-new-york-midtown-hotel-NYCHOTELS0420-051ef9d668174c978edbb1ee8f6b93e4.jpg")
    hotel2 = Hotel(name = "Hampton Inn", image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3A35WZQrIwq_UfQ_MFHA5InWDsTos6PIjQ&usqp=CAU")
    hotel3 = Hotel(name = "Hilton Resort", image="https://images.trvl-media.com/lodging/11000000/10970000/10961600/10961545/5b998347.jpg")

    customer1 = Customer(username="alice123", first_name = "Alice", last_name = "Baker")
    customer2 = Customer(username="bruce456", first_name = "Bruce", last_name = "Wayne")
    customer3 = Customer(username="fred789", first_name = "Fred", last_name = "Flintstone")

    review1 = Review(rating = 5, hotel = hotel1, customer = customer1)
    review2 = Review(rating = 4, hotel = hotel2, customer = customer1)
    review3 = Review(rating = 3, hotel = hotel2, customer = customer1)
    review4 = Review(rating = 2, hotel = hotel2, customer = customer2)

    db.session.add_all([hotel1, hotel2, hotel3])
    db.session.add_all([customer1, customer2, customer3])
    db.session.add_all([review1, review2, review3, review4])
    db.session.commit()

    print("🌱 Hotels, Customers, and Reviews successfully seeded! 🌱")