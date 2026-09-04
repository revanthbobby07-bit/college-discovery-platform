import React from "react";

export interface Cutoff {
  id: number;
  collegeId: number;
  courseName: string;
  category: string;
  cutoffRank: number;
  createdAt?: string;
}

interface CutoffsSectionProps {
  cutoffs: Cutoff[];
}

export function CutoffsSection({ cutoffs }: CutoffsSectionProps) {
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        Admission Cutoffs ({cutoffs.length})
      </h2>

      {cutoffs.length === 0 ? (
        <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-400 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
          No cutoff rank information available for this college.
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-100 dark:border-gray-800 rounded-xl">
          <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-50 dark:bg-gray-800/60 text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th scope="col" className="px-5 py-3.5">
                  Course Name
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Category
                </th>
                <th scope="col" className="px-5 py-3.5 text-right">
                  Cutoff Rank
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80 bg-white dark:bg-gray-900">
              {cutoffs.map((cutoff) => (
                <tr
                  key={cutoff.id}
                  className="hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white">
                    {cutoff.courseName}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                      {cutoff.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-bold text-indigo-600 dark:text-indigo-400">
                    {cutoff.cutoffRank.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
