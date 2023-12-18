from flask import Flask, request, abort, jsonify,session
from flask_socketio import SocketIO, join_room,emit
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from models import db, User
import time

app = Flask(__name__)
socketio = SocketIO(app,cors_allowed_origins="*")

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SECRET_KEY"]="very secret key"

bcrypt = Bcrypt(app)
db.init_app(app)
CORS(app, supports_credentials=True,resources={r"/*":{"origins":"*"}})
with app.app_context():
    db.create_all()


users_queue = {}
@app.route("/@me", methods=["GET", "POST"])
def get_user():
    if not session.get("userid"):
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id = session.get("userid")).first()
    return jsonify({'id': user.id, 'email':user.email, 'username': user.username}),200

@app.route("/logout")
def logout():
    if not session.get("userid"):
        return "", 200
    
    session.pop("userid")
    return "", 200


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
    new_user = User(username=username,email=email, password=hashed_password)
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
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({
            "error": "Unauthorized"
        }), 401
    
    session['userid'] = user.id

    return jsonify({
        "id": user.id,
        "email": email,
        "username":user.username
    })

@socketio.on('connect')
def on_user_connect(*auth):
    print("User connected")
    if len(users_queue) == 0:
        users_queue[ str( session['userid'] ) ] = request.sid 
        return

    elif len(users_queue) == 1:
        if list(users_queue.keys())[0] == str(session['userid']):
            users_queue[ str(session['userid']) ] = request.sid
            return
    
    curr_time = str(time.time())
    join_room(f"{curr_time}",sid=users_queue[ list(users_queue.keys())[0] ])
    join_room(f"{curr_time}",sid=request.sid)
    
    users_queue.pop( list(users_queue.keys())[0])
    emit("chat", "Joined chat.",room=curr_time)
    print("Created a  room for two users, queue empty: ", users_queue)




@socketio.on('disconnect')
def on_user_connect():
    print(" A user has disconnected!")

if __name__ == "__main__":
    socketio.run(app,debug=True)
