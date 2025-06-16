
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock data
const posts = [
  {
    id: 1,
    title: "Community Beach Cleanup Success!",
    content: "Our monthly beach cleanup was a huge success with over 50 volunteers participating.",
    author: "Sarah Green",
    timestamp: "2024-01-15T10:30:00Z",
    likes: 42,
    comments: 8
  },
  {
    id: 2,
    title: "New Solar Panel Installation Complete",
    content: "The community solar project is now generating clean energy for 200 homes.",
    author: "Mike Johnson",
    timestamp: "2024-01-14T15:45:00Z",
    likes: 38,
    comments: 12
  }
];

const products = [
  {
    id: 1,
    name: "Bamboo Toothbrush Set",
    price: 12.99,
    rating: 4.8,
    reviews: 342,
    vendor: "EcoBrush",
    category: "Home",
    stock: 25
  },
  {
    id: 2,
    name: "Reusable Produce Bags",
    price: 15.99,
    rating: 4.7,
    reviews: 289,
    vendor: "GreenShopper",
    category: "Kitchen",
    stock: 18
  }
];

const orders = [
  {
    id: "ORD-2024-001",
    userId: 1,
    date: "2024-01-15",
    total: 45.97,
    status: "delivered",
    items: [
      { productId: 1, quantity: 2, price: 12.99 },
      { productId: 2, quantity: 1, price: 15.99 }
    ]
  }
];

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'EcoSphere backend is running' });
});

// Posts routes
app.get('/api/posts', (req, res) => {
  res.json({ success: true, data: posts });
});

app.post('/api/posts', (req, res) => {
  const { title, content, author } = req.body;
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    author,
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: 0
  };
  posts.push(newPost);
  res.status(201).json({ success: true, data: newPost });
});

// Products routes
app.get('/api/products', (req, res) => {
  const { category, search } = req.query;
  let filteredProducts = [...products];
  
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (search) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.json({ success: true, data: filteredProducts });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

// Cart routes
app.get('/api/cart/:userId', (req, res) => {
  // Mock cart data - in real app, this would come from database
  const cartItems = [
    { id: 1, productId: 1, quantity: 2, userId: parseInt(req.params.userId) },
    { id: 2, productId: 2, quantity: 1, userId: parseInt(req.params.userId) }
  ];
  res.json({ success: true, data: cartItems });
});

app.post('/api/cart', (req, res) => {
  const { userId, productId, quantity } = req.body;
  // In real app, save to database
  const cartItem = { id: Date.now(), userId, productId, quantity };
  res.status(201).json({ success: true, data: cartItem });
});

// Orders routes
app.get('/api/orders/:userId', (req, res) => {
  const userOrders = orders.filter(order => order.userId === parseInt(req.params.userId));
  res.json({ success: true, data: userOrders });
});

app.post('/api/orders', (req, res) => {
  const { userId, items, total } = req.body;
  const newOrder = {
    id: `ORD-${Date.now()}`,
    userId,
    date: new Date().toISOString(),
    total,
    status: 'processing',
    items
  };
  orders.push(newOrder);
  res.status(201).json({ success: true, data: newOrder });
});

// Communities routes
app.get('/api/communities', (req, res) => {
  const communities = [
    {
      id: 1,
      name: "Green Energy Enthusiasts",
      description: "Discussing renewable energy solutions",
      members: 1250,
      category: "Energy"
    },
    {
      id: 2,
      name: "Zero Waste Living",
      description: "Tips and tricks for sustainable living",
      members: 2340,
      category: "Lifestyle"
    }
  ];
  res.json({ success: true, data: communities });
});

app.post('/api/communities', (req, res) => {
  const { name, description, category } = req.body;
  const newCommunity = {
    id: Date.now(),
    name,
    description,
    category,
    members: 1
  };
  res.status(201).json({ success: true, data: newCommunity });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`EcoSphere backend server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
