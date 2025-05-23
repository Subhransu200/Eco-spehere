
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, BookOpen, Users, CalendarDays, Bookmark, Bell } from 'lucide-react';

const FeedSidebar = () => {
  return (
    <Card className="overflow-hidden sticky top-20">
      <div className="bg-gradient-to-r from-eco-green/30 to-eco-blue/20 h-24 relative">
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
          <div className="rounded-full bg-white p-1 shadow-md">
            <div className="rounded-full bg-eco-green p-3">
              <Leaf className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="pt-12 pb-4">
        <div className="text-center mb-4">
          <h3 className="font-semibold text-lg text-eco-green-dark">Welcome to EcoSphere</h3>
          <p className="text-sm text-gray-500">Connect and collaborate with eco-conscious individuals</p>
        </div>
        
        <div className="border-t pt-4 mt-4">
          <div className="space-y-3">
            <Link to="/profile" className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100">
              <Users className="h-5 w-5 text-eco-green" />
              <div>
                <span className="text-sm font-medium">My Communities</span>
                <p className="text-xs text-gray-500">8 active communities</p>
              </div>
            </Link>
            
            <Link to="/events" className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100">
              <CalendarDays className="h-5 w-5 text-eco-green" />
              <div>
                <span className="text-sm font-medium">Upcoming Events</span>
                <p className="text-xs text-gray-500">3 events this week</p>
              </div>
            </Link>
            
            <Link to="/feed" className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100">
              <BookOpen className="h-5 w-5 text-eco-green" />
              <div>
                <span className="text-sm font-medium">Saved Articles</span>
                <p className="text-xs text-gray-500">12 saved items</p>
              </div>
            </Link>
            
            <Link to="/feed" className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100">
              <Bookmark className="h-5 w-5 text-eco-green" />
              <div>
                <span className="text-sm font-medium">My Bookmarks</span>
                <p className="text-xs text-gray-500">View saved content</p>
              </div>
            </Link>
            
            <Link to="/feed" className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100">
              <Bell className="h-5 w-5 text-eco-green" />
              <div>
                <span className="text-sm font-medium">Notifications</span>
                <p className="text-xs text-gray-500">5 new notifications</p>
              </div>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedSidebar;
