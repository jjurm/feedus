import uuid
import time

class Meal:
    def __init__(self, name, type, category):
        self.name = name
        self.type = type
        self.category = category


class Restaurant:
    distance_mins = None

    def __init__(self, id, name, description, location, rating, meals):
        self.id = id
        self.name = name
        self.description = description
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

    def fetch_restaurants(self):
        # TODO @Miso implement this
        self.restaurants = []
        pass

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
