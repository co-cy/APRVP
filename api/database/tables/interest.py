from api.database.manager_db import manager_db


class Interest(manager_db.Model):
    __tablename__ = "interest"

    id = manager_db.Column(manager_db.Integer, index=True, primary_key=True, autoincrement=True, nullable=False)

    id_passenger = manager_db.Column(manager_db.Integer, manager_db.ForeignKey('passenger.id'))
    id_interest = manager_db.Column(manager_db.Integer, nullable=False)

    def __init__(self, id_interest):
        self.id_interest = id_interest

    def to_text(self):
        list_name = ["BAD", "Наука", "Искуство", "Спорт", "Другое"]
        if len(list_name) < self.id_interest:
            return f"no name ({self.id_interest})"
        else:
            return list_name[self.id_interest]
