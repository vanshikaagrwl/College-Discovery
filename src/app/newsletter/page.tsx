export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="bg-slate-900/95 border-b border-slate-800 py-8 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-400">Newsletter</p>
          <h1 className="mt-3 text-4xl font-extrabold text-white">Stay ahead with college and exam alerts</h1>
          <p className="mt-4 max-w-3xl text-slate-400">Subscribe to our newsletter for the latest college updates, exam news, scholarship alerts, and admission tips for every stream.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-slate-950/30">
            <h2 className="text-3xl font-semibold text-white">Why subscribe?</h2>
            <ul className="mt-6 space-y-4 text-slate-300">
              <li>• Daily exam alerts and application deadlines.</li>
              <li>• College selection advice for engineering, medical, commerce, arts and science.</li>
              <li>• Scholarship and career guidance straight to your inbox.</li>
              <li>• Admissions support for both India and overseas studies.</li>
            </ul>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-slate-950/30">
            <form className="space-y-6">
              <div>
                <label htmlFor="newsletter-name" className="block text-sm font-medium text-slate-300">Name</label>
                <input id="newsletter-name" type="text" placeholder="Your name" className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30" />
              </div>
              <div>
                <label htmlFor="newsletter-email" className="block text-sm font-medium text-slate-300">Email</label>
                <input id="newsletter-email" type="email" placeholder="Enter your email" className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30" />
              </div>
              <div>
                <label htmlFor="newsletter-stream" className="block text-sm font-medium text-slate-300">Your Stream</label>
                <select id="newsletter-stream" className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30">
                  <option>Choose your stream</option>
                  <option>Engineering</option>
                  <option>Medical</option>
                  <option>Management</option>
                  <option>Arts</option>
                  <option>Science</option>
                </select>
              </div>
              <button type="submit" className="w-full rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400">Subscribe Now</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
