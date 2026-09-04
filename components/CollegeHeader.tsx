"use client";

import React, { useState } from "react";
import Link from "next/link";
import { College } from "@/components/CollegeCard";
import { useCompare } from "@/hooks/useCompare";

interface CollegeHeaderProps {
  college: College;
}

export function CollegeHeader({ college }: CollegeHeaderProps) {
  const { isCompared, add, remove, count } = useCompare();
  const compared = isCompared(college.id);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const formattedFees = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(college.fees);

  const handleToggleCompare = () => {
    if (compared) {
      remove(college.id);
      setToastMessage(null);
    } else {
      const res = add(college.id);
      if (!res.success && res.message) {
        setToastMessage(res.message);
        setTimeout(() => setToastMessage(null), 4000);
      } else {
        setToastMessage(null);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm mb-8 relative">
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-amber-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-bounce z-20">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link
          href="/colleges"
          className="inline-flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
        >
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Colleges
        </Link>

        {/* Compare link badge */}
        <Link
          href="/compare"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 hover:bg-indigo-100 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Compare ({count}/3)
        </Link>
      </div>

      {/* Main Header Content */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex-1">
          {/* Title & Rating */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {college.name}
            </h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200/70 dark:border-amber-800/70 text-sm font-bold shrink-0">
              <svg
                className="w-4 h-4 fill-amber-400 text-amber-400"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{college.rating.toFixed(1)} / 5.0</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
            <svg
              className="w-4 h-4 mr-1.5 text-gray-400 dark:text-gray-500 shrink-0"
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
            <span>{college.location}</span>
          </div>

          {/* Quick Overview */}
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
            {college.overview}
          </p>
        </div>

        {/* Action Box: Fees & Compare */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-800 shrink-0">
          <div className="text-left md:text-right">
            <span className="block text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Avg Annual Fees
            </span>
            <span className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
              {formattedFees}
            </span>
          </div>

          <button
            type="button"
            onClick={handleToggleCompare}
            className={`inline-flex items-center px-4 py-2.5 text-xs font-bold rounded-xl transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              compared
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {compared ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              )}
            </svg>
            {compared ? "Added to Compare" : "Add to Compare"}
          </button>
        </div>
      </div>
    </div>
  );
}
