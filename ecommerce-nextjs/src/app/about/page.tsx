'use client';

import EnhancedHeader from '@/components/Header/EnhancedHeader';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-12 sm:px-12 lg:py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                About <span className="text-orange-600">E-Store</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                We're building the future of e-commerce with modern technology, 
                user-centric design, and exceptional customer service.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2024, E-Store emerged from a simple idea: create an e-commerce platform 
              that puts users first. We noticed that many online shopping experiences were 
              cluttered, slow, and difficult to navigate.
            </p>
            <p className="text-gray-600 mb-4">
              Our team of experienced developers and designers came together to build something 
              different. Using modern technologies like Next.js, TypeScript, and Tailwind CSS, 
              we've created a platform that's fast, secure, and intuitive.
            </p>
            <p className="text-gray-600">
              Today, we're proud to serve thousands of customers worldwide with a platform 
              that combines cutting-edge technology with exceptional user experience.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">User-First Design</h3>
                  <p className="text-gray-600">Every feature is designed with the user experience in mind.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Security & Privacy</h3>
                  <p className="text-gray-600">We protect your data with enterprise-grade security measures.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Innovation</h3>
                  <p className="text-gray-600">We continuously improve and innovate to stay ahead.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Why Choose E-Store?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Built with Next.js and optimized for speed. Pages load in milliseconds.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure</h3>
              <p className="text-gray-600">
                JWT authentication, encrypted data, and secure payment processing.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile-First</h3>
              <p className="text-gray-600">
                Responsive design that works perfectly on any device.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time</h3>
              <p className="text-gray-600">
                Live cart updates, instant notifications, and real-time inventory.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Modern Design</h3>
              <p className="text-gray-600">
                Clean, intuitive interface inspired by the best e-commerce sites.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Admin Tools</h3>
              <p className="text-gray-600">
                Comprehensive admin dashboard for complete store management.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Built with Modern Technology</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'Next.js', description: 'React Framework' },
              { name: 'TypeScript', description: 'Type Safety' },
              { name: 'Tailwind', description: 'CSS Framework' },
              { name: 'JWT', description: 'Authentication' },
              { name: 'API', description: 'RESTful APIs' },
              { name: 'Responsive', description: 'Mobile First' },
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mx-auto mb-2">
                  {tech.name.slice(0, 2)}
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">{tech.name}</h4>
                <p className="text-xs text-gray-500">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-sm p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of satisfied customers and experience the future of e-commerce.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse Products
            </Link>
            <Link
              href="/auth/register"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-orange-600 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}