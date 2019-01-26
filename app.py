from flask import Flask
from lunch import *
from constants import *

app = Flask(__name__)
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
    return url


@app.after_request
def add_headers(r):
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r


if __name__ == '__main__':
    app.run()
