'use client';

import { useState, useEffect } from 'react';
import { ProductComment, ReviewFormData, ReviewStats } from '@/types';
import { CommentService } from '@/services/comment';
import { httpClient } from '@/services/base';
import toast from 'react-hot-toast';

export interface UseReviewsOptions {
  productId: number;
  autoFetch?: boolean;
}

export interface UseReviewsReturn {
  reviews: ProductComment[];
  stats: ReviewStats | null;
  loading: boolean;
  error: string | null;
  submitReview: (data: ReviewFormData) => Promise<void>;
  refreshReviews: () => Promise<void>;
  hasUserReviewed: boolean;
}

export function useReviews({ 
  productId, 
  autoFetch = true 
}: UseReviewsOptions): UseReviewsReturn {
  const [reviews, setReviews] = useState<ProductComment[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);

  const commentService = new CommentService(httpClient);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch approved reviews for this product
      const reviewsResponse = await commentService.getProductComments(productId, {
        page: 1,
        pageSize: 50
      });

      setReviews(reviewsResponse.data || []);

      // Fetch rating summary
      try {
        const statsResponse = await commentService.getProductRatingSummary(productId);
        setStats(statsResponse);
      } catch (statsError) {
        console.warn('Failed to fetch rating stats:', statsError);
        // Calculate basic stats from reviews
        if (reviewsResponse.data && reviewsResponse.data.length > 0) {
          const ratings = reviewsResponse.data.map(r => r.rating);
          const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
          const ratingDistribution = ratings.reduce((acc, rating) => {
            acc[rating] = (acc[rating] || 0) + 1;
            return acc;
          }, {} as Record<number, number>);

          setStats({
            averageRating: Math.round(averageRating * 10) / 10,
            totalComments: reviewsResponse.data.length,
            ratingDistribution
          });
        } else {
          setStats({
            averageRating: 0,
            totalComments: 0,
            ratingDistribution: {}
          });
        }
      }

      // Check if current user has reviewed this product
      // This would need to be implemented based on your auth system
      // For now, we'll set it to false
      setHasUserReviewed(false);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (data: ReviewFormData) => {
    try {
      await commentService.createComment({
        productId,
        content: data.content,
        rating: data.rating
      });

      toast.success('Review submitted successfully! It will appear after approval.');
      setHasUserReviewed(true);
      
      // Refresh reviews to get the latest data
      await fetchReviews();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit review';
      toast.error(errorMessage);
      throw err;
    }
  };

  const refreshReviews = async () => {
    await fetchReviews();
  };

  useEffect(() => {
    if (autoFetch && productId) {
      fetchReviews();
    }
  }, [productId, autoFetch]); // fetchReviews is stable since commentService is constant

  return {
    reviews,
    stats,
    loading,
    error,
    submitReview,
    refreshReviews,
    hasUserReviewed
  };
}