# NutriPress - Premium Cooking Oils Store

Complete e-commerce platform for premium cooking oils with all modern features.

## 🚀 Features

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access (Admin/User)
- Protected routes

### Product Management
- Browse products with pagination
- Advanced search and filtering
- Sort by price, rating, latest
- Product details page
- Admin product CRUD operations

### Shopping Experience
- Add to cart functionality
- Cart management (update/remove items)
- Secure checkout process
- Order tracking and history

### Payment Integration
- Razorpay payment gateway
- Multiple payment methods
- Order confirmation

### Admin Features
- Product management dashboard
- Order status updates
- User management

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express.js
- Prisma ORM with SQLite
- JWT Authentication
- Razorpay Integration

**Frontend:**
- React 18 with Vite
- React Router for navigation
- Context API for state management
- TailwindCSS for styling
- React Hot Toast for notifications

## 📦 Installation

### Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔑 Demo Credentials

**Admin Account:**
- Email: admin@nutripress.com
- Password: admin123

## 📱 API Endpoints

| Endpoint | Method | Description | Access |
|----------|--------|-------------|---------|
| `/api/auth/signup` | POST | Register user | Public |
| `/api/auth/login` | POST | Login user | Public |
| `/api/products` | GET | Get products | Public |
| `/api/products/:id` | GET | Get single product | Public |
| `/api/cart` | GET/POST | Cart operations | Auth |
| `/api/cart/:id` | PUT/DELETE | Update/Remove cart item | Auth |
| `/api/orders` | GET/POST | Order operations | Auth |
| `/api/payment/create-order` | POST | Create payment order | Auth |
| `/api/payment/verify` | POST | Verify payment | Auth |

## 🌟 Key Features Implemented

✅ **Search & Filters** - Search by name, brand, category  
✅ **Sorting** - Price, rating, latest products  
✅ **Pagination** - Efficient product loading  
✅ **Shopping Cart** - Full cart management  
✅ **Payment Gateway** - Razorpay integration  
✅ **Order Tracking** - Complete order history  
✅ **Admin Dashboard** - Product & order management  
✅ **Responsive Design** - Mobile-friendly interface  
✅ **Real-time Updates** - Cart count, notifications  

## 🚀 Deployment

**Frontend:** Deploy to Vercel/Netlify  
**Backend:** Deploy to Render/Railway  
**Database:** Use MongoDB Atlas for production

## 📄 Environment Variables

**Backend (.env):**
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
RAZORPAY_KEY_ID="your-razorpay-key"
RAZORPAY_KEY_SECRET="your-razorpay-secret"
```

## 🎯 Future Enhancements

- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Advanced analytics
- Inventory management
- Multi-language support