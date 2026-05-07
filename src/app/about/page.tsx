import Link from "next/link";

export const metadata = {
  title: "About | College Discovery Platform",
  description: "Learn more about the College Discovery Platform and how it helps students find the right college.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="max-w-5xl mx-auto px-6 py-12">
        <section className="mb-10">
          <h1 className="text-4xl font-bold mb-4 text-white">About College Discovery</h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            College Discovery helps students explore colleges across India by filtering by course, location, fees, and more.
            Use the search feature to find colleges that match your goals, compare options side-by-side, and estimate admission chances with our predictor.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="text-2xl font-semibold mb-3 text-white">What you can do</h2>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              <li>Search colleges and courses by keyword.</li>
              <li>Filter by location, fees, type, and category.</li>
              <li>Compare up to three colleges in one view.</li>
              <li>Use admission predictor for JEE, NEET, and CUET.</li>
            </ul>
          </div>

          <div className="card p-6">
            <h2 className="text-2xl font-semibold mb-3 text-white">Why this matters</h2>
            <p className="text-slate-300 leading-relaxed">
              Choosing the right college is an important step. This platform brings concise college details, fee ranges, rankings, and placement data together so students can make better decisions faster.
            </p>
          </div>
        </section>

        <section className="mt-10 card p-6">
          <h2 className="text-2xl font-semibold mb-3 text-white">Get started</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Head back to the homepage to begin searching and comparing colleges now.
          </p>
          <Link href="/" className="btn-primary inline-flex items-center px-4 py-2">
            Go to Home
          </Link>
        </section>
      </main>
    </div>
  );
}
