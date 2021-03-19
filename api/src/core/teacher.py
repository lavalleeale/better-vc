import os

import cloudinary
import cloudinary.uploader
import cloudinary.utils
from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from .models import ClassModel, UserModel, db

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_NAME"),
    api_key=os.getenv("CLOUDINARY_KEY"),
    api_secret=os.getenv("CLOUDINARY_SECRET"),
)

teacher = Blueprint("teacher", __name__)


@teacher.route("/addUser", methods=["POST"])
@jwt_required()
def add_user():
    if request.is_json:
        body = request.json
        if get_jwt_identity()["teacher"]:
            image_id = (
                cloudinary.uploader.upload(
                    body["image"], format="png", width=100, height=100, crop="limit"
                )["public_id"]
                if body["image"]
                else ""
            )
            image_url = cloudinary.utils.cloudinary_url(image_id, secure=True)[0]
            new_user = UserModel(
                body["name"],
                body["email"].lower(),
                body["nickname"] if body["nickname"] else body["name"].split(" ")[0],
                body["teacher"],
                image_id,
                image_url,
            )
            db.session.add(new_user)
            db.session.commit()
            return "", 204
        else:
            return "Only Teacher may add Users", 401

    else:
        return "Request Content-Type must be JSON", 400


@teacher.route("/getTeachers", methods=["GET"])
@jwt_required()
def get_teachers():
    if get_jwt_identity()["teacher"]:
        return jsonify(
            db.session.query(UserModel).filter(UserModel.teacher == True).all()
        )
    else:
        return "Only Teacher may list users", 401


@teacher.route("/getStudents", methods=["GET"])
@jwt_required()
def get_students():
    if get_jwt_identity()["teacher"]:
        return jsonify(
            db.session.query(UserModel).filter(UserModel.teacher == False).all()
        )
    else:
        return "Only Teacher may list users", 401


def find_students(student: dict):
    return db.session.query(UserModel).filter(UserModel.id == student["id"]).one()


@teacher.route("/addClass", methods=["POST"])
@jwt_required()
def add_class():
    if request.is_json:
        if get_jwt_identity()["teacher"]:
            body = request.json
            block = ClassModel(
                body["name"],
                body["startTime"],
                body["endTime"],
                body["zoomLink"],
                body["days"],
                db.session.query(UserModel)
                .filter(UserModel.id == body["teacher"]["id"])
                .one(),
                list(map(find_students, body["students"])),
            )
            db.session.add(block)
            db.session.commit()
            return jsonify(block)
        else:
            return "Only teachers may add classes", 401
    else:
        return "Request Content-Type must be JSON", 400


@teacher.route("/getAllClasses", methods=["GET"])
@jwt_required()
def get_all_classes():
    if get_jwt_identity()["teacher"]:
        return jsonify(db.session.query(ClassModel).all())
    else:
        return "Only teachers may list classes", 401


@teacher.route("/getClasses", methods=["GET"])
@jwt_required()
def get_classes():
    if get_jwt_identity()["teacher"]:
        return jsonify(
            db.session.query(ClassModel)
            .filter(ClassModel.teacher_id == get_jwt_identity()["id"])
            .all()
        )
    else:
        return "Only teachers may list classes", 401


@teacher.route("/deleteClass/<id>", methods=["DELETE"])
@jwt_required()
def delete_class(id: int):
    if get_jwt_identity()["teacher"]:
        db.session.delete(
            db.session.query(ClassModel).filter(ClassModel.id == id).one()
        )
        db.session.commit()
        return "", 204
    else:
        return "Only teachers may delete classes", 401


@teacher.route("/deleteUser/<id>", methods=["DELETE"])
@jwt_required()
def delete_user(id: int):
    if get_jwt_identity()["teacher"]:
        user = db.session.query(UserModel).filter(UserModel.id == id).one()
        cloudinary.uploader.destroy(user.image)
        db.session.delete(user)
        db.session.commit()
        return "", 204
    else:
        return "Only teachers may delete users", 401


@teacher.route("/updateClass", methods=["PUT"])
@jwt_required()
def update_class():
    if request.is_json:
        if get_jwt_identity()["teacher"]:
            body = request.json
            block = (
                db.session.query(ClassModel).filter(ClassModel.id == body["id"]).one()
            )
            block.name = body["name"]
            block.startTime = body["startTime"]
            block.endTime = body["endTime"]
            block.zoomLink = body["zoomLink"]
            block.days = body["days"]
            block.teacher = (
                db.session.query(UserModel)
                .filter(UserModel.id == body["teacher"]["id"])
                .one()
            )
            block.students = list(map(find_students, body["students"]))
            db.session.commit()
            return jsonify(block), 200
        else:
            return "Only teachers may delete users", 401
    else:
        return "Request Content-Type must be JSON", 400
