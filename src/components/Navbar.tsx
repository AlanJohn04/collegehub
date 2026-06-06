"use client";

import Link from 'next/link';
import { Search, GraduationCap } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur flex-none transition-colors duration-500 bg-white/70 border-b border-slate-900/10 dark:border-slate-50/[0.06] dark:bg-slate-900/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-500" />
            <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
              CollegeHub
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/colleges" className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
              Explore Colleges
            </Link>
            <Link href="/compare" className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
              Compare
            </Link>
            <Link href="/predictor" className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
              Predictor
            </Link>
            <Link href="/discussions" className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
              Discussions
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300 hidden sm:block">
                  {user.email}
                </span>
                <button onClick={logout} className="text-sm font-medium px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-sm font-medium px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition-all">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
