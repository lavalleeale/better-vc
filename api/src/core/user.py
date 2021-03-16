from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from .models import UserModel, db

user = Blueprint("user", __name__)


@user.route("/getInfo/<email>", methods=["GET"])
@jwt_required()
def getUser(email: str):
    return jsonify(db.session.query(UserModel).filter(UserModel.email == email).one())
