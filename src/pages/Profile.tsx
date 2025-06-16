
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ProfileCard from '@/components/profile/ProfileCard';
import { ProfileStats } from '@/components/profile/ProfileStats';
import { ProfileNavigation } from '@/components/profile/ProfileNavigation';
import { MyCart } from '@/components/profile/MyCart';
import { MyOrders } from '@/components/profile/MyOrders';
import { MarketplaceCatalog } from '@/components/profile/MarketplaceCatalog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Profile = () => {
  return (
    <Layout>
      <div className="container py-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
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

          {/* Right Column - Marketplace Management */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="cart" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="cart" className="data-[state=active]:bg-eco-green data-[state=active]:text-white">
                  My Cart
                </TabsTrigger>
                <TabsTrigger value="orders" className="data-[state=active]:bg-eco-green data-[state=active]:text-white">
                  My Orders
                </TabsTrigger>
                <TabsTrigger value="catalog" className="data-[state=active]:bg-eco-green data-[state=active]:text-white">
                  My Products
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="cart" className="mt-6">
                <MyCart />
              </TabsContent>
              
              <TabsContent value="orders" className="mt-6">
                <MyOrders />
              </TabsContent>
              
              <TabsContent value="catalog" className="mt-6">
                <MarketplaceCatalog />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
