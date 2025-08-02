'use client';

import { ProductComment } from '@/types';
import StarRating from './StarRating';

interface ReviewListProps {
  reviews: ProductComment[];
  loading?: boolean;
  emptyMessage?: string;
}

export default function ReviewList({ 
  reviews, 
  loading = false, 
  emptyMessage = "No reviews yet. Be the first to write a review!" 
}: ReviewListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/6"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
        </div>
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start space-x-4">
            {/* User Avatar */}
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {review.user.fullName.charAt(0).toUpperCase()}
            </div>
            
            {/* Review Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <h4 className="font-semibold text-gray-900">
                    {review.user.fullName}
                  </h4>
                  {!review.isApproved && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending Approval
                    </span>
                  )}
                </div>
                <time className="text-sm text-gray-500">
                  {formatDate(review.createdAt)}
                </time>
              </div>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-3">
                <StarRating rating={review.rating} readonly size="sm" />
                <span className="text-sm font-medium text-gray-700">
                  {review.rating} out of 5
                </span>
              </div>
              
              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed">
                {review.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}