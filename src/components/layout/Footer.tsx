
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-eco-green-dark text-white mt-12">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="rounded-full bg-white p-1">
              <Leaf className="h-6 w-6 text-eco-green-dark" />
            </div>
            <span className="text-xl font-bold text-white">EcoSphere</span>
          </Link>
          <p className="text-eco-green-light mb-4">
            Connecting communities for a greener planet. Together we can make a difference.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-white hover:text-eco-green-light">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-white hover:text-eco-green-light">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-white hover:text-eco-green-light">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-white hover:text-eco-green-light">
              <Youtube size={20} />
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Features</h3>
          <ul className="space-y-2">
            <li><Link to="/communities" className="hover:text-eco-green-light">Communities</Link></li>
            <li><Link to="/marketplace" className="hover:text-eco-green-light">Marketplace</Link></li>
            <li><Link to="/events" className="hover:text-eco-green-light">Events</Link></li>
            <li><Link to="/impact" className="hover:text-eco-green-light">Impact Tracking</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-eco-green-light">Our Mission</Link></li>
            <li><Link to="/team" className="hover:text-eco-green-light">Team</Link></li>
            <li><Link to="/partners" className="hover:text-eco-green-light">Partners</Link></li>
            <li><Link to="/careers" className="hover:text-eco-green-light">Careers</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2">
            <li><Link to="/help" className="hover:text-eco-green-light">Help Center</Link></li>
            <li><Link to="/contact" className="hover:text-eco-green-light">Contact Us</Link></li>
            <li><Link to="/feedback" className="hover:text-eco-green-light">Feedback</Link></li>
            <li>
              <a href="mailto:hello@ecosphere.com" className="hover:text-eco-green-light flex items-center gap-2">
                <Mail size={16} />
                hello@ecosphere.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container border-t border-eco-green py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-eco-green-light mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} EcoSphere. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-eco-green-light">
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          <Link to="/cookies" className="hover:text-white">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
