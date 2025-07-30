'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Filter, Grid, List, Search } from 'lucide-react';
import { Product } from '@/types';

// Mock data - in a real app, this would come from an API
const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 199.99,
    imageUrl: "/api/placeholder/300/300",
    category: "Electronics",
    brand: "TechBrand",
    stock: 50,
    rating: 4.5,
    reviews: 128,
  },
  {
    id: "2",
    name: "Stylish Running Shoes",
    description: "Comfortable and durable running shoes for all terrains",
    price: 89.99,
    imageUrl: "/api/placeholder/300/300",
    category: "Sports",
    brand: "SportBrand",
    stock: 30,
    rating: 4.3,
    reviews: 89,
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smart watch",
    price: 299.99,
    imageUrl: "/api/placeholder/300/300",
    category: "Electronics",
    brand: "FitTech",
    stock: 25,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "4",
    name: "Designer Backpack",
    description: "Stylish and functional backpack for work and travel",
    price: 79.99,
    imageUrl: "/api/placeholder/300/300",
    category: "Fashion",
    brand: "StyleBrand",
    stock: 40,
    rating: 4.2,
    reviews: 67,
  },
  {
    id: "5",
    name: "Bluetooth Speaker",
    description: "Portable wireless speaker with amazing sound quality",
    price: 129.99,
    imageUrl: "/api/placeholder/300/300",
    category: "Electronics",
    brand: "AudioTech",
    stock: 35,
    rating: 4.4,
    reviews: 92,
  },
  {
    id: "6",
    name: "Gaming Mouse",
    description: "Professional gaming mouse with RGB lighting",
    price: 59.99,
    imageUrl: "/api/placeholder/300/300",
    category: "Electronics",
    brand: "GameTech",
    stock: 60,
    rating: 4.6,
    reviews: 203,
  },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Electronics', 'Sports', 'Fashion'];
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Rating' },
  ];

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="rounded"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-2 block">Price Range</label>
                <div className="space-y-2">
                  <Input type="number" placeholder="Min price" />
                  <Input type="number" placeholder="Max price" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Toolbar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} products found
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border rounded-md px-3 py-1"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              {/* View Mode */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Products Display */}
          {filteredProducts.length > 0 ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
          
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <Button variant="outline" disabled>Previous</Button>
              <Button variant="outline">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}