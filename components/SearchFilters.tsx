import React, { useState } from "react";

export interface FilterValues {
  search: string;
  location: string;
  minFees: string;
  maxFees: string;
  minRating: string;
}

interface SearchFiltersProps {
  initialValues: FilterValues;
  onApply: (filters: FilterValues) => void;
  onClear: () => void;
  isLoading?: boolean;
}

export function SearchFilters({
  initialValues,
  onApply,
  onClear,
  isLoading = false,
}: SearchFiltersProps) {
  const [filters, setFilters] = useState<FilterValues>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(filters);
  };

  const handleClear = () => {
    const emptyFilters: FilterValues = {
      search: "",
      location: "",
      minFees: "",
      maxFees: "",
      minRating: "",
    };
    setFilters(emptyFilters);
    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm mb-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Search Input */}
        <div>
          <label
            htmlFor="search"
            className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5"
          >
            College Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="e.g. IIT Bombay"
              disabled={isLoading}
              className="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Location Input */}
        <div>
          <label
            htmlFor="location"
            className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5"
          >
            Location / City
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="e.g. Mumbai, Delhi"
            disabled={isLoading}
            className="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
          />
        </div>

        {/* Min Fees */}
        <div>
          <label
            htmlFor="minFees"
            className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5"
          >
            Min Fees (₹)
          </label>
          <input
            type="number"
            id="minFees"
            name="minFees"
            min="0"
            step="10000"
            value={filters.minFees}
            onChange={handleChange}
            placeholder="e.g. 100000"
            disabled={isLoading}
            className="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
          />
        </div>

        {/* Max Fees */}
        <div>
          <label
            htmlFor="maxFees"
            className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5"
          >
            Max Fees (₹)
          </label>
          <input
            type="number"
            id="maxFees"
            name="maxFees"
            min="0"
            step="10000"
            value={filters.maxFees}
            onChange={handleChange}
            placeholder="e.g. 300000"
            disabled={isLoading}
            className="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
          />
        </div>

        {/* Min Rating Filter */}
        <div>
          <label
            htmlFor="minRating"
            className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5"
          >
            Min Rating
          </label>
          <select
            id="minRating"
            name="minRating"
            value={filters.minRating}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
          >
            <option value="">Any Rating</option>
            <option value="4.8">4.8+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
        <button
          type="button"
          onClick={handleClear}
          disabled={isLoading}
          className="px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
        >
          Clear Filters
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Applying...
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search / Apply
            </>
          )}
        </button>
      </div>
    </form>
  );
}
