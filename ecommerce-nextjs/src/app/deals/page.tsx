'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { productService } from '@/services';
import { Product } from '@/types';
import EnhancedHeader from '@/components/Header/EnhancedHeader';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function DealsPage() {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    setLoading(true);
    try {
      const products = await productService.getFeaturedProducts();
      setFeaturedProducts(products.slice(0, 8)); // Show 8 featured products
    } catch (error) {
      console.error('Error fetching featured products:', error);
      // Use mock data if API fails
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: number) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    setAddingToCart(productId);
    try {
      await addToCart(productId, 1);
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setAddingToCart(null);
    }
  };

  // Mock deals data
  const dealCategories = [
    {
      title: "Flash Sale",
      subtitle: "Limited Time Offers",
      discount: "Up to 70% OFF",
      bg: "from-red-500 to-pink-500",
      icon: "⚡"
    },
    {
      title: "Weekly Deals",
      subtitle: "Best Prices This Week",
      discount: "Up to 50% OFF",
      bg: "from-blue-500 to-purple-500",
      icon: "📅"
    },
    {
      title: "Clearance Sale",
      subtitle: "Last Chance Items",
      discount: "Up to 80% OFF",
      bg: "from-green-500 to-teal-500",
      icon: "🏷️"
    },
    {
      title: "Bundle Offers",
      subtitle: "Buy More, Save More",
      discount: "Up to 40% OFF",
      bg: "from-orange-500 to-yellow-500",
      icon: "📦"
    }
  ];

  const mockPromotions = [
    {
      title: "Black Friday Preview",
      description: "Get early access to our biggest sale of the year",
      code: "PREVIEW25",
      discount: "25% OFF",
      validUntil: "Nov 30, 2024",
      minOrder: "$100"
    },
    {
      title: "New Customer Special",
      description: "Welcome offer for first-time shoppers",
      code: "WELCOME15",
      discount: "15% OFF",
      validUntil: "Dec 31, 2024",
      minOrder: "$50"
    },
    {
      title: "Free Shipping Weekend",
      description: "No minimum order required",
      code: "FREESHIP",
      discount: "Free Shipping",
      validUntil: "This Weekend",
      minOrder: "No minimum"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-12 sm:px-12 lg:py-16 text-center text-white">
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-4">
              🔥 Hot Deals & Offers
            </h1>
            <p className="text-xl lg:text-2xl mb-6 opacity-90">
              Save big on your favorite products with our exclusive deals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Shop All Deals
              </Link>
              <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-orange-600 transition-colors">
                Subscribe for Updates
              </button>
            </div>
          </div>
        </div>

        {/* Deal Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {dealCategories.map((category, index) => (
            <Link
              key={index}
              href={`/shop?deals=${category.title.toLowerCase().replace(' ', '_')}`}
              className="group"
            >
              <div className={`bg-gradient-to-br ${category.bg} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-all group-hover:scale-105`}>
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                <p className="text-sm opacity-90 mb-3">{category.subtitle}</p>
                <div className="text-2xl font-bold">{category.discount}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Promotion Codes */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Active Promotions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockPromotions.map((promo, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{promo.title}</h3>
                  <span className="text-2xl font-bold text-orange-600">{promo.discount}</span>
                </div>
                <p className="text-gray-600 mb-4">{promo.description}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <span>Code:</span>
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">{promo.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valid until:</span>
                    <span>{promo.validUntil}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Min. order:</span>
                    <span>{promo.minOrder}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(promo.code);
                    toast.success(`Copied code: ${promo.code}`);
                  }}
                  className="w-full mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Copy Code
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products on Sale */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Deals</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                  <div className="aspect-square bg-gray-300 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛍️</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No deals available</h3>
              <p className="text-gray-500 mb-4">Check back later for new deals and offers</p>
              <Link
                href="/shop"
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow relative">
                  {/* Sale Badge */}
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    SALE
                  </div>
                  
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                          📦
                        </div>
                      )}
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <Link href={`/product/${product.id}`} className="block">
                      <h3 className="font-medium text-gray-900 mb-2 hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-orange-600">
                            ${(product.price * 0.8).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-green-600 font-medium">
                          Save 20%
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.stock === 0 || addingToCart === product.id || !isAuthenticated}
                      className="w-full px-3 py-2 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      {addingToCart === product.id ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Adding...
                        </div>
                      ) : product.stock === 0 ? (
                        'Out of Stock'
                      ) : !isAuthenticated ? (
                        'Login Required'
                      ) : (
                        'Add to Cart'
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Never Miss a Deal</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter and be the first to know about exclusive offers and flash sales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}