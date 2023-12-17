from flask import Flask, request, abort, jsonify,session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from models import db, User

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

bcrypt = Bcrypt(app)
db.init_app(app)
CORS(app, supports_credentials=True)
with app.app_context():
    db.create_all()

@app.route("/register", methods=["POST"])
def register():
    print(request.json)
    email = request.json["email"]
    username = request.json["username"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        abort(409)

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username=username,email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
            "id": new_user.id,
            "email": new_user.email
        })


@app.route("/login", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({
            "error": "Unauthorized"
        }),401
    
    if not bcrypt.check_password_hash(password, user.password):
        return jsonify({
            "error": "Unauthorized"
        }), 401
    
    session['id'] = user.id

    return jsonify({
        "email": email,
        "username":user.username
    })

if __name__ == "__main__":
    app.run(debug=True)