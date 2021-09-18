from api.jwt.manager_jwt import manager_jwt
from api.database.tables.user import User
from hmac import compare_digest

# Управление route находиться в главном конфиге "JWT_AUTH_URL_RULE"


@manager_jwt.authentication_handler
def authenticate(username, password):
    user = User.query.filter_by(login=username).scalar()
    if user and compare_digest(user.password, password):
        return user


@manager_jwt.identity_handler
def my_identify(payload):
    return User.query.get(payload['identity'])
