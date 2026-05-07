import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { colleges, getCollegeBySlug } from "@/lib/colleges";

export function generateStaticParams() {
  return colleges.map((college) => ({ slug: college.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);
  if (!college) {
    return { title: "College not found" };
  }
  return {
    title: `${college.name} | College Discovery`,
    description: college.description,
  };
}

export default async function CollegeDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{
    q?: string;
    course?: string;
    type?: string;
    location?: string;
    maxFees?: string;
  }>;
}) {
  const { slug } = await params;
  const searchParamsResolved = searchParams ? await searchParams : {};
  const college = getCollegeBySlug(slug);

  if (!college) {
    notFound();
  }

  const backParams = new URLSearchParams();
  if (searchParamsResolved.q) backParams.set("q", searchParamsResolved.q);
  if (searchParamsResolved.course) backParams.set("course", searchParamsResolved.course);
  if (searchParamsResolved.type) backParams.set("type", searchParamsResolved.type);
  if (searchParamsResolved.location) backParams.set("location", searchParamsResolved.location);
  if (searchParamsResolved.maxFees) backParams.set("maxFees", searchParamsResolved.maxFees);

  const backHref = backParams.toString() ? `/?${backParams.toString()}` : "/";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="bg-white/95 dark:bg-slate-950/95 border-b border-gray-200 dark:border-slate-800 py-4 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">College details</p>
          <Link href={backHref} className="btn-secondary text-sm px-4 py-2 rounded-full">
            Back to results
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900 shadow-lg shadow-slate-950/20">
          <div className="relative h-72 sm:h-96">
            <Image
              src={college.image}
              alt={college.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{college.name}</h2>
              <p className="text-slate-600 dark:text-slate-400">{college.city}, {college.state}</p>
            </div>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-slate-100 text-slate-900 rounded-full text-sm dark:bg-slate-800 dark:text-slate-100">Rank #{college.ranking}</span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm dark:bg-emerald-900/80 dark:text-emerald-200">{college.acceptance}</span>
            </div>
          </div>
          <p className="text-slate-700 dark:text-slate-300">{college.description}</p>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="card p-6">
              <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Key Highlights</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900/95 p-4 rounded-md">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Fees Range</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">₹{college.feesRange[0].toLocaleString()} - ₹{college.feesRange[1].toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/95 p-4 rounded-md">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Placement Rate</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">{college.placements.placementRate}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/95 p-4 rounded-md">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Rating</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">{college.rating}/5</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/95 p-4 rounded-md">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Type</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">{college.type}</p>
                </div>
              </div>
            </section>

            <section className="card p-6">
              <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Courses Offered</h3>
              <div className="grid gap-4">
                {college.courses.map((course) => (
                  <div key={course.name} className="border border-gray-200 dark:border-slate-700 p-4 rounded-md bg-white dark:bg-slate-900/95">
                    <h4 className="font-semibold text-slate-900 dark:text-white">{course.name}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{course.duration}</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{course.fees}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="card p-6">
              <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Placement Details</h3>
              <p className="mb-2 text-slate-700 dark:text-slate-300"><strong>Average Salary:</strong> {college.placements.salaryRange}</p>
              <p className="text-slate-700 dark:text-slate-300"><strong>Top Recruiters:</strong> {college.placements.topRecruiters.join(", ")}</p>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Campus Facilities</h3>
              <ul className="space-y-2">
                {college.facilities.map((facility) => (
                  <li key={facility} className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm">{facility}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Actions</h3>
              <div className="space-y-3">
                <Link href={backHref} className="btn-primary w-full text-center block">Back to results</Link>
                <button className="btn-secondary w-full">Download Brochure</button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
