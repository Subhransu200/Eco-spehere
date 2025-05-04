
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import json
from datetime import datetime
from bson import json_util

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['ecosphere']
posts_collection = db['posts']

# Initialize with some sample data if collection is empty
if posts_collection.count_documents({}) == 0:
    sample_posts = [
        {
            "id": 1,
            "user": {
                "name": "Emma Johnson",
                "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
            },
            "community": "Urban Gardeners",
            "date": datetime.fromisoformat("2023-04-15T10:30:00"),
            "content": "Just finished setting up my balcony garden! Used recycled containers and composted soil. Look at these beautiful tomato plants already sprouting!",
            "image": "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            "likes": 248,
            "comments": 42,
            "shares": 18
        },
        {
            "id": 2,
            "user": {
                "name": "Michael Chen",
                "avatar": "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
            },
            "community": "Ocean Guardians",
            "date": datetime.fromisoformat("2023-04-12T16:45:00"),
            "content": "Today's beach cleanup was a huge success! Our team collected over 50kg of plastic waste before it could reach the ocean. Small actions, big impact.",
            "image": "https://images.unsplash.com/photo-1610459716431-e07fc72cafdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            "likes": 357,
            "comments": 67,
            "shares": 89
        },
        {
            "id": 3,
            "user": {
                "name": "Sofia Rodriguez",
                "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
            },
            "community": "Waste Warriors",
            "date": datetime.fromisoformat("2023-04-10T09:15:00"),
            "content": "Excited to share that our community workshop on composting was fully booked! So many people eager to learn how to turn kitchen waste into garden gold. #ZeroWaste",
            "image": "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            "likes": 189,
            "comments": 32,
            "shares": 12
        }
    ]
    posts_collection.insert_many(sample_posts)

# Helper function to parse MongoDB objects to JSON
def parse_json(data):
    return json.loads(json_util.dumps(data))

@app.route('/api/posts', methods=['GET'])
def get_posts():
    try:
        posts = list(posts_collection.find())
        # Convert ObjectId to string
        return jsonify(parse_json(posts))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
