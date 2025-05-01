
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CtaSection = () => {
  return (
    <section className="py-16 bg-eco-green-dark text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/5"></div>
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5"></div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-eco-green-light mb-8">
            Join EcoSphere today and become part of a growing movement dedicated to creating positive environmental change.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-eco-green-dark hover:bg-eco-green-light hover:text-white">
                Join Now
              </Button>
            </Link>
            <Link to="/communities">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-eco-green-dark">
                Explore Communities
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
