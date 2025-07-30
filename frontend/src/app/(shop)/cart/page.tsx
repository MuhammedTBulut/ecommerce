'use client'

import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/stores/cart'

export default function CartPage() {
  const { cart, updateQuantity, removeItem, clearCart } = useCartStore()

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
          <h1 className="text-3xl font-bold mb-4">Sepetiniz Boş</h1>
          <p className="text-muted-foreground mb-8">
            Henüz sepetinize ürün eklememişsiniz. Alışverişe başlamak için ürünlerimizi inceleyin.
          </p>
          <Button asChild>
            <Link href="/products">
              Alışverişe Başla
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const shipping = cart.total > 500 ? 0 : 29.99
  const tax = cart.total * 0.18 // 18% KDV
  const finalTotal = cart.total + shipping + tax

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-1 md:space-x-3">
          <li>
            <Link href="/" className="text-muted-foreground hover:text-primary">
              Ana Sayfa
            </Link>
          </li>
          <li>
            <span className="text-muted-foreground">/</span>
          </li>
          <li>
            <span className="text-foreground">Sepet</span>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Sepetim ({cart.itemCount} ürün)</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearCart}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Sepeti Temizle
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">📦</span>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">
                        <Link 
                          href={`/products/${item.product.id}`}
                          className="hover:text-primary"
                        >
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {item.product.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-bold text-primary">₺{item.product.price}</span>
                        {item.product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₺{item.product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <div className="font-bold">
                        ₺{(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Sipariş Özeti</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between">
                <span>Ara Toplam</span>
                <span>₺{cart.total.toFixed(2)}</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between">
                <span>Kargo</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>
                  {shipping === 0 ? 'Ücretsiz' : `₺${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping === 0 && (
                <p className="text-sm text-green-600">
                  🎉 500₺ ve üzeri alışverişlerde kargo ücretsiz!
                </p>
              )}
              {shipping > 0 && cart.total < 500 && (
                <p className="text-sm text-muted-foreground">
                  ₺{(500 - cart.total).toFixed(2)} daha alışveriş yapın, kargo ücretsiz olsun!
                </p>
              )}

              {/* Tax */}
              <div className="flex justify-between">
                <span>KDV (%18)</span>
                <span>₺{tax.toFixed(2)}</span>
              </div>

              <hr />

              {/* Total */}
              <div className="flex justify-between text-lg font-bold">
                <span>Toplam</span>
                <span>₺{finalTotal.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout">
                  Siparişi Tamamla
                </Link>
              </Button>

              {/* Continue Shopping */}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/products">
                  Alışverişe Devam Et
                </Link>
              </Button>

              {/* Security Info */}
              <div className="text-sm text-muted-foreground space-y-2 pt-4">
                <div className="flex items-center gap-2">
                  <span>🔒</span>
                  <span>256-bit SSL güvenli ödeme</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🚚</span>
                  <span>Ücretsiz iade ve değişim</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💯</span>
                  <span>%100 güvenli alışveriş</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Bunları da Beğenebilirsiniz</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Add recommended products here */}
          <div className="text-center text-muted-foreground py-8">
            Önerilen ürünler yüklenecek...
          </div>
        </div>
      </div>
    </div>
  )
}