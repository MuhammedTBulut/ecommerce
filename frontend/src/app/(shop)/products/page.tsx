'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/product/product-card';
import { ProductFilters } from '@/components/product/product-filters';
import { ProductSort } from '@/components/product/product-sort';
import { Button } from '@/components/ui/button';
import { Grid, List, Filter } from 'lucide-react';
import { useUIStore } from '@/stores/ui';

// Mock products data - in real app this would come from API
const mockProducts = [
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
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
];

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const { viewMode, setViewMode } = useUIStore();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
        <p className="text-gray-600">
          Discover our complete collection of premium products
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <ProductFilters />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Controls Bar */}
          <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <span className="text-sm text-gray-600">
                {mockProducts.length} products found
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <ProductSort />

              {/* View Mode Toggle */}
              <div className="hidden sm:flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mb-6 p-4 bg-white border rounded-lg">
              <ProductFilters />
            </div>
          )}

          {/* Products Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}>
            {mockProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                className={viewMode === 'list' ? 'flex flex-row' : ''}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="default" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}