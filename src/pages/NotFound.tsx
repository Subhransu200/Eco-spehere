
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { Leaf } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container py-16 md:py-24">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-eco-green/20 mb-6">
            <Leaf className="h-8 w-8 text-eco-green" />
          </div>
          
          <h1 className="text-4xl font-bold text-eco-green-dark mb-4">Page Not Found</h1>
          
          <p className="text-gray-600 mb-8">
            We couldn't find the page you were looking for. The link might be broken, or the page may have been removed.
          </p>
          
          <Link to="/">
            <Button size="lg" className="bg-eco-green hover:bg-eco-green-dark">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
