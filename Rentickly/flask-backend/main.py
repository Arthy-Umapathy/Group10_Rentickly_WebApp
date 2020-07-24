import flask
from flask import json, jsonify, request, Flask
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from model import Model
from flask_jwt_extended import (create_access_token)
import pymysql
import pymysql.cursors as cursors
import uuid
import logging

app = flask.Flask("__main__")

app.config['MYSQL_HOST'] = 'database-2.cigxoyp3dem3.us-east-1.rds.amazonaws.com'
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = 'rentickly'
app.config['MYSQL_DB'] = 'rentickly'
app.config['JWT_SECRET_KEY'] = 'secret'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config["CORS_HEADERS"] = "Content-Type"

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
    # print("email:" + email)
    # print("pass:"+password)
    cur.execute("SELECT * from Users where email=%s", [email])
    rv = cur.fetchone()
    if not rv:
        return result
        # return jsonify({"error": "Invalid username"})
    if bcrypt.check_password_hash(rv['password'], password):

        access_token = create_access_token(
            identity={'userid': rv['userId'], 'username': rv['username'], 'email': rv['email']})
        result = access_token
    # else:
    #     result = jsonify({"error": "Invalid username and password"})
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
    cur.execute("SELECT * from Users where email=%s", [email])
    rv = cur.fetchone()
    access_token = create_access_token(
        identity={'userid': rv['userId'], 'username': rv['username'], 'email': rv['email']})
    result = access_token

    return result


@app.route("/getappointmentsscheduledwithme/<userId>")
def getappointmentsscheduledwithme(userId):
    cur = mysql.connection.cursor()
    appointmentStatus = "false"
    print('userId' + userId)
    cur.execute("SELECT a1.userId, a2.aId, a2.adTitle FROM bookAppointment a1, advertisements a2 WHERE a1.aId = a2.aId AND a1.appointmentstatus=%s  AND a2.userId=%s", (appointmentStatus, userId))
    rv = cur.fetchall()
    rv = json.dumps(rv, default=str)
    cur.close()
    return rv


@app.route("/getallappointments/<userId>")
def getallappointments(userId):
    cur = mysql.connection.cursor()
    print('userId' + userId)
    cur.execute("SELECT * FROM bookAppointment WHERE userId=%s", [userId])
    rv = cur.fetchall()
    rv = json.dumps(rv, default=str)
    cur.close()
    return rv


@app.route("/addappointment/<aId>", methods=['POST'])
def addappointment(aId):
    cur = mysql.connection.cursor()
    fname = request.get_json()['firstName']
    lname = request.get_json()['lastName']
    email = request.get_json()['email']
    date = request.get_json()['appointmentDate']
    time = request.get_json()['myTime']
    userId = request.get_json()['userId']
    appointmentStatus = "false"

    cur.execute("INSERT INTO bookAppointment (firstname, lastname, email, date, time, appointmentstatus, userId, aId) VALUES('" +
                str(fname) + "','" +
                str(lname) + "','" +
                str(email) + "','" +
                str(date) + "','" +
                str(time) + "','" +
                str(appointmentStatus) + "','" +
                str(userId) + "','" +
                str(aId) + "')")

    mysql.connection.commit()

    result = {
        "fname": fname,
        "lname": lname,
        "email": email,
        "date": date,
        "time": time,
        "appointmentStatus": appointmentStatus,
        "userId": userId,
        "aId": aId
    }

    return jsonify({"result": result})


@app.route("/registercomplaint", methods=["POST"])
def registercomplaint():
    cur = mysql.connection.cursor()
    userName = request.get_json()["userName"]
    email = request.get_json()["email"]
    subject = request.get_json()["subject"]
    message = request.get_json()["message"]

    cur.execute("INSERT INTO contactUs (name, email, subject, message) VALUES('" +
                str(userName) + "','" +
                str(email) + "','" +
                str(subject) + "','" +
                str(message) + "')")

    mysql.connection.commit()

    # msg = Message("Your issue is registered successfully. Our support team will get in touch with you asap.", sender="rentickly@gmail.com")
    # msg.add_recipient(email)
    # msg.body = "Your issue is registered successfully. Our support team will get in touch with you asap."
    # mail.send(msg)

    result = {
        "userName": userName,
        "email": email,
        "subject": subject,
        "message": message,
    }

    return jsonify({"result": result})


@app.route("/acceptappointment/<i>/<j>", methods=["POST"])
def acceptappointment(i, j):
    cur = mysql.connection.cursor()
    appointmentStatus = "true"
    cur.execute("UPDATE bookAppointment SET appointmentstatus=%s WHERE userId=%s AND aId=%s",
                (appointmentStatus, i, j))

    mysql.connection.commit()

    return "accepted"


@app.route("/postAd/post", methods=['POST'])
def postAdvertisement():
    dbObject = Model()
    ad_data = request.get_json()

    dbObject.postAdvertisement(ad_data)

    return json.dumps(ad_data)


@app.route("/user/getAds", methods=['POST', 'GET'])
@cross_origin(origin='*')
def getAdvertisements():
    dbObject = Model()
    email_data = request.get_json()

    email = email_data['email']

    records = dbObject.getAdvertisements(email)
    recordsObj = []
    for record in records:
        recordsObj.append({
            'aId': record[0],
            'adTitle': record[1],
            'userId': record[2],
            'propertyType': record[3],
            'propertyAddress': record[4],
            'zipCode': record[5],
            'propertyDescription': record[6],
            'petFriendly': record[7],
            'leaseType': record[8],
            'propertyLocation': record[9],
            'contactTiming': record[10],
            'applicationStatus': record[11]
        })
    # records.headers.add("Access-Control-Allow-Origin", "*")

    return json.dumps({
        "record": recordsObj
    })


@app.route("/users/review", methods=["POST"])
@cross_origin()
def add_review():
    # Review Id
    reviewId = str(uuid.uuid4())
    reviewId = reviewId[:7]
    # review headline
    headline = str(request.json["headline"])
    # review
    review_content = str(request.json["content"])
    # rating
    rating = str(request.json["rating"])
    # user id
    userId = str(request.json["userId"])
    # adId
    aid = str(request.json["aid"])

    while True:
        # create connection
        conn = pymysql.connect(
            host="database-2.cigxoyp3dem3.us-east-1.rds.amazonaws.com",
            port=3306,
            user="admin",
            password="rentickly",
            db="rentickly",
            charset="utf8mb4",
            cursorclass=cursors.DictCursor,
        )

        if conn:
            try:

                cursor = conn.cursor()

                insert_query = "insert into Review(reviewId,reviewHead,rating,reviewDesc,userId,aId) values (%s,%s,%s,%s,%s,%s)"

                cursor.execute(
                    insert_query, (reviewId, headline, rating,
                                   review_content, userId, aid)
                )

                conn.commit()

                update_query = "UPDATE advertisements SET reviewId = %s WHERE aId = %s;"

                cursor.execute(update_query, (reviewId, aid))

                conn.commit()
            finally:
                conn.close()
            break
        else:
            logging.log(msg="Unable to connect to Database",
                        level=logging.debug)
    return jsonify({"Result": "Inserted Successfully"})


app.run(debug=True)
