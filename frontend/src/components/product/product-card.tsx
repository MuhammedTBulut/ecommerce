'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types';
import { useCartStore } from '@/stores/cart';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to wishlist logic
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className={cn("group overflow-hidden hover:shadow-lg transition-shadow duration-300", className)}>
      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isNew && (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                  New
                </span>
              )}
              {discountPercentage > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  -{discountPercentage}%
                </span>
              )}
              {product.stock < 10 && product.stock > 0 && (
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                  Low Stock
                </span>
              )}
              {product.stock === 0 && (
                <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded">
                  Out of Stock
                </span>
              )}
            </div>
            
            {/* Wishlist button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleAddToWishlist}
            >
              <Heart className="h-4 w-4" />
            </Button>
            
            {/* Quick add to cart */}
            <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full h-8 text-xs"
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Add to Cart
              </Button>
            </div>
          </div>
        </Link>
      </div>
      
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <div className="space-y-2">
            {/* Brand */}
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {product.brand}
            </p>
            
            {/* Product name */}
            <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-3 w-3",
                      star <= Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">
                ({product.reviewCount})
              </span>
            </div>
            
            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Stock status */}
            {product.stock > 0 ? (
              <p className="text-xs text-green-600">
                {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
              </p>
            ) : (
              <p className="text-xs text-red-600">Out of Stock</p>
            )}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}