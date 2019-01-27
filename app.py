from flask import Flask, send_file, send_from_directory
from flask.json import jsonify
from flask_socketio import SocketIO, emit
from requests import post


from lunch import *
from constants import *

app = Flask(__name__, static_folder="static")
socketio = SocketIO(app)
lunches = {}

WS_NAMESPACE = "/ws"


@app.route('/')
def hello_world():
    return send_file("index.html")


@app.route('/new', methods=['GET', 'POST'])
def new_lunch():
    lunch = Lunch(OFFICE_LOCATION)
    lunches[lunch.uuid] = lunch

    lunch.fetch_restaurants()

    url = "https://feedus.hackkosice.com/lunch/" + str(lunch.uuid)

    response = {
        "attachments": [
            {
                "title": "Click here to vote for today's lunch!",
                "title_link": url
            }
        ]
    }

    resp = post("https://hooks.slack.com/services/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",
         data={
             "attachments": [
            {
                "title": "Click here to vote for today's lunch!",
                "title_link": url
            }
        ]
    })

    print(resp)

    return jsonify(response)


@app.route('/lunch/<lunch_id>')
def get_lunch(lunch_id):
    lunch = lunches[lunch_id]
    # TODO @Pali implement this
    # use methods send_file, send_from_directory
    return "Hurray! You are accessing lunch created at " + time.strftime('%a, %d %b %Y %H:%M:%S GMT',
                                                                         time.gmtime(lunch.created_timestamp))


# ===== Server -> Client =====

def send_menus(lunch):
    emit('menus', [meal for restaurant in lunch.restaurants for meal in restaurant.meals])


def send_restaurants(lunch):
    emit('restaurants', lunch.get_restaurants())


def send_chosen_restaurant(lunch, broadcast):
    emit('chosen', lunch.chosen_restaurant, broadcast=broadcast)

def send_slack_notification(lunch, restaurant):
    url = "https://feed.us/" + str(lunch.uuid)
    post("https://hooks.slack.com/services/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",
         data={
        "text": "Click on this link to choose a meal!",
        "text_link": url
    })


# ===== Client -> Server =====

@socketio.on('get_lunch', namespace=WS_NAMESPACE)
def on_get_lunch(message):
    lunch = lunches[message]
    if lunch.chosen_restaurant is None:
        send_menus(lunch)
    else:
        send_chosen_restaurant(lunch, broadcast=False)


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


@app.after_request
def add_headers(r):
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r


if __name__ == '__main__':
    app.run(host='0.0.0.0')
