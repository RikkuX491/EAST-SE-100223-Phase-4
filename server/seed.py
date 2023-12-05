#!/usr/bin/env python3

from app import app
from models import db, Hotel

with app.app_context():

    Hotel.query.delete()

    hotels = []

    hotel1 = Hotel(name = "Marriott")
    hotels.append(hotel1)

    hotel2 = Hotel(name = "Hampton Inn")
    hotels.append(hotel2)

    hotel3 = Hotel(name = "Hilton Resort")
    hotels.append(hotel3)

    db.session.add_all(hotels)
    db.session.commit()

    print("🌱 Hotels successfully seeded! 🌱")