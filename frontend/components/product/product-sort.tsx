"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SortOption } from "@/types";

interface ProductSortProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
}

export function ProductSort({ options, value, onChange }: ProductSortProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}