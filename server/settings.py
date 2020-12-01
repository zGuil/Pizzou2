from dotenv import load_dotenv
import os


load_dotenv()

DB_HOST = os.environ.get("DB_HOST")
DB_USER = os.environ.get("DB_USER")
DB_PW = os.environ.get("DB_PW")
DB_DB = os.environ.get("DB_DB")


class Config(object):
    ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
    APP = None


class DevelopmentConfig(Config):
    TESTING = True
    DEBUG = True
    IP_HOST = 'localhost'
    PORT_HOST = 5000
    URL_MAIN = 'http://%s/%s' % (IP_HOST, PORT_HOST)
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://admin:Pizzou1234@db-ope-pizzou.ct2bcpzzh2py.us-east-1.rds.amazonaws.com:3306/pizzou'


app_config = {
    'development': DevelopmentConfig(),
    'testing': None,
    'production': None
}

app_active = os.getenv("FLASK_ENV")

if app_active is None:
    app_active = 'development'