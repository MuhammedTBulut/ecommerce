import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { EyeIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { orderService } from '../../services/orderService';
import type { OrderListDTO } from '../../types/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Orders: React.FC = () => {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: orderService.getOrders,
  });

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

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-red-600">Failed to load orders. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      {!orders || orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">You haven't placed any orders yet.</p>
          <Link to="/products">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: OrderListDTO) => (
            <Card key={order.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CurrencyDollarIcon className="h-4 w-4" />
                      <span>${order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Link to={`/orders/${order.id}`}>
                  <Button variant="outline" size="sm">
                    <EyeIcon className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;