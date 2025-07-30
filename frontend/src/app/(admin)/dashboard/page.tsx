'use client'

import { BarChart3, Package, ShoppingCart, Users, TrendingUp, Eye } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Mock data for dashboard
const stats = [
  {
    title: 'Toplam Satış',
    value: '₺125,340',
    change: '+12%',
    trend: 'up',
    icon: TrendingUp
  },
  {
    title: 'Sipariş Sayısı',
    value: '1,234',
    change: '+8%',
    trend: 'up',
    icon: ShoppingCart
  },
  {
    title: 'Ürün Sayısı',
    value: '5,678',
    change: '+2%',
    trend: 'up',
    icon: Package
  },
  {
    title: 'Müşteri Sayısı',
    value: '3,421',
    change: '+15%',
    trend: 'up',
    icon: Users
  }
]

const recentOrders = [
  {
    id: '#12345',
    customer: 'Ahmet Yılmaz',
    amount: '₺299.99',
    status: 'Tamamlandı',
    date: '2024-01-15'
  },
  {
    id: '#12346',
    customer: 'Fatma Demir',
    amount: '₺159.99',
    status: 'Kargoda',
    date: '2024-01-15'
  },
  {
    id: '#12347',
    customer: 'Mehmet Kaya',
    amount: '₺899.99',
    status: 'Hazırlanıyor',
    date: '2024-01-14'
  },
  {
    id: '#12348',
    customer: 'Ayşe Öztürk',
    amount: '₺79.99',
    status: 'Onay Bekliyor',
    date: '2024-01-14'
  }
]

const topProducts = [
  {
    name: 'Premium Kablosuz Kulaklık',
    sales: 145,
    revenue: '₺43,455'
  },
  {
    name: 'Akıllı Saat Pro',
    sales: 89,
    revenue: '₺80,091'
  },
  {
    name: 'Gaming Mekanik Klavye',
    sales: 67,
    revenue: '₺10,049'
  },
  {
    name: 'USB-C Hub 7-in-1',
    sales: 54,
    revenue: '₺4,319'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Tamamlandı':
      return 'text-green-600 bg-green-100'
    case 'Kargoda':
      return 'text-blue-600 bg-blue-100'
    case 'Hazırlanıyor':
      return 'text-yellow-600 bg-yellow-100'
    case 'Onay Bekliyor':
      return 'text-orange-600 bg-orange-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          E-ticaret sitenizin genel durumu ve istatistikleri
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                {' '}geçen aydan
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Sales Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Satış Grafiği</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Grafik bileşeni buraya gelecek</p>
                <p className="text-sm text-muted-foreground">Chart.js veya Recharts kullanılabilir</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>En Çok Satan Ürünler</CardTitle>
            <CardDescription>
              Bu ay en çok satılan ürünler
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center">
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">
                      {product.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {product.sales} adet satıldı
                    </p>
                  </div>
                  <div className="text-sm font-medium">
                    {product.revenue}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Son Siparişler</CardTitle>
            <CardDescription>
              En son gelen siparişlerin listesi
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Tümünü Gör
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {order.id} - {order.customer}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.date}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-medium">
                    {order.amount}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hızlı İşlemler</CardTitle>
          <CardDescription>
            Sık kullanılan yönetim işlemleri
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-16 flex flex-col space-y-2" variant="outline">
              <Package className="h-6 w-6" />
              <span>Yeni Ürün Ekle</span>
            </Button>
            <Button className="h-16 flex flex-col space-y-2" variant="outline">
              <ShoppingCart className="h-6 w-6" />
              <span>Siparişleri Görüntüle</span>
            </Button>
            <Button className="h-16 flex flex-col space-y-2" variant="outline">
              <Users className="h-6 w-6" />
              <span>Müşteri Yönetimi</span>
            </Button>
            <Button className="h-16 flex flex-col space-y-2" variant="outline">
              <BarChart3 className="h-6 w-6" />
              <span>Raporları Görüntüle</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}