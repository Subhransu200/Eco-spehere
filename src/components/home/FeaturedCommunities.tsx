
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users } from 'lucide-react';

// Mock data for communities
const communities = [
  {
    id: 1,
    name: "Urban Gardeners",
    members: 3240,
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    description: "Bringing nature into urban spaces, one plant at a time."
  },
  {
    id: 2,
    name: "Ocean Guardians",
    members: 5687,
    image: "https://images.unsplash.com/photo-1596265371388-43edbaadab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    description: "Working together to protect our oceans and marine life."
  },
  {
    id: 3,
    name: "Waste Warriors",
    members: 1872,
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    description: "Fighting pollution through recycling and waste reduction."
  },
  {
    id: 4,
    name: "Tree Planters",
    members: 4235,
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    description: "Reforestation efforts to combat climate change."
  }
];

const CommunityCard = ({ community }: { community: typeof communities[0] }) => {
  return (
    <div className="eco-card group">
      <div className="h-48 overflow-hidden">
        <img 
          src={community.image} 
          alt={community.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-eco-green-dark">{community.name}</h3>
          <div className="flex items-center text-gray-500 text-sm">
            <Users className="h-4 w-4 mr-1" />
            {community.members.toLocaleString()}
          </div>
        </div>
        <p className="text-gray-600 mb-4">{community.description}</p>
        <Link to={`/communities/${community.id}`}>
          <Button variant="outline" className="w-full border-eco-green text-eco-green hover:bg-eco-green hover:text-white">
            Join Community
          </Button>
        </Link>
      </div>
    </div>
  );
};

const FeaturedCommunities = () => {
  return (
    <section className="py-16 bg-eco-beige/30">
      <div className="container">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-eco-green-dark mb-2">Featured Communities</h2>
            <p className="text-gray-600 max-w-2xl">
              Join these active communities and connect with people who share your passion for environmental causes.
            </p>
          </div>
          <Link to="/communities" className="hidden md:flex items-center text-eco-green font-medium hover:text-eco-green-dark">
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communities.map(community => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link to="/communities">
            <Button variant="outline" className="border-eco-green text-eco-green hover:bg-eco-green hover:text-white">
              View All Communities
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCommunities;
