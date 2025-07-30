import Link from "next/link";
import { ArrowRight, ShoppingBag, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/product/product-card";
import { Product } from "@/types";

// Mock data - in a real app, this would come from an API
const featuredProducts: Product[] = [
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
];

const categories = [
  { name: "Electronics", image: "/api/placeholder/200/200", count: 120 },
  { name: "Fashion", image: "/api/placeholder/200/200", count: 85 },
  { name: "Sports", image: "/api/placeholder/200/200", count: 60 },
  { name: "Home & Garden", image: "/api/placeholder/200/200", count: 95 },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing Products
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Shop the latest trends with unbeatable prices and lightning-fast delivery
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Start Shopping
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Browse Categories
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Truck className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">Free shipping on orders over $50</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">Curated products from trusted brands</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-muted-foreground">30-day hassle-free return policy</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground">Find exactly what you&apos;re looking for</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={`/categories/${category.name.toLowerCase()}`}>
              <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="aspect-square mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Image</span>
                  </div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} items</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground">Handpicked products just for you</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/products">
            <Button size="lg">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-muted-foreground mb-8">
              Get the latest updates on new products, sales, and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
