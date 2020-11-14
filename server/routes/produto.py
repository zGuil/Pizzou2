from flask import Blueprint, request, jsonify
from controllers.produto import insert_produtos, get_produtos


bp = Blueprint("produto", __name__)


@bp.route("/insert/produto", methods=["POST"])
def insert_produtos_route():
    body = request.get_json()
    try:
        insert_produtos(body)
        return jsonify("Produto(s) cadastrado(s) com sucesso"), 201
    except KeyError:
        return jsonify("não foi possivel cadastrar este(s) produto(s)"), 400


@bp.route("/produtos", methods=["GET"])
def get_produtos_route():
    return jsonify(get_produtos()), 201
