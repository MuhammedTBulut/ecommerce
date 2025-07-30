'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { useCartStore } from '@/stores/cart';
import { useUIStore } from '@/stores/ui';
import { useAuthStore } from '@/stores/auth';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems, toggleCart } = useCartStore();
  const { mobileMenuOpen, toggleMobileMenu } = useUIStore();
  const { isAuthenticated, user } = useAuthStore();
  
  const totalItems = getTotalItems();

  const categories = [
    { name: 'Electronics', href: '/categories/electronics' },
    { name: 'Clothing', href: '/categories/clothing' },
    { name: 'Home & Garden', href: '/categories/home-garden' },
    { name: 'Sports', href: '/categories/sports' },
    { name: 'Books', href: '/categories/books' },
  ];

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <span>Free shipping on orders over $100</span>
          <div className="flex items-center space-x-4">
            <Link href="/support" className="hover:text-gray-300">
              Support
            </Link>
            <Link href="/track-order" className="hover:text-gray-300">
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            ModernShop
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10"
              />
              <Button
                size="sm"
                className="absolute right-1 top-1 h-8 px-3"
                onClick={() => {
                  // Handle search
                }}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>

            {/* User menu */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {user?.firstName}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={toggleCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <ul className="hidden md:flex space-x-8 py-3">
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  href={category.href}
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile search */}
            <div className="mb-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10"
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1 h-8 px-3"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Mobile categories */}
            <ul className="space-y-3 border-t pt-4">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="block text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => toggleMobileMenu()}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile auth */}
            {!isAuthenticated && (
              <div className="border-t pt-4 mt-4 space-y-2">
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
    <CartDrawer />
    </>
  );
}