import axios from 'axios';
import { toast } from '@/hooks/use-toast';

// Update the API URL to use HTTPS if in production, otherwise keep localhost
const isProduction = window.location.hostname !== 'localhost';
const API_URL = isProduction 
  ? 'https://your-production-api-url.com/api' 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Add a reasonable timeout
});

// Mock data for posts in case the API is unreachable
const mockPosts = [
  {
    id: 1,
    user: {
      name: "Emma Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
    },
    community: "Urban Gardeners",
    date: new Date("2023-04-15T10:30:00").toISOString(),
    content: "Just finished setting up my balcony garden! Used recycled containers and composted soil. Look at these beautiful tomato plants already sprouting!",
    image: "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    likes: 248,
    comments: 42,
    shares: 18
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
    },
    community: "Ocean Guardians",
    date: new Date("2023-04-12T16:45:00").toISOString(),
    content: "Today's beach cleanup was a huge success! Our team collected over 50kg of plastic waste before it could reach the ocean. Small actions, big impact.",
    image: "https://images.unsplash.com/photo-1610459716431-e07fc72cafdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    likes: 357,
    comments: 67,
    shares: 89
  },
  {
    id: 3,
    user: {
      name: "Sofia Rodriguez",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
    },
    community: "Waste Warriors",
    date: new Date("2023-04-10T09:15:00").toISOString(),
    content: "Excited to share that our community workshop on composting was fully booked! So many people eager to learn how to turn kitchen waste into garden gold. #ZeroWaste",
    image: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    likes: 189,
    comments: 32,
    shares: 12
  }
];

export const fetchPosts = async () => {
  try {
    // Use a shorter timeout for the initial check to fail fast if server is unreachable
    const response = await api.get('/posts', { timeout: 5000 });
    
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
    
    // Return mock data when API is unreachable instead of throwing error
    // This ensures the UI always has data to display
    return mockPosts;
  }
};

export default api;
