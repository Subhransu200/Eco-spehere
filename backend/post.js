const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(morgan('combined'));
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use(limiter);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecosphere', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Models
const commentSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  username: String,
  content: String,
  timestamp: { type: String, default: () => new Date().toISOString() },
});

const postSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: String,
  content: String,
  author: String,
  media: String,
  timestamp: { type: String, default: () => new Date().toISOString() },
  likes: { type: [Number], default: [] },
  comments: { type: [commentSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
});
const Post = mongoose.model('Post', postSchema);

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model('User', userSchema);

// Middleware: Authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Access token required' });

  jwt.verify(token, process.env.SECRET_KEY || 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ success: false, message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Middleware: Input Validation
const validatePost = [
  body('title').notEmpty().withMessage('Title is required').trim(),
  body('content').notEmpty().withMessage('Content is required').trim(),
  body('author').notEmpty().withMessage('Author is required').trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }
    next();
  },
];

const validateComment = [
  body('content').notEmpty().withMessage('Comment content is required').trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }
    next();
  },
];

const validateUser = [
  body('username').notEmpty().withMessage('Username is required').trim(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }
    next();
  },
];

// Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Seed Initial Data
const seedData = async () => {
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
};

// Initialize Database and Seed
mongoose.connection.once('open', () => {
  seedData();
});

// Routes

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'EcoSphere posts API is running', timestamp: new Date().toISOString() });
});

// User Authentication Routes
app.post('/api/auth/register', validateUser, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const count = await User.countDocuments();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      id: count + 1,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to register user' });
  }
});

app.post('/api/auth/login', validateUser, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY || 'your-secret-key', { expiresIn: '1h' });
    res.json({ success: true, data: { token } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to login' });
  }
});

// Post CRUD Routes

// Create Post
app.post('/api/posts', authenticateToken, validatePost, async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const count = await Post.countDocuments();
    const newPost = new Post({
      id: count + 1,
      title,
      content,
      author,
      likes: [],
      comments: [],
    });
    await newPost.save();
    res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create post' });
  }
});

// Create Post with Media (Upload)
app.post('/api/posts/upload', authenticateToken, upload.single('media'), validatePost, async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const count = await Post.countDocuments();
    const newPost = new Post({
      id: count + 1,
      title,
      content,
      author,
      media: req.file ? `/uploads/${req.file.filename}` : null,
      likes: [],
      comments: [],
    });
    await newPost.save();
    res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to upload post' });
  }
});

// Read All Posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch posts' });
  }
});

// Read Single Post
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ id: parseInt(req.params.id) });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch post' });
  }
});

// Update Post
app.put('/api/posts/:id', authenticateToken, validatePost, async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findOne({ id: parseInt(req.params.id) });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    if (post.author !== req.user.username) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    post.title = title;
    post.content = content;
    await post.save();
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update post' });
  }
});

// Delete Post
app.delete('/api/posts/:id', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findOne({ id: parseInt(req.params.id) });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    if (post.author !== req.user.username) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    await Post.deleteOne({ id: parseInt(req.params.id) });
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete post' });
  }
});

// Like/Unlike Post
app.post('/api/posts/:id/like', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findOne({ id: parseInt(req.params.id) });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    const userId = req.user.id;
    const hasLiked = post.likes.includes(userId);
    if (hasLiked) {
      post.likes = post.likes.filter(id => id !== userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();
    res.json({ success: true, data: { likes: post.likes.length } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update like' });
  }
});

// Comment on Post
app.post('/api/posts/:id/comment', authenticateToken, validateComment, async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findOne({ id: parseInt(req.params.id) });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    const comment = {
      userId: req.user.id,
      username: req.user.username,
      content,
      timestamp: new Date().toISOString(),
    };
    post.comments.push(comment);
    await post.save();
    res.status(201).json({ success: true, data: comment });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add comment' });
  }
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
  console.log(`EcoSphere posts API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
