from api.database.tables.room import Room as TableRoom
from flask_restful import Resource, reqparse


class Room(Resource):
    def get(self, request_type: str):
        request_type = request_type.lower()
        if request_type == "all":
            return [room.to_json() for room in TableRoom.query.filter_by(is_free=True).all()]
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
            parser.add_argument('neighborsAge', type=list, required=True)
            parser.add_argument('neighborsHasPet', type=bool, required=True)

            # ОТСЮДа брать данные о пользователе по типу all_user_parameters["gender"] или all_user_parameters["age"]
            all_user_parameters = parser.parse_args()

            alternative_list = []
            good_list = []

            # ЗАДАЧА: Посчитать сколько баллов получает комната
            for room in TableRoom.query.filter_by(is_free=True).all():
                all_passengers = room.passengers  # список экзм. класса Passenger
                # Параметры пользователя можно посмотреть в api/database/tables/passenger
                # К полю обращаться по типу passenger.gender or passenger.age
                room_passengers_count = 4
                if len(all_passengers) == room_passengers_count:
                    break
                for passenger in all_passengers: 
                    print(1)

                # сумма баллов этой комноты
                count_ball = 0

                if "ЕСЛИ ОН ПОДХОДИТ добавляем его в список хороших вариантов" == 1:
                    good_list.append((count_ball, room))
                else:
                    alternative_list.append((count_ball, room))

            # Тут сортируется по от меньшего кол-ва баллов до большего, тут уже всё готово
            return {"alternative_list": list(map(lambda x: x[1].to_json(), sorted(alternative_list, key=lambda x: x[0]))),
                    "good_list": list(map(lambda x: x[1].to_json(), sorted(good_list, key=lambda x: x[0])))}
        elif request_type.isdigit():
            data = TableRoom.query.get(int(request_type))
            if data:
                return data.to_json()
            else:
                return {"message": "id room not in database"}, 400
        else:
            return {"message": "Bad request"}, 400
