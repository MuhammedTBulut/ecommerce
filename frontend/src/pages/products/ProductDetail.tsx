import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { ArrowLeftIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { productService } from '../../services/productService';
import { cartService } from '../../services/cartService';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProduct(parseInt(id!)),
    enabled: !!id,
  });

  const addToCartMutation = useMutation({
    mutationFn: (data: { productId: number; quantity: number }) =>
      cartService.addToCart(data),
    onSuccess: (cartItem) => {
      addItem(cartItem);
      toast.success('Product added to cart!');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: () => {
      toast.error('Failed to add product to cart');
    },
  });

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    if (product) {
      addToCartMutation.mutate({
        productId: product.id,
        quantity,
      });
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-300 h-96 rounded"></div>
            <div className="space-y-4">
              <div className="bg-gray-300 h-8 rounded w-3/4"></div>
              <div className="bg-gray-300 h-4 rounded w-1/2"></div>
              <div className="bg-gray-300 h-6 rounded w-1/4"></div>
              <div className="bg-gray-300 h-20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-red-600">Product not found.</p>
          <Button onClick={() => navigate('/products')} className="mt-4">
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="outline"
        onClick={() => navigate('/products')}
        className="mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div>
          <Card className="p-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-96 object-cover rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=No+Image';
              }}
            />
          </Card>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.categoryName}</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-primary-600">${product.price}</p>
            <p className="text-sm text-gray-500 mt-1">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {product.stock > 0 && (
            <>
              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                className="w-full"
                size="lg"
                isLoading={addToCartMutation.isPending}
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
            </>
          )}

          {product.stock === 0 && (
            <Button disabled className="w-full" size="lg">
              Out of Stock
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;