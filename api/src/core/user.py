from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.orm import load_only

from .models import ClassModel, UserModel, db

user = Blueprint("user", __name__)


@user.route("/getInfo/<email>", methods=["GET"])
@jwt_required()
def getUser(email: str):
    return jsonify(db.session.query(UserModel).filter(UserModel.email == email).one())


@user.route("/getClasses", methods=["GET"])
@jwt_required()
def getClasses():
    if get_jwt_identity()["teacher"]:
        return jsonify(
            db.session.query(ClassModel)
            .filter(ClassModel.teacher_id == get_jwt_identity()["id"])
            .all()
        )
    return jsonify(
        db.session.query(UserModel)
        .filter(UserModel.id == get_jwt_identity()["id"])
        .one()
        .schedule
    )
