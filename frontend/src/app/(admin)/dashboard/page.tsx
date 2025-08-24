'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign,
  Plus,
  BarChart3
} from 'lucide-react'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/lib/api'
import { formatPrice } from '@/lib/utils'

interface DashboardStats {
  totalUsers: number
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  lowStockProducts: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    if (user.roleId !== 1) { // Assuming roleId 1 is admin
      router.push('/')
      return
    }

    fetchDashboardStats()
  }, [user, router])

  const fetchDashboardStats = async () => {
    try {
      // Mock data - replace with actual API calls
      setStats({
        totalUsers: 1234,
        totalProducts: 567,
        totalOrders: 890,
        totalRevenue: 123456.78,
        pendingOrders: 45,
        lowStockProducts: 12
      })
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user || user.roleId !== 1) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Yetkiniz Yok</h1>
          <p className="text-muted-foreground mb-6">
            Bu sayfaya erişim için admin yetkileriniz bulunmuyor.
          </p>
          <Link href="/">
            <Button>Ana Sayfaya Dön</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="h-8 bg-muted rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-8 bg-muted rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Hoş geldin, {user.fullName}. İşletme durumuna genel bakış.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/products">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ürün Ekle
            </Button>
          </Link>
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Raporlar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% geçen aydan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Ürün</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalProducts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.lowStockProducts} ürün az stokta
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Sipariş</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.pendingOrders} bekleyen sipariş
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.totalRevenue ? formatPrice(stats.totalRevenue) : '₺0'}
            </div>
            <p className="text-xs text-muted-foreground">
              +8% geçen aydan
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Ürün Yönetimi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Ürünleri ekle, düzenle ve stok durumlarını yönet
            </p>
            <Link href="/admin/products">
              <Button className="w-full">Ürünleri Yönet</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Sipariş Yönetimi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Siparişleri görüntüle ve durumlarını güncelle
            </p>
            <Link href="/admin/orders">
              <Button className="w-full">Siparişleri Yönet</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Kullanıcı Yönetimi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Kullanıcıları görüntüle ve yetkileri düzenle
            </p>
            <Link href="/admin/users">
              <Button className="w-full">Kullanıcıları Yönet</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Son Siparişler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sipariş #000{i}</p>
                    <p className="text-sm text-muted-foreground">Müşteri {i}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(Math.random() * 1000)}</p>
                    <p className="text-sm text-muted-foreground">Bekliyor</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/admin/orders">
              <Button variant="outline" className="w-full mt-4">
                Tümünü Gör
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Düşük Stoklu Ürünler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Ürün {i}</p>
                    <p className="text-sm text-muted-foreground">Kategori {i}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">{Math.floor(Math.random() * 5) + 1} adet</p>
                    <p className="text-sm text-muted-foreground">Stok azalıyor</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/admin/products">
              <Button variant="outline" className="w-full mt-4">
                Stokları Yönet
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}