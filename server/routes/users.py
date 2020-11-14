from flask import Blueprint
from controllers.users import current_identity, jwt_required


bp = Blueprint("users", __name__)


@bp.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    return '%s' % type(current_identity)
