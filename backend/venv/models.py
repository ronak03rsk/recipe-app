from pymongo import MongoClient
import config

client = MongoClient(config.MONGO_URI)
db = client.recipe_db
recipes_collection = db.recipes