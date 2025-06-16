
# EcoSphere Backend

This is the Node.js Express backend server for the EcoSphere application.

## Setup

1. Install Node.js dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

Or start the production server:
```bash
npm start
```

The server will run on port 5000 by default.

## API Endpoints

### Health Check
- `GET /health` - Server health check

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post

### Products (Marketplace)
- `GET /api/products` - Get all products (supports ?category and ?search query params)
- `GET /api/products/:id` - Get a specific product

### Cart Management
- `GET /api/cart/:userId` - Get user's cart items
- `POST /api/cart` - Add item to cart

### Orders
- `GET /api/orders/:userId` - Get user's orders
- `POST /api/orders` - Create new order

### Communities
- `GET /api/communities` - Get all communities
- `POST /api/communities` - Create a new community

## Features

- Express.js web framework
- CORS enabled for frontend integration
- Morgan logging middleware
- JSON request/response handling
- Error handling middleware
- RESTful API design
- Mock data for development

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication and authorization
- File upload handling
- Payment processing integration
- Real-time chat functionality
- Email notifications
- Advanced search and filtering
