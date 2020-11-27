from flask import Blueprint, request, jsonify
from controllers.sale import Vendas


bp = Blueprint("sale", __name__)


@bp.route("/insert/venda", methods=["POST"])
def insert_sale_route():
    request_body = request.get_json()
    
    sale = Vendas()
    sale.transaction(request_body)

    return jsonify("Inseirda co"), 201
    


@bp.route("/relatorio/vendas", methods=["GET"])
def get_sale_relatorios():
    de_date = request.args.get('de_date')
    ate_date = request.args.get('ate_date')
    sale = Vendas()
    return sale.get(de_date, ate_date)


