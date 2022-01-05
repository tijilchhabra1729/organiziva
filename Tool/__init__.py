import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_socketio import SocketIO

################

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://xcdnsqpnigrsrf:0736e45fd73a9240f73a52de250d0628d1b3de3fd648acb7fdd7022cdbecac45@ec2-3-224-251-59.compute-1.amazonaws.com:5432/dacbmprjqvsrst'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'mysecret'
db = SQLAlchemy(app)
Migrate(app,db)

socketio = SocketIO(app)

########### * login config * #################

login_manager = LoginManager()

login_manager.init_app(app)
login_manager.login_view = 'login'
