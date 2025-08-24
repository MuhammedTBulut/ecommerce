# E-Commerce Frontend

A modern, responsive e-commerce frontend built with Next.js 14, TypeScript, and Tailwind CSS. This application provides a complete shopping experience with product browsing, cart management, user authentication, and more.

## 🚀 Features

### 🏠 Homepage
- **Hero Section**: Eye-catching banner with call-to-action buttons
- **Featured Products**: Curated selection of premium products
- **Category Grid**: Easy navigation to different product categories
- **Latest Products**: Recently added items
- **Newsletter Signup**: Email subscription with validation

### 🛍️ Product Management
- **Product Listing**: Grid and list view options
- **Advanced Filtering**: Filter by category, brand, price range, and rating
- **Search Functionality**: Real-time product search
- **Sorting Options**: Sort by price, rating, popularity, and date
- **Product Cards**: Rich product information with images, ratings, and pricing

### 🛒 Shopping Cart
- **Cart Management**: Add, remove, and update quantities
- **Persistent Storage**: Cart state persisted using Zustand
- **Order Summary**: Subtotal, shipping, tax, and total calculations
- **Responsive Design**: Optimized for all device sizes

### 👤 User Authentication
- **Login/Register**: Complete authentication system
- **Form Validation**: Client-side validation with error handling
- **Social Login UI**: Google and Facebook login interfaces
- **Responsive Forms**: Mobile-optimized authentication pages

### 🎨 UI/UX
- **Responsive Design**: Mobile-first approach with breakpoints
- **Modern UI Components**: Built with Radix UI primitives
- **Consistent Styling**: Tailwind CSS for utility-first styling
- **Accessibility**: ARIA labels and keyboard navigation
- **Loading States**: Proper loading indicators and error handling

## 🛠️ Tech Stack

### Core Technologies
- **Next.js 14+**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible UI primitives

### State Management
- **Zustand**: Lightweight state management
  - Cart state management
  - User authentication state
  - Theme preferences

### UI Components
- **Shadcn/ui**: Pre-built component library
- **Lucide React**: Modern icon library
- **Custom Components**: Tailored for e-commerce needs

### Development Tools
- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking
- **Next.js Dev Tools**: Built-in development server
- **Hot Module Replacement**: Fast development experience

## 📁 Project Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/                # Login page
│   │   └── register/             # Registration page
│   ├── (shop)/                   # Shopping routes
│   │   ├── products/             # Product listing
│   │   ├── cart/                 # Shopping cart
│   │   └── checkout/             # Checkout process
│   ├── (user)/                   # User account routes
│   │   ├── profile/              # User profile
│   │   └── orders/               # Order history
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # Reusable components
│   ├── ui/                       # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── slider.tsx
│   │   └── checkbox.tsx
│   ├── layout/                   # Layout components
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── home/                     # Homepage components
│   │   ├── hero-section.tsx
│   │   ├── featured-products.tsx
│   │   ├── category-grid.tsx
│   │   ├── latest-products.tsx
│   │   └── newsletter.tsx
│   ├── product/                  # Product components
│   │   ├── product-card.tsx
│   │   ├── product-filters.tsx
│   │   └── product-sort.tsx
│   ├── cart/                     # Cart components
│   └── auth/                     # Auth components
├── lib/                          # Utility libraries
│   └── utils.ts                  # Common utilities
├── stores/                       # Zustand stores
│   ├── cart.ts                   # Cart state management
│   ├── auth.ts                   # Authentication state
│   └── theme.ts                  # Theme preferences
├── types/                        # TypeScript definitions
│   └── index.ts                  # Common type definitions
└── utils/                        # Utility functions
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎯 Key Features Implemented

### Homepage Components
- **Hero Section**: Responsive hero with call-to-action buttons
- **Featured Products**: 4-column responsive grid
- **Category Grid**: 6-category navigation grid
- **Latest Products**: Recently added items showcase
- **Newsletter**: Email subscription form with validation

### Product Listing
- **Search**: Real-time product search functionality
- **Filters**: Category, brand, price range, rating filters
- **Sorting**: Multiple sorting options (price, rating, date)
- **View Modes**: Grid and list view toggle
- **Responsive**: Mobile-optimized layout

### Shopping Cart
- **Add to Cart**: Product addition with quantity selection
- **Cart Management**: Update quantities, remove items
- **Order Summary**: Automatic calculation of totals
- **Persistent State**: Cart state saved across sessions

### Authentication
- **Login Form**: Email/password authentication
- **Registration**: User signup with validation
- **Form Validation**: Client-side error handling
- **Social Login UI**: Google/Facebook login buttons

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- Custom color palette
- Container settings
- Responsive breakpoints
- Component-specific styling

### TypeScript
Strict TypeScript configuration with:
- Type definitions for all components
- Interface definitions for data models
- Proper typing for state management

### ESLint
Configured with Next.js recommended rules:
- React hooks rules
- TypeScript specific rules
- Import/export validation

## 🎨 Design System

### Colors
- **Primary**: Blue-based color scheme
- **Secondary**: Gray-based neutral colors
- **Accent**: Supporting colors for actions
- **Semantic**: Success, warning, error colors

### Typography
- **Headings**: Bold, hierarchical sizing
- **Body Text**: Readable font sizes and line heights
- **Labels**: Clear, accessible form labels

### Components
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Cards**: Consistent elevation and spacing
- **Forms**: Accessible input fields and validation
- **Navigation**: Clear hierarchy and responsive behavior

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 0-639px (mobile-first)
- **Tablet**: 640-1023px
- **Desktop**: 1024px+
- **Large**: 1280px+

### Mobile Features
- Hamburger navigation menu
- Touch-friendly interface
- Optimized form layouts
- Responsive product grids

## 🔒 State Management

### Zustand Stores

**Cart Store**
- Add/remove products
- Update quantities
- Calculate totals
- Persistent storage

**Auth Store**
- User authentication state
- Login/logout functionality
- User profile data

**Theme Store**
- Light/dark mode toggle
- System preference detection

## 🚀 Performance Optimizations

### Next.js Features
- **App Router**: Latest Next.js routing system
- **Static Generation**: Pre-rendered pages
- **Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic bundle splitting

### Bundle Optimization
- **Tree Shaking**: Unused code elimination
- **Dynamic Imports**: Lazy loading components
- **Minimal Dependencies**: Carefully selected packages

## 🔮 Future Enhancements

### Planned Features
- **Product Detail Pages**: Individual product pages
- **User Profile**: Account management
- **Order History**: Past purchase tracking
- **Admin Dashboard**: Product and order management
- **Payment Integration**: Stripe/PayPal integration
- **Reviews & Ratings**: User feedback system
- **Wishlist**: Save products for later
- **Search Filters**: Advanced filtering options

### Technical Improvements
- **API Integration**: Connect with C# backend
- **Form Validation**: Zod schema validation
- **Testing**: Unit and integration tests
- **PWA Features**: Offline functionality
- **SEO Optimization**: Meta tags and structured data

## 📄 License

This project is part of a larger e-commerce solution and follows the same licensing terms as the main repository.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or support, please refer to the main repository documentation or create an issue in the GitHub repository.
