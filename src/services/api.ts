
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchPosts = async () => {
  try {
    const response = await api.get('/posts');
    
    // Transform the MongoDB data to match our frontend schema
    // Flask returns ISO date strings that need to be formatted for our frontend
    const posts = response.data.map((post: any) => ({
      ...post,
      // Ensure the date is in the expected format
      date: post.date.$date ? new Date(post.date.$date).toISOString() : post.date,
      // MongoDB adds _id field which we don't need in the frontend
      _id: undefined
    }));
    
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export default api;
