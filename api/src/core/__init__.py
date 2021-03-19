from datetime import datetime, timedelta, timezone
import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    get_jwt,
    get_jwt_identity,
    set_access_cookies,
)

app = Flask(__name__)
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_SESSION_COOKIE"] = False
if app.config["ENV"] == "production":
    app.config["JWT_COOKIE_DOMAIN"] = ".alextesting.ninja"
    app.config["JWT_COOKIE_SECURE"] = True
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)
jwt = JWTManager(app)


CORS(
    app,
    origins=[
        "http://localhost:3000"
        if app.config["ENV"] != "production"
        else "https://bettervc.alextesting.ninja"
    ],
    supports_credentials=True,
)
app.config["SQLALCHEMY_DATABASE_URI"] = (
    os.getenv("DB_URL")
    if app.config["ENV"] == "production"
    else os.getenv("DEV_DB_URL")
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = os.getenv("APP_SECRET")


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(days=1))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        return response


from .auth import auth

app.register_blueprint(auth, url_prefix="/auth")

from .teacher import teacher

app.register_blueprint(teacher, url_prefix="/teacher")

from .user import user

app.register_blueprint(user, url_prefix="/user")
