from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# your classes here

# assoc between instructors and courses
assoc_table = db.Table("assoc", db.Model.metadata,
                       db.Column("user", db.Integer,
                                 db.ForeignKey("users.id")),
                       db.Column("course", db.Integer,
                                 db.ForeignKey("courses.id"))
                       )

# assoc between students and courses
assoc_table2 = db.Table("assoc2", db.Model.metadata,
                        db.Column("user", db.Integer,
                                  db.ForeignKey("users.id")),
                        db.Column("course", db.Integer,
                                  db.ForeignKey("courses.id"))
                        )


class Course(db.Model):
    """
    Table for courses
    """
    __tablename__ = "courses"
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    assignments = db.relationship(
        "Assignments", cascade="delete")
    instructors = db.relationship(
        "Users", secondary=assoc_table, back_populates='course_taught')
    students = db.relationship(
        "Users", secondary=assoc_table2, back_populates='courses')

    # instantiate a course item
    def __init__(self, **kwargs):
        self.code = kwargs.get("code")
        self.name = kwargs.get("name")
        self.assignments = []
        self.instructors = []
        self.students = []

    # serialize a course item
    def serialize(self):
        return {
            "id": self.id,
            "code": self.code,
            "name": self.name,
            "assignments": [a.serialize_info() for a in self.assignments],
            "instructors": [i.serialize_info() for i in self.instructors],
            "students": [s.serialize_info() for s in self.students]
        }

    # serialize a course item with only basic info
    def serialize_info(self):
        return {
            "id": self.id,
            "code": self.code,
            "name": self.name
        }


class Users(db.Model):
    """
    Table for users
    """
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    netid = db.Column(db.String, nullable=False)
    courses = db.relationship(
        "Course", secondary=assoc_table2, back_populates='students')
    course_taught = db.relationship(
        "Course", secondary=assoc_table, back_populates='instructors')

    # instantiate a user
    def __init__(self, **kwargs):
        self.name = kwargs.get("name")
        self.netid = kwargs.get("netid")
        self.courses = []
        self.course_taught = []

    # serialize a user
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "netid": self.netid,
            "courses": [c.serialize_info() for c in self.courses] + [c.serialize_info() for c in self.course_taught]
        }

    # serialize a user without course field
    def serialize_info(self):
        return {
            "id": self.id,
            "name": self.name,
            "netid": self.netid,
        }


class Assignments(db.Model):
    """
    Table for assignment
    """
    __tablename__ = "assignments"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    duedate = db.Column(db.Integer, nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey(
        "courses.id"), nullable=False)

    # serialize an assignment
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "due_date": self.duedate,
            "course": Course.query.filter_by(id=self.course_id).first().serialize_info()
        }

    # serialize an assignment without course info
    def serialize_info(self):
        return {
            "id": self.id,
            "title": self.title,
            "due_date": self.duedate
        }
