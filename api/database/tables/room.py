from api.database.manager_db import manager_db

passengers = manager_db.Table('rooms_and_passengers',
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

    cur_count_passengers = manager_db.Column(manager_db.Integer, default=0, nullable=False)
    passengers = manager_db.relationship('Passenger', secondary=passengers,
                                         backref=manager_db.backref('rooms', lazy='dynamic'))
