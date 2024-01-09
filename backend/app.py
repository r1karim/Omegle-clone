from flask import Flask, request, abort, jsonify,session
from flask_socketio import SocketIO, join_room,emit
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_mail import Mail, Message
from flask_login import login_required
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from models import db, User
import time

app = Flask(__name__)
socketio = SocketIO(app,cors_allowed_origins="*")

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SECRET_KEY"]="very secret key"

bcrypt = Bcrypt(app)
db.init_app(app)
mail = Mail(app)
serializer = URLSafeTimedSerializer(app.config["SECRET_KEY"])
CORS(app, supports_credentials=True,resources={r"/*":{"origins":"*"}})
with app.app_context():
    db.create_all()


users_queue = {}
active_rooms = []
active_users = {}

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

@app.route("/passwordreset", methods=["POST"])
def reset_password():
    email = request.json["email"]

    user = User.query.filter_by(email=email).first()

    if not user:
        abort(404)

    token = serializer.dumps(email, salt="password-reset")
    reset_link = f"http://your-website.com/reset?token={token}"

    msg = Message("Password Reset", sender="your-email@gmail.com", recipients=[email])
    msg.body = f"Click the link to reset your password: {reset_link}"
    mail.send(msg)

    return jsonify(message="Password reset email sent"), 200

app.route("/passwordresetconfirm", methods=["POST"])
def reset_password_confirm():
    token = request.json["token"]
    new_password = request.json["new_password"]

    try:
        email = serializer.loads(token, salt="password-reset", max_age=3600)
        user = User.query.filter_by(email=email).first()

        if not user:
            abort(404)

        hashed_password = bcrypt.generate_password_hash(new_password)
        user.password = hashed_password
        db.session.commit()

        return jsonify(message="Password reset successful"), 200
    except SignatureExpired:
        return jsonify(message="Password reset link has expired"), 400
    

@app.route("/login", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized" }),401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    session['userid'] = user.id

    return jsonify({
        "id": user.id,
        "email": email,
        "username":user.username })

def send_chatroom_message(chatroom,data):
    for user in chatroom:
        emit("chat", data, to=active_users[str(user)])

@socketio.on('connect')
def on_user_connect(*auth):
    active_users[str(session['userid'])] = request.sid

def send_disconnection_notification(user_id):
    message = f"User {user_id} has disconnected"
    emit("user_disconnected", {"userId": user_id}, broadcast=True)
    

@socketio.on('disconnect')
def on_user_disconnect():
    print("user disconnected")
    user_id = str(session.get("userid"))
    
    if user_id in users_queue:
        users_queue.pop(user_id)

    for room in active_rooms:
        send_chatroom_message(room, {"type": "room_closure"})
        active_rooms.remove(room)
        break
    
    try:
        active_users.pop(user_id)
        send_disconnection_notification(user_id)
    except AssertionError as e:
        print(e)



@socketio.on("chat")
def on_user_chat(data):
    print(data)

    for room in active_rooms:
        if session['userid'] in room:
            room = list(room)
            emit("chat",{"type": "message","content": data["content"], "sender": room[0]==session['userid']}, to=active_users[str(room[0])])
            emit("chat",{"type": "message","content": data["content"], "sender": room[1]==session['userid']}, to=active_users[str(room[1])])
            return
@socketio.on("join_queue")
def user_join_queue():
    if not len(users_queue):
        users_queue[ str( session['userid'] ) ] = request.sid 
        return

    elif len(users_queue) == 1:
        if list(users_queue.keys())[0] == str(session['userid']):
            users_queue[ str(session['userid']) ] = request.sid
            return

    other_user_id = list(users_queue.keys())[0] 
    chat_room = set([int(session['userid']), int(other_user_id)])

    if chat_room not in active_rooms:
        active_rooms.append(chat_room)

    users_queue.pop( other_user_id )

    send_chatroom_message(chat_room, "Joined chat")

    print(active_rooms)

@app.route("/reconnect", methods=["POST"])
def reconnect():
    user_id = session.get("userid")
    active_users[str(session['userid'])] = request.sid
    
    
if __name__ == "__main__":
    socketio.run(app,debug=True)
