
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageIcon, FileTextIcon, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreatePostSection = () => {
  return (
    <Card>
      <CardContent className="pt-5 pb-4">
        <div className="flex items-center gap-2 mb-4">
          <img 
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
            alt="User avatar"
            className="h-10 w-10 rounded-full object-cover"
          />
          <Button 
            variant="outline" 
            className="w-full justify-start text-gray-500 font-normal bg-gray-50 border-gray-200 hover:bg-gray-100"
          >
            Start a post about environmental action...
          </Button>
        </div>
        
        <div className="flex justify-between">
          <Button variant="ghost" size="sm" className="flex-1 text-gray-700">
            <Video className="w-5 h-5 mr-2 text-emerald-600" />
            <span>Video</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 text-gray-700">
            <ImageIcon className="w-5 h-5 mr-2 text-eco-blue" />
            <span>Photo</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 text-gray-700">
            <FileTextIcon className="w-5 h-5 mr-2 text-amber-600" />
            <span>Article</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePostSection;
