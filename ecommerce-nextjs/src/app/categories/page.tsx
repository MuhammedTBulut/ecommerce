'use client';

import { useState, useEffect } from 'react';
import { productService } from '@/services';
import { Category } from '@/types';
import EnhancedHeader from '@/components/Header/EnhancedHeader';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const categoriesData = await productService.getCategories();
      setCategories(categoriesData.filter(cat => cat.isActive));
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Categories</h1>
          <p className="text-gray-600">Browse products by category</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                <div className="aspect-square bg-gray-300 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-500">Check back later for new categories</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="p-6">
                  {/* Category Icon/Image */}
                  <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg mb-4 flex items-center justify-center group-hover:from-orange-200 group-hover:to-orange-300 transition-colors">
                    <span className="text-4xl">
                      {getCategoryIcon(category.name)}
                    </span>
                  </div>
                  
                  {/* Category Info */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                  
                  {category.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  
                  <div className="mt-4 flex items-center text-sm text-orange-600 group-hover:text-orange-700 transition-colors">
                    <span>Browse products</span>
                    <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Popular Categories Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {getPopularCategories().map((item, index) => (
              <Link
                key={index}
                href={`/shop?search=${encodeURIComponent(item.search)}`}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow text-center group"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                  {item.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Brands Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {getFeaturedBrands().map((brand, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">{brand.name.slice(0, 2)}</span>
                </div>
                <h3 className="font-medium text-gray-900 text-sm">{brand.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get category icons
function getCategoryIcon(categoryName: string): string {
  const name = categoryName.toLowerCase();
  
  if (name.includes('electronics') || name.includes('tech')) return '💻';
  if (name.includes('clothing') || name.includes('fashion')) return '👕';
  if (name.includes('home') || name.includes('furniture')) return '🏠';
  if (name.includes('sports') || name.includes('fitness')) return '⚽';
  if (name.includes('books') || name.includes('education')) return '📚';
  if (name.includes('toys') || name.includes('games')) return '🎮';
  if (name.includes('beauty') || name.includes('cosmetics')) return '💄';
  if (name.includes('automotive') || name.includes('car')) return '🚗';
  if (name.includes('food') || name.includes('grocery')) return '🍎';
  if (name.includes('health') || name.includes('medical')) return '💊';
  
  return '📦'; // Default icon
}

// Helper function to get popular categories
function getPopularCategories() {
  return [
    { name: 'New Arrivals', icon: '🆕', search: 'new' },
    { name: 'Best Sellers', icon: '🔥', search: 'best' },
    { name: 'On Sale', icon: '💰', search: 'sale' },
    { name: 'Premium', icon: '⭐', search: 'premium' },
  ];
}

// Helper function to get featured brands
function getFeaturedBrands() {
  return [
    { name: 'Apple' },
    { name: 'Samsung' },
    { name: 'Nike' },
    { name: 'Adidas' },
    { name: 'Sony' },
    { name: 'LG' },
  ];
}