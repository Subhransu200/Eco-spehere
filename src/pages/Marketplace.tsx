
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, ShoppingBag, Star, Plus, Minus } from 'lucide-react';

// Mock data for products
const products = [
  {
    id: 1,
    name: "Bamboo Toothbrush Set",
    price: 12.99,
    rating: 4.8,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04",
    category: "Home",
    vendor: "EcoBrush",
    description: "Set of 4 biodegradable bamboo toothbrushes with charcoal-infused bristles."
  },
  {
    id: 2,
    name: "Reusable Produce Bags",
    price: 15.99,
    rating: 4.7,
    reviews: 289,
    image: "https://images.unsplash.com/photo-1610466896727-bd4cf6877cdb",
    category: "Kitchen",
    vendor: "GreenShopper",
    description: "Set of 8 mesh bags in various sizes for zero-waste shopping."
  },
  {
    id: 3,
    name: "Solar Power Bank",
    price: 39.99,
    rating: 4.5,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1620634415912-42df3548d41f",
    category: "Gadgets",
    vendor: "SolarPower",
    description: "20,000mAh solar-powered charger for all your devices."
  },
  {
    id: 4,
    name: "Organic Cotton T-shirt",
    price: 24.99,
    rating: 4.6,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68",
    category: "Clothing",
    vendor: "EcoThreads",
    description: "100% organic cotton, sustainably sourced and ethically produced."
  },
  {
    id: 5,
    name: "Stainless Steel Water Bottle",
    price: 28.99,
    rating: 4.9,
    reviews: 427,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    category: "Accessories",
    vendor: "H2OGreen",
    description: "Double-walled, vacuum insulated bottle that keeps drinks cold for 24 hours or hot for 12 hours."
  },
  {
    id: 6,
    name: "Beeswax Food Wraps",
    price: 18.99,
    rating: 4.7,
    reviews: 184,
    image: "https://images.unsplash.com/photo-1611318250303-91af2bff2997",
    category: "Kitchen",
    vendor: "BeeGreen",
    description: "Set of 3 reusable food wraps, a sustainable alternative to plastic wrap."
  },
  {
    id: 7,
    name: "Recycled Paper Notebook",
    price: 9.99,
    rating: 4.5,
    reviews: 168,
    image: "https://images.unsplash.com/photo-1543539748-a3c10e2493b1",
    category: "Stationery",
    vendor: "EcoNote",
    description: "B5 notebook with 100 pages of 100% recycled paper and sustainable binding."
  },
  {
    id: 8,
    name: "Bamboo Cutlery Set",
    price: 14.99,
    rating: 4.6,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1634467524813-e075242f7d7f",
    category: "Kitchen",
    vendor: "EcoDine",
    description: "Portable set includes knife, fork, spoon, chopsticks, and straw with carrying case."
  },
];

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  const [quantity, setQuantity] = useState(1);
  
  return (
    <div className="eco-card h-full flex flex-col">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-eco-green/10 text-eco-green px-2 py-1 rounded-full text-xs font-medium">
          {product.category}
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-eco-green-dark mb-1">{product.name}</h3>
        
        <p className="text-sm text-gray-500 mb-1">By {product.vendor}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-eco-green text-eco-green" />
            <span className="ml-1 text-sm font-medium">{product.rating}</span>
          </div>
          <span className="mx-1 text-gray-300">|</span>
          <span className="text-sm text-gray-500">{product.reviews} reviews</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 flex-grow">{product.description}</p>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xl font-bold text-eco-green-dark">
              ${product.price}
            </span>
            <div className="flex items-center border rounded-md">
              <button 
                className="px-2 py-1 text-gray-500 hover:text-eco-green"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button 
                className="px-2 py-1 text-gray-500 hover:text-eco-green"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <Button 
            className="w-full bg-eco-green hover:bg-eco-green-dark flex items-center justify-center gap-2"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <Layout>
      <div className="bg-eco-green/10 py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-eco-green-dark mb-4">
              Eco-Friendly Marketplace
            </h1>
            <p className="text-xl text-gray-700 mb-6">
              Discover sustainable products from eco-conscious vendors.
            </p>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 text-lg rounded-full border-eco-green/20 focus:border-eco-green"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-12">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all" className="data-[state=active]:bg-eco-green data-[state=active]:text-white">
                All Products
              </TabsTrigger>
              <TabsTrigger value="home" className="data-[state=active]:bg-eco-green data-[state=active]:text-white">
                Home
              </TabsTrigger>
              <TabsTrigger value="kitchen" className="data-[state=active]:bg-eco-green data-[state=active]:text-white">
                Kitchen
              </TabsTrigger>
              <TabsTrigger value="clothing" className="data-[state=active]:bg-eco-green data-[state=active]:text-white">
                Clothing
              </TabsTrigger>
            </TabsList>
            
            <Button variant="outline" className="border-gray-300 gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="home" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products
                .filter(product => product.category === "Home")
                .map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="kitchen" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products
                .filter(product => product.category === "Kitchen")
                .map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="clothing" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products
                .filter(product => product.category === "Clothing")
                .map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Marketplace;
