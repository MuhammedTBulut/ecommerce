# Modern E-Commerce Frontend

A production-ready e-commerce frontend built with Next.js 14, TypeScript, Tailwind CSS, and modern React patterns.

## 🚀 Features

### ✨ Modern UI/UX
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Clean Interface**: Professional design with Tailwind CSS
- **Dark/Light Theme**: Ready for theme toggle implementation
- **Accessibility**: Semantic HTML and ARIA attributes

### 🛒 E-Commerce Functionality
- **Product Catalog**: Grid/list views with filtering and sorting
- **Shopping Cart**: Add/remove items, quantity management
- **Product Details**: Image gallery, reviews, ratings
- **Checkout Process**: Secure payment forms and order summary
- **User Authentication**: Login/register with form validation

### 🏗️ Technical Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS + Shadcn/ui components
- **State Management**: Zustand for client-side state
- **Icons**: Lucide React for consistent iconography
- **API Integration**: Axios with interceptors

## 📁 Project Structure

```
frontend/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication routes
│   │   ├── login/           # Login page
│   │   └── register/        # Registration page
│   ├── (shop)/              # Shopping routes
│   │   ├── products/        # Product listing and details
│   │   ├── cart/            # Shopping cart
│   │   └── checkout/        # Checkout process
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # Reusable components
│   ├── ui/                  # Base UI components
│   ├── layout/              # Layout components
│   ├── product/             # Product-specific components
│   └── cart/                # Cart components
├── lib/                     # Utility libraries
├── stores/                  # Zustand stores
├── types/                   # TypeScript type definitions
└── utils/                   # Helper functions
```

## 🎨 UI Components

### Base Components (Shadcn/ui)
- **Button**: Multiple variants and sizes
- **Input**: Form inputs with validation styling
- **Card**: Content containers
- **Combobox**: Dropdown selections

### Layout Components
- **Header**: Navigation with search and user menu
- **Footer**: Links, newsletter, contact info
- **MainLayout**: Overall page structure

### E-commerce Components
- **ProductCard**: Product display with ratings
- **ProductFilters**: Search and filter controls
- **CartItem**: Shopping cart item management

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
cd frontend
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
npm start
```

## 🛠️ Configuration

### Environment Variables
Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=https://localhost:7014/api
```

### API Integration
The app is configured to connect to the C# backend API. Update the API base URL in `lib/api.ts`.

## 📱 Pages & Features

### Homepage (`/`)
- Hero section with call-to-action
- Featured products and categories
- Company information and features

### Products (`/products`)
- Product grid with filtering
- Search, category, and price filters
- Sorting options (name, price, date)
- Pagination for large catalogs

### Product Detail (`/products/[id]`)
- Image gallery with thumbnails
- Product information and features
- Quantity selection and add to cart
- Customer reviews section

### Shopping Cart (`/cart`)
- Cart item management
- Quantity updates and removal
- Order summary with totals
- Proceed to checkout

### Checkout (`/checkout`)
- Shipping information form
- Payment details capture
- Order summary and total
- Secure checkout process

### Authentication
- **Login** (`/login`): User authentication
- **Register** (`/register`): New user registration

## 🗃️ State Management

### Zustand Stores
- **authStore**: User authentication state
- **cartStore**: Shopping cart management

### Features
- Persistent cart across sessions
- Real-time cart updates
- User authentication status

## 🎯 Type Safety

### TypeScript Types
- **Product**: Product data structure
- **User**: User information
- **CartItem**: Shopping cart items
- **Order**: Order information
- **API Response**: Standardized API responses

## 🔐 Security Features

- Input validation with TypeScript
- XSS protection through React
- Secure API communication
- Environment variable protection

## 📊 Performance

### Optimizations
- Next.js Image optimization
- Code splitting and lazy loading
- SEO-friendly meta tags
- Responsive image loading

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Deployment Options
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Custom server deployment

## 🔗 API Integration

### Backend Connection
The frontend is designed to work with the existing C# ASP.NET Core backend:
- RESTful API communication
- Authentication token handling
- Error handling and retry logic

### Mock Data
Currently uses mock data for development. Replace with actual API calls in production.

## 🎨 Customization

### Theming
- Tailwind CSS configuration
- CSS custom properties for colors
- Component variant system

### Branding
- Update logo and colors in components
- Modify typography in Tailwind config
- Customize layout components

## 📈 Future Enhancements

- [ ] Dark/light theme toggle
- [ ] Advanced search with filters
- [ ] User dashboard and profile
- [ ] Admin panel integration
- [ ] Real-time notifications
- [ ] Wishlist functionality
- [ ] Product recommendations
- [ ] Multi-language support

## 🤝 Contributing

1. Follow TypeScript best practices
2. Use existing component patterns
3. Maintain responsive design
4. Add proper error handling
5. Include loading states

## 📄 License

This project is part of the Modern E-Commerce solution.