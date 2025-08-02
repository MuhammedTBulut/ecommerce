'use client';

import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({ 
  rating, 
  onRatingChange, 
  readonly = false, 
  size = 'md' 
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleStarClick = (star: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(star);
    }
  };

  const handleStarHover = (star: number) => {
    if (!readonly) {
      setHoverRating(star);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center space-x-1" onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverRating || rating);
        
        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            className={`
              ${sizeClasses[size]}
              ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
              transition-all duration-150
              ${isFilled 
                ? 'text-yellow-400' 
                : 'text-gray-300 hover:text-yellow-300'
              }
            `}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}