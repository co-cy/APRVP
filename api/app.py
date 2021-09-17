from flask import Flask
from flask_restful import Api
import config

app = Flask(__name__)

app.config.update(**config.get_parameters())

api = Api(app)
