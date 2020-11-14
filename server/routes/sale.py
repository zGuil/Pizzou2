from flask import Blueprint, request, jsonify
from controllers.sale import Sale


bp = Blueprint("sale", __name__)


@bp.route("/insert/sale", methods=["POST"])
def insert_sale_route():
    request_body = request.get_json()
    try:
        sale = Sale()
        return jsonify(sale.transaction(request_body)), 201
    except KeyError:
        return jsonify("não foi possivel cadastrar este(s) produto(s)"), 400
