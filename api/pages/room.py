from api.database.tables.room import Room as TableRoom, RoomsAndPassengers
from api.database.tables.passenger import Passenger
from api.database.tables.interest import Interest
from api.database.manager_db import manager_db
from flask_restful import Resource, reqparse
import math


class Room(Resource):
    def get(self, request_type: str):
        request_type = request_type.lower()
        if request_type == "all":
            return [room.to_json() for room in TableRoom.query.filter_by(is_free=True).all()]
        elif request_type.isdigit():
            data = TableRoom.query.get(int(request_type))
            if data:
                return data.to_json()
            else:
                return {"message": "id room not in database"}, 400
        else:
            return {"message": "Bad request"}, 400

    def post(self, request_type: str):
        if request_type == "add":
            new_room = TableRoom()
            manager_db.session.add(new_room)
            manager_db.session.commit()

            return {}
        elif request_type == "clear_all":
            RoomsAndPassengers.query.delete()
            Interest.query.delete()
            Passenger.query.delete()
            TableRoom.query.delete()
        elif request_type == "sorted":
            parser = reqparse.RequestParser()

            # about person
            parser.add_argument('gender', type=bool, required=True)
            parser.add_argument('age', type=int, required=True)
            parser.add_argument('preferences', type=dict, required=True)  # Интерсы совпадают +1 очко за совпадение
            parser.add_argument('communication', type=bool, required=True)  # Общение совпадает +1 не совпадает -1
            parser.add_argument('hasGraft', type=bool, required=True)  # Привитые +1, не привитые -1
            parser.add_argument('hasPet', type=bool, required=True)  # Имеется у других животное +1 иначе -1
            parser.add_argument('hasChild', type=bool, required=True)  # у других есть +1, нету -1
            parser.add_argument('smoking', type=bool, required=True)  # другие курят +1, не курят -1

            # neighbors ЧТО 100 % должно быть в комнате
            parser.add_argument('neighborsAge', type=int, action='append', required=True)
            parser.add_argument('neighborsHasPet', type=bool, required=True)
            parser.add_argument('neighborsSmoking', type=bool, required=True)
            parser.add_argument('neighborsHasChild', type=bool, required=True)

            # ОТСЮДа брать данные о пользователе по типу all_user_parameters["gender"] или all_user_parameters["age"]
            all_user_parameters = parser.parse_args()
            alternative_list = []
            good_list = []

            # ЗАДАЧА: Посчитать сколько баллов получает комната
            for room in TableRoom.query.filter_by(is_free=True).all():
                all_passengers = room.passengers  # список экзм. класса Passenger
                max_count_passenger = room.max_count_passenger
                # Параметры пользователя можно посмотреть в api/database/tables/passenger
                # К полю обращаться по типу passenger.gender or passenger.age

                # сумма баллов этой комноты
                isAlternative = False
                GraftCount = 0
                room_points = 0
                for passenger in all_passengers:
                    passenger_points = 0
                    if passenger.hasPet != all_user_parameters["neighborsHasPet"]:
                        isAlternative = True
                    if passenger.smoking != all_user_parameters["neighborsSmoking"]:
                        isAlternative = True
                    if passenger.hasChild != all_user_parameters["neighborsHasChild"]:
                        isAlternative = True

                    if passenger.vaccination_against_covid19:
                        GraftCount += 1

                    if all_user_parameters["communication"] == None:
                        passenger_points += 0
                    elif passenger.desire_communicate == all_user_parameters["communication"]:
                        passenger_points += 1
                    else:
                        passenger_points -= 1
                    if passenger.age in all_user_parameters["neighborsAge"]:
                        passenger_points += 2
                    else:
                        max_neighborsAge = max(all_user_parameters["neighborsAge"])
                        min_neighborsAge = min(all_user_parameters["neighborsAge"])
                        if passenger.age > max_neighborsAge:
                            difference = passenger.age - max_neighborsAge
                            passenger_points += pointsForAge(difference)
                        elif passenger.age < min_neighborsAge:
                            difference = min_neighborsAge - passenger.age
                            passenger_points += pointsForAge(difference)

                    room_points += passenger_points / max_count_passenger

                if GraftCount >= len(all_passengers):
                    room_points += GraftCount
                else:
                    isAlternative = True

                if not isAlternative:
                    good_list.append((room_points, room))
                else:
                    alternative_list.append((room_points, room))

            # Тут сортируется по от меньшего кол-ва баллов до большего, тут уже всё готово
            return {
                "alternative_list": list(map(lambda x: x[1].to_json(), sorted(alternative_list, key=lambda x: x[0]))),
                "good_list": list(map(lambda x: x[1].to_json(), sorted(good_list, key=lambda x: x[0])))}
        else:
            return {"message": "Bad request"}, 400


class Room2(Resource):
    def post(self, id_room, request_type: str):
        if request_type == "add":
            parser = reqparse.RequestParser()

            # about person
            parser.add_argument('gender', type=bool, required=True)
            parser.add_argument('age', type=int, required=True)
            parser.add_argument('preferences', type=dict, required=True)  # Интерсы совпадают +1 очко за совпадение
            parser.add_argument('communication', type=bool, required=True)  # Общение совпадает +1 не совпадает -1
            parser.add_argument('hasGraft', type=bool, required=True)  # Привитые +1, не привитые -1
            parser.add_argument('hasPet', type=bool, required=True)  # Имеется у других животное +1 иначе -1
            parser.add_argument('hasChild', type=bool, required=True)  # у других есть +1, нету -1
            parser.add_argument('smoking', type=bool, required=True)  # другие курят +1, не курят -1

            # neighbors ЧТО 100 % должно быть в комнате
            parser.add_argument('neighborsAge', type=int, action='append', required=True)
            parser.add_argument('neighborsHasPet', type=bool, required=True)
            parser.add_argument('neighborsSmoking', type=bool, required=True)
            parser.add_argument('neighborsHasChild', type=bool, required=True)

            # ОТСЮДа брать данные о пользователе по типу all_user_parameters["gender"] или all_user_parameters["age"]
            all_user_parameters = parser.parse_args()
            alternative_list = []

            return {}
        else:
            return {"message": "Bad request"}, 400


def sigmoid(x):
    return 1 / (1 + math.exp(-x))


def pointsForAge(x):
    return (1.5 * sigmoid(5 / x)) - 1.05
