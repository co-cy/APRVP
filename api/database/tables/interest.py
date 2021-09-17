from api.database.manager_db import manager_db


class Interest(manager_db.Model):
    __tablename__ = "interest"

    id = manager_db.Column(manager_db.Integer, index=True, primary_key=True, autoincrement=True, nullable=False)

    id_passenger = manager_db.Column(manager_db.Integer, manager_db.ForeignKey('passenger.id'))
    id_interest = manager_db.Column(manager_db.Integer, nullable=False)
