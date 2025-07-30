'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Filter, Grid, List, SlidersHorizontal, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

// Mock products data
const products = [
  {
    id: '1',
    name: 'Premium Kablosuz Kulaklık',
    description: 'Yüksek kaliteli ses deneyimi',
    price: 299.99,
    originalPrice: 399.99,
    image: '/placeholder-product.jpg',
    rating: 4.8,
    reviews: 124,
    category: 'Elektronik',
    brand: 'TechBrand'
  },
  {
    id: '2',
    name: 'Akıllı Saat Pro',
    description: 'Sağlık takibi ve bildirimler',
    price: 899.99,
    originalPrice: 1199.99,
    image: '/placeholder-product.jpg',
    rating: 4.9,
    reviews: 89,
    category: 'Elektronik',
    brand: 'SmartTech'
  },
  {
    id: '3',
    name: 'Gaming Mekanik Klavye',
    description: 'RGB aydınlatmalı mekanik tuşlar',
    price: 149.99,
    originalPrice: 199.99,
    image: '/placeholder-product.jpg',
    rating: 4.7,
    reviews: 256,
    category: 'Elektronik',
    brand: 'GamerTech'
  },
  {
    id: '4',
    name: 'USB-C Hub 7-in-1',
    description: 'Çoklu port genişletici',
    price: 79.99,
    originalPrice: 119.99,
    image: '/placeholder-product.jpg',
    rating: 4.6,
    reviews: 78,
    category: 'Elektronik',
    brand: 'ConnectTech'
  },
  {
    id: '5',
    name: 'Bluetooth Hoparlör',
    description: 'Taşınabilir güçlü ses',
    price: 159.99,
    originalPrice: 199.99,
    image: '/placeholder-product.jpg',
    rating: 4.5,
    reviews: 143,
    category: 'Elektronik',
    brand: 'AudioTech'
  },
  {
    id: '6',
    name: 'Wireless Mouse',
    description: 'Ergonomik tasarım',
    price: 49.99,
    originalPrice: 69.99,
    image: '/placeholder-product.jpg',
    rating: 4.4,
    reviews: 321,
    category: 'Elektronik',
    brand: 'TechBrand'
  }
]

const categories = ['Tümü', 'Elektronik', 'Giyim', 'Ev & Yaşam', 'Spor', 'Kitap']
const brands = ['Tümü', 'TechBrand', 'SmartTech', 'GamerTech', 'ConnectTech', 'AudioTech']
const sortOptions = [
  { value: 'default', label: 'Varsayılan' },
  { value: 'price-low', label: 'Fiyat: Düşükten Yükseğe' },
  { value: 'price-high', label: 'Fiyat: Yüksekten Düşüğe' },
  { value: 'rating', label: 'En Yüksek Puan' },
  { value: 'newest', label: 'En Yeni' }
]

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [selectedBrand, setSelectedBrand] = useState('Tümü')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [sortBy, setSortBy] = useState('default')

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'Tümü' && product.category !== selectedCategory) return false
    if (selectedBrand !== 'Tümü' && product.brand !== selectedBrand) return false
    if (priceRange.min && product.price < parseFloat(priceRange.min)) return false
    if (priceRange.max && product.price > parseFloat(priceRange.max)) return false
    return true
  })

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
            <span className="text-foreground">Ürünler</span>
          </li>
        </ol>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Ürünler</h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} ürün bulundu
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filtreler
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={`w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <Card>
            <CardHeader>
              <h3 className="font-semibold flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filtreler
              </h3>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Category Filter */}
              <div>
                <h4 className="font-medium mb-3">Kategori</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h4 className="font-medium mb-3">Marka</h4>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="radio"
                        name="brand"
                        value={brand}
                        checked={selectedBrand === brand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="mr-2"
                      />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h4 className="font-medium mb-3">Fiyat Aralığı</h4>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedCategory('Tümü')
                  setSelectedBrand('Tümü')
                  setPriceRange({ min: '', max: '' })
                }}
              >
                Filtreleri Temizle
              </Button>
            </CardContent>
          </Card>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <div className="aspect-square bg-muted overflow-hidden rounded-t-lg">
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-4xl">📦</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        <Link href={`/products/${product.id}`}>
                          {product.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary">₺{product.price}</span>
                        <span className="text-sm text-muted-foreground line-through">₺{product.originalPrice}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" size="sm">
                      Sepete Ekle
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map(product => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📦</span>
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-medium group-hover:text-primary transition-colors">
                          <Link href={`/products/${product.id}`}>
                            {product.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {product.description}
                        </p>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-muted-foreground">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-primary">₺{product.price}</span>
                            <span className="text-sm text-muted-foreground line-through">₺{product.originalPrice}</span>
                          </div>
                          <Button size="sm">
                            Sepete Ekle
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Aradığınız kriterlere uygun ürün bulunamadı.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}