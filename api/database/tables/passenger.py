from api.database.manager_db import manager_db


class Passenger(manager_db.Model):
    __tablename__ = "passenger"

    id = manager_db.Column(manager_db.Integer, index=True, primary_key=True, autoincrement=True, nullable=False)

    # train_car_number = manager_db.Column(manager_db.Integer, nullable=False)
    # train_car_type = manager_db.Column(manager_db.Integer, nullable=False)
    place_in_room = manager_db.Column(manager_db.Integer, nullable=False)

    gender = manager_db.Column(manager_db.Boolean, default=None, nullable=True)
    age = manager_db.Column(manager_db.Integer, default=-1, nullable=False)
    interests = manager_db.relationship('Interest', backref='passenger', lazy='dynamic')
    desire_communicate = manager_db.Column(manager_db.Boolean, default=None, nullable=True)
    vaccination_against_covid19 = manager_db.Column(manager_db.Boolean, default=None, nullable=True)

    # phone = manager_db.Column(manager_db.String(11), default=None, nullable=True)

    def __init__(self, place_in_room: int, gender: bool = None, age: int = -1, interests: list = [],
                 desire_communicate: bool = None, vaccination_against_covid19: bool = None):
        self.place_in_room = place_in_room
        self.gender = gender
        self.age = age
        for item in interests:
            self.interests.append(item)
        self.desire_communicate = desire_communicate
        self.vaccination_against_covid19 = vaccination_against_covid19
