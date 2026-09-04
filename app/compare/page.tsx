"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { College } from "@/components/CollegeCard";
import { Course } from "@/components/CoursesSection";
import { Placement } from "@/components/PlacementsSection";
import { Review } from "@/components/ReviewsSection";
import { Cutoff } from "@/components/CutoffsSection";
import { useCompare } from "@/hooks/useCompare";

interface DetailedCollegeData {
  college: College;
  courses: Course[];
  placements: Placement[];
  reviews: Review[];
  cutoffs: Cutoff[];
}

function CompareContent() {
  const searchParams = useSearchParams();
  const { compareIds, remove, clear, setAll, isMounted } = useCompare();

  const [comparedColleges, setComparedColleges] = useState<DetailedCollegeData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Sync URL query params ?ids=21,25,30 on initial load if provided
  useEffect(() => {
    const idsFromQuery = searchParams.get("ids");
    if (idsFromQuery) {
      const parsed = idsFromQuery
        .split(",")
        .map((s) => Number(s.trim()))
        .filter((id) => Number.isInteger(id) && id > 0);
      if (parsed.length > 0) {
        setAll(parsed);
      }
    }
  }, [searchParams, setAll]);

  // Fetch detailed data for all active compareIds
  useEffect(() => {
    if (!isMounted) return;

    let isSubscribed = true;

    async function loadCompareData() {
      if (compareIds.length === 0) {
        setComparedColleges([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await Promise.all(
          compareIds.map(async (id) => {
            const [cRes, crsRes, pRes, rRes, cutRes] = await Promise.all([
              fetch(`/api/colleges/${id}`),
              fetch(`/api/colleges/${id}/courses`),
              fetch(`/api/colleges/${id}/placements`),
              fetch(`/api/colleges/${id}/reviews`),
              fetch(`/api/colleges/${id}/cutoffs`),
            ]);

            if (!cRes.ok) {
              return null; // Handle missing or invalid college IDs
            }

            const cJson = await cRes.json();
            const crsJson = crsRes.ok ? await crsRes.json() : { data: [] };
            const pJson = pRes.ok ? await pRes.json() : { data: [] };
            const rJson = rRes.ok ? await rRes.json() : { data: [] };
            const cutJson = cutRes.ok ? await cutRes.json() : { data: [] };

            return {
              college: cJson.data,
              courses: crsJson.data || [],
              placements: pJson.data || [],
              reviews: rJson.data || [],
              cutoffs: cutJson.data || [],
            } as DetailedCollegeData;
          })
        );

        if (!isSubscribed) return;

        // Filter out any null responses (e.g. invalid/deleted IDs)
        const validResults = results.filter(
          (item): item is DetailedCollegeData => item !== null
        );

        setComparedColleges(validResults);
      } catch (err: unknown) {
        if (!isSubscribed) return;
        console.error("Error loading comparison data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load comparison data"
        );
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    }

    loadCompareData();

    return () => {
      isSubscribed = false;
    };
  }, [compareIds, isMounted]);

  // Compute calculated metrics
  const collegeMetrics = useMemo(() => {
    return comparedColleges.map((item) => {
      const avgReviewRating =
        item.reviews.length > 0
          ? item.reviews.reduce((acc, r) => acc + r.rating, 0) /
            item.reviews.length
          : item.college.rating;

      const placement = item.placements[0];

      return {
        id: item.college.id,
        avgReviewRating,
        reviewCount: item.reviews.length,
        placement,
      };
    });
  }, [comparedColleges]);

  if (!isMounted || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty State: 0 colleges selected
  if (compareIds.length === 0 || comparedColleges.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-200/60 dark:border-indigo-800/60">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
            Compare Colleges
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Select colleges to start comparing. You can compare up to 3 colleges side-by-side on fees, courses, placements, reviews, and cutoffs.
          </p>
          <Link
            href="/colleges"
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Explore Colleges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Compare Colleges
              </h1>
              <span className="px-3 py-1 text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 rounded-full">
                {comparedColleges.length} / 3 Selected
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Side-by-side comparison of fees, courses, placements, reviews, and cutoff ranks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={clear}
              className="px-3.5 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              Clear All
            </button>
            <Link
              href="/colleges"
              className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
            >
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Colleges
            </Link>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 p-4 text-sm text-red-800 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Comparison Matrix Table / Cards */}
        <div className="overflow-x-auto pb-6">
          <div className="min-w-[700px] grid grid-cols-1 gap-6">
            {/* 1. HEADER ROW: College Cards / Actions */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-4">
                Selected Colleges
              </h2>
              <div
                className={`grid gap-6 ${
                  comparedColleges.length === 1
                    ? "grid-cols-1"
                    : comparedColleges.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-3"
                }`}
              >
                {comparedColleges.map(({ college }) => {
                  const formattedFees = new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(college.fees);

                  return (
                    <div
                      key={college.id}
                      className="relative p-5 bg-gray-50/60 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/60 rounded-xl flex flex-col justify-between"
                    >
                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => remove(college.id)}
                        title={`Remove ${college.name} from compare`}
                        className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>

                      <div>
                        <Link
                          href={`/colleges/${college.id}`}
                          className="text-base font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors pr-6 block mb-2"
                        >
                          {college.name}
                        </Link>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                          {college.location}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-gray-200/60 dark:border-gray-700/60 flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {college.rating.toFixed(1)}
                        </span>
                        <span className="text-xs font-extrabold text-gray-900 dark:text-white">
                          {formattedFees} / yr
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Slot to Add Another College if < 3 */}
                {comparedColleges.length < 3 && (
                  <Link
                    href="/colleges"
                    className="p-5 border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-indigo-400 dark:hover:border-indigo-600 rounded-xl flex flex-col items-center justify-center text-center text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all group min-h-[140px]"
                  >
                    <svg
                      className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="text-xs font-bold">Add Another College</span>
                  </Link>
                )}
              </div>
            </div>

            {/* 2. BASIC INFORMATION SECTION */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-4">
                Basic Information
              </h2>
              <div
                className={`grid gap-6 ${
                  comparedColleges.length === 1
                    ? "grid-cols-1"
                    : comparedColleges.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-3"
                }`}
              >
                {comparedColleges.map(({ college }) => (
                  <div key={college.id} className="space-y-3">
                    <div>
                      <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase">
                        Location
                      </span>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {college.location}
                      </p>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase">
                        Rating
                      </span>
                      <p className="text-sm font-bold text-amber-600 dark:text-amber-400">
                        {college.rating.toFixed(1)} / 5.0
                      </p>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase">
                        Annual Fees
                      </span>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          maximumFractionDigits: 0,
                        }).format(college.fees)}
                      </p>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase">
                        Overview
                      </span>
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                        {college.overview}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. PLACEMENTS SECTION */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-4">
                Placement Statistics
              </h2>
              <div
                className={`grid gap-6 ${
                  comparedColleges.length === 1
                    ? "grid-cols-1"
                    : comparedColleges.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-3"
                }`}
              >
                {comparedColleges.map(({ college }, index) => {
                  const metric = collegeMetrics[index];
                  const placement = metric.placement;

                  return (
                    <div key={college.id} className="space-y-3">
                      {!placement ? (
                        <p className="text-xs text-gray-500 italic">No placement data</p>
                      ) : (
                        <>
                          <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 rounded-xl">
                            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase block">
                              Average Package
                            </span>
                            <span className="text-lg font-black text-gray-900 dark:text-white">
                              ₹{placement.averagePackage} LPA
                            </span>
                          </div>

                          <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 rounded-xl">
                            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase block">
                              Highest Package
                            </span>
                            <span className="text-lg font-black text-gray-900 dark:text-white">
                              ₹{placement.highestPackage} LPA
                            </span>
                          </div>

                          <div className="p-3 bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-xl">
                            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase block">
                              Placement Rate
                            </span>
                            <span className="text-lg font-black text-gray-900 dark:text-white">
                              {placement.placementRate}%
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. COURSES SECTION */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-4">
                Available Courses
              </h2>
              <div
                className={`grid gap-6 ${
                  comparedColleges.length === 1
                    ? "grid-cols-1"
                    : comparedColleges.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-3"
                }`}
              >
                {comparedColleges.map(({ college, courses }) => (
                  <div key={college.id}>
                    <span className="text-xs font-bold text-gray-900 dark:text-white block mb-2">
                      Total Courses: {courses.length}
                    </span>
                    {courses.length === 0 ? (
                      <p className="text-xs text-gray-500 italic">No courses available</p>
                    ) : (
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {courses.map((crs) => (
                          <div
                            key={crs.id}
                            className="p-2.5 bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 rounded-lg text-xs"
                          >
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {crs.name}
                            </div>
                            <div className="text-[11px] text-gray-500 dark:text-gray-400 flex justify-between mt-1">
                              <span>
                                {crs.degree} • {crs.duration}
                              </span>
                              <span className="font-bold text-gray-700 dark:text-gray-300">
                                ₹{(crs.fees / 1000).toFixed(0)}k
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 5. REVIEWS SECTION */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-4">
                Reviews & Feedback
              </h2>
              <div
                className={`grid gap-6 ${
                  comparedColleges.length === 1
                    ? "grid-cols-1"
                    : comparedColleges.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-3"
                }`}
              >
                {comparedColleges.map(({ college, reviews }, idx) => {
                  const metric = collegeMetrics[idx];

                  return (
                    <div key={college.id}>
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                          Avg: {metric.avgReviewRating.toFixed(1)} / 5.0
                        </span>
                        <span className="text-xs text-gray-500">
                          {reviews.length} Review{reviews.length !== 1 ? "s" : ""}
                        </span>
                      </div>

                      {reviews.length === 0 ? (
                        <p className="text-xs text-gray-500 italic">No reviews available</p>
                      ) : (
                        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                          {reviews.map((r) => (
                            <div
                              key={r.id}
                              className="p-2.5 bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 rounded-lg text-xs"
                            >
                              <div className="flex justify-between font-semibold text-gray-900 dark:text-white mb-1">
                                <span>{r.studentName}</span>
                                <span className="text-amber-500 font-bold">★ {r.rating}</span>
                              </div>
                              <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-snug line-clamp-2">
                                &ldquo;{r.comment}&rdquo;
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 6. CUTOFFS SECTION */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-4">
                Admission Cutoff Ranks
              </h2>
              <div
                className={`grid gap-6 ${
                  comparedColleges.length === 1
                    ? "grid-cols-1"
                    : comparedColleges.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-3"
                }`}
              >
                {comparedColleges.map(({ college, cutoffs }) => (
                  <div key={college.id}>
                    {cutoffs.length === 0 ? (
                      <p className="text-xs text-gray-500 italic">No cutoff ranks available</p>
                    ) : (
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {cutoffs.map((cut) => (
                          <div
                            key={cut.id}
                            className="p-2.5 bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 rounded-lg text-xs flex items-center justify-between"
                          >
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {cut.courseName}
                              </div>
                              <div className="text-[10px] text-gray-500">{cut.category}</div>
                            </div>
                            <span className="font-bold text-indigo-600 dark:text-indigo-400">
                              Rank {cut.cutoffRank}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-6 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  );
}

