"use client";

import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import { colleges } from "@/lib/colleges";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();
  const favoriteColleges = colleges.filter((college) => favorites.includes(college.id));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">My Favorites</h1>
              <p className="text-slate-600 dark:text-slate-400">{favoriteColleges.length} college{favoriteColleges.length !== 1 ? 's' : ''} saved</p>
            </div>
            {favoriteColleges.length > 0 && (
              <Link href={`/compare?ids=${favoriteColleges.map((college) => college.id).join(",")}`} className="btn-secondary">
                Compare Favorites
              </Link>
            )}
          </div>
        </section>

        {favoriteColleges.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4">You haven't saved any colleges yet.</p>
            <Link href="/" className="btn-primary">
              Browse Colleges
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {favoriteColleges.map((college) => (
              <article key={college.id} className="card p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 text-slate-900 dark:text-white">{college.name}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">{college.city}, {college.state}</p>
                    <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                      <span>Rank #{college.ranking}</span>
                      <span>{college.placements.placementRate} placement</span>
                      <span>{college.acceptance} acceptance</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFavorite(college.id, college.name)}
                    className="text-red-600 hover:text-red-800 font-medium text-sm"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium text-slate-900 dark:text-slate-100">Fees: </span>
                    ₹{college.feesRange[0].toLocaleString()} - ₹{college.feesRange[1].toLocaleString()}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/college/${college.slug}`} className="btn-primary text-sm px-3 py-1">
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
