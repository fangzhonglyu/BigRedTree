from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Users(db.Model):
  """
  Table for users
  """
  __tablename__ = "users"
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  identifier = db.Column(db.String, nullable=False)
  college = db.Column(db.String, nullable=False)
  treenum = db.Column(db.Float, nullable=False)

  # instantiate a user
  def __init__(self, **kwargs):
    self.name = kwargs.get("name")
    self.college = kwargs.get("college")
    self.treenum = 0.0
    self.identifier = kwargs.get("identifier")

  # serialize a user
  def serialize(self):
    return {
      "id": self.id,
      "name": self.name,
      "college": self.college,
      "treenum": self.treenum
    }

  # serialize a user without course field
  def serialize_info(self):
    return {
      "name": self.name,
      "netid": self.netid,
    }
