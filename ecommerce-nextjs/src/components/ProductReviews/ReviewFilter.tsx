'use client';

interface ReviewFilterProps {
  totalReviews: number;
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function ReviewFilter({
  totalReviews,
  currentFilter,
  onFilterChange,
  sortBy,
  onSortChange
}: ReviewFilterProps) {
  const filterOptions = [
    { value: 'all', label: 'All Reviews', count: totalReviews },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-full border transition-colors
                ${currentFilter === option.value
                  ? 'bg-orange-600 text-white border-orange-600'
                  : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              {option.label}
              {option.count !== undefined && (
                <span className="ml-1 text-xs">
                  ({option.count})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}