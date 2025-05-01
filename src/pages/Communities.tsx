
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Search, Filter, MapPin, TreePine, Droplets, Trash2 } from 'lucide-react';

// Mock data for communities
const communitiesList = [
  {
    id: 1,
    name: "Urban Gardeners",
    members: 3240,
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e",
    description: "Bringing nature into urban spaces, one plant at a time.",
    category: "Plants",
    location: "Global",
    icon: <TreePine className="h-5 w-5" />
  },
  {
    id: 2,
    name: "Ocean Guardians",
    members: 5687,
    image: "https://images.unsplash.com/photo-1596265371388-43edbaadab94",
    description: "Working together to protect our oceans and marine life.",
    category: "Water",
    location: "Coastal",
    icon: <Droplets className="h-5 w-5" />
  },
  {
    id: 3,
    name: "Waste Warriors",
    members: 1872,
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807",
    description: "Fighting pollution through recycling and waste reduction.",
    category: "Waste",
    location: "Global",
    icon: <Trash2 className="h-5 w-5" />
  },
  {
    id: 4,
    name: "Tree Planters",
    members: 4235,
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    description: "Reforestation efforts to combat climate change.",
    category: "Plants",
    location: "Global",
    icon: <TreePine className="h-5 w-5" />
  },
  {
    id: 5,
    name: "Clean Beach Crew",
    members: 2974,
    image: "https://images.unsplash.com/photo-1611131769956-ee6bbb00e94c",
    description: "Dedicated to keeping our beaches clean and safe for wildlife.",
    category: "Waste",
    location: "Coastal",
    icon: <Trash2 className="h-5 w-5" />
  },
  {
    id: 6,
    name: "Sustainable City",
    members: 3567,
    image: "https://images.unsplash.com/photo-1523507154582-9c559009c0df",
    description: "Creating greener, more sustainable urban environments.",
    category: "City",
    location: "Urban",
    icon: <MapPin className="h-5 w-5" />
  },
  {
    id: 7,
    name: "River Keepers",
    members: 1823,
    image: "https://images.unsplash.com/photo-1505422687790-1ace253294f1",
    description: "Protecting and restoring our river ecosystems.",
    category: "Water",
    location: "Rivers",
    icon: <Droplets className="h-5 w-5" />
  },
  {
    id: 8,
    name: "Forest Guardians",
    members: 2734,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b",
    description: "Preserving our forests and their biodiversity.",
    category: "Plants",
    location: "Forests",
    icon: <TreePine className="h-5 w-5" />
  }
];

const CommunityCard = ({ community }: { community: typeof communitiesList[0] }) => {
  return (
    <div className="eco-card group h-full flex flex-col">
      <div className="h-40 overflow-hidden">
        <img 
          src={community.image} 
          alt={community.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <div className="bg-eco-green/10 p-1.5 rounded-full mr-2 text-eco-green">
              {community.icon}
            </div>
            <span className="text-sm font-medium text-eco-green">
              {community.category}
            </span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Users className="h-4 w-4 mr-1" />
            {community.members.toLocaleString()}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-eco-green-dark mb-1">{community.name}</h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          {community.location}
        </div>
        
        <p className="text-gray-600 mb-4">{community.description}</p>
        
        <div className="mt-auto">
          <Button 
            variant="outline" 
            className="w-full border-eco-green text-eco-green hover:bg-eco-green hover:text-white"
          >
            Join Community
          </Button>
        </div>
      </div>
    </div>
  );
};

const Communities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <Layout>
      <div className="bg-eco-green/10 py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-eco-green-dark mb-4">
              Discover Communities
            </h1>
            <p className="text-xl text-gray-700 mb-6">
              Find and join communities that align with your environmental interests and values.
            </p>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search communities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 text-lg rounded-full border-eco-green/20 focus:border-eco-green"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-12">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all" className="data-[state=active]:bg-eco-green data-[state=active]:text-white">
                All Communities
              </TabsTrigger>
              <TabsTrigger value="plants" className="data-[state=active]:bg-eco-green data-[state=active]:text-white">
                Plants & Trees
              </TabsTrigger>
              <TabsTrigger value="water" className="data-[state=active]:bg-eco-green data-[state=active]:text-white">
                Water & Oceans
              </TabsTrigger>
              <TabsTrigger value="waste" className="data-[state=active]:bg-eco-green data-[state=active]:text-white">
                Waste & Recycling
              </TabsTrigger>
            </TabsList>
            
            <Button variant="outline" className="border-gray-300 gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {communitiesList.map(community => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="plants" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {communitiesList
                .filter(community => community.category === "Plants")
                .map(community => (
                  <CommunityCard key={community.id} community={community} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="water" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {communitiesList
                .filter(community => community.category === "Water")
                .map(community => (
                  <CommunityCard key={community.id} community={community} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="waste" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {communitiesList
                .filter(community => community.category === "Waste")
                .map(community => (
                  <CommunityCard key={community.id} community={community} />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Communities;
