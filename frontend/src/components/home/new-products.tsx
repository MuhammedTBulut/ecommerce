import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Mock data for new products
const newProducts = [
  {
    id: '5',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging for all devices',
    price: 79.99,
    images: ['/api/placeholder/300/300'],
    category: { id: '1', name: 'Electronics', slug: 'electronics' },
    brand: 'ChargeTech',
    stock: 45,
    rating: 4.5,
    reviewCount: 67,
    isNew: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Sustainable Sneakers',
    description: 'Eco-friendly footwear for the conscious consumer',
    price: 129.99,
    images: ['/api/placeholder/300/300'],
    category: { id: '2', name: 'Fashion', slug: 'fashion' },
    brand: 'EcoSteps',
    stock: 30,
    rating: 4.7,
    reviewCount: 89,
    isNew: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Smart Home Hub',
    description: 'Control all your smart devices from one place',
    price: 149.99,
    images: ['/api/placeholder/300/300'],
    category: { id: '1', name: 'Electronics', slug: 'electronics' },
    brand: 'SmartHome',
    stock: 22,
    rating: 4.8,
    reviewCount: 134,
    isNew: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Minimalist Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness',
    price: 89.99,
    images: ['/api/placeholder/300/300'],
    category: { id: '3', name: 'Home & Garden', slug: 'home-garden' },
    brand: 'ModernLight',
    stock: 18,
    rating: 4.6,
    reviewCount: 45,
    isNew: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function NewProducts() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            New Arrivals
          </h2>
          <p className="text-gray-600 max-w-xl">
            Be the first to discover our latest products. Fresh designs, 
            innovative features, and trending styles just for you.
          </p>
        </div>
        
        <Link href="/products?filter=new" className="mt-4 md:mt-0">
          <Button variant="outline">
            View All New Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {newProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Features section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-blue-50 rounded-lg">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Delivery</h3>
          <p className="text-gray-600 text-sm">
            Free shipping on orders over $100. Express delivery available.
          </p>
        </div>
        
        <div className="text-center p-6 bg-green-50 rounded-lg">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
          <p className="text-gray-600 text-sm">
            30-day money-back guarantee on all products. Quality you can trust.
          </p>
        </div>
        
        <div className="text-center p-6 bg-purple-50 rounded-lg">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
          <p className="text-gray-600 text-sm">
            Round-the-clock customer support. We&apos;re here to help anytime.
          </p>
        </div>
      </div>
    </section>
  );
}