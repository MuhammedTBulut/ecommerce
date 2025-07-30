'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Gift } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Stay in the Loop
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new products, 
              exclusive deals, and special offers.
            </p>
          </div>
          
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                />
                <Button 
                  type="submit"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-blue-200 mt-3">
                Join 50,000+ subscribers and get exclusive access to deals and new arrivals.
              </p>
            </form>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="bg-white/10 rounded-lg p-6">
                <Gift className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Welcome to our community!</h3>
                <p className="text-blue-100">
                  Thank you for subscribing. Check your email for a special welcome offer!
                </p>
              </div>
            </div>
          )}
          
          {/* Newsletter benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h4 className="font-semibold mb-1">Exclusive Discounts</h4>
              <p className="text-sm text-blue-200">Get up to 20% off subscriber-only deals</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-1">Early Access</h4>
              <p className="text-sm text-blue-200">Be first to shop new collections</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v9a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H6a1 1 0 00-1 1v14a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1h-1" />
                </svg>
              </div>
              <h4 className="font-semibold mb-1">Style Tips</h4>
              <p className="text-sm text-blue-200">Weekly style guides and trends</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}