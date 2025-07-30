import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">EcommercePro</h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner for quality products and exceptional service.
              Shop with confidence and discover amazing deals every day.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/products" className="text-gray-400 hover:text-white transition-colors">
                  All Products
                </a>
              </li>
              <li>
                <a href="/categories" className="text-gray-400 hover:text-white transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="/support" className="text-gray-400 hover:text-white transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-gray-400 hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns" className="text-gray-400 hover:text-white transition-colors">
                  Returns
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 EcommercePro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;