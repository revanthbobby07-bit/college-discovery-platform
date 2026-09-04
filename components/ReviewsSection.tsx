import React from "react";

export interface Review {
  id: number;
  collegeId: number;
  studentName: string;
  rating: number;
  comment: string;
  createdAt?: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
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
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        Student Reviews ({reviews.length})
      </h2>

      {reviews.length === 0 ? (
        <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-400 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
          No reviews available for this college yet.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-5 border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 rounded-xl flex flex-col gap-2"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0">
                    {review.studentName.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {review.studentName}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border border-amber-200/60 dark:border-amber-800/60 px-2.5 py-0.5 rounded-full">
                  <svg
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{review.rating.toFixed(1)}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-1">
                &ldquo;{review.comment}&rdquo;
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
