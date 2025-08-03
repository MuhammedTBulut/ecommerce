'use client';

import { useState } from 'react';
import { ReviewFormData } from '@/types';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import ReviewFilter from './ReviewFilter';
import { toast } from 'react-hot-toast';

interface ProductReviewsProps {
  productId: number;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [activeTab, setActiveTab] = useState<'reviews' | 'add-review'>('reviews');
  const [loading, setLoading] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const handleSubmitReview = async (data: ReviewFormData) => {
    setLoading(true);
    try {
      // Here you would call the review service to submit the review
      // For now, we'll just simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Review submitted successfully!');
      setActiveTab('reviews');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'reviews'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setActiveTab('add-review')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'add-review'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Write Review
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'reviews' ? (
          <div>
            <ReviewFilter 
              totalReviews={0}
              currentFilter={reviewFilter}
              onFilterChange={setReviewFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
            <ReviewList 
              reviews={[]}
              loading={false}
              emptyMessage="No reviews yet. Be the first to write a review!"
            />
          </div>
        ) : (
          <ReviewForm 
            productId={productId} 
            onSubmit={handleSubmitReview}
            onCancel={() => setActiveTab('reviews')}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}