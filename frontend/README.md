# E-Commerce Frontend

Modern, responsive e-commerce frontend built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Completed
- ✅ Modern Next.js 15 with TypeScript
- ✅ Tailwind CSS for styling
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Authentication system (login/register)
- ✅ Shopping cart functionality
- ✅ Product browsing with filters
- ✅ API integration with backend
- ✅ Error handling and loading states
- ✅ Toast notifications

### Pages Implemented
- ✅ Home page with hero section and featured products
- ✅ Login/Register pages
- ✅ Products listing with search and filters
- ✅ Shopping cart management
- 🔄 Product detail pages (in progress)
- 🔄 User profile and order history (planned)
- 🔄 Checkout process (planned)

### Components
- ✅ Responsive Navigation Bar
- ✅ Authentication Context
- ✅ Shopping Cart Context
- ✅ API Service Layer
- ✅ Product Cards
- ✅ Cart Items Management

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Forms**: React Hook Form
- **UI Components**: Headless UI

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Backend API running on port 5000

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=E-Commerce Store
```

## API Integration

The frontend integrates with the existing .NET Core backend API:

- **Authentication**: `/api/auth/login`, `/api/auth/register`
- **Products**: `/api/products` with filtering and search
- **Categories**: `/api/categories`
- **Cart**: `/api/cart` for cart management
- **Users**: `/api/user` for user data

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   ├── cart/           # Shopping cart page
│   │   ├── products/       # Products listing page
│   │   └── layout.tsx      # Root layout
│   ├── components/         # Reusable UI components
│   │   └── Navbar.tsx      # Navigation component
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.tsx # Authentication state
│   │   └── CartContext.tsx # Shopping cart state
│   ├── lib/                # API services and utilities
│   │   ├── api.ts          # Axios configuration
│   │   ├── auth.ts         # Authentication service
│   │   ├── products.ts     # Product service
│   │   └── cart.ts         # Cart service
│   └── types/              # TypeScript type definitions
│       └── api.ts          # API types
├── public/                 # Static assets
├── package.json
└── README.md
```

## Building for Production

```bash
npm run build
npm start
```

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run type-check # Run TypeScript checks
```

## Design System

### Colors
- Primary: Blue (blue-600, blue-700)
- Secondary: Gray (gray-50 to gray-900)
- Success: Green
- Error: Red
- Warning: Yellow

### Typography
- Font: System fonts (font-sans)
- Headings: Bold weights (font-bold, font-semibold)
- Body: Regular weight

### Spacing
- Container: max-w-7xl mx-auto
- Padding: px-4 sm:px-6 lg:px-8
- Gaps: space-x-4, gap-6, gap-8

## Responsive Breakpoints

- Mobile: default (< 640px)
- Tablet: sm (640px+)
- Desktop: md (768px+), lg (1024px+), xl (1280px+)

## Next Steps

1. ✅ Implement product detail pages
2. ✅ Add user profile and order history
3. ✅ Implement checkout process
4. ✅ Add admin panel integration
5. ✅ Implement search functionality
6. ✅ Add product reviews and ratings
7. ✅ Optimize for performance (lazy loading, caching)
8. ✅ Add unit and integration tests
