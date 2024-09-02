from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        "message": "Hello, this is the API endpoint"
    }
    return jsonify(data)

@app.route('/api/upload', methods=['POST'])
def upload_data():
    first_name = request.form.get('firstName')
    last_name = request.form.get('lastName')
    phone_number = request.form.get('phoneNumber')
    address = request.form.get('address')
    file = request.files.get('file')

    # Define upload folder and ensure it exists
    upload_folder = './uploads'
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)

    # Process the file if it exists
    if file:
        file_path = os.path.join(upload_folder, file.filename)
        file.save(file_path)

    return jsonify({
        "message": "Form data received",
        "firstName": first_name,
        "lastName": last_name,
        "phoneNumber": phone_number,
        "address": address,
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
