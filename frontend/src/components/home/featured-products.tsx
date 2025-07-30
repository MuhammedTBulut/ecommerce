import Link from 'next/link';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Mock data - in real app this would come from API
const featuredProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality audio with noise cancellation',
    price: 299.99,
    originalPrice: 399.99,
    images: ['/api/placeholder/300/300'],
    category: { id: '1', name: 'Electronics', slug: 'electronics' },
    brand: 'TechBrand',
    stock: 50,
    rating: 4.8,
    reviewCount: 124,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Designer Cotton T-Shirt',
    description: 'Comfortable and stylish everyday wear',
    price: 49.99,
    originalPrice: 69.99,
    images: ['/api/placeholder/300/300'],
    category: { id: '2', name: 'Clothing', slug: 'clothing' },
    brand: 'FashionCo',
    stock: 100,
    rating: 4.6,
    reviewCount: 89,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking and smart features',
    price: 399.99,
    images: ['/api/placeholder/300/300'],
    category: { id: '1', name: 'Electronics', slug: 'electronics' },
    brand: 'SmartTech',
    stock: 25,
    rating: 4.9,
    reviewCount: 256,
    isFeatured: true,
    isNew: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Luxury Leather Handbag',
    description: 'Handcrafted leather bag with premium finish',
    price: 199.99,
    images: ['/api/placeholder/300/300'],
    category: { id: '3', name: 'Accessories', slug: 'accessories' },
    brand: 'LuxuryBrand',
    stock: 15,
    rating: 4.7,
    reviewCount: 45,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function FeaturedProducts() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Featured Products
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our hand-picked selection of premium products, 
          chosen for their quality, style, and exceptional value.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="text-center">
        <Link href="/products">
          <Button size="lg" variant="outline">
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}