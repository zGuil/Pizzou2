from flask import Flask
from flask_cors import CORS
from settings import app_config, app_active
from flask_sqlalchemy import SQLAlchemy
import pytz
from pytz import timezone
from .routes.produto import bp as bp_produtos
from .routes.sale import bp as bp_sale
from .routes.health import bp as bp_health
from .routes.cardapio import bp as bp_cardapio

config = app_config[app_active]

def create_app(config_name):
    app = Flask('app')

    db = SQLAlchemy(app)


    CORS(app)
    app.config.from_object(app_config[app_active])
    app.config.from_pyfile('../settings.py')
    app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db = SQLAlchemy(app)
    db.init_app(app)


    app.register_blueprint(bp_produtos)
    app.register_blueprint(bp_sale)
    app.register_blueprint(bp_health)
    app.register_blueprint(bp_cardapio)


    return app
