from flask_sqlalchemy import SQLAlchemy
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from __init__ import app

# Local
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost:3306/pizzou'

# Prod
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:Pizzou1234@db-ope-pizzou.ct2bcpzzh2py.us-east-1.rds.amazonaws.com:3306/pizzou'

db = SQLAlchemy(app)
migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)


class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.String(100))
    preco_atual = db.Column(db.Float())
    nome = db.Column(db.String(45))
    qtd = db.Column(db.Float())

    @staticmethod
    def get():
        produtos = Produto.query.all()
        return produtos

    @staticmethod
    def set(body):
        produto = Produto(descricao=body['descricao'], preco_atual=body['preco_atual'],
                          nome=body["nome"], qtd=body['qtd'])
        db.session.add(produto)
        db.session.commit()

        return "OK"


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20))
    password = db.Column(db.String(12))
    full_name = db.Column(db.String(255))

    @staticmethod
    def get_users():
        users = Users.query.all()
        return users


class Menu(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40))
    price = db.Column(db.Float())


class Sale(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_pizza = db.Column(db.String(40))
    product_drink = db.Column(db.String(40))
    qtd_pizza = db.Column(db.Integer)
    qtd_drink = db.Column(db.Integer)
    price_pizza = db.Column(db.Float())
    price_drink = db.Column(db.Float())
    total = db.Column(db.Float())


if __name__ == '__main__':
    manager.run()
