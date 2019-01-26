from flask import Flask
from flask.json import jsonify
from flask_socketio import SocketIO, emit

from lunch import *
from constants import *

app = Flask(__name__)
socketio = SocketIO(app)
lunches = {}


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/new')
def new_lunch():
    lunch = Lunch(OFFICE_LOCATION)
    lunches[lunch.uuid] = lunch

    lunch.fetch_restaurants()

    url = "https://feed.us/" + str(lunch.uuid)

    response = {
        "text": url
    }
    return jsonify(response)


# ===== Server -> Client =====

def send_menus(lunch):
    emit('menus', [meal for restaurant in lunch.restaurants for meal in restaurant.meals])


def send_restaurants(lunch):
    emit('restaurants', lunch.get_restaurants())


def send_chosen_restaurant(lunch, broadcast):
    emit('chosen', lunch.chosen_restaurant, broadcast=broadcast)


# ===== Client -> Server =====

@socketio.on('get_lunch')
def on_get_lunch(message):
    lunch = lunches[message]
    if lunch.chosen_restaurant is None:
        send_menus(lunch)
    else:
        send_chosen_restaurant(lunch, broadcast=False)


@socketio.on('vote')
def on_vote(message):
    '''
    message:
    {
        "lunch": "5d9df401-adc3-4615-bdd0-705d61b2234b",
        "meals": ["Chicken tikka masala", "Halusky"]
    }
    '''
    lunch = lunches[message.lunch]
    lunch.vote_meals(message.meals)

    send_restaurants(lunch)


@socketio.on('eat')
def on_eat(message):
    '''
    {
        "lunch": "5d9df401-adc3-4615-bdd0-705d61b2234b"
        "restaurant_id": "65138"
    '''
    lunch = lunches[message.lunch]
    lunch.choose_restaurant(message.restaurant_id)

    send_chosen_restaurant(lunch, broadcast=True)


@app.after_request
def add_headers(r):
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r


if __name__ == '__main__':
    app.run()
