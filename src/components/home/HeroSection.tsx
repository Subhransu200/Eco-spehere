
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, ShoppingBag, TreePine } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-eco-green-light/20 via-eco-blue-light/10 to-eco-cream/20 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-eco-green/20 blur-3xl"></div>
      <div className="absolute top-40 -right-20 w-72 h-72 rounded-full bg-eco-blue/10 blur-3xl"></div>
      
      <div className="container relative z-10 py-16 md:py-24 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-eco-green-dark leading-tight">
            Connect, Share, <br />
            <span className="text-eco-green">Make an Impact</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-xl">
            Join the community of eco-conscious individuals making a difference through collaboration, knowledge sharing, and sustainable action.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link to="/signup">
              <Button size="lg" className="bg-eco-green hover:bg-eco-green-dark gap-2">
                Join Now <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-eco-green text-eco-green hover:bg-eco-green hover:text-white">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="eco-card p-6 animate-float">
            <Users className="h-10 w-10 text-eco-green mb-4" />
            <h3 className="text-xl font-semibold mb-2">Join Communities</h3>
            <p className="text-gray-600">Connect with like-minded people passionate about environmental causes.</p>
          </div>
          
          <div className="eco-card p-6 animate-float" style={{ animationDelay: '1s' }}>
            <ShoppingBag className="h-10 w-10 text-eco-green mb-4" />
            <h3 className="text-xl font-semibold mb-2">Eco Marketplace</h3>
            <p className="text-gray-600">Shop and sell sustainable products that help our planet.</p>
          </div>
          
          <div className="eco-card p-6 animate-float" style={{ animationDelay: '1.5s' }}>
            <TreePine className="h-10 w-10 text-eco-green mb-4" />
            <h3 className="text-xl font-semibold mb-2">Track Impact</h3>
            <p className="text-gray-600">See how your actions contribute to a healthier environment.</p>
          </div>
          
          <div className="eco-card p-6 animate-float" style={{ animationDelay: '2s' }}>
            <div className="rounded-full bg-eco-green inline-flex p-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M7 11v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1z"></path>
                <path d="M14 6v13a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1z"></path>
                <path d="M21 2v17a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Share Progress</h3>
            <p className="text-gray-600">Post updates, share achievements, and inspire others to act.</p>
          </div>
        </div>
      </div>
      
      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L48 100C96 80 192 40 288 26.7C384 13.3 480 26.7 576 33.3C672 40 768 40 864 53.3C960 66.7 1056 93.3 1152 100C1248 106.7 1344 93.3 1392 86.7L1440 80V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V120Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
