
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCommunities from '@/components/home/FeaturedCommunities';
import RecentPosts from '@/components/home/RecentPosts';
import ImpactSection from '@/components/home/ImpactSection';
import CtaSection from '@/components/home/CtaSection';

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
      <HeroSection />
      <FeaturedCommunities />
      <RecentPosts />
      <ImpactSection />
      <CtaSection />
    </Layout>
  );
};

export default Index;
