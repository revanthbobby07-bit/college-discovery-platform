"use client";

import React, { useState } from "react";
import { useCompare } from "@/hooks/useCompare";

export interface College {
  id: number;
  name: string;
  location: string;
  city: string;
  state: string;
  fees: number;
  rating: number;
  overview: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CollegeCardProps {
  college: College;
  onViewDetails?: (college: College) => void;
}

export function CollegeCard({ college, onViewDetails }: CollegeCardProps) {
  const { isCompared, add, remove } = useCompare();
  const compared = isCompared(college.id);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Format fees into Indian Rupees currency format
  const formattedFees = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(college.fees);

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (compared) {
      remove(college.id);
      setToastMessage(null);
    } else {
      const res = add(college.id);
      if (!res.success && res.message) {
        setToastMessage(res.message);
        setTimeout(() => setToastMessage(null), 3000);
      } else {
        setToastMessage(null);
      }
    }
  };

  return (
    <div className="group flex flex-col justify-between rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-md z-10 animate-bounce">
          {toastMessage}
        </div>
      )}

      <div>
        {/* Header: Name and Rating Badge */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
            {college.name}
          </h3>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60 text-xs font-bold shrink-0">
            <svg
              className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{college.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <svg
            className="w-4 h-4 mr-1.5 shrink-0 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="truncate">{college.location}</span>
        </div>

        {/* Short Overview */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-6 leading-relaxed">
          {college.overview}
        </p>
      </div>

      {/* Footer: Fees, Compare Action and View Details */}
      <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3 mt-auto">
        <div>
          <span className="block text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Annual Fees
          </span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            {formattedFees}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleCompare}
            title={compared ? "Remove from comparison" : "Add to comparison"}
            className={`p-2 rounded-lg text-xs font-semibold border transition-colors ${
              compared
                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {compared ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              )}
            </svg>
          </button>

          <button
            type="button"
            onClick={() => onViewDetails?.(college)}
            className="inline-flex items-center justify-center px-3 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            View Details
            <svg
              className="w-3.5 h-3.5 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
