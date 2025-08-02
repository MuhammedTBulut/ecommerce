'use client';

import { useState, useEffect } from 'react';
import { Campaign } from '@/types';

// Mock campaign data - in real app this would come from API
const mockCampaigns: Campaign[] = [
  {
    id: 1,
    title: "🔥 Winter Sale - Up to 50% Off!",
    description: "Don't miss our biggest sale of the year",
    discount: 50,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    isActive: true,
    createdAt: "2024-01-01"
  },
  {
    id: 2,
    title: "✨ Free Shipping on Orders Over $100",
    description: "No minimum order for premium members",
    discount: 0,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    isActive: true,
    createdAt: "2024-01-01"
  },
  {
    id: 3,
    title: "🎁 New Year Special - 30% Off Electronics",
    description: "Limited time offer on all electronics",
    discount: 30,
    startDate: "2024-01-01",
    endDate: "2024-01-15",
    isActive: true,
    createdAt: "2024-01-01"
  }
];

export default function CampaignBanner() {
  const [currentCampaign, setCurrentCampaign] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [campaigns] = useState<Campaign[]>(mockCampaigns);

  // Auto-rotate campaigns
  useEffect(() => {
    if (campaigns.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentCampaign((prev) => (prev + 1) % campaigns.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [campaigns.length]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handlePrevious = () => {
    setCurrentCampaign((prev) => (prev - 1 + campaigns.length) % campaigns.length);
  };

  const handleNext = () => {
    setCurrentCampaign((prev) => (prev + 1) % campaigns.length);
  };

  if (!isVisible || campaigns.length === 0) {
    return null;
  }

  const campaign = campaigns[currentCampaign];

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3 flex items-center justify-between">
          {/* Campaign Content */}
          <div className="flex-1 flex items-center justify-center">
            {/* Previous Button */}
            {campaigns.length > 1 && (
              <button
                onClick={handlePrevious}
                className="hidden sm:block mr-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Previous campaign"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Campaign Text */}
            <div className="text-center animate-fadeIn">
              <p className="text-sm sm:text-base font-semibold">
                {campaign.title}
              </p>
              <p className="hidden sm:block text-xs mt-1 opacity-90">
                {campaign.description}
              </p>
            </div>

            {/* Next Button */}
            {campaigns.length > 1 && (
              <button
                onClick={handleNext}
                className="hidden sm:block ml-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Next campaign"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Campaign Indicators */}
          {campaigns.length > 1 && (
            <div className="hidden md:flex items-center space-x-2 mr-4">
              {campaigns.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCampaign(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentCampaign 
                      ? 'bg-white' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to campaign ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors ml-2"
            aria-label="Close banner"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Animated Progress Bar */}
      {campaigns.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{
              width: `${((currentCampaign + 1) / campaigns.length) * 100}%`
            }}
          />
        </div>
      )}
    </div>
  );
}