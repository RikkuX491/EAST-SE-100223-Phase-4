#!/usr/bin/env python3

from flask import Flask

hotels = [
    {
        "id": 1,
        "name": "Marriott"
    },
    {
        "id": 2,
        "name": "Hampton Inn"
    },
    {
        "id": 3,
        "name": "Hilton Resort"
    }
]

app = Flask(__name__)

@app.route('/welcome_page')
def index():
    meal = 'dinner'
    return f'<h1>Time for {meal}!</h1>'

@app.route('/sum/<int:num1>/<int:num2>')
def sum_of_two_numbers(num1, num2):
    print(f'num1 is a {type(num1)}')
    print(f'num2 is a {type(num2)}')
    return f'<h1>{num1 + num2}</h1>'
    # return {"sum": num1 + num2}

@app.route('/hotels')
def get_hotels():
    return hotels

@app.route('/hotels/<int:id>')
def get_one_hotel(id):
    for hotel in hotels:
        if id == hotel['id']:
            return hotel
        
    return {"error": "Hotel Not Found!"}

@app.route('/display_hotels_website')
def display_hotels():
    hotel_lis = ""

    for hotel in hotels:
        hotel_lis += f"<li>Hotel # {hotel['id']}: {hotel['name']}</li>"

    return f"<ul>{hotel_lis}</ul>"

if __name__ == "__main__":
    app.run(port=7777, debug=True)