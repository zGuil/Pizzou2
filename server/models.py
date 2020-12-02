from flask import Flask

from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from flask_sqlalchemy import SQLAlchemy, event
import pytz
from pytz import timezone

from datetime import datetime

from settings import app_config, app_active

config = app_config[app_active]

if __name__ == "__main__":
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = config.SQLALCHEMY_DATABASE_URI
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db = SQLAlchemy(app)
    migrate = Migrate(app, db)

    manager = Manager(app)
    manager.add_command("db", MigrateCommand)
else:
    db = SQLAlchemy(config.APP)

time_brasil = timezone("America/Sao_Paulo")


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
        db.session.close()

        return "OK"

    @staticmethod
    def update(body):
        produto = Produto.query.filter_by(id=body["id"]).first()
        produto.preco_atual = body["preco_atual"]
        produto.descricao = body["descricao"]
        produto.nome = body["nome"]
        produto.qtd = body["qtd"]
        db.session.add(produto)
        db.session.commit()
        db.session.close()

    @staticmethod
    def delete(id):
        produto = Produto.query.filter_by(id=id).first()
        db.session.delete(produto)
        db.session.commit()
        db.session.close()

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20))
    password = db.Column(db.String(12))
    full_name = db.Column(db.String(255))

    @staticmethod
    def get_users():
        users = Users.query.all()
        return users


class Cardapio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(70))
    preco = db.Column(db.Integer)
    categoria = db.Column(db.String(45))


    @staticmethod
    def get(categoria):
        cardapio = Cardapio.query.filter_by(categoria=categoria).all()
        return cardapio

class Sale(db.Model):
    __tablename__ = "sale"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.now(time_brasil), nullable=False)


class Item_Venda(db.Model):
    __tablename__ = "item_venda"
    id = db.Column(db.Integer, primary_key=True)
    produto = db.Column(db.String(255))
    id_venda = db.Column(db.Integer, db.ForeignKey("sale.id"), nullable=False)
    qtd_produto = db.Column(db.Integer)
    preco_produto = db.Column(db.Integer)

    sale = db.relationship("Sale", backref="item_venda")


if __name__ == '__main__':
    manager.run()
