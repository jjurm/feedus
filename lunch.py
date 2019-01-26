import uuid


class Restaurant:
    def __init__(self, name, description, location, rating):
        self.name = name
        self.description = description
        self.location = location
        self.rating = rating


class Lunch:
    uuid = uuid.uuid4()
    meal_preferences = []
    restaurant_type_preferences = []

    restaurants = None  # Fetch restaurants as a list

    def __init__(self, location):
        self.location = location

    def fetch_restaurants(self):
        pass
