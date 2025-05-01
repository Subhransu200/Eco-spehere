
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Leaf, Globe, Sprout, Heart } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <section className="py-16 bg-gradient-to-b from-white to-eco-green/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold text-eco-green-dark mb-4">About EcoSphere</h1>
            <p className="text-xl text-gray-600">
              Connecting communities for a greener planet. Together we can make a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-eco-green-dark mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                EcoSphere was founded with a simple but powerful mission: to connect eco-conscious individuals and communities, enabling them to share knowledge, resources, and take collective action for environmental conservation.
              </p>
              <p className="text-gray-600">
                We believe that when people come together with a shared purpose, they can create meaningful change that benefits our planet, future generations, and all living beings.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop"
                alt="Tree planting community event" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 md:flex-row-reverse">
            <div className="order-1 md:order-2">
              <h2 className="text-2xl font-bold text-eco-green-dark mb-4">Our Vision</h2>
              <p className="text-gray-600 mb-4">
                We envision a world where environmental stewardship is integrated into everyday life, where communities thrive in harmony with nature, and where sustainable practices are the norm, not the exception.
              </p>
              <p className="text-gray-600">
                Through EcoSphere, we're working to make this vision a reality by building a platform that empowers individuals, strengthens communities, and catalyzes meaningful environmental action.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop"
                alt="Sustainable community garden" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-eco-green/20 mb-4">
                <Leaf className="h-6 w-6 text-eco-green" />
              </div>
              <h3 className="text-xl font-semibold text-eco-green-dark mb-2">Environmental Impact</h3>
              <p className="text-gray-600">
                We track and celebrate collective actions that positively impact our planet's health.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-eco-green/20 mb-4">
                <Globe className="h-6 w-6 text-eco-green" />
              </div>
              <h3 className="text-xl font-semibold text-eco-green-dark mb-2">Global Community</h3>
              <p className="text-gray-600">
                We connect like-minded individuals across the globe who share a passion for sustainability.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-eco-green/20 mb-4">
                <Sprout className="h-6 w-6 text-eco-green" />
              </div>
              <h3 className="text-xl font-semibold text-eco-green-dark mb-2">Knowledge Sharing</h3>
              <p className="text-gray-600">
                We facilitate the exchange of ideas, techniques, and best practices for sustainable living.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-eco-green/20 mb-4">
                <Heart className="h-6 w-6 text-eco-green" />
              </div>
              <h3 className="text-xl font-semibold text-eco-green-dark mb-2">Community Support</h3>
              <p className="text-gray-600">
                We empower local initiatives and help them grow through collective support and resources.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-16">
            <h2 className="text-2xl font-bold text-eco-green-dark mb-4 text-center">Our Story</h2>
            <p className="text-gray-600 mb-4">
              EcoSphere began in 2023 as a small local initiative by a group of environmental enthusiasts who wanted to coordinate cleanup efforts in their community. What started as a simple message board quickly evolved into a comprehensive platform as more people joined with similar goals but diverse skills.
            </p>
            <p className="text-gray-600 mb-4">
              Today, EcoSphere connects thousands of individuals and hundreds of communities worldwide, all working together to address environmental challenges through grassroots action. From urban gardening projects to coastal cleanups, from educational workshops to sustainable marketplace innovations, our platform continues to grow and evolve.
            </p>
            <p className="text-gray-600">
              As we look to the future, we remain committed to our core values of community, sustainability, transparency, and positive impact. We invite you to join us on this journey as we work together to create a healthier, more sustainable world.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
