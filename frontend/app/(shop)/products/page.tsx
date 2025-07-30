"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/product/product-card";
import { ProductFilters } from "@/components/product/product-filters";
import { ProductSort } from "@/components/product/product-sort";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid3X3, List, Filter } from "lucide-react";
import { Product, FilterOptions, SortOption } from "@/types";

// Mock data - replace with actual API call
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality for audiophiles.",
    price: 299.99,
    discountPrice: 249.99,
    images: ["/placeholder-product.jpg"],
    category: "Electronics",
    brand: "TechBrand",
    stock: 15,
    rating: 4.8,
    reviewCount: 124,
    tags: ["wireless", "premium", "noise-cancelling"],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description: "Advanced smartwatch with health monitoring, GPS tracking, and long battery life.",
    price: 199.99,
    images: ["/placeholder-product.jpg"],
    category: "Electronics",
    brand: "FitTech",
    stock: 8,
    rating: 4.6,
    reviewCount: 89,
    tags: ["fitness", "smartwatch", "health"],
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Eco-Friendly Water Bottle",
    description: "Sustainable stainless steel water bottle with temperature retention technology.",
    price: 34.99,
    discountPrice: 24.99,
    images: ["/placeholder-product.jpg"],
    category: "Lifestyle",
    brand: "EcoLife",
    stock: 25,
    rating: 4.9,
    reviewCount: 156,
    tags: ["eco-friendly", "sustainable", "water-bottle"],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Minimalist Backpack",
    description: "Perfect everyday backpack with modern design and multiple compartments.",
    price: 89.99,
    images: ["/placeholder-product.jpg"],
    category: "Fashion",
    brand: "ModernBag",
    stock: 12,
    rating: 4.7,
    reviewCount: 67,
    tags: ["backpack", "minimalist", "everyday"],
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable everyday wear made from 100% organic cotton.",
    price: 29.99,
    images: ["/placeholder-product.jpg"],
    category: "Fashion",
    brand: "EcoWear",
    stock: 20,
    rating: 4.5,
    reviewCount: 43,
    tags: ["organic", "cotton", "sustainable"],
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Wireless Phone Charger",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 49.99,
    discountPrice: 39.99,
    images: ["/placeholder-product.jpg"],
    category: "Electronics",
    brand: "ChargeTech",
    stock: 30,
    rating: 4.7,
    reviewCount: 78,
    tags: ["wireless", "charger", "fast-charging"],
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const sortOptions: SortOption[] = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "popularity", label: "Most Popular" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState("newest");
  const [filters, setFilters] = useState<Partial<FilterOptions>>({});

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories!.includes(product.category)
      );
    }

    // Apply brand filter
    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(product =>
        filters.brands!.includes(product.brand)
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(product => {
        const price = product.discountPrice || product.price;
        return price >= filters.priceRange![0] && price <= filters.priceRange![1];
      });
    }

    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter(product => product.rating >= filters.rating!);
    }

    // Apply stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    // Apply sorting
    switch (currentSort) {
      case "price-low":
        filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, filters, currentSort]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <p className="text-gray-600">
          Discover our wide range of premium products carefully curated for quality and style.
        </p>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="lg:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          {/* Sort */}
          <ProductSort
            options={sortOptions}
            value={currentSort}
            onChange={setCurrentSort}
          />

          {/* View Mode */}
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:block ${isFiltersOpen ? "block" : "hidden"} w-full lg:w-64 flex-shrink-0`}>
          <ProductFilters
            filters={filters}
            onChange={setFilters}
            products={products}
          />
        </div>

        {/* Products Grid/List */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                : "grid-cols-1"
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className={viewMode === "list" ? "flex-row" : ""}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No products found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setFilters({});
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}