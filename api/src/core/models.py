from dataclasses import dataclass

from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy, sqlalchemy

from . import app

# sqlalchemy instance
db = SQLAlchemy(app)
migrate = Migrate(app, db)

association_table = sqlalchemy.schema.Table(
    "association",
    db.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("class_id", db.Integer, db.ForeignKey("classes.id")),
)
# models
@dataclass
class UserModel(db.Model):
    __tablename__ = "users"

    id: int
    name: str
    email: str
    nickname: str
    teacher: bool
    image: str
    image_url: str

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    email = db.Column(db.String(), unique=True)
    nickname = db.Column(db.String())
    teacher = db.Column(db.Boolean(), nullable=False)
    image = db.Column(db.String())
    image_url = db.Column(db.String())
    schedule = sqlalchemy.orm.relationship(
        "ClassModel", secondary=association_table, back_populates="students"
    )

    def __init__(self, name, email, nickname, teacher, image, image_url):
        self.name = name
        self.email = email
        self.nickname = nickname
        self.teacher = teacher
        self.image = image
        self.image_url = image_url

    def __repr__(self):
        return f"<User {self.name}>"


@dataclass
class ClassModel(db.Model):
    __tablename__ = "classes"

    id: int
    name: str
    startTime: int
    endTime: int
    zoomLink: str
    days: list
    teacher: UserModel
    students: UserModel

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    startTime = db.Column(db.Integer())
    endTime = db.Column(db.Integer())
    zoomLink = db.Column(db.String())
    days = db.Column(db.ARRAY(db.Boolean))
    teacher_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    teacher = sqlalchemy.orm.relationship("UserModel")
    students = sqlalchemy.orm.relationship(
        "UserModel", secondary=association_table, back_populates="schedule"
    )

    def __init__(self, name, startTime, endTime, zoomLink, days, teacher, students):
        self.name = name
        self.startTime = startTime
        self.endTime = endTime
        self.zoomLink = zoomLink
        self.days = days
        self.teacher = teacher
        self.students = students

    def __repr__(self):
        return f"<Class {self.name}>"
