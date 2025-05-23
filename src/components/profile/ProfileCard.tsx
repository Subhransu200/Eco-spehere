
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ProfileCardProps {
  name: string;
  title: string;
  location: string;
  company: string;
}

const ProfileCard = ({ name, title, location, company }: ProfileCardProps) => {
  return (
    <Card>
      <div className="h-24 bg-gradient-to-r from-blue-500/20 to-indigo-500/30 relative">
        <div className="absolute -bottom-12 left-6">
          <Avatar className="h-24 w-24 border-4 border-white">
            <AvatarImage 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36" 
              alt={name} 
            />
            <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <CardContent className="pt-16 pb-6">
        <h1 className="text-xl font-semibold">{name}</h1>
        <p className="text-gray-600 mt-1 text-sm">{title}</p>
        <p className="text-gray-500 text-sm mt-1">{location}</p>
        
        <div className="flex items-center gap-2 mt-3">
          <div className="bg-red-100 rounded-full p-1">
            <span className="text-xs font-medium text-red-600">Q</span>
          </div>
          <span className="text-sm">{company}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
