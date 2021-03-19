import requests
from flask import Blueprint, jsonify, request, current_app, make_response
from flask_jwt_extended import set_access_cookies, create_access_token
from datetime import timedelta
import sys

from core.models import UserModel, db
import sqlalchemy

auth = Blueprint("auth", __name__)


@auth.route("/login", methods=["POST"])
def login():
    if request.is_json:
        data = request.json
        req = requests.post("https://openidconnect.googleapis.com/v1/userinfo", data)
        userInfo = req.json()
        try:
            user = (
                db.session.query(UserModel)
                .filter(UserModel.email == userInfo["email"])
                .one()
            )
            resp = make_response({"name": user.nickname, "teacher": user.teacher})
            set_access_cookies(
                resp,
                create_access_token(identity=user),
                max_age=int(timedelta(days=30).total_seconds()),
            )

            return resp
        except sqlalchemy.exc.NoResultFound:
            if current_app.config["ENV"] != "production":
                resp = make_response({"name": "Tester", "teacher": True})
                set_access_cookies(
                    resp,
                    create_access_token(identity={"teacher": True, "id": 0}),
                    max_age=int(timedelta(days=30).total_seconds()),
                )

            return resp
            return "User Does Not Exist", 401

    else:
        return "Request Content-Type must be JSON", 400


@auth.route("/logout", methods=["GET"])
def logout():
    resp = make_response("", 204)
    resp.delete_cookie("username")
    resp.delete_cookie("teacher")
    return resp
