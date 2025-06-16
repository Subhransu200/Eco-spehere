
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import json
from datetime import datetime
from bson import json_util
import os
import logging

app = Flask(__name__)
# Allow all origins for development, restrict this in production
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configure basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Connect to MongoDB with error handling
try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client['ecosphere']
    posts_collection = db['posts']
    logger.info("Connected to MongoDB successfully")
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {e}")
    # Create a fallback collection if MongoDB isn't available
    # In a real app, you might want to handle this differently
    class DummyCollection:
        def __init__(self):
            self.posts = []
        
        def find(self):
            return self.posts
        
        def count_documents(self, query):
            return len(self.posts)
        
        def insert_many(self, documents):
            self.posts.extend(documents)
    
    posts_collection = DummyCollection()

# Initialize with some sample data if collection is empty
if posts_collection.count_documents({}) == 0:
    logger.info("Initializing sample posts data")
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
    try:
        posts_collection.insert_many(sample_posts)
    except Exception as e:
        logger.error(f"Failed to insert sample data: {e}")

# Helper function to parse MongoDB objects to JSON
def parse_json(data):
    try:
        return json.loads(json_util.dumps(data))
    except Exception as e:
        logger.error(f"Error parsing JSON: {e}")
        return []

@app.route('/api/posts', methods=['GET'])
def get_posts():
    try:
        logger.info("Fetching posts from database")
        posts = list(posts_collection.find())
        # Convert ObjectId to string
        return jsonify(parse_json(posts))
    except Exception as e:
        logger.error(f"Error fetching posts: {e}")
        return jsonify({"error": str(e)}), 500

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "message": "API is running"}), 200

if __name__ == '__main__':
    # Get port from environment variable or use 5000 as default
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    logger.info(f"Starting Flask server on port {port}")
    app.run(host='0.0.0.0', debug=debug, port=port)
