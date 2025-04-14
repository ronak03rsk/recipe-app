from flask import Flask
from flask_cors import CORS
from routes import recipe_routes
import os

app = Flask(__name__)
CORS(app)

app.register_blueprint(recipe_routes, url_prefix="/api/recipes")

if __name__ == "__main__":
    app.run(debug=True)
