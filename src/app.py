from calendar import c
from db import db, Users
from flask import Flask, request
import json
import os

app = Flask(__name__)
db_filename = "tree.db"

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


@app.route("/api/users/", methods=["GET"])
def get_users():
  """
  Endpoint for getting all courses
  """
  users = [t.serialize() for t in Users.query.all()]
  return json.dumps({"users": users}), 200


@app.route("/api/users/", methods=["POST"])
def post_user():
  """
  Endpoint for posting a course
  """
  body = json.loads(request.data)
  try:
    new_user = Users(
      college=body["college"],
      name=body["name"],
      identifer=body["identifer"]
    )
  except KeyError:
    return json.dumps({"error": "Missing fields"}), 400

  db.session.add(new_user)
  db.session.commit()
  return json.dumps(new_user.serialize(), 201)


@app.route("/api/users/tree/", methods=["POST"])
def update_tree():
  """
  Endpoint for updating the tree amount of an user
  """
  body = json.loads(request.data)
  try:
    user = Users.query.filter_by(identifier=body["sub"]).first()
    if user is None:
      return json.dumps({"error": "User not found"}), 404
    user.treenum = user.treenum + body["amount"]
  except KeyError:
    return json.dumps({"error": "Missing fields"}), 400
  db.session.commit()
  return json.dumps(user.serialize()), 201
