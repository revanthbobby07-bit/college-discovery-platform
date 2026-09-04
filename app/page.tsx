import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full text-center">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-extrabold text-indigo-600 dark:text-indigo-400 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
          Higher Education & College Discovery Platform
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-6">
          Discover, Compare & Predict <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400">
            Top Indian Colleges
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Explore detailed institutional metrics, filter by fees and ratings, perform side-by-side college comparisons, and predict your admission chances using historical cutoff ranks.
        </p>

        {/* Action Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
          {/* Card 1: Explore Colleges */}
          <Link
            href="/colleges"
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-4 border border-indigo-200/60 dark:border-indigo-800/60 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                Explore Colleges
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Search through database-backed college profiles with instant location, fee, and rating filters.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Browse Colleges &rarr;
            </span>
          </Link>

          {/* Card 2: Compare Colleges */}
          <Link
            href="/compare"
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-4 border border-indigo-200/60 dark:border-indigo-800/60 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                Compare Colleges
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Select up to 3 colleges for side-by-side comparisons of courses, fees, placements, cutoffs, and reviews.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Compare Side-by-Side &rarr;
            </span>
          </Link>

          {/* Card 3: College Predictor */}
          <Link
            href="/predictor"
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-4 border border-indigo-200/60 dark:border-indigo-800/60 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                College Predictor
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Enter your exam rank and category to predict eligible course admissions matching historical cutoffs.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Predict Admission &rarr;
            </span>
          </Link>
        </div>

        {/* Footer info */}
        <footer className="text-xs text-gray-500 dark:text-gray-500 border-t border-gray-200 dark:border-gray-800 pt-6">
          Powered by Next.js 16 App Router & Prisma 8 PostgreSQL Database.
        </footer>
      </div>
    </div>
  );
}
