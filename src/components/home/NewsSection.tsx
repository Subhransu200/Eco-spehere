
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Mock data for news
const newsItems = [
  {
    id: 1,
    title: "Global plastic pollution treaty negotiations advance",
    readers: "12,579 readers",
    time: "4h ago"
  },
  {
    id: 2,
    title: "New sustainable fashion brands making waves",
    readers: "8,407 readers",
    time: "8h ago"
  },
  {
    id: 3,
    title: "Record renewable energy investments in Q1",
    readers: "6,220 readers",
    time: "14h ago"
  },
  {
    id: 4,
    title: "Major corporations announce new climate pledges",
    readers: "5,137 readers",
    time: "8h ago"
  },
  {
    id: 5,
    title: "Sustainable agriculture techniques showing promise",
    readers: "3,111 readers",
    time: "8h ago"
  }
];

const NewsSection = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">EcoSphere News</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-500">Top stories today</p>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-4">
          {newsItems.map((item) => (
            <li key={item.id}>
              <Link to="#" className="block hover:bg-gray-50 -mx-3 px-3 py-2 rounded-md">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <div className="flex items-center text-xs text-gray-500 mt-1 gap-1">
                  <span>{item.time}</span>
                  <span>•</span>
                  <span>{item.readers}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        
        <Button variant="ghost" className="w-full mt-2 text-sm flex items-center justify-center text-gray-600">
          Show more <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewsSection;
