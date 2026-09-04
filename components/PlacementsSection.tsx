import React from "react";

export interface Placement {
  id: number;
  collegeId: number;
  averagePackage: number;
  highestPackage: number;
  placementRate: number;
  createdAt?: string;
}

interface PlacementsSectionProps {
  placements: Placement[];
}

export function PlacementsSection({ placements }: PlacementsSectionProps) {
  const placement = placements[0];

  return (
    <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
        Placement Statistics
      </h2>

      {!placement ? (
        <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-400 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
          No placement data available for this college.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Average Package */}
          <div className="p-5 bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-xl text-center">
            <span className="block text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
              Average Package
            </span>
            <span className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
              ₹{placement.averagePackage} LPA
            </span>
          </div>

          {/* Highest Package */}
          <div className="p-5 bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 rounded-xl text-center">
            <span className="block text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
              Highest Package
            </span>
            <span className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
              ₹{placement.highestPackage} LPA
            </span>
          </div>

          {/* Placement Rate */}
          <div className="p-5 bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-xl text-center">
            <span className="block text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              Placement Rate
            </span>
            <span className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
              {placement.placementRate}%
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
