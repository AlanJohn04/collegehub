import Link from 'next/link';
import { ArrowRight, BookOpen, Building2, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Right College</span> For You
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Explore thousands of colleges, compare fees and placements, and make the best decision for your future.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/colleges" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2">
            Explore Colleges <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/compare" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-full font-semibold text-lg transition-all shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center">
            Compare Options
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full mt-32">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
          <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6">
            <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Extensive Listings</h3>
          <p className="text-slate-600 dark:text-slate-400">Browse through thousands of top-rated engineering, medical, and management colleges.</p>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
          <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-6">
            <TrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Placement Insights</h3>
          <p className="text-slate-600 dark:text-slate-400">Get detailed data on average packages, top recruiters, and ROI for every college.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
          <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6">
            <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Student Reviews</h3>
          <p className="text-slate-600 dark:text-slate-400">Read authentic experiences from current students and alumni before you decide.</p>
        </div>
      </div>
    </div>
  );
}
