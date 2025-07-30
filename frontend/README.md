# E-Commerce Frontend

A modern, responsive e-commerce frontend built with Next.js 14, TypeScript, Tailwind CSS, and Zustand.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **State Management**: Zustand for cart and authentication state
- **UI Components**: Custom components with Shadcn/ui base
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Authentication**: Login/Register pages with state management
- **Shopping Cart**: Add/remove items, quantity management, persistent storage
- **Product Catalog**: Product listing, filtering, search, and detail pages
- **User Dashboard**: Profile management and order history
- **Admin Dashboard**: Basic admin interface with statistics and order management
- **Checkout Flow**: Complete checkout process with order confirmation

## 📁 Project Structure

```
frontend/
├── app/                      # Next.js 14 App Router
│   ├── (auth)/              # Authentication routes
│   │   ├── login/           # Login page
│   │   └── register/        # Registration page
│   ├── (shop)/              # Shopping routes
│   │   ├── products/        # Product listing and details
│   │   ├── cart/           # Shopping cart
│   │   └── checkout/       # Checkout process
│   ├── (user)/             # User dashboard routes
│   │   ├── profile/        # User profile
│   │   └── orders/         # Order history
│   ├── (admin)/            # Admin dashboard routes
│   │   └── dashboard/      # Admin dashboard
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/             # Reusable components
│   ├── ui/                # Base UI components (Shadcn/ui)
│   ├── layout/            # Layout components
│   └── product/           # Product-specific components
├── lib/                   # Utility functions and configurations
├── stores/               # Zustand state stores
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## 🛠️ Installation & Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors & Theme
- Uses CSS custom properties for theming
- Support for light/dark mode (configured but not implemented in UI)
- Consistent color palette with semantic color names

### Typography
- System font stack for optimal performance
- Responsive typography scales
- Consistent heading and text styles

### Components
- Built on Shadcn/ui foundation
- Consistent spacing and sizing
- Accessible by default
- Customizable with Tailwind CSS

## 🔧 State Management

### Cart Store (Zustand)
- Add/remove items from cart
- Update item quantities
- Persistent storage with localStorage
- Calculate totals automatically

### Auth Store (Zustand)
- User authentication state
- Login/logout functionality
- User profile management
- Persistent authentication

## 🌐 API Integration

The app is prepared for backend integration with:
- Axios HTTP client configuration
- Request/response interceptors
- Error handling
- Token-based authentication
- API endpoint definitions

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1400px)
- Touch-friendly interface
- Optimized for various screen sizes

## 🔐 Security Features

- Input validation with proper form handling
- XSS protection through React's built-in escaping
- Secure authentication flow (ready for JWT implementation)
- Environment variable management for sensitive data

## 🚀 Performance Optimizations

- Next.js automatic code splitting
- Image optimization ready (placeholder implementation)
- Lazy loading for components
- Efficient state management
- Minimal bundle size with tree shaking

## 🎯 Future Enhancements

- [ ] Image optimization with real images
- [ ] Search functionality implementation
- [ ] Product filtering and sorting
- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Reviews and ratings system
- [ ] Wishlist functionality
- [ ] Multi-language support
- [ ] PWA capabilities
- [ ] Real-time notifications

## 🤝 Backend Integration

This frontend is designed to work with the C# .NET backend in the same repository. Key integration points:

- Authentication endpoints
- Product CRUD operations
- Order management
- User profile management
- Admin dashboard data

## 📄 License

This project is part of the larger e-commerce solution and follows the same licensing terms.
