from calendar import c
from db import db, Course, Assignments, Users
from flask import Flask, request
import json
import os

app = Flask(__name__)
db_filename = "cms.db"

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///%s" % db_filename
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True

db.init_app(app)
with app.app_context():
    db.create_all()


# your routes here
@app.route("/", methods=["GET"])
def hello_world():
    """
    Endpoint for printing netid
    """
    return os.environ.get("NETID") + " was here!"


@app.route("/api/courses/", methods=["GET"])
def get_courses():
    """
    Endpoint for getting all courses
    """
    courses = [t.serialize() for t in Course.query.all()]
    return json.dumps({"courses": courses}), 200


@app.route("/api/courses/", methods=["POST"])
def post_course():
    """
    Endpoint for posting a course
    """
    body = json.loads(request.data)
    try:
        new_course = Course(
            code=body["code"],
            name=body["name"]
        )
    except KeyError:
        return json.dumps({"error": "Missing fields"}), 400

    db.session.add(new_course)
    db.session.commit()
    return json.dumps(new_course.serialize()), 201


@app.route("/api/courses/<int:course_id>/", methods=["GET"])
def get_course(course_id):
    """
    Endpoint for getting a course
    """
    course = Course.query.filter_by(id=course_id).first()
    if course is None:
        return json.dumps({"error": "Course Not Found"}), 404
    return json.dumps(course.serialize()), 200


@app.route("/api/courses/<int:course_id>/", methods=["DELETE"])
def delete_course(course_id):
    """
    Endpoint for deleting a course
    """
    course = Course.query.filter_by(id=course_id).first()
    if course is None:
        return json.dumps({"error": "Course Not Found"}), 404
    db.session.delete(course)
    db.session.commit()
    return json.dumps(course.serialize()), 200


@app.route("/api/users/", methods=["POST"])
def post_user():
    """
    Endpoint for creating an user
    """
    body = json.loads(request.data)
    try:
        new_user = Users(
            name=body["name"],
            netid=body["netid"]
        )
    except KeyError:
        return json.dumps({"error": "Missing fields"}), 400

    db.session.add(new_user)
    db.session.commit()
    return json.dumps(new_user.serialize()), 201


@app.route("/api/users/<int:user_id>/", methods=["GET"])
def get_user(user_id):
    """
    Endpoint for getting an user
    """
    user = Users.query.filter_by(id=user_id).first()
    if user is None:
        return json.dumps({"error": "User Not Found"}), 404
    return json.dumps(user.serialize()), 200


@app.route("/api/courses/<int:course_id>/add/", methods=["POST"])
def add_user(course_id):
    """
    Endpoint for adding users to course
    """
    body = json.loads(request.data)
    try:
        user_id = body["user_id"]
        type = body["type"]
    except KeyError:
        return json.dumps({"error": "Missing fields"}), 400
    course = Course.query.filter_by(id=course_id).first()
    user = Users.query.filter_by(id=user_id).first()
    if user is None or course is None:
        return json.dumps({"error": "Course/User Not Found"}), 404
    if type == "instructor":
        course.instructors.append(user)
        user.course_taught.append(course)
    elif type == "student":
        course.students.append(user)
        user.courses.append(course)
    else:
        return json.dumps({"error": "Invalid Type"}), 400
    db.session.commit()
    return json.dumps(course.serialize()), 200


@app.route("/api/courses/<int:course_id>/assignment/", methods=["POST"])
def add_assignment(course_id):
    """
    Endpoint for creating assignments
    """
    body = json.loads(request.data)
    course = Course.query.filter_by(id=course_id).first()
    if course is None:
        return json.dumps({"error": "course Not Found"}), 404
    try:
        new_assign = Assignments(
            title=body["title"],
            duedate=body["due_date"],
            course_id=course_id
        )
    except KeyError:
        return json.dumps({"error": "Missing fields"}), 400
    db.session.add(new_assign)
    db.session.commit()
    return json.dumps(new_assign.serialize()), 201


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
