"use client";

import Link from "next/link";
import { useState } from "react";
import { useFavorites } from "@/context/FavoritesContext";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites } = useFavorites();

  return (
    <nav className="relative bg-white/95 dark:bg-slate-950/95 backdrop-blur border-b border-gray-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/images/logo-horizontal.png" alt="Logo" className="h-10 w-auto brightness-0 invert" />
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors">College Discovery</span>
          </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-500"
          aria-expanded={isOpen}
        >
          Explore
          <span className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
            ▾
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="max-w-7xl mx-auto px-6 pb-4 md:pb-6">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-950 dark:shadow-slate-950/40">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 transition hover:border-orange-400 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-orange-400 dark:hover:bg-slate-900">
                Home
              </Link>
              <Link href="/study-abroad" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 transition hover:border-orange-400 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-orange-400 dark:hover:bg-slate-900">
                Study Abroad
              </Link>
              <Link href="/newsletter" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 transition hover:border-orange-400 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-orange-400 dark:hover:bg-slate-900">
                Newsletter
              </Link>
              <Link href="/about" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 transition hover:border-orange-400 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-orange-400 dark:hover:bg-slate-900">
                About
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
