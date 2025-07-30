import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeftIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { orderService } from '../../services/orderService';
import type { OrderItemDTO } from '../../types/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrder(parseInt(id!)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-8 rounded mb-6 w-1/3"></div>
          <div className="bg-gray-300 h-64 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-red-600">Order not found.</p>
          <Button onClick={() => navigate('/orders')} className="mt-4">
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="outline"
        onClick={() => navigate('/orders')}
        className="mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        Back to Orders
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order #{order.id}</h1>
        
        <div className="flex flex-wrap items-center gap-6 text-gray-600">
          <div className="flex items-center space-x-1">
            <CalendarIcon className="h-5 w-5" />
            <span>Ordered on {new Date(order.orderDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <CurrencyDollarIcon className="h-5 w-5" />
            <span>Total: ${order.totalAmount.toFixed(2)}</span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === 'Completed'
                ? 'bg-green-100 text-green-800'
                : order.status === 'Processing'
                ? 'bg-blue-100 text-blue-800'
                : order.status === 'Shipped'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Order Items</h2>
        
        <div className="space-y-4">
          {order.items.map((item: OrderItemDTO) => (
            <div key={item.id} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex-grow">
                <h3 className="font-medium text-gray-900">{item.productName}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-600">Price: ${item.productPrice.toFixed(2)} each</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">${item.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4 mt-6">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">Total Amount:</span>
            <span className="text-2xl font-bold text-primary-600">
              ${order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderDetail;