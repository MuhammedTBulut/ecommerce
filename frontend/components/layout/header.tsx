"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  Heart,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  
  const { getTotalItems, toggleCart } = useCartStore();
  const { isAuthenticated, logout } = useAuthStore();
  
  const totalItems = getTotalItems();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-blue-500" />
            <span className="hidden font-bold sm:inline-block">
              E-Commerce
            </span>
          </Link>

          {/* Search bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Favorites */}
            {isAuthenticated && (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/favorites">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Favorites</span>
                </Link>
              </Button>
            )}

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-500 text-xs text-white flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>

            {/* User menu */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-4">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/profile">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Profile</span>
                  </Link>
                </Button>
                <Button variant="ghost" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden sm:flex h-14 items-center space-x-6 text-sm font-medium">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="transition-colors hover:text-blue-500"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            {/* Mobile navigation */}
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-blue-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile auth links */}
              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="text-sm font-medium transition-colors hover:text-blue-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Button
                    variant="ghost"
                    className="justify-start px-0"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium transition-colors hover:text-blue-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-sm font-medium transition-colors hover:text-blue-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}