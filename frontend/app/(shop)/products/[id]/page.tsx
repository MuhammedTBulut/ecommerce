'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Minus, Plus, ShoppingCart, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore } from '@/stores/cart';
import { Product } from '@/types';

// Mock product data - in a real app, this would be fetched based on the ID
const mockProduct: Product = {
  id: "1",
  name: "Premium Wireless Headphones",
  description: "Experience exceptional sound quality with these premium wireless headphones. Featuring advanced noise cancellation technology, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers, professionals, and travelers who demand the best audio experience.",
  price: 199.99,
  imageUrl: "/api/placeholder/500/500",
  category: "Electronics",
  brand: "TechBrand",
  stock: 50,
  rating: 4.5,
  reviews: 128,
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCartStore();

  // In a real app, you would fetch the product based on productId
  const product = mockProduct;

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const images = [
    "/api/placeholder/500/500",
    "/api/placeholder/500/500",
    "/api/placeholder/500/500",
    "/api/placeholder/500/500",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Main Image</span>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 ${
                  selectedImage === index ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <span className="text-gray-500 text-xs">Img {index + 1}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground">{product.brand}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
          
          <div className="text-3xl font-bold">
            ${product.price.toFixed(2)}
          </div>
          
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Quantity</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Brand:</span>
                  <span>{product.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span>Stock:</span>
                  <span>{product.stock} available</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>Free shipping on orders over $50</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((review) => (
            <Card key={review}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-sm">U</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold">John Doe</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">2 days ago</p>
                    <p className="text-sm">
                      Great product! The sound quality is amazing and the noise cancellation works perfectly. 
                      Highly recommend for anyone looking for premium headphones.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}