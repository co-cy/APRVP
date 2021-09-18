from api.database.manager_db import manager_db


class User(manager_db.Model):
    id = manager_db.Column(manager_db.Integer, index=True, primary_key=True, autoincrement=True, nullable=False)

    phone = manager_db.Column(manager_db.String(13), unique=True, nullable=False)
    email = manager_db.Column(manager_db.String(32), unique=True, nullable=False)
    password = manager_db.Column(manager_db.String(128), nullable=False)

    gender = manager_db.Column(manager_db.Boolean, default=None, nullable=True)
    age = manager_db.Column(manager_db.Integer, default=-1, nullable=False)
    desire_communicate = manager_db.Column(manager_db.Boolean, default=None, nullable=True)
    vaccination_against_covid19 = manager_db.Column(manager_db.Boolean, default=None, nullable=True)
    hasPet = manager_db.Column(manager_db.Boolean, default=None, nullable=True)
    hasChild = manager_db.Column(manager_db.Boolean, default=None, nullable=True)
    smoking = manager_db.Column(manager_db.Boolean, default=None, nullable=True)
