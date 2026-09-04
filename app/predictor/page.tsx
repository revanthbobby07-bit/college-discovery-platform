"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useCompare } from "@/hooks/useCompare";

interface PredictorResult {
  collegeId: number;
  collegeName: string;
  courseName: string;
  category: string;
  cutoffRank: number;
}

interface ApiResponse {
  data?: PredictorResult[];
  count?: number;
  message?: string;
  error?: string;
}

const CATEGORIES = ["General", "OBC", "SC", "ST", "EWS"];

export default function PredictorPage() {
  const { count: compareCount } = useCompare();

  const [rankInput, setRankInput] = useState<string>("");
  const [categoryInput, setCategoryInput] = useState<string>("General");

  const [validationError, setValidationError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const [results, setResults] = useState<PredictorResult[]>([]);
  const [emptyMessage, setEmptyMessage] = useState<string | null>(null);

  const handlePredict = async (e: FormEvent) => {
    e.preventDefault();

    setValidationError(null);
    setApiError(null);
    setEmptyMessage(null);

    // Validate Rank: required, positive integer (> 0)
    const trimmedRank = rankInput.trim();
    if (!trimmedRank) {
      setValidationError("Please enter your entrance exam rank.");
      return;
    }

    const parsedRank = Number(trimmedRank);
    if (isNaN(parsedRank) || !Number.isInteger(parsedRank) || parsedRank <= 0) {
      setValidationError("Rank must be a valid positive integer greater than 0.");
      return;
    }

    // Validate Category
    if (!categoryInput || !categoryInput.trim()) {
      setValidationError("Please select a valid category.");
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch("/api/predictor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rank: parsedRank,
          category: categoryInput.trim(),
        }),
      });

      const json: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to fetch predictions.");
      }

      const returnedData = json.data || [];
      setResults(returnedData);

      if (returnedData.length === 0) {
        setEmptyMessage(
          json.message || "No colleges found for your rank and category."
        );
      }
    } catch (err: unknown) {
      console.error("Predictor error:", err);
      setApiError(
        err instanceof Error ? err.message : "An unexpected error occurred while fetching predictions."
      );
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRankInput("");
    setCategoryInput("General");
    setValidationError(null);
    setApiError(null);
    setEmptyMessage(null);
    setResults([]);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Bar */}
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                College Predictor
              </h1>
              <span className="px-3 py-1 text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 rounded-full">
                Database Driven
              </span>
            </div>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-2xl">
              Enter your entrance exam rank and candidate category to discover matching college and course options based on admission cutoffs.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
            <Link
              href="/compare"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors shadow-sm"
            >
              <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Compare ({compareCount})
            </Link>

            <Link
              href="/colleges"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Colleges
            </Link>
          </div>
        </header>

        {/* Guidance / Disclaimer Banner */}
        <div className="mb-8 p-4 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 rounded-2xl flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
          <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <span className="font-bold block mb-0.5">Indicative Demo Cutoffs Notice</span>
            Recommendations are generated directly from historical cutoff ranks recorded in our platform database. Please use these results as an indicative guide rather than official admission confirmation.
          </div>
        </div>

        {/* Predictor Form Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm mb-10">
          <form onSubmit={handlePredict} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 items-end">
              {/* Rank Input */}
              <div className="lg:col-span-5">
                <label
                  htmlFor="rank-input"
                  className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2"
                >
                  Entrance Exam Rank <span className="text-red-500">*</span>
                </label>
                <input
                  id="rank-input"
                  type="number"
                  min="1"
                  step="1"
                  value={rankInput}
                  onChange={(e) => setRankInput(e.target.value)}
                  placeholder="e.g. 5000"
                  className={`w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 transition-colors text-gray-900 dark:text-white ${
                    validationError
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-gray-300 dark:border-gray-700 focus:ring-indigo-500/20 focus:border-indigo-500"
                  }`}
                />
              </div>

              {/* Category Dropdown */}
              <div className="lg:col-span-4">
                <label
                  htmlFor="category-select"
                  className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category-select"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors text-gray-900 dark:text-white"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Form Buttons */}
              <div className="lg:col-span-3 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Predicting...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Predict Colleges
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isLoading}
                  className="px-3.5 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Validation Inline Error */}
            {validationError && (
              <div className="mt-3 text-xs font-medium text-red-600 dark:text-red-400 flex items-center gap-1.5">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {validationError}
              </div>
            )}
          </form>
        </div>

        {/* API Error Banner */}
        {apiError && (
          <div className="mb-8 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 p-4 text-sm text-red-800 dark:text-red-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{apiError}</span>
            </div>
            <button
              onClick={handlePredict}
              className="text-xs font-bold underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State Skeletons */}
        {isLoading && (
          <div>
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-6 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        )}

        {/* Results Area */}
        {!isLoading && hasSearched && (
          <div>
            {/* Header Result Count */}
            {results.length > 0 && (
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  Matching Recommendations
                  <span className="px-3 py-0.5 text-xs font-extrabold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 rounded-full">
                    {results.length} matching college/course option{results.length !== 1 ? "s" : ""}
                  </span>
                </h2>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Rank &le; Cutoff
                </span>
              </div>
            )}

            {/* Empty State */}
            {results.length === 0 && !apiError && (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center max-w-lg mx-auto shadow-sm">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200 dark:border-gray-700">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  No colleges found for your rank and category.
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                  {emptyMessage || "Try adjusting your rank or selecting a different category to explore available cutoff options."}
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
                >
                  Try Another Search
                </button>
              </div>
            )}

            {/* Results Grid */}
            {results.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((item, index) => (
                  <div
                    key={`${item.collegeId}-${item.courseName}-${index}`}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-indigo-400 dark:hover:border-indigo-600 rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 rounded-lg">
                          ID: #{item.collegeId}
                        </span>
                        <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60 rounded-lg">
                          Category: {item.category}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2 line-clamp-2">
                        {item.collegeName}
                      </h3>

                      <div className="mb-4">
                        <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase block mb-1">
                          Course
                        </span>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                          {item.courseName}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase block">
                          Cutoff Rank
                        </span>
                        <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                          {item.cutoffRank.toLocaleString()}
                        </span>
                      </div>

                      <Link
                        href={`/colleges/${item.collegeId}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline transition-colors"
                      >
                        View College
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Initial Prompt State (before search) */}
        {!hasSearched && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-10 text-center shadow-sm">
            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-200/60 dark:border-indigo-800/60">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              Ready to Predict Your College Chances?
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Enter your exam rank and category in the form above and click &quot;Predict Colleges&quot; to see matching programs based on historical cutoff ranks.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
