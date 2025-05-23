
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ProfileStatsProps {
  profileViews: number;
  postImpressions: number;
}

export const ProfileStats = ({ profileViews, postImpressions }: ProfileStatsProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Profile viewers</span>
            <span className="text-blue-600 font-medium">{profileViews}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Post impressions</span>
            <span className="text-blue-600 font-medium">{postImpressions}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
