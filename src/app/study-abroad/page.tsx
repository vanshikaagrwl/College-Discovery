import Link from "next/link";

export default function StudyAbroadPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="bg-slate-900/95 border-b border-slate-800 py-8 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-400">Study Abroad</p>
          <h1 className="mt-3 text-4xl font-extrabold text-white">Study Abroad opportunities for every stream</h1>
          <p className="mt-4 max-w-3xl text-slate-400">Explore top destinations, courses, scholarships and admission guidance for engineering, medical, management, arts and science students.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article id="usa" className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/30 flex flex-col">
            <div className="mb-6 h-14 w-14 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 p-2">
              <img src="/images/logos/USA.webp" alt="USA" className="h-full w-full object-contain" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Study in USA</h2>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">Top engineering, business and STEM programs with flexible post-study work options and strong research campuses.</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300 flex-grow">
              <li>• <Link href="/study-abroad/usa/colleges" className="font-bold"><span className="text-orange-400 underline decoration-orange-400/50 underline-offset-4">Top 8 colleges of USA</span></Link></li>
              <li>• Avg cost 34.15K USD/year</li>
              <li>• Strong scholarships and internships</li>
            </ul>
          </article>

          <article id="uk" className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/30 flex flex-col">
            <div className="mb-6 h-14 w-14 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 p-2">
              <img src="/images/logos/UK.webp" alt="UK" className="h-full w-full object-contain" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Study in UK</h2>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">Short-duration degrees and world-leading universities for science, law, business and arts students.</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300 flex-grow">
              <li>• <Link href="/study-abroad/uk/colleges" className="font-bold"><span className="text-orange-400 underline decoration-orange-400/50 underline-offset-4">Top 8 colleges of UK</span></Link></li>
              <li>• Avg cost 22.70K USD/year</li>
              <li>• Work permit after graduation</li>
            </ul>
          </article>

          <article id="canada" className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/30 flex flex-col">
            <div className="mb-6 h-14 w-14 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 p-2">
              <img src="/images/logos/Canada.webp" alt="Canada" className="h-full w-full object-contain" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Study in Canada</h2>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">High-quality campuses, excellent student support, and a straightforward pathway to permanent residency.</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300 flex-grow">
              <li>• <Link href="/study-abroad/canada/colleges" className="font-bold"><span className="text-orange-400 underline decoration-orange-400/50 underline-offset-4">Top 7 colleges of Canada</span></Link></li>
              <li>• Avg cost 25.5K USD/year</li>
              <li>• Work-study options available</li>
            </ul>
          </article>

          <article id="australia" className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/30 flex flex-col">
            <div className="mb-6 h-14 w-14 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 p-2">
              <img src="/images/logos/Australia.webp" alt="Australia" className="h-full w-full object-contain" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Study in Australia</h2>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">Globally recognized degrees and a high standard of living with extensive outdoor lifestyle opportunities.</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300 flex-grow">
              <li>• <Link href="/study-abroad/australia/colleges" className="font-bold"><span className="text-orange-400 underline decoration-orange-400/50 underline-offset-4">Top 7 colleges of Australia</span></Link></li>
              <li>• Avg cost 28.5K USD/year</li>
              <li>• 2-4 years post-study work visa</li>
            </ul>
          </article>

          <article id="germany" className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/30 flex flex-col">
            <div className="mb-6 h-14 w-14 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 p-2">
              <img src="/images/logos/Germany.webp" alt="Germany" className="h-full w-full object-contain" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Study in Germany</h2>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">World-class engineering and technology programs with low or zero tuition fees at public universities.</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300 flex-grow">
              <li>• <Link href="/study-abroad/germany/colleges" className="font-bold"><span className="text-orange-400 underline decoration-orange-400/50 underline-offset-4">Top 6 colleges of Germany</span></Link></li>
              <li>• Avg cost 10.2K USD/year</li>
              <li>• Strong industrial connections</li>
            </ul>
          </article>

          <article id="uae" className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/30 flex flex-col">
            <div className="mb-6 h-14 w-14 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 p-2">
              <img src="/images/logos/UAE.webp" alt="UAE" className="h-full w-full object-contain" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Study in UAE</h2>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">A rapidly growing hub for business and finance with international branch campuses and tax-free work potential.</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300 flex-grow">
              <li>• <Link href="/study-abroad/uae/colleges" className="font-bold"><span className="text-orange-400 underline decoration-orange-400/50 underline-offset-4">Top 5 colleges of UAE</span></Link></li>
              <li>• Avg cost 57.8K USD/year</li>
              <li>• Safe environment and luxury lifestyle</li>
            </ul>
          </article>

          <article id="singapore" className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/30 flex flex-col">
            <div className="mb-6 h-14 w-14 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 p-2">
              <img src="/images/logos/Singapore.webp" alt="Singapore" className="h-full w-full object-contain" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Study in Singapore</h2>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">One of Asia's premier education destinations for technology, business, and innovative research.</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300 flex-grow">
              <li>• <Link href="/study-abroad/singapore/colleges" className="font-bold"><span className="text-orange-400 underline decoration-orange-400/50 underline-offset-4">Top 5 colleges of Singapore</span></Link></li>
              <li>• Avg cost 34.9K USD/year</li>
              <li>• Strong emphasis on excellence</li>
            </ul>
          </article>

          <article id="sweden" className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/30 flex flex-col">
            <div className="mb-6 h-14 w-14 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 p-2">
              <img src="/images/logos/Sweden.webp" alt="Sweden" className="h-full w-full object-contain" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Study in Sweden</h2>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">Focus on creativity and innovation with high equality standards and world-class design schools.</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300 flex-grow">
              <li>• <Link href="/study-abroad/sweden/colleges" className="font-bold"><span className="text-orange-400 underline decoration-orange-400/50 underline-offset-4">Top 5 colleges of Sweden</span></Link></li>
              <li>• Avg cost 15.5K USD/year</li>
              <li>• High standard of sustainability</li>
            </ul>
          </article>

          <article id="ireland" className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/30 flex flex-col">
            <div className="mb-6 h-14 w-14 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 p-2">
              <img src="/images/logos/Ireland.webp" alt="Ireland" className="h-full w-full object-contain" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Study in Ireland</h2>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">English-speaking hub for tech and pharmaceuticals with top-tier research universities.</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300 flex-grow">
              <li>• <Link href="/study-abroad/ireland/colleges" className="font-bold"><span className="text-orange-400 underline decoration-orange-400/50 underline-offset-4">Top 5 colleges of Ireland</span></Link></li>
              <li>• Avg cost 21.2K USD/year</li>
              <li>• 1 year post-study work permit</li>
            </ul>
          </article>

          <article id="hong-kong" className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/30 flex flex-col">
            <div className="mb-6 h-14 w-14 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 p-2">
              <img src="/images/logos/HongKong.webp" alt="Hong Kong" className="h-full w-full object-contain" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Study in Hong Kong</h2>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">A global financial hub with world-class universities and a unique blend of Eastern and Western cultures.</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300 flex-grow">
              <li>• <Link href="/study-abroad/hong-kong/colleges" className="font-bold"><span className="text-orange-400 underline decoration-orange-400/50 underline-offset-4">Top 5 colleges of Hong Kong</span></Link></li>
              <li>• Avg cost 22.5K USD/year</li>
              <li>• Vibrant international environment</li>
            </ul>
          </article>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-slate-950/20">
            <h3 className="text-xl font-semibold text-white">Why Study Abroad?</h3>
            <ul className="mt-4 space-y-3 text-slate-300">
              <li>• Global exposure with diverse campus life</li>
              <li>• Higher placement potential in leading industries</li>
              <li>• Access to world-class laboratories and research</li>
            </ul>
          </div>
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-slate-950/20">
            <h3 className="text-xl font-semibold text-white">Popular Streams</h3>
            <ul className="mt-4 space-y-3 text-slate-300">
              <li>• Engineering & Technology</li>
              <li>• Business & Management</li>
              <li>• Medical & Life Sciences</li>
              <li>• Arts, Humanities & Social Sciences</li>
            </ul>
          </div>
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-slate-950/20">
            <h3 className="text-xl font-semibold text-white">Next steps</h3>
            <ol className="mt-4 space-y-3 text-slate-300 list-decimal list-inside">
              <li>Choose a destination and stream.</li>
              <li>Check eligibility and entrance requirements.</li>
              <li>Apply for scholarships and student visas.</li>
              <li>Prepare for exams, tests and personal statements.</li>
            </ol>
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-slate-950/30">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-orange-400">Start your overseas journey</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Find the right global program for your future.</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/" className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400">
                Browse Programs
              </Link>
              <Link href="/newsletter" className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-transparent px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-orange-400 hover:text-white">
                Subscribe for Updates
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
