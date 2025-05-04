
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Share2, Calendar, Filter, Image, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '@/services/api';
import { toast } from '@/hooks/use-toast';

// Mock data for posts - using the same data structure as in RecentPosts
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
    date: "2023-04-10T09:15:00Z",
    content: "Excited to share that our community workshop on composting was fully booked! So many people eager to learn how to turn kitchen waste into garden gold. #ZeroWaste",
    image: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    likes: 189,
    comments: 32,
    shares: 12
  },
  {
    id: 4,
    user: {
      name: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
    },
    community: "Renewable Energy Network",
    date: "2023-04-08T14:20:00Z",
    content: "Just installed solar panels on my roof! Expected to reduce my carbon footprint by 4 tons of CO2 per year. The installation was surprisingly quick and the government rebates made it much more affordable than I expected.",
    image: "https://images.unsplash.com/photo-1559302995-f1d7613ae035?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    likes: 276,
    comments: 51,
    shares: 34
  },
  {
    id: 5,
    user: {
      name: "Aisha Patel",
      avatar: "https://images.unsplash.com/photo-1551788515-75f4b711caae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
    },
    community: "Sustainable Fashion",
    date: "2023-04-05T11:10:00Z",
    content: "Hosted a clothing swap event at our community center today! Over 50 people participated and we estimate that we saved about 200 garments from ending up in landfills. Plus, everyone left with 'new' items for their wardrobe without spending a penny!",
    image: "https://images.unsplash.com/photo-1525562723836-dca67a71d5f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    likes: 214,
    comments: 39,
    shares: 27
  }
];

// Type definition for a post
interface Post {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  community: string;
  date: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card className="mb-6 overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <img 
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
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full rounded-md object-cover max-h-96"
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
    </Card>
  );
};

const CreatePost = () => {
  return (
    <Card className="mb-6">
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-4">Create Post</h3>
        <Textarea 
          placeholder="Share your eco-friendly activities or ideas..." 
          className="mb-4 min-h-[100px]"
        />
        <div className="flex justify-between">
          <Button variant="outline" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Add Image
          </Button>
          <Button className="bg-eco-green hover:bg-eco-green-dark flex items-center gap-2">
            <Send className="h-4 w-4" />
            Post
          </Button>
        </div>
      </div>
    </Card>
  );
};

const Feed = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // Fetch posts using React Query
  const { data: fetchedPosts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  // Show error toast if there's an error fetching posts
  React.useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching posts",
        description: "Could not load posts. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error]);

  // Use the fetched posts or fallback to mock data
  const displayPosts = fetchedPosts || posts;

  return (
    <Layout>
      <div className="bg-eco-green/10 py-8">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-eco-green-dark">Community Feed</h1>
            <div className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
              <Button variant="outline" className="border-gray-300 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList>
                <TabsTrigger value="all" className="data-[state=active]:bg-eco-green data-[state=active]:text-white">
                  All Posts
                </TabsTrigger>
                <TabsTrigger value="following" className="data-[state=active]:bg-eco-green data-[state=active]:text-white">
                  Following
                </TabsTrigger>
                <TabsTrigger value="trending" className="data-[state=active]:bg-eco-green data-[state=active]:text-white">
                  Trending
                </TabsTrigger>
              </TabsList>
              
              <CreatePost />
              
              <TabsContent value="all" className="mt-0">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-green"></div>
                  </div>
                ) : displayPosts ? (
                  displayPosts.map((post: Post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No posts found.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="following" className="mt-0">
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You aren't following any communities yet.</p>
                  <Link to="/communities">
                    <Button className="bg-eco-green hover:bg-eco-green-dark">
                      Discover Communities
                    </Button>
                  </Link>
                </div>
              </TabsContent>
              
              <TabsContent value="trending" className="mt-0">
                {displayPosts && displayPosts.length > 0 ? (
                  [...displayPosts]
                    .sort((a: Post, b: Post) => b.likes - a.likes)
                    .slice(0, 3)
                    .map((post: Post) => (
                      <PostCard key={post.id} post={post} />
                    ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No trending posts found.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="hidden md:block">
            {/* Trending Communities sidebar */}
            <Card className="mb-6">
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-4">Trending Communities</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-eco-green/20 flex items-center justify-center text-eco-green font-semibold">UG</div>
                    <div>
                      <p className="font-medium">Urban Gardeners</p>
                      <p className="text-sm text-gray-500">4.2k members</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-eco-green/20 flex items-center justify-center text-eco-green font-semibold">OG</div>
                    <div>
                      <p className="font-medium">Ocean Guardians</p>
                      <p className="text-sm text-gray-500">3.8k members</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-eco-green/20 flex items-center justify-center text-eco-green font-semibold">SF</div>
                    <div>
                      <p className="font-medium">Sustainable Fashion</p>
                      <p className="text-sm text-gray-500">2.9k members</p>
                    </div>
                  </div>
                </div>
                <Button variant="link" className="w-full mt-2 text-eco-green">
                  View All Communities
                </Button>
              </div>
            </Card>
            
            <Card>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium">Beach Cleanup Day</p>
                      <p className="text-sm text-gray-500">May 15</p>
                    </div>
                    <p className="text-sm text-gray-600">Join Ocean Guardians for our monthly beach cleanup event.</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium">Seed Exchange</p>
                      <p className="text-sm text-gray-500">May 22</p>
                    </div>
                    <p className="text-sm text-gray-600">Bring your extra seeds to trade with other urban gardeners.</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium">Repair Café</p>
                      <p className="text-sm text-gray-500">June 5</p>
                    </div>
                    <p className="text-sm text-gray-600">Learn to fix instead of replace! Bring your broken items.</p>
                  </div>
                </div>
                <Button variant="link" className="w-full mt-2 text-eco-green">
                  View All Events
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
