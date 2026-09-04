import React from "react";

export interface Course {
  id: number;
  collegeId: number;
  name: string;
  duration: string;
  degree: string;
  fees: number;
  createdAt?: string;
}

interface CoursesSectionProps {
  courses: Course[];
}

export function CoursesSection({ courses }: CoursesSectionProps) {
  return (
    <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
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
              d="M12 14l9-5-9-5-9 5 9 5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            />
          </svg>
          Offered Courses ({courses.length})
        </h2>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-400 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
          No courses available for this college.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => {
            const formattedCourseFees = new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(course.fees);

            return (
              <div
                key={course.id}
                className="p-5 border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 rounded-xl flex flex-col justify-between hover:border-gray-200 dark:hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {course.name}
                  </h3>
                  <span className="px-2.5 py-0.5 text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50 rounded-full shrink-0">
                    {course.degree}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 pt-3 border-t border-gray-200/60 dark:border-gray-800/60 mt-2">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {course.duration}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm">
                    {formattedCourseFees}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
