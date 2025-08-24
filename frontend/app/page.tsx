import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag, Shield, Truck, Clock } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to Modern E-Commerce
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover amazing products, enjoy seamless shopping, and experience the future of online retail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Shop Now
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-purple-700">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide the best shopping experience with top-quality products and exceptional service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="text-center">
              <ShoppingBag className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>Quality Products</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Carefully curated selection of high-quality products from trusted brands.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Truck className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>Fast Shipping</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Quick and reliable delivery to your doorstep with real-time tracking.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>Secure Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Safe and secure transactions with multiple payment options available.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Clock className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>24/7 Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Round-the-clock customer support to help you with any questions.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="bg-muted/50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-lg text-muted-foreground">
              Explore our wide range of product categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="h-48 bg-gradient-to-br from-red-100 to-red-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">👕</span>
                </div>
                <CardTitle>Fashion & Clothing</CardTitle>
                <CardDescription>
                  Trendy clothes for every occasion
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">📱</span>
                </div>
                <CardTitle>Electronics</CardTitle>
                <CardDescription>
                  Latest gadgets and technology
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">🏠</span>
                </div>
                <CardTitle>Home & Garden</CardTitle>
                <CardDescription>
                  Everything for your home
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/categories">
              <Button variant="outline" size="lg">
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">Ready to Start Shopping?</CardTitle>
            <CardDescription className="text-primary-foreground/80 text-lg">
              Join thousands of satisfied customers and discover amazing products today.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Create Account
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Browse Products
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}