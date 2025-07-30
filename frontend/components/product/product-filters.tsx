'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Combobox } from '@/components/ui/combobox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductFilter } from '@/types'
import { Search, Filter, X } from 'lucide-react'

interface ProductFiltersProps {
  onFilterChange: (filters: ProductFilter) => void
  categories: { id: string; name: string }[]
}

export function ProductFilters({ onFilterChange, categories }: ProductFiltersProps) {
  const [filters, setFilters] = useState<ProductFilter>({})
  const [isOpen, setIsOpen] = useState(false)

  const categoryOptions = [
    { label: 'All Categories', value: '' },
    ...categories.map(cat => ({ label: cat.name, value: cat.id }))
  ]

  const sortOptions = [
    { label: 'Name (A-Z)', value: 'name-asc' },
    { label: 'Name (Z-A)', value: 'name-desc' },
    { label: 'Price (Low to High)', value: 'price-asc' },
    { label: 'Price (High to Low)', value: 'price-desc' },
    { label: 'Newest First', value: 'date-desc' },
    { label: 'Oldest First', value: 'date-asc' }
  ]

  const updateFilter = (key: keyof ProductFilter, value: string | number) => {
    const newFilters = { ...filters, [key]: value || undefined }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const emptyFilters: ProductFilter = {}
    setFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '')

  return (
    <div className="space-y-4">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={`space-y-4 ${isOpen ? 'block' : 'hidden md:block'}`}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Filters</CardTitle>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={filters.searchTerm || ''}
                  onChange={(e) => updateFilter('searchTerm', e.target.value)}
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Combobox
                options={categoryOptions}
                value={filters.categoryId || ''}
                onValueChange={(value) => updateFilter('categoryId', value)}
                placeholder="Select category..."
              />
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range</label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice || ''}
                  onChange={(e) => updateFilter('minPrice', parseFloat(e.target.value))}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice || ''}
                  onChange={(e) => updateFilter('maxPrice', parseFloat(e.target.value))}
                />
              </div>
            </div>

            {/* Sort */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Combobox
                options={sortOptions}
                value={`${filters.sortBy || 'name'}-${filters.sortOrder || 'asc'}`}
                onValueChange={(value) => {
                  const [sortBy, sortOrder] = value.split('-') as [string, 'asc' | 'desc']
                  updateFilter('sortBy', sortBy)
                  updateFilter('sortOrder', sortOrder)
                }}
                placeholder="Select sort order..."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}