import uuid
import time
import requests
import urllib.parse
import json
from constants import RESTAURANTS_TO_FETCH

blacklist_categories = ['drink', 'coffee', 'frappuccino', 'breakfast', 'cappucino']
blacklist_meals = ['tea', 'coffee', 'latte', 'milk', 'drink']


def category_allowed(category):
    lo = category.lower()
    # skip categories that contain any of the blacklisted words
    return not any((w in lo) for w in blacklist_categories)


def meal_allowed(meal):
    lo = meal.lower()
    return not any((w in lo) for w in blacklist_meals)


def classify_meal(meal, category):
    # TODO @Peto
    # return one of constants.MEAL_TYPES
    return "Main"


class Meal:
    def __init__(self, name, category):
        # dict.__init__(self, name=name)
        self.name = name
        self.category = category
        self.type = classify_meal(name, category)


class Restaurant:
    distance_mins = None

    def __init__(self, id, name, image, location, rating, meals):
        # dict.__init__(self, id=id, name=name, image=image, location=location, rating=rating, meals=meals)
        self.id = id
        self.name = name
        self.image = image
        self.location = location
        self.rating = rating
        self.meals = meals

    def fetch_distance(self):
        # TODO @Peto implement this
        self.distance_mins = 0
        pass


class Lunch:
    restaurants = []  # Fetch restaurants as a list
    meal_votes = {}
    chosen_restaurant = None

    def __init__(self, location):
        self.location = location
        self.uuid = str(uuid.uuid4())
        self.created_timestamp = time.time()

    def fetch_restaurants(self, postcode):
        postcode_enc = urllib.parse.quote_plus(postcode)
        resp = requests.get(
            "https://consumer-ow-api.deliveroo.com/orderapp/v2/restaurants?country_iso_code=GB&page=scheduled&postcode=%s&reduced_supported=true" % postcode_enc)
        entries = json.loads(resp.text)["data"]

        restaurants = []
        for entry in entries[:RESTAURANTS_TO_FETCH]:
            if entry["type"] != "restaurant": continue
            attr = entry["attributes"]
            link = entry["links"]["web"]
            html = requests.get(link).text
            data = None
            for line in html.splitlines():
                prefix = '<script class="js-react-on-rails-component" data-component-name="MenuIndexApp" data-dom-id="app-element" type="application/json">'
                postfix = '</script>'
                if line.startswith(prefix):
                    data = json.loads(line[len(prefix):-len(postfix)])
                    break

            categories = {cat["id"]: cat["name"] for cat in data["menu"]["categories"]}
            meals = [
                Meal(meal["name"], categories[meal["category_id"]])
                for meal in data["menu"]["items"]
                if category_allowed(categories[meal["category_id"]])
                   and meal_allowed(meal["name"]) and meal["raw_price"] > 0
            ]

            def rating(data):
                if "percentage_rating" in data:
                    if "value" in data["percentage_rating"]:
                        return data["percentage_rating"]["value"]
                return 0

            restaurant = Restaurant(entry["id"], attr["name"], attr["image_url"], data["restaurant"]["post_code"],
                                    rating(data), meals)
            restaurants.append(restaurant)

        self.restaurants = restaurants

    def vote_meals(self, meals):
        for meal in meals:
            if meal not in self.meal_votes:
                self.meal_votes[meal] = 0
            self.meal_votes[meal] += 1

    def get_restaurants(self):
        # Order restaurants
        # - primarily by the number of votes of a meal with maximum number of votes (descending)
        # - secondarily by the number of meals with maximum number of votes (descending)

        def n_votes(meal):
            return self.meal_votes[meal] or 0

        def sortkey(restaurant):
            max_votes = max(n_votes(meal) for meal in restaurant.meals)
            meals_with_max_vote = sum(1 if n_votes(meal) == max_votes else 0 for meal in restaurant.meals)
            return max_votes, meals_with_max_vote

        return sorted(self.restaurants, key=sortkey)

    def choose_restaurant(self, restaurant_id):
        self.chosen_restaurant = next(restaurant for restaurant in self.restaurants if restaurant.id == restaurant_id)
