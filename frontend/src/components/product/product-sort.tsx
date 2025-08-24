'use client';

import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/stores/ui';
import { useState } from 'react';

const sortOptions = [
  { value: 'name' as const, label: 'Name A-Z', order: 'asc' as const },
  { value: 'name' as const, label: 'Name Z-A', order: 'desc' as const },
  { value: 'price' as const, label: 'Price: Low to High', order: 'asc' as const },
  { value: 'price' as const, label: 'Price: High to Low', order: 'desc' as const },
  { value: 'rating' as const, label: 'Highest Rated', order: 'desc' as const },
  { value: 'created' as const, label: 'Newest First', order: 'desc' as const },
  { value: 'popularity' as const, label: 'Most Popular', order: 'desc' as const },
];

export function ProductSort() {
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useUIStore();
  const [isOpen, setIsOpen] = useState(false);

  const currentSort = sortOptions.find(
    option => option.value === sortBy && option.order === sortOrder
  ) || sortOptions[0];

  const handleSortChange = (option: typeof sortOptions[0]) => {
    setSortBy(option.value);
    setSortOrder(option.order);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="min-w-[180px] justify-between"
      >
        <span className="text-sm">Sort: {currentSort.label}</span>
        <ChevronDown className="h-4 w-4 ml-2" />
      </Button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20">
            <div className="py-1">
              {sortOptions.map((option) => (
                <button
                  key={`${option.value}-${option.order}`}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    option.value === sortBy && option.order === sortOrder
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700'
                  }`}
                  onClick={() => handleSortChange(option)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}