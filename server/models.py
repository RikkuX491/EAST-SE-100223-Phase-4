import ipdb

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

# contains definitions of tables and associated schema constructs
# read more about Metadata using the link at the bottom of the page
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s"
})

# create the Flask SQLAlchemy extension
db = SQLAlchemy(metadata=metadata)

# define a model class by inheriting from db.Model.
class Hotel(db.Model, SerializerMixin):
    __tablename__ = 'hotels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    image = db.Column(db.String, nullable=False)

    reviews = db.relationship('Review', back_populates='hotel', cascade='all, delete-orphan')

    customers = association_proxy('reviews', 'customer', creator = lambda c: Review(customer = c))

    @validates('name')
    def validate_name(self, attr, value):
        if not (len(value) >= 5):
            raise ValueError(f'{attr} must be at least 5 characters long!')
        else:
            return value

    def __repr__(self):
        return f'<Hotel # {self.id}: {self.name}>'
    
class Customer(db.Model, SerializerMixin):
    __tablename__ = 'customers'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    username = db.Column(db.String, nullable=False)

    __table_args__ = (
        db.CheckConstraint('first_name != last_name'),
    )

    reviews = db.relationship('Review', back_populates='customer', cascade='all, delete-orphan')

    hotels = association_proxy('reviews', 'hotel', creator = lambda h : Review(hotel = h))

    def __repr__(self):
        return f'<Customer # {self.id}: {self.first_name} {self.last_name}>'
    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)

    hotel_id = db.Column(db.Integer, db.ForeignKey('hotels.id'))
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))

    hotel = db.relationship('Hotel', back_populates='reviews')
    customer = db.relationship('Customer', back_populates='reviews')

    def __repr__(self):
        return f'<Review # {self.id}: {self.customer.first_name} {self.customer.last_name} left a review for {self.hotel.name} with a rating of {self.rating}>'