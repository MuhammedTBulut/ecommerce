'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { user } = useAuthStore()
  const { 
    items, 
    isLoading, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    fetchCart,
    getTotalPrice,
    getTotalItems 
  } = useCartStore()
  
  const [isUpdating, setIsUpdating] = useState<number | null>(null)

  useEffect(() => {
    if (user) {
      fetchCart()
    }
  }, [user, fetchCart])

  const handleQuantityUpdate = async (itemId: number, newQuantity: number) => {
    setIsUpdating(itemId)
    try {
      await updateQuantity(itemId, newQuantity)
    } catch (error) {
      console.error('Failed to update quantity:', error)
    } finally {
      setIsUpdating(null)
    }
  }

  const handleRemoveItem = async (itemId: number) => {
    setIsUpdating(itemId)
    try {
      await removeItem(itemId)
    } catch (error) {
      console.error('Failed to remove item:', error)
    } finally {
      setIsUpdating(null)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">Sepetinizi görüntüleyin</h1>
          <p className="text-muted-foreground mb-6">
            Sepetinizdeki ürünleri görmek için giriş yapmanız gerekiyor.
          </p>
          <div className="space-y-4">
            <Link href="/login">
              <Button className="w-full">Giriş Yap</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="w-full">Hesap Oluştur</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="h-8 bg-muted rounded animate-pulse" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-muted rounded animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">Sepetiniz boş</h1>
          <p className="text-muted-foreground mb-6">
            Henüz sepetinize ürün eklememişsiniz. Alışverişe başlamak için ürünleri keşfedin.
          </p>
          <Link href="/products">
            <Button>
              Alışverişe Başla
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              Sepetim ({totalItems} ürün)
            </h1>
            <Button 
              variant="outline" 
              onClick={clearCart}
              disabled={isLoading}
            >
              Sepeti Temizle
            </Button>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 relative overflow-hidden rounded-lg border flex-shrink-0">
                      <Image
                        src={item.productImageUrl || '/placeholder-product.svg'}
                        alt={item.productName}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/placeholder-product.svg'
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link 
                        href={`/products/${item.productId}`}
                        className="font-semibold hover:text-primary"
                      >
                        {item.productName}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        Birim Fiyat: {formatPrice(item.productPrice)}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isUpdating === item.id}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-4 py-2 min-w-[50px] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                            disabled={isUpdating === item.id}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-bold text-lg">
                            {formatPrice(item.productPrice * item.quantity)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={isUpdating === item.id}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Sipariş Özeti</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Ara Toplam:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Kargo:</span>
                <span className="text-green-600">Ücretsiz</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Toplam:</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
              
              <Link href="/checkout">
                <Button size="lg" className="w-full">
                  Siparişi Tamamla
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <p className="text-xs text-muted-foreground text-center">
                Güvenli ödeme ile alışverişinizi tamamlayın
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Size Önerebileceğimiz Ürünler</h2>
        <div className="text-center py-8 text-muted-foreground">
          Önerilen ürünler yükleniyor...
        </div>
      </div>
    </div>
  )
}