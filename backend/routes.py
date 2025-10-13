from flask import Blueprint, request, jsonify
from models import recipes_collection

recipe_routes = Blueprint("recipes", __name__)

@recipe_routes.route("/", methods=["GET"])
def get_recipes():
    recipes = list(recipes_collection.find({}, {"_id": 0}))
    return jsonify(recipes)

@recipe_routes.route("/add", methods=["POST"])
def add_recipe():
    data = request.json
    recipes_collection.insert_one(data)
    return jsonify({"message": "Recipe added successfully!"})
