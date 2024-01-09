from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(62), unique=False, nullable=False)
    email = db.Column(db.String(320), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    #be sure to add interests db if necessary

    def __repr__(self):
        return f"User({self.id},  {self.username}, {self.email})"

