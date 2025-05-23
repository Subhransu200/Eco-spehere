
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProfileCard from '@/components/profile/ProfileCard';
import { ProfileStats } from '@/components/profile/ProfileStats';
import { ProfileNavigation } from '@/components/profile/ProfileNavigation';
import { Button } from '@/components/ui/button';

const Profile = () => {
  return (
    <Layout>
      <div className="container py-8 max-w-3xl mx-auto">
        <div className="space-y-6">
          <ProfileCard 
            name="Subhransu Rout"
            title="Quality assurance engineer, Manual testing, JIRA, postman, API testing, Performance testing"
            location="Bengaluru, Karnataka"
            company="Qest"
          />
          
          <ProfileStats 
            profileViews={102}
            postImpressions={108}
          />
          
          <div className="bg-gradient-to-r from-amber-100 to-amber-50 border rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Unlock 4x more profile visits</p>
              <p className="text-sm text-gray-600">Reactivate Premium: 50% Off</p>
            </div>
            <Button className="bg-amber-500 hover:bg-amber-600">Reactivate</Button>
          </div>
          
          <ProfileNavigation />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
