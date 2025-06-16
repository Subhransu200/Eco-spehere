
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, Leaf, Bell, User } from 'lucide-react';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-full bg-eco-green p-1">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-eco-green-dark">EcoSphere</span>
          </Link>
        </div>

        {/* Desktop Nav - Updated to replace Feed with About */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-eco-green font-medium">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-eco-green font-medium">About Us</Link>
          <Link to="/communities" className="text-gray-700 hover:text-eco-green font-medium">Communities</Link>
          <Link to="/marketplace" className="text-gray-700 hover:text-eco-green font-medium">Marketplace</Link>
        </nav>

        {/* Right Icons */}
        <div className="hidden md:flex items-center gap-4">
          <SearchBar />
          <Button variant="ghost" size="icon" className="text-gray-700">
            <Bell className="h-5 w-5" />
          </Button>
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="text-gray-700">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="border-eco-green text-eco-green hover:bg-eco-green hover:text-white">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-eco-green hover:bg-eco-green-dark">Sign up</Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile menu - Updated to replace Feed with About */}
      <div className={cn(
        "fixed inset-x-0 top-16 z-50 bg-white border-b border-gray-200 md:hidden transition-transform duration-300 ease-in-out",
        isMenuOpen ? "transform translate-y-0" : "transform -translate-y-full"
      )}>
        <div className="container py-4 flex flex-col gap-4">
          <Link 
            to="/" 
            className="px-4 py-2 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="px-4 py-2 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link 
            to="/communities" 
            className="px-4 py-2 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Communities
          </Link>
          <Link 
            to="/marketplace" 
            className="px-4 py-2 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Marketplace
          </Link>
          <hr className="my-2" />
          <div className="flex gap-2">
            <Link to="/login" className="flex-1">
              <Button variant="outline" className="w-full border-eco-green text-eco-green hover:bg-eco-green hover:text-white">
                Log in
              </Button>
            </Link>
            <Link to="/signup" className="flex-1">
              <Button className="w-full bg-eco-green hover:bg-eco-green-dark">Sign up</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
