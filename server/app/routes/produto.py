from flask import Blueprint, request, jsonify
from app.controllers.produto import insert_produtos, get_produtos, update_produto, delete_produto


bp = Blueprint("produto", __name__)


@bp.route("/insert/produto", methods=["POST"])
def insert_produtos_route():
    body = request.get_json()
    
    if(insert_produtos(body) != None):
        return jsonify("Produto cadastrado com sucesso"), 201
    else:
        return jsonify("Este produto já existe no estoque"), 400
    

@bp.route("/update/produto", methods=["PUT"])
def update_produtos_route():
    body = request.get_json()
    try:
        update_produto(body)
        return jsonify("Produto atualizado com sucesso"), 200
    except KeyError:
        return jsonify("não foi possivel atualizar este produto"), 400


@bp.route("/delete/produto/<int:id>", methods=["DELETE"])
def delete_produtos_route(id):
    try:
        delete_produto(id)
        return jsonify("Produto deletado com sucesso"), 200
    except KeyError:
        return jsonify("não foi possivel deletar este produto"), 400

@bp.route("/produtos", methods=["GET"])
def get_produtos_route():
    return jsonify(get_produtos()), 200
