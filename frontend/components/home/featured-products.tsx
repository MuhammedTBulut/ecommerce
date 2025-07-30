"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { Product } from "@/types";

// Mock data - replace with actual API call
const mockFeaturedProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
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
    description: "Track your fitness goals with this advanced smartwatch",
    price: 199.99,
    images: ["/placeholder-product.jpg"],
    category: "Electronics",
    brand: "FitTech",
    stock: 8,
    rating: 4.6,
    reviewCount: 89,
    tags: ["fitness", "smartwatch", "health"],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Eco-Friendly Water Bottle",
    description: "Sustainable stainless steel water bottle",
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
    description: "Perfect everyday backpack with modern design",
    price: 89.99,
    images: ["/placeholder-product.jpg"],
    category: "Fashion",
    brand: "ModernBag",
    stock: 12,
    rating: 4.7,
    reviewCount: 67,
    tags: ["backpack", "minimalist", "everyday"],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products, 
            chosen for their quality, innovation, and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mockFeaturedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/products">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}