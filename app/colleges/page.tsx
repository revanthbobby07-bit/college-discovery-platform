"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CollegeCard, College } from "@/components/CollegeCard";
import { SearchFilters, FilterValues } from "@/components/SearchFilters";
import { Pagination } from "@/components/Pagination";
import { useCompare } from "@/hooks/useCompare";

interface ApiResponse {
  data: College[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: string;
}

export default function CollegesPage() {
  const router = useRouter();
  const { count } = useCompare();

  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({
    search: "",
    location: "",
    minFees: "",
    maxFees: "",
    minRating: "",
  });

  const [page, setPage] = useState<number>(1);
  const limit = 6;

  const [colleges, setColleges] = useState<College[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 1,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState<number>(0);

  // Fetch colleges from /api/colleges whenever page, appliedFilters or reloadTrigger changes
  useEffect(() => {
    let isMounted = true;

    async function loadColleges() {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("limit", limit.toString());

        if (appliedFilters.search.trim()) {
          params.set("search", appliedFilters.search.trim());
        }
        if (appliedFilters.location.trim()) {
          params.set("location", appliedFilters.location.trim());
        }
        if (appliedFilters.minFees) {
          params.set("minFees", appliedFilters.minFees);
        }
        if (appliedFilters.maxFees) {
          params.set("maxFees", appliedFilters.maxFees);
        }
        if (appliedFilters.minRating) {
          params.set("minRating", appliedFilters.minRating);
        }

        const res = await fetch(`/api/colleges?${params.toString()}`);
        const json: ApiResponse = await res.json();

        if (!isMounted) return;

        if (!res.ok) {
          throw new Error(json.error || "Failed to load colleges");
        }

        setColleges(json.data || []);
        setPagination(
          json.pagination || {
            page,
            limit,
            total: json.data?.length || 0,
            totalPages: 1,
          }
        );
      } catch (err: unknown) {
        if (!isMounted) return;
        console.error("Error fetching colleges:", err);
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        setColleges([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadColleges();

    return () => {
      isMounted = false;
    };
  }, [appliedFilters, page, limit, reloadTrigger]);

  // Handle applying new filters
  const handleApplyFilters = (newFilters: FilterValues) => {
    setAppliedFilters(newFilters);
    setPage(1); // Reset to page 1 on new filter apply
  };

  // Handle clearing filters
  const handleClearFilters = () => {
    const emptyFilters: FilterValues = {
      search: "",
      location: "",
      minFees: "",
      maxFees: "",
      minRating: "",
    };
    setAppliedFilters(emptyFilters);
    setPage(1);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = () => {
    setReloadTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Explore Colleges
            </h1>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-2xl">
              Discover top-ranked engineering, technology, and higher education institutes across India. Filter by fees, location, and rating to find your ideal campus.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
            <Link
              href="/predictor"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors shadow-sm"
            >
              <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Predictor
            </Link>

            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Compare ({count}/3)
            </Link>
          </div>
        </header>

        {/* Search & Filters */}
        <SearchFilters
          key={JSON.stringify(appliedFilters)}
          initialValues={appliedFilters}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          isLoading={isLoading}
        />

        {/* Error State Banner */}
        {error && (
          <div className="mb-8 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 p-4 text-sm text-red-800 dark:text-red-300 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-red-500 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={handleRetry}
              className="px-3 py-1.5 text-xs font-semibold bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg text-red-900 dark:text-red-100 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Content Area */}
        {isLoading ? (
          /* Loading State: Skeleton Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: limit }).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm animate-pulse flex flex-col justify-between h-64"
              >
                <div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : colleges.length === 0 && !error ? (
          /* Empty State */
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-12 text-center my-6">
            <svg
              className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              No Colleges Found
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
              We couldn&apos;t find any colleges matching your search criteria. Try adjusting or clearing your filters.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          /* Success State: Colleges Grid */
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colleges.map((college) => (
                <CollegeCard
                  key={college.id}
                  college={college}
                  onViewDetails={(c) => {
                    router.push(`/colleges/${c.id}`);
                  }}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              totalItems={pagination.total}
              limit={pagination.limit}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          </>
        )}
      </div>
    </div>
  );
}
