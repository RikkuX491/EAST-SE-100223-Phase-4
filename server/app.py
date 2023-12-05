#!/usr/bin/env python3

import ipdb

from flask import Flask, make_response

# New imports start here
from flask_migrate import Migrate

from models import db, Hotel
# New imports end here

app = Flask(__name__)

# New code starts here

# configure a database connection to the local file hotels.db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hotels.db'

# disable modification tracking to use less memory
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# create a Migrate object to manage schema modifications
migrate = Migrate(app, db)

# initialize the Flask application to use the database
db.init_app(app)

# New code ends here

@app.route('/hotels')
def get_hotels():
    hotels = Hotel.query.all()

    response_body = []

    for hotel in hotels:
        response_body.append(hotel.to_dict())
        
    return make_response(response_body, 200)

if __name__ == "__main__":
    app.run(port=7777, debug=True)