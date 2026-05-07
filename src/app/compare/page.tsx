"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { colleges } from "@/lib/colleges";

function parseCompareIds(idsParam: string | null) {
  if (!idsParam) return [] as number[];
  return idsParam
    .split(",")
    .map((value) => Number(value.trim()))
    .filter((id) => Number.isFinite(id) && id > 0)
    .slice(0, 3);
}

function RemoveButton({ collegeId, onRemove }: { collegeId: number; onRemove: (id: number) => void }) {
  return (
    <button
      onClick={() => onRemove(collegeId)}
      className="text-red-600 hover:text-red-800 text-sm font-medium"
      title="Remove from comparison"
    >
      ✕ Remove
    </button>
  );
}

function ComparePageContent() {
  const searchParams = useSearchParams();
  const params = {
    ids: searchParams.get("ids"),
    compareIds: searchParams.get("compareIds"),
    q: searchParams.get("q"),
    course: searchParams.get("course"),
    type: searchParams.get("type"),
    location: searchParams.get("location"),
    maxFees: searchParams.get("maxFees"),
  };
  const compareIds = parseCompareIds(params.ids ?? params.compareIds);
  const compareItems = colleges.filter((college) => compareIds.includes(college.id));
  
  const buildBackHref = () => {
    const backParams = new URLSearchParams();
    if (params.q) backParams.set("q", params.q);
    if (params.course) backParams.set("course", params.course);
    if (params.type) backParams.set("type", params.type);
    if (params.location) backParams.set("location", params.location);
    if (params.maxFees) backParams.set("maxFees", params.maxFees);
    return backParams.toString() ? `/?${backParams.toString()}` : "/";
  };
  
  const backHref = buildBackHref();
  const detailHref = (collegeSlug: string) => {
    const backParams = new URLSearchParams();
    if (params.q) backParams.set("q", params.q);
    if (params.course) backParams.set("course", params.course);
    if (params.type) backParams.set("type", params.type);
    if (params.location) backParams.set("location", params.location);
    if (params.maxFees) backParams.set("maxFees", params.maxFees);
    const backParamsStr = backParams.toString();
    return backParamsStr ? `/college/${collegeSlug}?${backParamsStr}` : `/college/${collegeSlug}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="bg-white/95 dark:bg-slate-950/95 border-b border-gray-200 dark:border-slate-800 py-4 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">College Discovery</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {compareItems.length === 0 ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">No Colleges Selected</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Select colleges to compare from the homepage.</p>
            <Link href={backHref} className="btn-primary">Go to Homepage</Link>
          </div>
        ) : (
          <>
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold">Compare Colleges</h2>
                  <p className="text-slate-600 dark:text-slate-400">Compare {compareItems.length} colleges side by side</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      const backParams = new URLSearchParams();
                      if (params.q) backParams.set("q", params.q);
                      if (params.course) backParams.set("course", params.course);
                      if (params.type) backParams.set("type", params.type);
                      if (params.location) backParams.set("location", params.location);
                      if (params.maxFees) backParams.set("maxFees", params.maxFees);
                      const backHref = backParams.toString() ? `/?${backParams.toString()}` : "/";
                      window.location.href = backHref;
                    }}
                    className="btn-secondary"
                  >
                    Back to Search
                  </button>
                  <button
                    onClick={() => {
                      const backParams = new URLSearchParams();
                      if (params.q) backParams.set("q", params.q);
                      if (params.course) backParams.set("course", params.course);
                      if (params.type) backParams.set("type", params.type);
                      if (params.location) backParams.set("location", params.location);
                      if (params.maxFees) backParams.set("maxFees", params.maxFees);
                      const backHref = backParams.toString() ? `/?${backParams.toString()}` : "/";
                      window.location.href = backHref;
                    }}
                    className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 border border-red-200 rounded-md hover:bg-red-50"
                  >
                    Clear Comparison
                  </button>
                  <Link href={backHref} className="btn-primary">Add More Colleges</Link>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {compareItems.map((college) => (
                  <div key={college.id} className="card p-6 relative">
                    <div className="absolute top-2 right-2">
                      <RemoveButton collegeId={college.id} onRemove={(id) => {
                        const newIds = compareIds.filter(cid => cid !== id);
                        const newParams = new URLSearchParams();
                        if (params.q) newParams.set("q", params.q);
                        if (params.course) newParams.set("course", params.course);
                        if (params.type) newParams.set("type", params.type);
                        if (params.location) newParams.set("location", params.location);
                        if (params.maxFees) newParams.set("maxFees", params.maxFees);
                        if (newIds.length > 0) newParams.set("ids", newIds.join(","));
                        const newUrl = newParams.toString() ? `?${newParams.toString()}` : "";
                        window.location.href = `/compare${newUrl}`;
                      }} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">{college.name}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">{college.city}, {college.state}</p>
                    <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex justify-between">
                        <span>Rank:</span>
                        <span className="font-medium">#{college.ranking}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rating:</span>
                        <span className="font-medium">{college.rating}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Acceptance:</span>
                        <span className="font-medium">{college.acceptance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fees:</span>
                        <span className="font-medium">₹{college.feesRange[0].toLocaleString()} - ₹{college.feesRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link href={detailHref(college.slug)} className="btn-primary w-full text-center">View Details</Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold mb-6">Detailed Comparison</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/95">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Feature</th>
                      {compareItems.map((college) => (
                        <th key={college.id} className="border border-gray-200 px-4 py-3 text-left font-semibold relative">
                          <div className="flex items-center justify-between">
                            <span>{college.name}</span>
                            <RemoveButton collegeId={college.id} onRemove={(id) => {
                              const newIds = compareIds.filter(cid => cid !== id);
                              const newParams = new URLSearchParams();
                              if (params.q) newParams.set("q", params.q);
                              if (params.course) newParams.set("course", params.course);
                              if (params.type) newParams.set("type", params.type);
                              if (params.location) newParams.set("location", params.location);
                              if (params.maxFees) newParams.set("maxFees", params.maxFees);
                              if (newIds.length > 0) newParams.set("ids", newIds.join(","));
                              const newUrl = newParams.toString() ? `?${newParams.toString()}` : "";
                              window.location.href = `/compare${newUrl}`;
                            }} />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 dark:border-slate-700 px-4 py-3 font-medium">Location</td>
                      {compareItems.map((college) => (
                        <td key={college.id} className="border border-gray-200 dark:border-slate-700 px-4 py-3">{college.city}, {college.state}</td>
                      ))}
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/95">
                      <td className="border border-gray-200 dark:border-slate-700 px-4 py-3 font-medium">Type</td>
                      {compareItems.map((college) => (
                        <td key={college.id} className="border border-gray-200 dark:border-slate-700 px-4 py-3">{college.type}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-medium">Ranking</td>
                      {compareItems.map((college) => (
                        <td key={college.id} className="border border-gray-200 dark:border-slate-700 px-4 py-3">#{college.ranking}</td>
                      ))}
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/95">
                      <td className="border border-gray-200 dark:border-slate-700 px-4 py-3 font-medium">Rating</td>
                      {compareItems.map((college) => (
                        <td key={college.id} className="border border-gray-200 dark:border-slate-700 px-4 py-3">{college.rating}/5</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-medium">Acceptance Rate</td>
                      {compareItems.map((college) => (
                        <td key={college.id} className="border border-gray-200 dark:border-slate-700 px-4 py-3">{college.acceptance}</td>
                      ))}
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/95">
                      <td className="border border-gray-200 dark:border-slate-700 px-4 py-3 font-medium">Fees Range</td>
                      {compareItems.map((college) => (
                        <td key={college.id} className="border border-gray-200 dark:border-slate-700 px-4 py-3">₹{college.feesRange[0].toLocaleString()} - ₹{college.feesRange[1].toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border border-gray-200 dark:border-slate-700 px-4 py-3 font-medium">Placement Rate</td>
                      {compareItems.map((college) => (
                        <td key={college.id} className="border border-gray-200 dark:border-slate-700 px-4 py-3">{college.placements.placementRate}</td>
                      ))}
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/95">
                      <td className="border border-gray-200 dark:border-slate-700 px-4 py-3 font-medium">Top Recruiters</td>
                      {compareItems.map((college) => (
                        <td key={college.id} className="border border-gray-200 dark:border-slate-700 px-4 py-3">{college.placements.topRecruiters.join(", ")}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-medium">Courses</td>
                      {compareItems.map((college) => (
                        <td key={college.id} className="border border-gray-200 dark:border-slate-700 px-4 py-3">{college.courses.map(c => c.name).join(", ")}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-500 dark:text-slate-400">Loading compare view...</div>}>
      <ComparePageContent />
    </Suspense>
  );
}
