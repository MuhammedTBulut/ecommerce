import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative h-[600px] bg-gradient-to-r from-blue-600 to-purple-700 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:50px_50px]"></div>
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="text-white space-y-6">
            <div className="space-y-2">
              <p className="text-blue-200 font-medium">Welcome to ModernShop</p>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Discover Premium
                <span className="block text-yellow-300">Products</span>
              </h1>
            </div>
            
            <p className="text-xl text-blue-100 max-w-lg">
              Shop the latest trends in fashion, electronics, and home goods. 
              Quality products with exceptional customer service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Browse Categories
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="flex gap-8 pt-8">
              <div>
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-blue-200 text-sm">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-blue-200 text-sm">Premium Brands</div>
              </div>
              <div>
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-blue-200 text-sm">Customer Support</div>
              </div>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="relative">
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/api/placeholder/600/500"
                alt="Hero Product"
                fill
                className="object-cover"
                priority
              />
              
              {/* Floating product cards */}
              <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg">
                <div className="text-sm font-medium text-gray-900">Free Shipping</div>
                <div className="text-xs text-gray-500">On orders over $100</div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
                <div className="text-sm font-medium text-gray-900">30-Day Returns</div>
                <div className="text-xs text-gray-500">Easy & hassle-free</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}