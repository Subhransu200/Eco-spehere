
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCommunities from '@/components/home/FeaturedCommunities';
import RecentPosts from '@/components/home/RecentPosts';
import ImpactSection from '@/components/home/ImpactSection';
import CtaSection from '@/components/home/CtaSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedCommunities />
      <RecentPosts />
      <ImpactSection />
      <CtaSection />
    </Layout>
  );
};

export default Index;
