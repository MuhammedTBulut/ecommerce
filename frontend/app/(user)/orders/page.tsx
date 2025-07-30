'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

// Mock orders data
const mockOrders = [
  {
    id: '#ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 199.99,
    items: [
      { name: 'Premium Wireless Headphones', quantity: 1, price: 199.99 }
    ]
  },
  {
    id: '#ORD-002',
    date: '2024-01-10',
    status: 'shipped',
    total: 89.99,
    items: [
      { name: 'Stylish Running Shoes', quantity: 1, price: 89.99 }
    ]
  },
  {
    id: '#ORD-003',
    date: '2024-01-05',
    status: 'processing',
    total: 379.98,
    items: [
      { name: 'Smart Fitness Watch', quantity: 1, price: 299.99 },
      { name: 'Designer Backpack', quantity: 1, price: 79.99 }
    ]
  },
  {
    id: '#ORD-004',
    date: '2024-01-01',
    status: 'pending',
    total: 129.99,
    items: [
      { name: 'Bluetooth Speaker', quantity: 1, price: 129.99 }
    ]
  }
];

export default function OrdersPage() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please Login</h1>
          <p className="text-muted-foreground mb-8">
            You need to be logged in to view your orders.
          </p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'processing':
        return <Package className="h-5 w-5 text-yellow-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {mockOrders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6">
                When you place your first order, it will appear here.
              </p>
              <Button>Start Shopping</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {mockOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Package className="h-6 w-6 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-semibold">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      {order.status === 'delivered' && (
                        <Button variant="outline" size="sm">Leave Review</Button>
                      )}
                      {order.status === 'pending' && (
                        <Button variant="outline" size="sm">Cancel Order</Button>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {order.status === 'delivered' && (
                        <Button size="sm">Reorder</Button>
                      )}
                      {order.status === 'shipped' && (
                        <Button variant="outline" size="sm">Track Package</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Order Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{mockOrders.length}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {mockOrders.filter(o => o.status === 'delivered').length}
                </p>
                <p className="text-sm text-muted-foreground">Delivered</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {mockOrders.filter(o => o.status === 'shipped').length}
                </p>
                <p className="text-sm text-muted-foreground">Shipped</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  ${mockOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}