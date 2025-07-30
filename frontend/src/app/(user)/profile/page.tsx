'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Settings, Package, Heart, MapPin } from 'lucide-react'
import { useAuthStore } from '@/stores/auth'
import { User as UserType } from '@/types'

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<UserType>>({
    fullName: '',
    email: '',
    gender: undefined,
    birthDate: '',
  })

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    
    setFormData({
      fullName: user.fullName,
      email: user.email,
      gender: user.gender,
      birthDate: user.birthDate,
    })
  }, [user, router])

  const handleSave = async () => {
    try {
      // API call to update user profile
      console.log('Updating profile:', formData)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'gender' ? (value === '' ? undefined : value === 'true') : value
    }))
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Giriş Gerekli</h1>
          <p className="text-muted-foreground mb-6">
            Profil sayfasını görüntülemek için giriş yapmanız gerekiyor.
          </p>
          <Button onClick={() => router.push('/login')}>
            Giriş Yap
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{user.fullName}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <a href="#profile" className="flex items-center space-x-2 p-2 rounded hover:bg-accent">
                  <User className="h-4 w-4" />
                  <span>Profil Bilgileri</span>
                </a>
                <a href="#orders" className="flex items-center space-x-2 p-2 rounded hover:bg-accent">
                  <Package className="h-4 w-4" />
                  <span>Siparişlerim</span>
                </a>
                <a href="#favorites" className="flex items-center space-x-2 p-2 rounded hover:bg-accent">
                  <Heart className="h-4 w-4" />
                  <span>Favorilerim</span>
                </a>
                <a href="#addresses" className="flex items-center space-x-2 p-2 rounded hover:bg-accent">
                  <MapPin className="h-4 w-4" />
                  <span>Adreslerim</span>
                </a>
                <a href="#settings" className="flex items-center space-x-2 p-2 rounded hover:bg-accent">
                  <Settings className="h-4 w-4" />
                  <span>Ayarlar</span>
                </a>
              </nav>
              <div className="mt-6 pt-6 border-t">
                <Button variant="outline" onClick={logout} className="w-full">
                  Çıkış Yap
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Information */}
          <Card id="profile">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Profil Bilgileri</CardTitle>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'İptal' : 'Düzenle'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ad Soyad</label>
                  <Input
                    name="fullName"
                    value={formData.fullName || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">E-posta</label>
                  <Input
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cinsiyet</label>
                  <select
                    name="gender"
                    value={formData.gender === undefined ? '' : formData.gender.toString()}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-2 border rounded-md bg-background disabled:opacity-50"
                  >
                    <option value="">Belirtilmemiş</option>
                    <option value="true">Erkek</option>
                    <option value="false">Kadın</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Doğum Tarihi</label>
                  <Input
                    name="birthDate"
                    type="date"
                    value={formData.birthDate || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              {isEditing && (
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    İptal
                  </Button>
                  <Button onClick={handleSave}>
                    Kaydet
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card id="orders">
            <CardHeader>
              <CardTitle>Son Siparişler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Package className="mx-auto h-12 w-12 mb-4" />
                <p>Henüz sipariş vermemişsiniz.</p>
                <Button className="mt-4" onClick={() => router.push('/products')}>
                  Alışverişe Başla
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Favorites */}
          <Card id="favorites">
            <CardHeader>
              <CardTitle>Favori Ürünler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Heart className="mx-auto h-12 w-12 mb-4" />
                <p>Henüz favori ürününüz yok.</p>
                <Button className="mt-4" onClick={() => router.push('/products')}>
                  Ürünleri Keşfet
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}