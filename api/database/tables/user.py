from api.database.manager_db import manager_db


class User(manager_db.Model):
    id = manager_db.Column(manager_db.Integer, index=True, primary_key=True, autoincrement=True, nullable=False)

    login = manager_db.Column(manager_db.String(32), unique=True, nullable=False)
    phone = manager_db.Column(manager_db.String(11), unique=True, nullable=False)
    password = manager_db.Column(manager_db.String(128), nullable=False)

    place_in_room = place_in_room
    gender = gender
    age = age
    for item in interests:
        interests.append(item)
    desire_communicate = desire_communicate
    vaccination_against_covid19 = vaccination_against_covid19
    hasPet = hasPet
    hasChild = hasChild
    smoking = smoking