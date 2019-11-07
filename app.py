from flask import Flask, send_file, send_from_directory, request
from flask.json import jsonify
from flask_socketio import SocketIO, emit
from requests import post
from htmls import *
from htmls2 import *
from multiprocessing import Pool

from lunch import *
from constants import *
from utils import get_postcode, get_deliveroo_url, ClassJSONEncoder

app = Flask(__name__, static_folder="static")
app.json_encoder = ClassJSONEncoder
socketio = SocketIO(app)
lunches = {}

pool = Pool(processes=1)

WS_NAMESPACE = "/ws"
WEBHOOK = "https://hooks.slack.com/services/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"

office_postcode = get_postcode(OFFICE_LOCATION)
office_deliveroo_url = get_deliveroo_url(office_postcode)


@app.route('/')
def index():
    return send_file("dist/index.html")


@app.route('/main.js')
def mainjm():
    return send_file("dist/main.js")


@app.route('/images/<image>')
def images(image):
    return send_from_directory('dist/images/', image)


@app.route('/new', methods=['GET', 'POST'])
def new_lunch():
    lunch = Lunch(OFFICE_LOCATION)

    url = "http://feedus.hackkosice.com:5000/lunch-" + str(lunch.uuid)

    def when_done(lunch):
        lunches[lunch.uuid] = lunch
        print("Finished fetching restaurants: " + str(len(lunches[next(iter(lunches))].restaurants)))

        post(WEBHOOK,
             json={
                 "attachments": [
                     {
                         "title": "Accumulated menus for today are ready",
                     },
                     {
                         "title": "Click here to vote for today's lunch!",
                         "title_link": url
                     }
                 ]
             })

    pool.apply_async(lunch.fetch_restaurants, [office_postcode], callback=when_done)

    response = {
        "attachments": [
            {
                "title": "Fetching menus from restaurants. Please wait...",
            }
        ],
        "fetched": lunch.restaurants
    }

    return jsonify(response)


@app.route('/lunch-<lunch_id>')
def get_lunch(lunch_id):
    lunch = lunches[lunch_id]
    # TODO @Pali implement this
    # use methods send_file, send_from_directory
    return send_file("static/lunch.html")


# ===== Server -> Client =====

def send_menus(lunch):
    emit('menus', [meal for restaurant in lunch.restaurants for meal in restaurant.meals])


def send_restaurants(lunch):
    emit('restaurants', lunch.get_restaurants())


def send_chosen_restaurant(lunch, broadcast):
    emit('chosen', lunch.chosen_restaurant, broadcast=broadcast)


def send_slack_notification(restaurant):
    post(WEBHOOK,
         json={
             "attachments": [
                 {
                     "title": "Great news, today you're going to " + restaurant.name,
                     "title_link": "http://maps.google.com/?q="
                                   + restaurant.name
                                   + "+" +
                                   restaurant.location,
                     "image_url": restaurant.image,
                     "text": "Rating: " + str(restaurant.rating) + "%"

                 }
             ]
         })


# ===== Client -> Server =====

@socketio.on('get_lunch', namespace=WS_NAMESPACE)
def on_get_lunch(message):
    lunch = lunches[message]
    if lunch.chosen_restaurant is None:
        send_menus(lunch)
    else:
        send_chosen_restaurant(lunch, broadcast=False)

@app.route('/lunch-<lunch_id>-vote', methods=['GET', 'POST'])
def on_lunch_vote(lunch_id):
    message = request.form.to_dict(flat=True)
    lunch = lunches[lunch_id]
    meals = lunch.filter_by_preference(message["types"].split("$"), message["cuisines"].split("$"))
    return lunch2(lunch_id, meals)

@app.route('/lunch-<lunch_id>-restaurants', methods=['GET', 'POST'])
def on_restaurants(lunch_id):
    message = request.form.to_dict(flat=True)
    lunch = lunches[lunch_id]
    lunch.vote_meals(message["meals"].split("$"))

    rests = lunch.get_restaurants()
    return restaurants(lunch_id, rests)

@app.route('/lunch-<lunch_id>-choose', methods=['GET', 'POST'])
def on_restaurants_choose(lunch_id):
    message = request.form.to_dict(flat=True)
    lunch = lunches[lunch_id]
    lunch.choose_restaurant(message["id"])
    send_slack_notification(lunch.chosen_restaurant)
    return lunch.chosen_restaurant.name


@socketio.on('get_pref_lunch', namespace=WS_NAMESPACE)
def on_get_preference_lunch(message):
    lunch = lunches[message["lunch"]]
    print("got lunch "+lunch.uuid)
    # lunch.filter_by_preference(message["types"], message["cuisines"])
    emit('menus', "hello")


@socketio.on('vote', namespace=WS_NAMESPACE)
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


@socketio.on('eat', namespace=WS_NAMESPACE)
def on_eat(message):
    '''
    {
        "lunch": "5d9df401-adc3-4615-bdd0-705d61b2234b",
        "restaurant_id": "65138"
    }
    '''
    lunch = lunches[message.lunch]
    lunch.choose_restaurant(message.restaurant_id)

    send_chosen_restaurant(lunch, broadcast=True)
    # TODO @Zoli Send Slack message
    send_slack_notification(lunch.chosen_restaurant)


@app.after_request
def add_headers(r):
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r


if __name__ == '__main__':
    app.run(host='0.0.0.0')
