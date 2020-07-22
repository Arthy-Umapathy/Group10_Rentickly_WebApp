import flask
from flask import json, jsonify, request
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)

app = flask.Flask("__main__")

app.config['MYSQL_HOST'] = 'database-2.cigxoyp3dem3.us-east-1.rds.amazonaws.com'
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = 'rentickly'
app.config['MYSQL_DB'] = 'rentickly'
app.config['JWT_SECRET_KEY'] = 'secret'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)


@app.route("/")
def my_index():
    return flask.render_template("index.html")


@app.route('/users/register', methods=['POST'])
def register():
    cur = mysql.connection.cursor()
    password = ''
    username = ''
    if request.get_json()['username']:
        username = request.get_json()['username']
    if request.get_json()['email']:
        email = request.get_json()['email']
    if request.get_json()['password']:
        password = bcrypt.generate_password_hash(
            request.get_json()['password']).decode('utf-8')

    cur.execute("SELECT * from Users where email=%s",
                [email])
    rv = cur.fetchone()
    result = ""
    if rv:
        return result
    print("username:"+username, "email:"+email, "password:" + password)
    cur.execute("INSERT INTO Users(username,email,password) VALUES (%s, %s,%s)",
                (username, email, password))

    mysql.connection.commit()

    result = {
        "username": username,
        "email": email,
        "password": password,

    }

    return jsonify({"result": result})


@app.route('/users/login', methods=['POST'])
def login():
    cur = mysql.connection.cursor()
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""
    print("email:" + email)
    print("pass:"+password)
    cur.execute("SELECT * from Users where email=%s",[email])
    rv = cur.fetchone()
    if not rv:
        print("here")
        return result
        # return jsonify({"error": "Invalid username"})
    if bcrypt.check_password_hash(rv['password'], password):
        print("there")
        access_token = create_access_token(
            identity={'userid':rv['userId'],'username': rv['username'], 'email': rv['email']})
        result = access_token
    # else:
    #     result = jsonify({"error": "Invalid username and password"})
    print("out")
    return result


@app.route('/users/resetpwd', methods=['POST'])
def reset():
    cur = mysql.connection.cursor()
    email = request.get_json()['email']
    password = request.get_json()['newpwd']
    if request.get_json()['newpwd']:
        password = bcrypt.generate_password_hash(
            request.get_json()['newpwd']).decode('utf-8')
    cur.execute("UPDATE Users SET password=%s WHERE email=%s",
                (password, email))

    mysql.connection.commit()
    result = {
        "email": email,
        "password": password,
    }

    return jsonify({"result": result})


@app.route('/users/delete', methods=['POST'])
def delete():
    cur = mysql.connection.cursor()
    email = request.get_json()['email']
    cur.execute("DELETE FROM Users WHERE email=%s",
                [email])

    mysql.connection.commit()
    result = {
        "email": email,
    }

    return jsonify({"result": result})


@app.route('/users/update', methods=['POST'])
def update():
    cur = mysql.connection.cursor()
    username = request.get_json()['username']
    email = request.get_json()['email']
    cur.execute("UPDATE Users SET username=%s WHERE email=%s",
                (username, email))

    mysql.connection.commit()
    result = {
        "email": email,
        "username": username
    }

    return jsonify({"result": result})


app.run(debug=True)
