from api.database.manager_db import manager_db

RoomsAndPassengers = manager_db.Table('rooms_and_passengers',
                                   manager_db.Column('room_id',
                                                     manager_db.Integer,
                                                     manager_db.ForeignKey('room.id')),
                                   manager_db.Column('passenger_id',
                                                     manager_db.Integer,
                                                     manager_db.ForeignKey('passenger.id'))
                                   )


class Room(manager_db.Model):
    __tablename__ = "room"

    id = manager_db.Column(manager_db.Integer, index=True, primary_key=True, autoincrement=True, nullable=False)

    # train_car_number = manager_db.Column(manager_db.Integer, nullable=False)
    # train_car_type = manager_db.Column(manager_db.Integer, nullable=False)
    type_room = manager_db.Column(manager_db.Integer, nullable=False)

    max_count_passenger = manager_db.Column(manager_db.Integer, default=0, nullable=False)
    cur_count_passengers = manager_db.Column(manager_db.Integer, default=0, nullable=False)
    passengers = manager_db.relationship('Passenger', secondary=RoomsAndPassengers,
                                         backref=manager_db.backref('rooms', lazy='dynamic'))

    is_free = manager_db.Column(manager_db.Boolean, default=True, nullable=False)

    def __init__(self, type_room: int = 0):
        self.type_room = type_room
        if type_room == 0:
            self.max_count_passenger = 4

    def add_passenger(self, new_passenger):
        self.cur_count_passengers += 1
        self.passengers.append(new_passenger)

        if self.type_room == 0:
            if self.cur_count_passengers == self.max_count_passenger:
                self.is_free = False

    def to_json(self) -> dict:
        data = {"id_room": self.id,
                "is_free": self.is_free,
                "max_count_passenger": self.max_count_passenger,
                "cur_count_passengers": self.cur_count_passengers,
                "type_room": self.type_room,
                "passengers": []}

        for passenger in self.passengers:
            data["passengers"].append({"place_in_room": passenger.place_in_room,
                                       "gender": passenger.gender,
                                       "age": passenger.age,
                                       "interests": [interest.to_text() for interest in passenger.interests],
                                       "desire_communicate": passenger.desire_communicate,
                                       "vaccination_against_covid19": passenger.vaccination_against_covid19})
        return data
