import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { orderService } from '../services/orderService';
import { cartService } from '../services/cartService';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import type { OrderCreateDTO } from '../types/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { items, clearCart, getTotalPrice } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const createOrderMutation = useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: (order: any) => {
      // Clear cart after successful order
      clearCart();
      cartService.clearCart();
      toast.success('Order placed successfully!');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      navigate(`/orders/${order.id}`);
    },
    onError: () => {
      toast.error('Failed to place order. Please try again.');
    },
  });

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
      return;
    }

    const orderData: OrderCreateDTO = {
      items: items.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    createOrderMutation.mutate(orderData);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout</h1>
          <p className="text-gray-600 mb-8">Please login to continue with checkout</p>
          <Button onClick={() => navigate('/login')}>Login</Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout</h1>
          <p className="text-gray-600 mb-8">Your cart is empty</p>
          <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      {/* Order Summary */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        
        <div className="space-y-3">
          {items.map((item: any) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity} × ${item.productPrice}</p>
              </div>
              <p className="font-medium">${item.totalPrice.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold text-primary-600">
              ${getTotalPrice().toFixed(2)}
            </span>
          </div>
        </div>
      </Card>

      {/* Payment Information Note */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
        <p className="text-gray-600 mb-4">
          This is a demo application. No actual payment will be processed.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <p className="text-blue-800 text-sm">
            In a real application, you would integrate with payment providers like Stripe, PayPal, or Square here.
          </p>
        </div>
      </Card>

      {/* Place Order */}
      <div className="flex space-x-4">
        <Button
          variant="outline"
          onClick={() => navigate('/cart')}
          className="flex-1"
        >
          Back to Cart
        </Button>
        <Button
          onClick={handlePlaceOrder}
          isLoading={createOrderMutation.isPending}
          className="flex-1"
        >
          {createOrderMutation.isPending ? 'Placing Order...' : 'Place Order'}
        </Button>
      </div>
    </div>
  );
};

export default Checkout;