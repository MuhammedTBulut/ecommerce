'use client'

import Link from 'next/link'
import { ArrowRight, Star, ShoppingBag, Truck, Shield, Headphones } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

// Mock data for demonstration
const featuredProducts = [
  {
    id: '1',
    name: 'Premium Kablosuz Kulaklık',
    price: 299.99,
    originalPrice: 399.99,
    image: '/placeholder-product.jpg',
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2', 
    name: 'Akıllı Saat Pro',
    price: 899.99,
    originalPrice: 1199.99,
    image: '/placeholder-product.jpg',
    rating: 4.9,
    reviews: 89
  },
  {
    id: '3',
    name: 'Gaming Mekanik Klavye',
    price: 149.99,
    originalPrice: 199.99,
    image: '/placeholder-product.jpg',
    rating: 4.7,
    reviews: 256
  },
  {
    id: '4',
    name: 'USB-C Hub 7-in-1',
    price: 79.99,
    originalPrice: 119.99,
    image: '/placeholder-product.jpg',
    rating: 4.6,
    reviews: 78
  }
]

const categories = [
  { name: 'Elektronik', image: '/placeholder-category.jpg', href: '/categories/electronics' },
  { name: 'Giyim', image: '/placeholder-category.jpg', href: '/categories/clothing' },
  { name: 'Ev & Yaşam', image: '/placeholder-category.jpg', href: '/categories/home' },
  { name: 'Spor', image: '/placeholder-category.jpg', href: '/categories/sports' },
  { name: 'Kitap', image: '/placeholder-category.jpg', href: '/categories/books' },
  { name: 'Sağlık', image: '/placeholder-category.jpg', href: '/categories/health' }
]

const features = [
  {
    icon: Truck,
    title: 'Ücretsiz Kargo',
    description: '500₺ ve üzeri alışverişlerinizde ücretsiz kargo'
  },
  {
    icon: Shield,
    title: 'Güvenli Ödeme',
    description: '256-bit SSL şifreleme ile güvenli ödeme'
  },
  {
    icon: Headphones,
    title: '7/24 Destek',
    description: 'Her zaman yanınızda müşteri desteği'
  },
  {
    icon: ShoppingBag,
    title: 'Kolay İade',
    description: '30 gün içinde koşulsuz iade garantisi'
  }
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Modern Alışveriş
                <br />
                <span className="text-yellow-300">Deneyimi</span>
              </h1>
              <p className="text-xl text-blue-100">
                En kaliteli ürünlerle güvenli ve hızlı alışveriş deneyimi yaşayın.
                Milyonlarca ürün arasından seçim yapın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Alışverişe Başla
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Kategorileri Keşfet
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-20 bg-white/20 rounded-lg" />
                    <div className="h-12 bg-white/20 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-12 bg-white/20 rounded-lg" />
                    <div className="h-20 bg-white/20 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Kategoriler</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Geniş kategori yelpazemizden istediğiniz ürünü kolayca bulun
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="group text-center space-y-4 hover:scale-105 transition-transform"
              >
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                </div>
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Öne Çıkan Ürünler</h2>
              <p className="text-muted-foreground">En popüler ve çok satan ürünlerimiz</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products">
                Tümünü Gör
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="aspect-square bg-muted overflow-hidden rounded-t-lg">
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-4xl">📦</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground ml-1">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary">₺{product.price}</span>
                      <span className="text-sm text-muted-foreground line-through">₺{product.originalPrice}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" size="sm">
                    Sepete Ekle
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Özel Fırsatları Kaçırma!</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            E-bültenimize abone ol, kampanyalar ve yeni ürünlerden ilk sen haberdar ol.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-2 rounded-md text-gray-900"
            />
            <Button variant="secondary">
              Abone Ol
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
