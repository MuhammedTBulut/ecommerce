import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div
      className={`card ${hover ? 'hover:shadow-lg transition-shadow duration-200' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;