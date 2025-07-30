# E-Commerce Full Stack Application

A modern full-stack e-commerce application with a C# .NET 8 backend and a Next.js 14 frontend.

## 🏗️ Architecture

This project consists of two main parts:

1. **Backend** - C# .NET 8 Web API with Clean Architecture
2. **Frontend** - Next.js 14 with TypeScript, Tailwind CSS, and Zustand

## 🚀 Quick Start

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend (C# .NET 8)

```bash
cd ECommerce.API
dotnet restore
dotnet run
```

The API will be available at `https://localhost:5001` or `http://localhost:5000`

## 📁 Project Structure

```
ecommerce/
├── frontend/                 # Next.js 14 Frontend
│   ├── app/                 # App Router pages
│   ├── components/          # React components
│   ├── stores/             # Zustand state management
│   ├── lib/                # Utilities and API config
│   └── types/              # TypeScript definitions
├── ECommerce.API/           # Web API Project
├── ECommerce.Application/   # Application Layer
├── ECommerce.Domain/        # Domain Layer
├── ECommerce.Infrastructure/ # Infrastructure Layer
└── Ecommerce.sln           # Solution file
```

## 🎯 Features

### Frontend Features
- ✅ Modern Next.js 14 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Shadcn/ui components
- ✅ Zustand for state management
- ✅ Responsive design (mobile-first)
- ✅ Shopping cart with persistence
- ✅ User authentication (UI ready)
- ✅ Product catalog with filtering
- ✅ Admin dashboard
- ✅ User profile and order history
- ✅ Complete checkout flow
- ✅ SEO optimized

### Backend Features
- ✅ Clean Architecture
- ✅ .NET 8 Web API
- ✅ Entity Framework Core
- ✅ CQRS pattern ready
- ✅ Repository pattern
- ✅ Dependency injection
- ✅ API documentation

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **State Management**: Zustand
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Validation**: Zod

### Backend
- **Framework**: .NET 8
- **API**: ASP.NET Core Web API
- **ORM**: Entity Framework Core
- **Architecture**: Clean Architecture
- **Pattern**: Repository Pattern

## 📱 Pages & Features

### Public Pages
- 🏠 Homepage with hero section and featured products
- 📦 Product listing with filters and search
- 🔍 Product detail pages with reviews
- 🛒 Shopping cart management
- 💳 Checkout process

### Authentication
- 🔐 User login and registration
- 👤 User profile management
- 📋 Order history

### Admin Features
- 📊 Admin dashboard with statistics
- 📦 Product management (UI ready)
- 📋 Order management (UI ready)
- 👥 User management (UI ready)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- .NET 8 SDK
- SQL Server or PostgreSQL (for backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce
   ```

2. **Set up the Frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   # Edit .env.local with your configuration
   npm run dev
   ```

3. **Set up the Backend**
   ```bash
   cd ECommerce.API
   dotnet restore
   # Configure your database connection in appsettings.json
   dotnet ef database update
   dotnet run
   ```

## 🌐 API Integration

The frontend is fully prepared for backend integration with:
- Pre-configured Axios client
- Authentication interceptors
- Error handling
- API endpoint definitions
- TypeScript interfaces for all data models

## 📸 Screenshots

![Homepage](https://github.com/user-attachments/assets/6c11984a-11ae-4c0d-8928-ffdb1bba3311)

*Modern homepage with hero section, featured products, and responsive design*

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd ECommerce.API
dotnet run           # Start API server
dotnet build         # Build the solution
dotnet test          # Run tests
```

## 📝 Environment Configuration

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=ECommerce
```

### Backend (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "your-database-connection-string"
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [ ] Backend API implementation
- [ ] Database integration
- [ ] Authentication system
- [ ] Payment processing
- [ ] Email notifications
- [ ] Image upload and management
- [ ] Advanced search and filtering
- [ ] Reviews and ratings
- [ ] Inventory management
- [ ] Analytics and reporting

## 📞 Support

If you have any questions or need help getting started, please open an issue in the repository.
