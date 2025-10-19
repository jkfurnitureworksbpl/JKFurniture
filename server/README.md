# JKExportHub API Server

A comprehensive REST API server for the JKExportHub e-commerce platform built with Node.js, Express, and Supabase.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Product Management**: CRUD operations for products and categories
- **Order Management**: Complete order processing system
- **User Management**: User profiles and account management
- **Contact System**: Contact form and message management
- **File Upload**: Image upload support (Cloudinary integration)
- **Email Notifications**: Automated email sending
- **Payment Processing**: Stripe integration for payments
- **Rate Limiting**: API rate limiting for security
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Centralized error handling
- **Logging**: Request logging and monitoring

## 📁 Project Structure

```
server/
├── src/
│   ├── controllers/          # Route controllers
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── userController.js
│   │   ├── orderController.js
│   │   ├── categoryController.js
│   │   └── contactController.js
│   ├── middleware/           # Custom middleware
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   ├── routes/              # API routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── contactRoutes.js
│   ├── services/            # External services
│   │   └── supabaseService.js
│   ├── utils/               # Utility functions
│   └── app.js               # Main application file
├── config/                  # Configuration files
│   └── database.js
├── tests/                   # Test files
├── package.json
└── README.md
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration values.

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 🔧 Environment Variables

Create a `.env` file in the server root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d

# Supabase Configuration
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Cloudinary Configuration (Optional)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Stripe Configuration (Optional)
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

## 🗄️ Database Setup

### Supabase Setup

1. Create a new project on [Supabase](https://supabase.com)
2. Get your project URL and API keys
3. Run the SQL scripts from `config/database.js` in your Supabase SQL editor
4. Update your `.env` file with Supabase credentials

### Database Tables

The following tables will be created:

- `users` - User accounts and profiles
- `categories` - Product categories
- `products` - Product information
- `orders` - Order records
- `order_items` - Individual order items
- `contact_messages` - Contact form submissions
- `reviews` - Product reviews
- `cart` - Shopping cart items

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/search` - Search products
- `GET /api/products/category/:categoryId` - Get products by category
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Orders
- `GET /api/orders` - Get all orders (Admin)
- `GET /api/orders/:id` - Get single order
- `GET /api/orders/my-orders` - Get user's orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `DELETE /api/orders/:id` - Delete order (Admin)

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)
- `GET /api/users/orders` - Get user's orders

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all messages (Admin)
- `GET /api/contact/:id` - Get single message (Admin)
- `PUT /api/contact/:id` - Update message (Admin)
- `PUT /api/contact/:id/read` - Mark as read (Admin)
- `DELETE /api/contact/:id` - Delete message (Admin)

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🛡️ Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Joi validation for all inputs
- **Password Hashing**: bcrypt for password security
- **JWT Security**: Secure token generation and validation

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📝 Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests
npm run test:watch # Run tests in watch mode
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint errors
```

## 🚀 Deployment

1. **Environment Setup**
   - Set production environment variables
   - Configure Supabase production database
   - Set up email service (if using)

2. **Build and Deploy**
   ```bash
   npm install --production
   npm start
   ```

3. **Recommended Platforms**
   - Heroku
   - Vercel
   - Railway
   - DigitalOcean
   - AWS

## 📊 Monitoring

- Health check endpoint: `GET /health`
- Request logging with Morgan
- Error tracking and logging
- Performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@JKExportHub.com or create an issue in the repository.

