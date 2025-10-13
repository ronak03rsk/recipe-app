from pymongo import MongoClient
import config

client = MongoClient("mongodb://localhost:27017/recipe_db")
db = client.recipe_db
recipes_collection = db.recipes