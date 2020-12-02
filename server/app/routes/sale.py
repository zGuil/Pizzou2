from flask import Blueprint, request, jsonify
from app.controllers.sale import Vendas


bp = Blueprint("sale", __name__)


@bp.route("/insert/venda", methods=["POST"])
def insert_sale_route():
    request_body = request.get_json()
    
    sale = Vendas()
    venda = sale.transaction(request_body)
    if venda == "OK":
        return jsonify("Venda efetuda com Sucesso"), 201
    else:
        return jsonify(f"O produto {venda[0]}, não pode atender a venda. Estoque atual: {venda[1]} "), 400

@bp.route("/relatorio/vendas", methods=["GET"])
def get_sale_relatorios():
    de_date = request.args.get('de_date')
    ate_date = request.args.get('ate_date')
    sale = Vendas()
    return jsonify(sale.get(de_date, ate_date+" 23:59:59"))


