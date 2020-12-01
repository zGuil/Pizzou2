from flask import Blueprint


bp = Blueprint("health", __name__)


@bp.route("/health", methods=["GET"])
def get_health_route():
    return "<h1>To Funcionando </h1>", 200
