from flask import Blueprint, request, jsonify
from app.controllers.cardapio import get_cardapio


bp = Blueprint("cardapio", __name__)


@bp.route("/cardapio", methods=["GET"])
def get_cardapio_route():
    return jsonify(get_cardapio()), 200