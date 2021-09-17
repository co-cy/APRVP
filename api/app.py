from flask import Flask
import config

app = Flask(__name__)

app.config.update(**config.get_parameters())
