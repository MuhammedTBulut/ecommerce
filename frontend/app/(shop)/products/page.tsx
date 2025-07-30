'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from '@/components/product/product-card'
import { ProductFilters } from '@/components/product/product-filters'
import { Button } from '@/components/ui/button'
import { Product, ProductFilter, Category } from '@/types'
import { Grid, List, ChevronLeft, ChevronRight } from 'lucide-react'

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and superior sound quality.',
    price: 199.99,
    imageUrl: '/placeholder-product.jpg',
    categoryId: '1',
    stock: 25,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and smartphone connectivity.',
    price: 299.99,
    imageUrl: '/placeholder-product.jpg',
    categoryId: '1',
    stock: 15,
    isActive: true,
    createdAt: '2024-01-14T10:00:00Z',
    updatedAt: '2024-01-14T10:00:00Z'
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt available in multiple colors.',
    price: 29.99,
    imageUrl: '/placeholder-product.jpg',
    categoryId: '2',
    stock: 3,
    isActive: true,
    createdAt: '2024-01-13T10:00:00Z',
    updatedAt: '2024-01-13T10:00:00Z'
  },
  {
    id: '4',
    name: 'Modern Desk Lamp',
    description: 'Sleek LED desk lamp with adjustable brightness and color temperature.',
    price: 89.99,
    imageUrl: '/placeholder-product.jpg',
    categoryId: '3',
    stock: 0,
    isActive: false,
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z'
  },
  {
    id: '5',
    name: 'Professional Camera',
    description: 'High-resolution DSLR camera perfect for professional photography and videography.',
    price: 1299.99,
    imageUrl: '/placeholder-product.jpg',
    categoryId: '1',
    stock: 8,
    isActive: true,
    createdAt: '2024-01-11T10:00:00Z',
    updatedAt: '2024-01-11T10:00:00Z'
  },
  {
    id: '6',
    name: 'Leather Jacket',
    description: 'Premium genuine leather jacket with classic design and superior craftsmanship.',
    price: 399.99,
    imageUrl: '/placeholder-product.jpg',
    categoryId: '2',
    stock: 12,
    isActive: true,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  }
]

const mockCategories: Category[] = [
  { id: '1', name: 'Electronics', isActive: true, createdAt: '2024-01-01T10:00:00Z', updatedAt: '2024-01-01T10:00:00Z' },
  { id: '2', name: 'Fashion', isActive: true, createdAt: '2024-01-01T10:00:00Z', updatedAt: '2024-01-01T10:00:00Z' },
  { id: '3', name: 'Home & Garden', isActive: true, createdAt: '2024-01-01T10:00:00Z', updatedAt: '2024-01-01T10:00:00Z' }
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const productsPerPage = 6

  const handleFilterChange = (filters: ProductFilter) => {
    setIsLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      let filteredProducts = [...mockProducts]

      // Apply filters
      if (filters.searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(filters.searchTerm!.toLowerCase()) ||
          product.description.toLowerCase().includes(filters.searchTerm!.toLowerCase())
        )
      }

      if (filters.categoryId) {
        filteredProducts = filteredProducts.filter(product => product.categoryId === filters.categoryId)
      }

      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(product => product.price >= filters.minPrice!)
      }

      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(product => product.price <= filters.maxPrice!)
      }

      // Apply sorting
      if (filters.sortBy) {
        filteredProducts.sort((a, b) => {
          let aValue: any = a[filters.sortBy as keyof Product]
          let bValue: any = b[filters.sortBy as keyof Product]

          if (filters.sortBy === 'createdAt') {
            aValue = new Date(aValue).getTime()
            bValue = new Date(bValue).getTime()
          }

          if (filters.sortOrder === 'desc') {
            return aValue > bValue ? -1 : 1
          }
          return aValue < bValue ? -1 : 1
        })
      }

      setProducts(filteredProducts)
      setCurrentPage(1)
      setIsLoading(false)
    }, 500)
  }

  // Pagination
  const totalPages = Math.ceil(products.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = products.slice(startIndex, endIndex)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <p className="text-muted-foreground">
          Discover our wide range of high-quality products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <ProductFilters onFilterChange={handleFilterChange} categories={mockCategories} />
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* View Mode Toggle and Results Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} products
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">View:</span>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            </div>
          )}

          {/* Products Grid/List */}
          {!isLoading && (
            <>
              {currentProducts.length > 0 ? (
                <div className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }>
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                  <Button variant="outline" onClick={() => handleFilterChange({})}>
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <div className="flex space-x-1">
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1
                      return (
                        <Button
                          key={page}
                          variant={page === currentPage ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      )
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}