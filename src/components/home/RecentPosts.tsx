
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, MessageCircle, Share2, Calendar, ImageOff } from 'lucide-react';

// Mock data for posts
const posts = [
  {
    id: 1,
    user: {
      name: "Emma Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
    },
    community: "Urban Gardeners",
    date: "2023-04-15T10:30:00Z",
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
    date: "2023-04-12T16:45:00Z",
    content: "Today's beach cleanup was a huge success! Our team collected over 50kg of plastic waste before it could reach the ocean. Small actions, big impact.",
    image: "https://images.unsplash.com/photo-1581092921461-7edd2bec4c15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
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
    date: "2023-04-10T09:15:00Z",
    content: "Excited to share that our community workshop on composting was fully booked! So many people eager to learn how to turn kitchen waste into garden gold. #ZeroWaste",
    image: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    likes: 189,
    comments: 32,
    shares: 12
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

// Image fallback handler component
const ImageWithFallback = ({ src, alt, className }: { src?: string, alt: string, className?: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1581092921461-7edd2bec4c15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80";
  
  if (!src || error) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <ImageOff className="h-8 w-8 text-gray-400" />
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={`${className} bg-gray-100 animate-pulse flex items-center justify-center`}>
          <div className="h-8 w-8 rounded-full bg-gray-300 animate-pulse"></div>
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        className={`${className} ${isLoading ? 'hidden' : 'block'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
      />
    </>
  );
};

const PostCard = ({ post }: { post: typeof posts[0] }) => {
  return (
    <article className="eco-card">
      <div>
        <ImageWithFallback 
          src={post.image} 
          alt="Post" 
          className="w-full h-48 md:h-56 object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <ImageWithFallback 
            src={post.user.avatar} 
            alt={post.user.name} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{post.user.name}</p>
            <div className="flex items-center text-sm text-gray-500">
              <Link to={`/communities/${post.community.toLowerCase().replace(/\s+/g, '-')}`} className="text-eco-green hover:underline">
                {post.community}
              </Link>
              <span className="mx-1">•</span>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(post.date)}
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{post.content}</p>
        
        <div className="flex justify-between items-center text-gray-500 border-t pt-4">
          <button className="flex items-center gap-1 hover:text-eco-green">
            <Heart className="w-4 h-4" />
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-eco-green">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-eco-green">
            <Share2 className="w-4 h-4" />
            <span>{post.shares}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

const RecentPosts = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-eco-green-dark mb-2">Recent Activity</h2>
            <p className="text-gray-600 max-w-2xl">
              See what the EcoSphere community is up to and get inspired to make your own impact.
            </p>
          </div>
          <Link to="/feed" className="hidden md:flex items-center text-eco-green font-medium hover:text-eco-green-dark">
            View feed <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link to="/feed">
            <Button variant="outline" className="border-eco-green text-eco-green hover:bg-eco-green hover:text-white">
              View All Posts
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
