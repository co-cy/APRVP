from api.database.manager_db import manager_db


class User(manager_db.Model):
    id = manager_db.Column(manager_db.Integer, index=True, primary_key=True, autoincrement=True, nullable=False)

    login = manager_db.Column(manager_db.String(32), nullable=False)
    password = manager_db.Column(manager_db.String(128), nullable=False)
