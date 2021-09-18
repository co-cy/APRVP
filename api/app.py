from api.database.manager_db import manager_db
from api.jwt.manager_jwt import manager_jwt
from flask_jwt import jwt_required

# loading database tables
from api.database.tables.passenger import Passenger
from api.database.tables.interest import Interest
from api.database.tables.room import Room
from api.database.tables.user import User

# loading pages
from api.pages import login

# loading api resources
from api.pages.room import Room2 as PageRoom2
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
api.add_resource(PageRoom2, "/room/<int:id_room>/<string:request_type>")


@app.after_request
def apply_caching(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = True

    response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS, PATCH, DELETE, POST, PUT'

    response.headers['Access-Control-Allow-Headers'] = "Access-Control-Allow-Headers, Origin,Accept, " \
                                                       "X-Requested-With, Content-Type, " \
                                                       "Access-Control-Request-Method, Access-Control-Request-Headers"

    # print(response.headers)
    # print(response.get_data())
    # print(response.mimetype)
    return response

