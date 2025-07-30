import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';

const Header: React.FC = () => {
  const { user, isAuthenticated, clearAuth } = useAuthStore();
  const { getTotalItems, toggleCart } = useCartStore();

  const handleLogout = () => {
    clearAuth();
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              EcommercePro
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/products"
              className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Products
            </Link>
            <Link
              to="/categories"
              className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Categories
            </Link>
            {isAuthenticated && user?.role === 'Admin' && (
              <Link
                to="/admin"
                className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* User menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <UserIcon className="h-6 w-6" />
                  <span className="hidden sm:block text-sm">{user?.fullName}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-primary-600 text-sm transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary-600 text-sm transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;