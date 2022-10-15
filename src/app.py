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
  return "Hello World!"


@app.route("/api/users/<string:sub>/", methods=["GET"])
def get_user(sub):
  """
  Endpoint for getting a user
  """
  user = Users.query.filter_by(identifier=sub).first()
  if user is None:
    return json.dumps({"error": "User not found"}), 404
  return json.dumps(user.serialize()), 200


@app.route("/api/users/", methods=["GET"])
def get_users():
  """
  Endpoint for getting all users
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
      identifier=body["identifier"]
    )
  except KeyError:
    return json.dumps({"error": "Missing fields"}), 400

  db.session.add(new_user)
  db.session.commit()
  return json.dumps(new_user.serialize()), 201


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


if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5000, debug=True)
