SECRET_KEY = "dTHRLCTgD4Y189UROiIQ1ts0KSm3GsAdц"
SQLALCHEMY_DATABASE_URI = "mysql://root:@127.0.0.1:3306/hackaton"
SQLALCHEMY_TRACK_MODIFICATIONS = False


def get_parameters():
    data = {
        "SECRET_KEY": SECRET_KEY,
        "SQLALCHEMY_DATABASE_URI": SQLALCHEMY_DATABASE_URI,
        "SQLALCHEMY_TRACK_MODIFICATIONS": SQLALCHEMY_TRACK_MODIFICATIONS
    }
    return data
