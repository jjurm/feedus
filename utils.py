import requests
import json


class Location:
    def __init__(self, latitude, longitude):
        self.latitude = latitude
        self.longitude = longitude


def get_postcode(location):
    response = requests.get("http://api.postcodes.io/postcodes?lon=%s&lat=%s" % (location.longitude, location.latitude))
    obj = json.loads(response.text)
    return obj["result"][0]["postcode"]


def get_deliveroo_url(postcode):
    response = requests.post("https://deliveroo.co.uk/api/restaurants",
                  json={"location": {"post_code": postcode, "confirmed_on_map": False}})
    obj = json.loads(response.text)
    return obj["url"]
