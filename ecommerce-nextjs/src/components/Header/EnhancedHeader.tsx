'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import CartDropdown from './CartDropdown';
import CampaignBanner from './CampaignBanner';

export default function EnhancedHeader() {
  const { user, isAuthenticated, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="animate-pulse bg-gray-300 h-8 w-24 rounded"></div>
            <div className="animate-pulse bg-gray-300 h-8 w-32 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Campaign Banner */}
      <CampaignBanner />
      
      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  E-Store
                </span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/shop" 
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                Shop
              </Link>
              <Link 
                href="/categories" 
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                Categories
              </Link>
              <Link 
                href="/deals" 
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                Deals
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                About
              </Link>
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <button className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Cart Dropdown */}
              {isAuthenticated && <CartDropdown />}

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  {/* User Info */}
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.role.name}
                    </p>
                  </div>

                  {/* User Avatar */}
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user?.fullName.charAt(0).toUpperCase()}
                  </div>

                  {/* Admin Dashboard Link */}
                  {(user?.role.name === 'Admin' || user?.role.name === 'SuperAdmin') && (
                    <Link
                      href="/admin"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Admin
                    </Link>
                  )}

                  {/* Logout Button */}
                  <button
                    onClick={logout}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/auth/login"
                    className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}