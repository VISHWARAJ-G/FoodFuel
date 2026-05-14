from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import mariadb
import random
import string
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
CORS(app)  # Allow frontend to access API

DB_HOST = os.getenv("DB_HOST")
DB_PORT = int(os.getenv("DB_PORT"))
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")

def get_db_connection():
    return mariadb.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )

# Function to check user login
def check_login(user_id, password):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM donor WHERE user_id = ? AND password = ?", (user_id, password))
    result = cur.fetchone()
    cur.close()
    conn.close()
    return {"message": "Login Successful", "status": 200} if result else {"message": "Invalid credentials", "status": 401}

def generate_user_id(table_name, name):
    conn = get_db_connection()
    cur = conn.cursor()
    while True:
        user_id = f"{name.lower().replace(' ', '')}{random.randint(1000, 9999)}"
        cur.execute(f"SELECT COUNT(*) FROM {table_name} WHERE USER_ID = ?;", (user_id,))
        count = cur.fetchone()[0]
        if count == 0:
            cur.close()
            conn.close()
            return user_id

def generate_password(table_name, length=12):
    conn = get_db_connection()
    cur = conn.cursor()
    while True:
        now = datetime.now()
        characters = string.ascii_letters + string.digits + now.strftime("%Y%m%d%H%M%S")
        password = ''.join(random.choice(characters) for _ in range(length))
        cur.execute(f"SELECT COUNT(*) FROM {table_name} WHERE PASSWORD = ?;", (password,))
        if cur.fetchone()[0] == 0:
            cur.close()
            conn.close()
            return password

def get_next_id(table_name):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(f"SELECT MAX(ID) FROM {table_name}")
    result = cur.fetchone()
    cur.close()
    conn.close()
    return (result[0] + 1) if result[0] is not None else 1

def signup_user(name, table_name, email, ph, address, district, state, zip):
    conn = get_db_connection()
    cur = conn.cursor()
    user_id = generate_user_id(table_name, name)
    password = generate_password(table_name)
    id = get_next_id(table_name)
    try:
        cur.execute(f"INSERT INTO {table_name} (ID, NAME, USER_ID, PASSWORD, EMAIL, PHONE_NO, ADDRESS, DISTRICT, STATE, ZIP) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                    (id, name, user_id, password, email, ph, address, district, state, zip))
        conn.commit()
        response = {"message": "Signup successful", "status": 200, "user_id": user_id, "password": password}
    except Exception as e:
        response = {"message": f"Database Error: {e}", "status": 500}
    cur.close()
    conn.close()
    return response
@app.after_request
def add_cors_headers(response):
    """ Add CORS headers to every response """
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    return response

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        if not data or "userId" not in data or "password" not in data:
            return jsonify({"message": "Invalid request format", "status": 400}), 400
        response = check_login(data.get("userId"), data.get("password"))
        return jsonify(response), response["status"]
    except Exception as e:
        return jsonify({"message": f"Server Error: {e}", "status": 500}), 500

@app.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.json

        # Validate that all required fields exist
        required_fields = ["name", "type", "email", "number", "address", "district", "state", "pincode"]
        for field in required_fields:
            if not data.get(field):
                return jsonify({"message": f"Missing field: {field}", "status": 400}), 400

        response = signup_user(
            data["name"],  
            data["type"],  
            data["email"],  
            int(data["number"]),  # Ensure it's a valid number  
            data["address"],  
            data["district"],  
            data["state"],  
            int(data["pincode"])  # Ensure it's a valid pincode
        )

        return jsonify(response), response["status"]
    except Exception as e:
        print(f"Signup Error: {e}")  # Debugging output
        return jsonify({"message": f"Server Error: {e}", "status": 500}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)  # Running on port 5000