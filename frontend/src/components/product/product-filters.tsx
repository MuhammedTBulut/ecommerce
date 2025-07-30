'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useUIStore } from '@/stores/ui';

const categories = [
  { id: '1', name: 'Electronics', count: 245 },
  { id: '2', name: 'Clothing', count: 189 },
  { id: '3', name: 'Accessories', count: 156 },
  { id: '4', name: 'Home & Garden', count: 134 },
  { id: '5', name: 'Sports', count: 98 },
];

const brands = [
  { id: '1', name: 'TechBrand', count: 45 },
  { id: '2', name: 'FashionCo', count: 38 },
  { id: '3', name: 'SmartTech', count: 32 },
  { id: '4', name: 'LuxuryBrand', count: 28 },
  { id: '5', name: 'EcoSteps', count: 25 },
];

export function ProductFilters() {
  const { filters, setFilters, clearFilters } = useUIStore();
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const handleCategoryChange = (categoryId: string) => {
    if (filters.category === categoryId) {
      setFilters({ category: undefined });
    } else {
      setFilters({ category: categoryId });
    }
  };

  const handleBrandChange = (brandName: string) => {
    if (filters.brand === brandName) {
      setFilters({ brand: undefined });
    } else {
      setFilters({ brand: brandName });
    }
  };

  const handlePriceFilter = () => {
    setFilters({
      minPrice: priceRange.min ? Number(priceRange.min) : undefined,
      maxPrice: priceRange.max ? Number(priceRange.max) : undefined,
    });
  };

  const handleRatingFilter = (rating: number) => {
    if (filters.rating === rating) {
      setFilters({ rating: undefined });
    } else {
      setFilters({ rating: rating });
    }
  };

  return (
    <div className="space-y-6">
      {/* Clear Filters */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category === category.id}
                onChange={() => handleCategoryChange(category.id)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm flex-1">{category.name}</span>
              <span className="text-xs text-gray-500">({category.count})</span>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
            />
            <Input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
            />
          </div>
          <Button size="sm" onClick={handlePriceFilter} className="w-full">
            Apply
          </Button>
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Brands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {brands.map((brand) => (
            <label key={brand.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brand === brand.name}
                onChange={() => handleBrandChange(brand.name)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm flex-1">{brand.name}</span>
              <span className="text-xs text-gray-500">({brand.count})</span>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Rating */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Customer Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.rating === rating}
                onChange={() => handleRatingFilter(rating)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm">& up</span>
              </div>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Availability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => setFilters({ inStock: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">In Stock</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.isNew}
              onChange={(e) => setFilters({ isNew: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">New Arrivals</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.isFeatured}
              onChange={(e) => setFilters({ isFeatured: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">Featured</span>
          </label>
        </CardContent>
      </Card>
    </div>
  );
}