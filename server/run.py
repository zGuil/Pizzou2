from settings import app_config, app_active
from app.main import app
from importlib import reload
import sys

config = app_config[app_active]
#config.APP = create_app(app_active)

#def runner():
if __name__ == '__main__':
    config.APP.run(host=config.IP_HOST,port=config.PORT_HOST)
    reload(sys)
