# E-commerce Next.js Frontend

A modern, corporate-style e-commerce platform built with Next.js 15, TypeScript, and Tailwind CSS. Features secure authentication, role-based access control, and a comprehensive admin dashboard.

![Homepage](https://github.com/user-attachments/assets/0b1fa328-0f8a-4fdf-b512-9fb1a2bd5c73)

## 🚀 Features

### Authentication & Security
- JWT-based authentication with HTTP-only cookies
- Role-based access control (Customer, Admin, SuperAdmin)
- Secure password validation with strength requirements
- Real-time password confirmation validation
- Automatic admin panel redirection for admin users

![Login Page](https://github.com/user-attachments/assets/bac3a29e-d845-46c4-add7-165586f07d8e)
![Registration Page](https://github.com/user-attachments/assets/c53dadee-4450-444d-b3b0-ac52eb827d38)

### Customer Features
- Product browsing and search
- Shopping cart with persistent state
- Order management and tracking
- User profile management
- Product reviews and ratings

### Admin Dashboard
- Comprehensive analytics and reports
- User management and role assignment
- Product catalog management
- Order status tracking and updates
- Comment moderation system
- Action logging and monitoring

### Technical Features
- Server-side rendering with Next.js App Router
- TypeScript for type safety
- Responsive design with Tailwind CSS
- Real-time toast notifications
- Loading states and error handling
- OOP architecture following SOLID principles

## 🛠️ Technologies Used

- **Frontend Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios with interceptors
- **Authentication**: JWT tokens with cookies
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **Development**: ESLint, Prettier

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard pages
│   ├── shop/              # Customer shopping pages
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
├── context/               # React Context providers
│   ├── AuthContext.tsx    # Authentication state
│   └── CartContext.tsx    # Shopping cart state
├── services/              # API service classes
│   ├── base.ts            # Base HTTP client
│   ├── auth.ts            # Authentication service
│   ├── product.ts         # Product management
│   ├── cart.ts            # Shopping cart service
│   ├── order.ts           # Order management
│   ├── comment.ts         # Comment system
│   ├── analytics.ts       # Admin analytics
│   └── index.ts           # Service factory
├── lib/
│   └── utils/             # Helper utilities and validators
├── types/                 # TypeScript type definitions
└── globals.css            # Global styles
```

## 🏗️ Architecture & Design Patterns

### Object-Oriented Programming (OOP)
The application follows OOP principles with clear class hierarchies:

- **Base Service Class**: `BaseService` provides common functionality for all API services
- **Service Classes**: Each domain has its own service class (`AuthService`, `ProductService`, etc.)
- **Helper Classes**: Utility classes like `ValidationHelper`, `DateHelper`, `CurrencyHelper`

### SOLID Principles Implementation

1. **Single Responsibility**: Each service class handles one specific domain
2. **Open/Closed**: Services are open for extension but closed for modification
3. **Liskov Substitution**: All services implement their respective interfaces
4. **Interface Segregation**: Separate interfaces for different service contracts
5. **Dependency Inversion**: Services depend on abstractions (interfaces) not concretions

### Design Patterns Used

- **Factory Pattern**: `ServiceFactory` for creating service instances
- **Singleton Pattern**: Service instances are created once and reused
- **Observer Pattern**: React Context for state management
- **Repository Pattern**: Services act as repositories for data access

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- .NET 8 SDK (for backend API)

### Backend Setup

1. Start the .NET API server:
```bash
cd ECommerce.API
dotnet run
```

The API will be available at `http://localhost:5095/api`

### Frontend Setup

1. Navigate to the Next.js project:
```bash
cd ecommerce-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Build

```bash
npm run build
npm start
```

## 🔐 Authentication & Authorization

### User Roles

- **Customer**: Can browse products, manage cart, place orders, leave reviews
- **Admin**: All customer permissions plus user management, order tracking, analytics
- **SuperAdmin**: All permissions including system administration

### JWT Token Management

- Tokens are stored in HTTP-only cookies for security
- Automatic token refresh on expiration
- Secure logout with token cleanup
- Role-based route protection

### Registration Process

- Users can only register with "Customer" role
- Password strength validation (6+ chars, uppercase, lowercase, number)
- Real-time password confirmation
- Email format validation
- Required demographic information

## 📊 Admin Panel Features

### Dashboard Analytics
- Sales charts (daily/weekly/monthly)
- User registration trends
- Order status breakdown
- Revenue analytics
- Top-selling products

### User Management
- View all registered users
- Role assignment and modification
- User activity monitoring
- Account status management

### Order Management
- Order status tracking
- Bulk status updates
- Order history and details
- Shipping management

### Comment Moderation
- Approve/reject user comments
- Bulk moderation actions
- Reported content management
- Rating analytics

### Action Logging
- Track all admin actions
- User activity monitoring
- System audit trails
- Exportable logs

## 🛡️ Security Features

- **HTTPS Only**: All authentication cookies are secure
- **CSRF Protection**: SameSite cookie attributes
- **XSS Prevention**: Input sanitization and validation
- **SQL Injection**: Parameterized queries in backend
- **Role-based Access**: Route-level permission checks
- **Token Expiration**: Automatic session management

## 🎨 Design & UI/UX

### Corporate Design Language
- Clean, professional color scheme
- Consistent spacing and typography
- Accessible color contrasts
- Mobile-first responsive design

### Inspiration from OBI.de
- Product grid layouts
- Navigation structure
- Color palette and branding
- User experience patterns

### Responsive Design
- Mobile-optimized layouts
- Tablet and desktop breakpoints
- Touch-friendly interfaces
- Progressive enhancement

## 🔧 API Integration

### Base URL Configuration
```typescript
const API_BASE_URL = 'http://localhost:5095/api';
```

### Available Endpoints
- `/auth/*` - Authentication and user management
- `/products/*` - Product catalog
- `/cart/*` - Shopping cart operations
- `/orders/*` - Order management
- `/comments/*` - Review system
- `/admin/*` - Administrative functions

### Error Handling
- Automatic retry on network failures
- User-friendly error messages
- Toast notifications for feedback
- Graceful degradation

## 🧪 Testing Strategy

### Code Quality
- TypeScript for compile-time type checking
- ESLint for code style consistency
- Component-level error boundaries
- Input validation and sanitization

### Manual Testing Checklist
- [ ] User registration with password validation
- [ ] Login with role-based redirection
- [ ] Cart functionality and persistence
- [ ] Admin panel access and features
- [ ] Responsive design across devices
- [ ] API error handling

## 🚀 Deployment

### Production Environment
1. Build the application:
```bash
npm run build
```

2. Set environment variables:
```bash
NEXT_PUBLIC_API_URL=your-api-url
NODE_ENV=production
```

3. Deploy to your preferred platform (Vercel, Netlify, etc.)

### Environment Variables
- `NEXT_PUBLIC_API_URL`: Backend API base URL
- `NODE_ENV`: Environment mode (development/production)

## 🔮 Future Enhancements

### Planned Features
- [ ] Product search and filtering
- [ ] Wishlist functionality
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] Real-time order tracking
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Product recommendations
- [ ] Inventory management
- [ ] Coupon and discount system

### Technical Improvements
- [ ] Unit and integration tests
- [ ] Performance optimization
- [ ] SEO enhancements
- [ ] PWA capabilities
- [ ] Advanced caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the established patterns
4. Ensure code quality with linting and type checking
5. Test your changes thoroughly
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Known Limitations

- Backend API must be running for full functionality
- Some advanced admin features are placeholder implementations
- Email verification not yet implemented
- Payment processing integration pending
- Real-time notifications not implemented

## 💬 Support

For support and questions:
- Create an issue in the repository
- Check the documentation for common solutions
- Review the code comments for implementation details

---

Built with ❤️ using modern web technologies and best practices.
