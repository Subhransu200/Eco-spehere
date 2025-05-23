import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCommunities from '@/components/home/FeaturedCommunities';
import RecentPosts from '@/components/home/RecentPosts';
import ImpactSection from '@/components/home/ImpactSection';
import CtaSection from '@/components/home/CtaSection';
import FeedSidebar from '@/components/home/FeedSidebar';
import NewsSection from '@/components/home/NewsSection';
import CreatePostSection from '@/components/home/CreatePostSection';

const Index = () => {
  const [lastVisit, setLastVisit] = useState<string | null>(null);
  
  useEffect(() => {
    // Get last visit from localStorage
    const storedLastVisit = localStorage.getItem('lastVisit');
    if (storedLastVisit) {
      setLastVisit(storedLastVisit);
    }
    
    // Set current visit time
    const currentVisit = new Date().toISOString();
    localStorage.setItem('lastVisit', currentVisit);
    
    // Store view count
    const viewCount = parseInt(localStorage.getItem('viewCount') || '0', 10);
    localStorage.setItem('viewCount', (viewCount + 1).toString());
  }, []);
  
  return (
    <Layout>
      {lastVisit && (
        <div className="bg-eco-green/5 text-eco-green-dark py-2 px-4 text-center text-sm">
          Welcome back! Your last visit was on {new Date(lastVisit).toLocaleDateString()} at {new Date(lastVisit).toLocaleTimeString()}
        </div>
      )}
      
      {/* LinkedIn-style layout */}
      <div className="bg-gray-50 py-8">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <FeedSidebar />
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-6 space-y-6">
              <CreatePostSection />
              <RecentPosts showTitle={false} />
            </div>
            
            {/* Right sidebar */}
            <div className="hidden lg:block lg:col-span-3 space-y-6">
              <NewsSection />
              <ImpactSection simplified={true} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Keep existing sections below */}
      <HeroSection />
      <FeaturedCommunities />
      <ImpactSection simplified={false} />
      <CtaSection />
    </Layout>
  );
};

export default Index;
