import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  UserGroupIcon, 
  ShoppingBagIcon, 
  CurrencyDollarIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';
import { adminService } from '../../services/adminService';
import { productService } from '../../services/productService';
import type { AdminOrderListDTO } from '../../types/api';
import Card from '../../components/ui/Card';

const AdminDashboard: React.FC = () => {
  const { data: orders } = useQuery({
    queryKey: ['admin', 'orders'],
    queryFn: adminService.getOrders,
  });

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getProducts(),
  });

  const totalRevenue = orders?.reduce((sum, order) => sum + order.totalAmount, 0) || 0;
  const totalProducts = products?.length || 0;
  const totalOrders = orders?.length || 0;
  const pendingOrders = orders?.filter(order => order.status === 'Pending').length || 0;

  const stats = [
    {
      name: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: CurrencyDollarIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Total Orders',
      value: totalOrders.toString(),
      icon: ShoppingBagIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Total Products',
      value: totalProducts.toString(),
      icon: ChartBarIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      name: 'Pending Orders',
      value: pendingOrders.toString(),
      icon: UserGroupIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your e-commerce platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.name} className="p-6">
              <div className="flex items-center">
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <IconComponent className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Orders */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>
        
        {!orders || orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.slice(0, 10).map((order: AdminOrderListDTO) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.userFullName}</div>
                        <div className="text-sm text-gray-500">{order.userEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminDashboard;