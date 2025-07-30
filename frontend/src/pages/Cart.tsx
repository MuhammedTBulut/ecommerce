import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { cartService } from '../services/cartService';
import { useCartStore } from '../store/cartStore';
import type { CartItemDTO } from '../types/api';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Cart: React.FC = () => {
  const queryClient = useQueryClient();
  const { setItems, updateItem, removeItem, clearCart, getTotalPrice } = useCartStore();

  const { data: cartItems, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: cartService.getCart,
  });

  React.useEffect(() => {
    if (cartItems) {
      setItems(cartItems);
    }
  }, [cartItems, setItems]);

  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      cartService.updateCartItem(id, quantity),
    onSuccess: (updatedItem) => {
      updateItem(updatedItem.id, updatedItem.quantity);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: () => {
      toast.error('Failed to update item quantity');
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (id: number) => cartService.removeFromCart(id),
    onSuccess: (_, id) => {
      removeItem(id);
      toast.success('Item removed from cart');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: () => {
      toast.error('Failed to remove item');
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: cartService.clearCart,
    onSuccess: () => {
      clearCart();
      toast.success('Cart cleared');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: () => {
      toast.error('Failed to clear cart');
    },
  });

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantityMutation.mutate({ id, quantity: newQuantity });
  };

  const handleRemoveItem = (id: number) => {
    removeItemMutation.mutate(id);
  };

  const handleClearCart = () => {
    clearCartMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-300 h-24 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart</h1>
          <p className="text-gray-600 mb-8">Your cart is empty</p>
          <Button onClick={() => window.location.href = '/products'}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        <Button
          variant="outline"
          onClick={handleClearCart}
          isLoading={clearCartMutation.isPending}
        >
          Clear Cart
        </Button>
      </div>

      <div className="space-y-4">
        {cartItems?.map((item: CartItemDTO) => (
          <Card key={item.id} className="p-6">
            <div className="flex items-center space-x-4">
              <img
                src={item.productImageUrl}
                alt={item.productName}
                className="w-20 h-20 object-cover rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80x80?text=No+Image';
                }}
              />
              
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.productName}</h3>
                <p className="text-gray-600">${item.productPrice}</p>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1 || updateQuantityMutation.isPending}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  disabled={updateQuantityMutation.isPending}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-lg font-semibold">
                ${item.totalPrice.toFixed(2)}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRemoveItem(item.id)}
                isLoading={removeItemMutation.isPending}
                className="text-red-600 hover:text-red-700"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Cart Summary */}
      <Card className="p-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-2xl font-bold text-primary-600">
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>
        <Button className="w-full" size="lg">
          Proceed to Checkout
        </Button>
      </Card>
    </div>
  );
};

export default Cart;