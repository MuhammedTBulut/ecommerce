# E-Commerce Frontend

Modern ve responsive e-ticaret frontend uygulaması. Next.js 14+, TypeScript, Tailwind CSS ve Zustand ile geliştirilmiştir.

## Özellikler

- ✨ Modern ve responsive tasarım
- 🚀 Next.js 14+ App Router
- 💎 TypeScript desteği
- 🎨 Tailwind CSS styling
- 🔄 Zustand state management
- 📱 Mobile-first yaklaşım
- 🔐 Güvenli authentication
- 🛒 Tam özellikli alışveriş sepeti
- 👤 Kullanıcı profil yönetimi
- 🔧 Admin paneli

## Kurulum

1. Dependencies'leri yükleyin:
```bash
npm install
```

2. Environment variables'ları ayarlayın:
```bash
cp .env.example .env.local
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## Proje Yapısı

```
src/
├── app/                 # Next.js App Router
│   ├── (auth)/         # Auth route group
│   ├── (shop)/         # Shop route group
│   ├── (user)/         # User route group
│   ├── (admin)/        # Admin route group
│   └── api/            # API routes
├── components/         # React components
│   ├── ui/            # Base UI components
│   ├── layout/        # Layout components
│   ├── product/       # Product components
│   ├── cart/          # Cart components
│   └── auth/          # Auth components
├── lib/               # Utilities
├── stores/            # Zustand stores
├── types/             # TypeScript types
└── utils/             # Helper functions
```

## Sayfalar

### Ana Sayfa
- Hero section
- Öne çıkan ürünler
- Kategori grid
- Newsletter signup

### Ürün Sayfaları
- Ürün listeleme (filtreleme ve arama)
- Ürün detay sayfası
- Kategori sayfaları

### Kullanıcı
- Giriş/Kayıt
- Profil yönetimi
- Sipariş geçmişi
- Favoriler

### Alışveriş
- Sepet yönetimi
- Checkout süreci
- Sipariş onayı

### Admin Paneli
- Dashboard
- Ürün yönetimi
- Sipariş yönetimi
- Kullanıcı yönetimi

## Teknolojiler

- **Framework:** Next.js 15.4.5
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **Validation:** Zod
- **Components:** Custom UI components

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

## Backend Integration

Backend API endpoints:
- `GET /api/products` - Ürün listesi
- `GET /api/products/{id}` - Ürün detayı
- `GET /api/categories` - Kategori listesi
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/register` - Kullanıcı kaydı
- `GET /api/cart` - Sepet içeriği
- `POST /api/cart` - Sepete ürün ekleme

## Güvenlik

- JWT token authentication
- XSS koruması
- Input validation
- Secure API calls
- Error handling

## Responsive Tasarım

- Mobile-first approach
- Tablet ve desktop optimizasyonu
- Touch-friendly interface
- Adaptive navigation

## SEO & Performance

- Meta tags optimization
- Image optimization
- Code splitting
- Lazy loading
- Sitemap generation
