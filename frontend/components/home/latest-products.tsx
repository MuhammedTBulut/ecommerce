"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { Product } from "@/types";

// Mock data - replace with actual API call
const mockLatestProducts: Product[] = [
  {
    id: "5",
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable everyday wear",
    price: 29.99,
    images: ["/placeholder-product.jpg"],
    category: "Fashion",
    brand: "EcoWear",
    stock: 20,
    rating: 4.5,
    reviewCount: 43,
    tags: ["organic", "cotton", "sustainable"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Wireless Phone Charger",
    description: "Fast wireless charging for all compatible devices",
    price: 49.99,
    discountPrice: 39.99,
    images: ["/placeholder-product.jpg"],
    category: "Electronics",
    brand: "ChargeTech",
    stock: 30,
    rating: 4.7,
    reviewCount: 78,
    tags: ["wireless", "charger", "fast-charging"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 elegant ceramic mugs for your morning coffee",
    price: 24.99,
    images: ["/placeholder-product.jpg"],
    category: "Home & Garden",
    brand: "HomeComfort",
    stock: 15,
    rating: 4.8,
    reviewCount: 92,
    tags: ["ceramic", "coffee", "home"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Resistance Band Set",
    description: "Complete workout set with resistance bands and accessories",
    price: 34.99,
    images: ["/placeholder-product.jpg"],
    category: "Sports & Fitness",
    brand: "FitGear",
    stock: 18,
    rating: 4.6,
    reviewCount: 51,
    tags: ["fitness", "resistance", "workout"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
    updatedAt: new Date().toISOString(),
  },
];

export function LatestProducts() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Latest Arrivals
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Check out our newest products and be among the first to get your hands on them.
            </p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href="/products?sort=newest">
              View All
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockLatestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/products?sort=newest">
              View All Latest Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}