from api.database.manager_db import manager_db


class Passenger(manager_db.Model):
    __tablename__ = "passenger"

    id = manager_db.Column(manager_db.Integer, index=True, primary_key=True, autoincrement=True, nullable=False)

    # train_car_number = manager_db.Column(manager_db.Integer, nullable=False)
    # train_car_type = manager_db.Column(manager_db.Integer, nullable=False)
    place_in_room = manager_db.Column(manager_db.Integer, nullable=False)

    gender = manager_db.Column(manager_db.Boolean, nullable=False)
    age = manager_db.Column(manager_db.Integer, nullable=False)
    interests = manager_db.relationship('Interest', backref='passenger', lazy='dynamic')
    desire_communicate = manager_db.Column(manager_db.Boolean, nullable=True)
    vaccination_against_covida19 = manager_db.Column(manager_db.Boolean, nullable=True)

    # phone = manager_db.Column(manager_db.String(11), default=None, nullable=True)
