from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")  # Replace with your MongoDB URI
db = client['health_tracker']
collection = db['health_data']

@app.route('/api/data', methods=['GET'])
def get_data():
    # Fetch data from MongoDB
    data = list(collection.find({}, {"_id": 0}))  # Exclude '_id' field
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
