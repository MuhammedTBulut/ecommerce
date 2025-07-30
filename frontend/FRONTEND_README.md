# E-commerce Frontend

A modern, comprehensive e-commerce frontend built with React 18, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Browse products with search, filtering, and category navigation
- **Shopping Cart**: Add/remove items, adjust quantities, persistent cart state
- **User Authentication**: Login/register with JWT token management
- **Order Management**: Place orders, view order history, track order status
- **User Profile**: Manage personal information and account settings
- **Support System**: Create and track support tickets

### Admin Features
- **Admin Dashboard**: Overview statistics and recent orders
- **Order Management**: View and manage all customer orders
- **Product Management**: CRUD operations for products
- **User Management**: Manage users and roles

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript integration
- **State Management**: Zustand for global state
- **Data Fetching**: React Query with caching and error handling
- **Form Handling**: React Hook Form with validation
- **Notifications**: React Hot Toast for user feedback
- **Protected Routes**: Role-based access control

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Zustand** - State management
- **React Query (TanStack Query)** - Data fetching and caching
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Heroicons** - Icon library
- **Vite** - Build tool

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MuhammedTBulut/ecommerce.git
   cd ecommerce/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API URL**
   Update the API base URL in `src/services/apiClient.ts`:
   ```typescript
   const API_BASE_URL = 'https://your-api-url.com/api';
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Basic UI components (Button, Input, Card)
│   │   └── layout/         # Layout components (Header, Footer, Layout)
│   ├── pages/              # Page components
│   │   ├── auth/           # Authentication pages
│   │   ├── products/       # Product-related pages
│   │   ├── orders/         # Order management pages
│   │   ├── admin/          # Admin dashboard
│   │   ├── support/        # Support system
│   │   └── user/           # User profile pages
│   ├── services/           # API service functions
│   ├── store/              # Zustand store
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── public/                 # Static assets
└── package.json
```

## 🔌 API Integration

The frontend integrates with the following backend endpoints:

### Authentication
- `POST /api/Auth/login` - User login
- `POST /api/Auth/register` - User registration

### Products
- `GET /api/Products` - Get all products (with filtering)
- `GET /api/Products/{id}` - Get product details

### Cart
- `GET /api/Cart` - Get user's cart
- `POST /api/Cart` - Add item to cart
- `PUT /api/Cart/{id}` - Update cart item
- `DELETE /api/Cart/{id}` - Remove cart item

### Orders
- `POST /api/Orders` - Create new order
- `GET /api/Orders` - Get user's orders
- `GET /api/Orders/{id}` - Get order details

### Support
- `POST /api/SupportTickets` - Create support ticket
- `GET /api/SupportTickets` - Get user's tickets

## 🎨 Styling

The project uses Tailwind CSS with a custom theme and responsive design.

## 🚀 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📄 License

This project is licensed under the MIT License.