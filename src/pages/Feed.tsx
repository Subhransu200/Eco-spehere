
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
import { Skeleton } from '@/components/ui/skeleton';

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

// Image fallback handler component
const ImageWithFallback = ({ src, alt, className }: { src?: string, alt: string, className?: string }) => {
  const [error, setError] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1581092921461-7edd2bec4c15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80";
  
  if (!src || error) {
    return <img src={fallbackImage} alt={alt} className={className} />;
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      onError={() => setError(true)}
    />
  );
};

const PostCardSkeleton = () => (
  <Card className="mb-6 overflow-hidden">
    <div className="p-5">
      <div className="flex items-center gap-3 mb-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Skeleton className="h-48 w-full mt-4 mb-4" />
      <div className="flex justify-between items-center pt-4">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  </Card>
);

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card className="mb-6 overflow-hidden">
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
  
  // Fetch posts using React Query with improved configuration
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    retryDelay: 1000,
  });

  // Show error toast if there's an error fetching posts
  React.useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching posts",
        description: "Could not load posts. Showing cached data instead.",
        variant: "destructive",
      });
    }
  }, [error]);

  // Generate skeleton cards for loading state
  const skeletonCards = Array(3).fill(0).map((_, index) => (
    <PostCardSkeleton key={`skeleton-${index}`} />
  ));

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
                  <>{skeletonCards}</>
                ) : posts && posts.length > 0 ? (
                  posts.map((post: Post) => (
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
                {isLoading ? (
                  <>{skeletonCards}</>
                ) : posts && posts.length > 0 ? (
                  [...posts]
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
