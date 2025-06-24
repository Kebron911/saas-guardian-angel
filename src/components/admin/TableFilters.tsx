
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Filter, SortAsc, SortDesc, Search, X } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

interface FilterOption {
  value: string;
  label: string;
}

interface SortOption {
  value: string;
  label: string;
}

interface TableFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortValue?: string;
  onSortChange?: (value: string) => void;
  sortDirection?: 'asc' | 'desc';
  onSortDirectionChange?: (direction: 'asc' | 'desc') => void;
  sortOptions?: SortOption[];
  filters?: {
    key: string;
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
  }[];
  dateRange?: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onDateRangeChange?: (range: { from: Date | undefined; to: Date | undefined }) => void;
  onClearFilters?: () => void;
  searchPlaceholder?: string;
}

export const TableFilters: React.FC<TableFiltersProps> = ({
  searchValue,
  onSearchChange,
  sortValue,
  onSortChange,
  sortDirection = 'asc',
  onSortDirectionChange,
  sortOptions = [],
  filters = [],
  dateRange,
  onDateRangeChange,
  onClearFilters,
  searchPlaceholder = "Search..."
}) => {
  const hasActiveFilters = sortValue || filters.some(f => f.value && f.value !== 'all') || dateRange?.from || dateRange?.to;

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input 
          placeholder={searchPlaceholder}
          className="pl-10"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Sort */}
      {sortOptions.length > 0 && onSortChange && (
        <div className="flex gap-2">
          <Select value={sortValue} onValueChange={onSortChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {sortValue && onSortDirectionChange && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => onSortDirectionChange(sortDirection === 'asc' ? 'desc' : 'asc')}
            >
              {sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </Button>
          )}
        </div>
      )}

      {/* Filters */}
      {filters.map((filter) => (
        <Select key={filter.key} value={filter.value} onValueChange={filter.onChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder={filter.label} />
          </SelectTrigger>
          <SelectContent>
            {filter.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}

      {/* Date Range */}
      {dateRange && onDateRangeChange && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange as DateRange}
              onSelect={(range: DateRange | undefined) => 
                onDateRangeChange({ 
                  from: range?.from || undefined, 
                  to: range?.to || undefined 
                })
              }
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && onClearFilters && (
        <Button variant="outline" onClick={onClearFilters} className="flex items-center gap-2">
          <X className="h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  );
};
