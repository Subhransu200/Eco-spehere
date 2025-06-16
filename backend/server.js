const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Post = require('./models/Post');
const postsRoutes = require('./routes/posts');
const postUploadRoutes = require('./routes/postUpload');
const postLikesRoutes = require('./routes/postLikes');
const postCommentsRoutes = require('./routes/postComments');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000', // Allow requests from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(morgan('combined')); // HTTP request logging
app.use(helmet()); // Security headers
app.use(express.json({ limit: '10mb' })); // Parse JSON with size limit
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use(limiter);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecosphere', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('Connected to MongoDB');
    // Seed initial data if the posts collection is empty
    const postCount = await Post.countDocuments();
    if (postCount === 0) {
      const initialPosts = [
        {
          id: 1,
          title: "Community Beach Cleanup Success!",
          content: "Our monthly beach cleanup was a huge success with over 50 volunteers participating.",
          author: "Sarah Green",
          timestamp: "2024-01-15T10:30:00Z",
          likes: [],
          comments: [],
          createdAt: new Date(),
        },
        {
          id: 2,
          title: "New Solar Panel Installation Complete",
          content: "The community solar project is now generating clean energy for 200 homes.",
          author: "Mike Johnson",
          timestamp: "2024-01-14T15:45:00Z",
          likes: [],
          comments: [],
          createdAt: new Date(),
        },
      ];
      await Post.insertMany(initialPosts);
      console.log('Seeded initial posts');
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/posts/upload', postUploadRoutes);
app.use('/api/posts', postLikesRoutes);
app.use('/api/posts', postCommentsRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'EcoSphere backend is running', timestamp: new Date().toISOString() });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`EcoSphere backend server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
