"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { College } from "@/components/CollegeCard";
import { CollegeHeader } from "@/components/CollegeHeader";
import { CoursesSection, Course } from "@/components/CoursesSection";
import { PlacementsSection, Placement } from "@/components/PlacementsSection";
import { ReviewsSection, Review } from "@/components/ReviewsSection";
import { CutoffsSection, Cutoff } from "@/components/CutoffsSection";

interface CollegeDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function CollegeDetailsPage({ params }: CollegeDetailsPageProps) {
  const { id } = use(params);

  const [college, setCollege] = useState<College | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [cutoffs, setCutoffs] = useState<Cutoff[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAllCollegeData() {
      setIsLoading(true);
      setNotFound(false);
      setError(null);

      try {
        // Fetch college basic details first
        const collegeRes = await fetch(`/api/colleges/${id}`);
        const collegeJson = await collegeRes.json();

        if (!isMounted) return;

        if (collegeRes.status === 404) {
          setNotFound(true);
          return;
        }

        if (!collegeRes.ok) {
          throw new Error(collegeJson.error || "Failed to load college details");
        }

        setCollege(collegeJson.data);

        // Fetch related data in parallel
        const [coursesRes, placementsRes, reviewsRes, cutoffsRes] =
          await Promise.all([
            fetch(`/api/colleges/${id}/courses`),
            fetch(`/api/colleges/${id}/placements`),
            fetch(`/api/colleges/${id}/reviews`),
            fetch(`/api/colleges/${id}/cutoffs`),
          ]);

        const [coursesJson, placementsJson, reviewsJson, cutoffsJson] =
          await Promise.all([
            coursesRes.json(),
            placementsRes.json(),
            reviewsRes.json(),
            cutoffsRes.json(),
          ]);

        if (!isMounted) return;

        setCourses(coursesJson.data || []);
        setPlacements(placementsJson.data || []);
        setReviews(reviewsJson.data || []);
        setCutoffs(cutoffsJson.data || []);
      } catch (err: unknown) {
        if (!isMounted) return;
        console.error("Error fetching college details:", err);
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (id) {
      loadAllCollegeData();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  // 404 State: College Not Found
  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200/60 dark:border-amber-800/60">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
            College Not Found
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            The college with ID &ldquo;{id}&rdquo; does not exist or may have been removed.
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Explore Colleges
          </Link>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200/60 dark:border-red-800/60">
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Failed to Load College Details
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            {error}
          </p>
          <Link
            href="/colleges"
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Back to Colleges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {isLoading || !college ? (
          /* Loading Skeleton */
          <div className="space-y-8 animate-pulse">
            <div className="h-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
            </div>
            <div className="h-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6"></div>
            <div className="h-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6"></div>
          </div>
        ) : (
          /* Loaded College Content */
          <>
            {/* Header Section */}
            <CollegeHeader college={college} />

            {/* Courses Section */}
            <CoursesSection courses={courses} />

            {/* Placements Section */}
            <PlacementsSection placements={placements} />

            {/* Reviews Section */}
            <ReviewsSection reviews={reviews} />

            {/* Cutoffs Section */}
            <CutoffsSection cutoffs={cutoffs} />
          </>
        )}
      </div>
    </div>
  );
}
