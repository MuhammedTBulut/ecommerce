'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Package, ShoppingCart, Users, DollarSign, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,345',
      change: '+12.5%',
      icon: DollarSign,
    },
    {
      title: 'Orders',
      value: '1,234',
      change: '+8.2%',
      icon: ShoppingCart,
    },
    {
      title: 'Products',
      value: '456',
      change: '+2.1%',
      icon: Package,
    },
    {
      title: 'Customers',
      value: '2,345',
      change: '+15.3%',
      icon: Users,
    },
  ];

  const recentOrders = [
    { id: '#1234', customer: 'John Doe', product: 'Wireless Headphones', amount: '$199.99', status: 'Shipped' },
    { id: '#1235', customer: 'Jane Smith', product: 'Running Shoes', amount: '$89.99', status: 'Processing' },
    { id: '#1236', customer: 'Bob Johnson', product: 'Smart Watch', amount: '$299.99', status: 'Delivered' },
    { id: '#1237', customer: 'Alice Brown', product: 'Backpack', amount: '$79.99', status: 'Pending' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button>
          <BarChart3 className="h-4 w-4 mr-2" />
          View Reports
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <stat.icon className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{order.product}</p>
                          <p className="text-sm font-semibold">{order.amount}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Add Product
              </Button>
              <Button className="w-full" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button className="w-full" variant="outline">
                <ShoppingCart className="h-4 w-4 mr-2" />
                View Orders
              </Button>
              <Button className="w-full" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Wireless Headphones', sales: 156 },
                  { name: 'Smart Watch', sales: 98 },
                  { name: 'Running Shoes', sales: 87 },
                  { name: 'Bluetooth Speaker', sales: 65 },
                ].map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                      <span className="text-sm">{product.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{product.sales} sold</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}