'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Footer() {
  return (
    <footer className="bg-muted/30 mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-primary" />
              <span className="font-bold text-xl">ECommerce</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Modern ve güvenilir e-ticaret deneyimi için en kaliteli ürünleri sizlere sunuyoruz.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Hızlı Linkler</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary">
                Hakkımızda
              </Link>
              <Link href="/contact" className="block text-sm text-muted-foreground hover:text-primary">
                İletişim
              </Link>
              <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-primary">
                Gizlilik Politikası
              </Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-primary">
                Kullanım Şartları
              </Link>
              <Link href="/shipping" className="block text-sm text-muted-foreground hover:text-primary">
                Kargo Bilgileri
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Kategoriler</h3>
            <div className="space-y-2">
              <Link href="/categories/electronics" className="block text-sm text-muted-foreground hover:text-primary">
                Elektronik
              </Link>
              <Link href="/categories/clothing" className="block text-sm text-muted-foreground hover:text-primary">
                Giyim
              </Link>
              <Link href="/categories/home" className="block text-sm text-muted-foreground hover:text-primary">
                Ev & Yaşam
              </Link>
              <Link href="/categories/sports" className="block text-sm text-muted-foreground hover:text-primary">
                Spor
              </Link>
              <Link href="/categories/books" className="block text-sm text-muted-foreground hover:text-primary">
                Kitap
              </Link>
            </div>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Bülten</h3>
            <p className="text-sm text-muted-foreground">
              Kampanya ve yeni ürünlerden haberdar olun.
            </p>
            <div className="flex space-x-2">
              <Input placeholder="E-posta adresiniz" className="flex-1" />
              <Button size="sm">Abone Ol</Button>
            </div>
            
            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+90 212 555 0123</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@ecommerce.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 ECommerce. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}