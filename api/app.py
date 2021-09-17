from api.database.manager_db import manager_db
from .jwt.manager_jwt import manager_jwt

# loading database tables
from api.database.tables.passenger import Passenger
from api.database.tables.interest import Interest
from api.database.tables.room import Room
from api.database.tables.user import User

# loading pages
from api.pages import login

# loading api resources
from api.pages.room import Room as PageRoom

from flask import Flask
from flask_restful import Api
import config

app = Flask(__name__)

app.config.update(**config.get_parameters())

manager_db.init_app(app)
with app.app_context():
    manager_db.create_all()

manager_jwt.init_app(app)

api = Api(app)

api.add_resource(PageRoom, "/room/<string:request_type>")
