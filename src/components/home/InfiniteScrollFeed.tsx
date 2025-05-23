
import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Calendar, ImageOff } from 'lucide-react';
import { Card } from '@/components/ui/card';

// Mock data generator for infinite scroll simulation
const generateMockPosts = (start: number, count: number) => {
  const posts = [];
  
  const communities = ['Urban Gardeners', 'Ocean Guardians', 'Waste Warriors', 'Sustainable Fashion', 'Clean Energy Advocates', 'Zero Waste Living'];
  const userAvatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3"
  ];
  
  const postImages = [
    "https://images.unsplash.com/photo-1581092921461-7edd2bec4c15?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?ixlib=rb-4.0.3",
    null, // Some posts won't have images
    "https://images.unsplash.com/photo-1536939459926-301728717817?ixlib=rb-4.0.3"
  ];
  
  const contents = [
    "Just finished setting up my balcony garden! Used recycled containers and composted soil. Look at these beautiful tomato plants already sprouting!",
    "Today's beach cleanup was a huge success! Our team collected over 50kg of plastic waste before it could reach the ocean. Small actions, big impact.",
    "Excited to share that our community workshop on composting was fully booked! So many people eager to learn how to turn kitchen waste into garden gold. #ZeroWaste",
    "Made the switch to renewable energy at home this month. The installation was easier than expected and the savings are already noticeable!",
    "Check out this DIY bird feeder I made from a plastic bottle! Birds love it and it's great to see them in the garden.",
    "Found this amazing secondhand clothing store in my neighborhood. Quality items at affordable prices - fast fashion is so last century!"
  ];
  
  for (let i = 0; i < count; i++) {
    const id = start + i;
    const now = new Date();
    const date = new Date(now.setDate(now.getDate() - Math.floor(Math.random() * 14)));
    
    posts.push({
      id,
      user: {
        name: `User ${id}`,
        avatar: userAvatars[id % userAvatars.length]
      },
      community: communities[id % communities.length],
      date: date.toISOString(),
      content: contents[id % contents.length],
      image: postImages[id % postImages.length],
      likes: Math.floor(Math.random() * 500),
      comments: Math.floor(Math.random() * 100),
      shares: Math.floor(Math.random() * 50)
    });
  }
  
  return posts;
};

// Mock green product advertisements
const greenProductAds = [
  {
    id: 1,
    title: "Bamboo Toothbrushes",
    description: "Switch to sustainable oral care with our biodegradable bamboo toothbrushes. Good for you, great for the planet!",
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?ixlib=rb-4.0.3",
    price: "$12.99",
    link: "/marketplace/bamboo-toothbrushes"
  },
  {
    id: 2,
    title: "Reusable Beeswax Wraps",
    description: "Say goodbye to plastic wrap forever! Our beeswax wraps keep food fresh naturally.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3",
    price: "$18.50",
    link: "/marketplace/beeswax-wraps"
  },
  {
    id: 3,
    title: "Solar Powered Charger",
    description: "Charge your devices with the power of the sun. Perfect for outdoor adventures and reducing your carbon footprint.",
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3",
    price: "$45.00",
    link: "/marketplace/solar-charger"
  },
  {
    id: 4,
    title: "Organic Cotton Tote Bag",
    description: "Stylish, durable, and 100% organic. These tote bags can replace hundreds of single-use plastic bags.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3",
    price: "$15.99",
    link: "/marketplace/organic-totes"
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

interface PostProps {
  post: {
    id: number;
    user: {
      name: string;
      avatar: string;
    };
    community: string;
    date: string;
    content: string;
    image?: string | null;
    likes: number;
    comments: number;
    shares: number;
  }
}

const PostCard = ({ post }: PostProps) => {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
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

        {post.image && (
          <div className="mb-4">
            <ImageWithFallback 
              src={post.image} 
              alt="Post" 
              className="w-full h-48 md:h-56 object-cover rounded-lg"
            />
          </div>
        )}
        
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

const AdCard = ({ ad }: { ad: typeof greenProductAds[0] }) => {
  return (
    <Card className="bg-white rounded-xl shadow-md overflow-hidden mb-4 border-2 border-eco-green/20">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-eco-green uppercase font-semibold">Sponsored</p>
          <Link to="/marketplace" className="text-xs text-eco-green hover:underline">View All Products</Link>
        </div>
        
        <Link to={ad.link} className="group">
          <h3 className="font-bold text-lg mb-2 group-hover:text-eco-green transition-colors">{ad.title}</h3>
          
          <div className="mb-3">
            <ImageWithFallback 
              src={ad.image} 
              alt={ad.title} 
              className="w-full h-48 md:h-56 object-cover rounded-lg"
            />
          </div>
          
          <p className="text-gray-700 mb-4">{ad.description}</p>
          
          <div className="flex justify-between items-center">
            <p className="font-bold text-eco-green">{ad.price}</p>
            <span className="bg-eco-green text-white px-3 py-1 rounded-full text-sm">Shop Now</span>
          </div>
        </Link>
      </div>
    </Card>
  );
};

const InfiniteScrollFeed = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  
  // Load initial posts
  useEffect(() => {
    setPosts(generateMockPosts(0, 5));
  }, []);
  
  // Load more posts when scrolled to bottom
  useEffect(() => {
    if (inView && !isLoading) {
      loadMorePosts();
    }
  }, [inView]);
  
  const loadMorePosts = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const newPosts = generateMockPosts(posts.length, 5);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    }, 1000);
  };
  
  // Function to render content with ads inserted every 3 posts
  const renderFeedContent = () => {
    const content = [];
    
    for (let i = 0; i < posts.length; i++) {
      // Add the regular post
      content.push(
        <PostCard key={`post-${posts[i].id}`} post={posts[i]} />
      );
      
      // Add an ad after every 3rd post (indices 2, 5, 8, etc.)
      if ((i + 1) % 3 === 0 && i < posts.length - 1) {
        const adIndex = Math.floor(i / 3) % greenProductAds.length;
        content.push(
          <AdCard key={`ad-${i}-${greenProductAds[adIndex].id}`} ad={greenProductAds[adIndex]} />
        );
      }
    }
    
    return content;
  };
  
  return (
    <div className="space-y-6">
      {renderFeedContent()}
      
      {/* Loading indicator */}
      <div ref={ref} className="flex justify-center py-4">
        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader className="h-6 w-6 animate-spin text-eco-green" />
            <span className="ml-2 text-sm text-gray-500">Loading more posts...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfiniteScrollFeed;
