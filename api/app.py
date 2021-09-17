from api.database.manager_db import manager_db
from .jwt.manager_jwt import manager_jwt

# loading database tables
from api.database.tables.user import User

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

