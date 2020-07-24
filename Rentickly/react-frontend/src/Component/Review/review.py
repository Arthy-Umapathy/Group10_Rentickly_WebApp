from flask import json, jsonify, request, Flask
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
import pymysql
import pymysql.cursors as cursors
from flask import request
import uuid
import logging


app = Flask(__name__)
jwt = JWTManager(app)
app.config["CORS_HEADERS"] = "Content-Type"
app.config["JWT_SECRET_KEY"] = "secret"

CORS(app)


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

                insert_query = "insert into Review(reviewId,reviewHead,rating,reviewDesc) values (%s,%s,%s,%s)"

                cursor.execute(
                    insert_query, (reviewId, headline, rating, review_content)
                )

                conn.commit()
            finally:
                conn.close()
            break
        else:
            logging.log(msg="Unable to connect to Database", level=logging.debug)
    return jsonify({"Result": "Inserted Successfully"})


if __name__ == "__main__":

    app.run(host="0.0.0.0", port=5000, debug=True)
