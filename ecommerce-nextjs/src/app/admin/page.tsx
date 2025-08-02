'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!isAuthenticated || (user?.role.name !== 'Admin' && user?.role.name !== 'SuperAdmin'))) {
      router.push('/');
    }
  }, [isAuthenticated, user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || (user?.role.name !== 'Admin' && user?.role.name !== 'SuperAdmin')) {
    return null;
  }

  // Mock dashboard stats
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', icon: '👥' },
    { label: 'Total Orders', value: '856', change: '+8%', icon: '📦' },
    { label: 'Total Revenue', value: '$45,678', change: '+15%', icon: '💰' },
    { label: 'Products', value: '123', change: '+3%', icon: '📋' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-blue-600 hover:text-blue-800 mr-4">
                ← Back to Store
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">Welcome, {user?.fullName}</span>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user?.fullName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-2xl mr-4">{stat.icon}</div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <span className="ml-2 text-sm font-medium text-green-600">{stat.change}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <span className="text-lg mr-3">➕</span>
                      <span className="font-medium">Add New Product</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <span className="text-lg mr-3">📝</span>
                      <span className="font-medium">Manage Orders</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <span className="text-lg mr-3">💬</span>
                      <span className="font-medium">Review Comments</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <span className="text-lg mr-3">👥</span>
                      <span className="font-medium">Manage Users</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: 'New order received', details: 'Order #1234 - $89.99', time: '2 minutes ago', type: 'order' },
                    { action: 'Product review submitted', details: 'iPhone 15 Pro - 5 stars', time: '15 minutes ago', type: 'review' },
                    { action: 'New user registered', details: 'john.doe@example.com', time: '1 hour ago', type: 'user' },
                    { action: 'Product stock updated', details: 'MacBook Air - 15 units added', time: '2 hours ago', type: 'product' },
                    { action: 'Payment received', details: 'Order #1230 - $156.50', time: '3 hours ago', type: 'payment' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                        activity.type === 'order' ? 'bg-blue-500' :
                        activity.type === 'review' ? 'bg-yellow-500' :
                        activity.type === 'user' ? 'bg-green-500' :
                        activity.type === 'product' ? 'bg-purple-500' :
                        'bg-indigo-500'
                      }`}>
                        {activity.type === 'order' ? '📦' :
                         activity.type === 'review' ? '⭐' :
                         activity.type === 'user' ? '👤' :
                         activity.type === 'product' ? '📋' : '💳'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.details}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Products Management */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📋</span>
                Products
              </h3>
              <p className="text-sm text-gray-600 mb-4">Manage your product catalog</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Total Products:</span>
                  <span className="font-medium">123</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Active:</span>
                  <span className="font-medium text-green-600">118</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Low Stock:</span>
                  <span className="font-medium text-red-600">5</span>
                </div>
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Manage Products
              </button>
            </div>
          </div>

          {/* Orders Management */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📦</span>
                Orders
              </h3>
              <p className="text-sm text-gray-600 mb-4">Track and manage orders</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Total Orders:</span>
                  <span className="font-medium">856</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Pending:</span>
                  <span className="font-medium text-yellow-600">12</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Completed:</span>
                  <span className="font-medium text-green-600">844</span>
                </div>
              </div>
              <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                Manage Orders
              </button>
            </div>
          </div>

          {/* Comments Management */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <span className="mr-2">💬</span>
                Reviews
              </h3>
              <p className="text-sm text-gray-600 mb-4">Moderate product reviews</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Total Reviews:</span>
                  <span className="font-medium">234</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Pending:</span>
                  <span className="font-medium text-yellow-600">8</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Approved:</span>
                  <span className="font-medium text-green-600">226</span>
                </div>
              </div>
              <button className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
                Moderate Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}