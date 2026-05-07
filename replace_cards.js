const fs = require('fs');
const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const startMarker = '<div ref={carouselRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">';
const endMarkerSearchStr = '            </div>\n            <button onClick={() => scrollCarousel(\'left\')}';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarkerSearchStr);

if (startIndex > -1 && endIndex > -1) {
  const newCards = `
            <div className="shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start rounded-[1.5rem] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
              <div className="mb-5 flex flex-col items-center sm:flex-row gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-sky-400">
                  <span className="text-2xl">🏙️</span>
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-white">Study in Hong-kong</h3>
                  <Link href="#" className="text-[13px] text-slate-400 hover:text-sky-400 flex items-center gap-1 transition-colors">Check 8 Colleges <span className="text-lg leading-none">&rsaquo;</span></Link>
                </div>
              </div>
              
              <div className="mb-6 flex flex-col sm:flex-row rounded-xl bg-slate-950/50 p-4 border border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                <div className="flex flex-1 items-center gap-3 pb-3 sm:pb-0 sm:pr-3">
                  <div className="rounded-full bg-slate-800 p-2 text-slate-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15L24 9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white leading-tight">8</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">No. Of Colleges</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
                  <div className="rounded-full bg-slate-800 p-2 text-slate-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white leading-tight">1.62 L USD/Year</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">Avg. Study Cost</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-3 text-[14px] font-bold text-white">Guides</p>
                <ul className="space-y-0 text-[13px] text-slate-300">
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">Why Study in Hong Kong <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">SOP for hong Kong <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">Application Process <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 hover:text-sky-400 transition-colors">Scholarships <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                </ul>
              </div>
            </div>

            <div className="shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start rounded-[1.5rem] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
              <div className="mb-5 flex flex-col items-center sm:flex-row gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-sky-400">
                  <span className="text-2xl">🏢</span>
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-white">Study in UAE</h3>
                  <Link href="#" className="text-[13px] text-slate-400 hover:text-sky-400 flex items-center gap-1 transition-colors">Check 27 Colleges <span className="text-lg leading-none">&rsaquo;</span></Link>
                </div>
              </div>
              
              <div className="mb-6 flex flex-col sm:flex-row rounded-xl bg-slate-950/50 p-4 border border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                <div className="flex flex-1 items-center gap-3 pb-3 sm:pb-0 sm:pr-3">
                  <div className="rounded-full bg-slate-800 p-2 text-slate-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15L24 9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white leading-tight">27</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">No. Of Colleges</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
                  <div className="rounded-full bg-slate-800 p-2 text-slate-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white leading-tight">57.81 K USD/Year</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">Avg. Study Cost</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-3 text-[14px] font-bold text-white">Guides</p>
                <ul className="space-y-0 text-[13px] text-slate-300">
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">Why Study in UAE <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">Top Universities to study <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">Cost of Living in UAE <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 hover:text-sky-400 transition-colors">Jobs in UAE <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                </ul>
              </div>
            </div>

            <div className="shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start rounded-[1.5rem] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
              <div className="mb-5 flex flex-col items-center sm:flex-row gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-sky-400">
                  <span className="text-2xl">🦁</span>
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-white">Study in Singapore</h3>
                  <Link href="#" className="text-[13px] text-slate-400 hover:text-sky-400 flex items-center gap-1 transition-colors">Check 9 Colleges <span className="text-lg leading-none">&rsaquo;</span></Link>
                </div>
              </div>
              
              <div className="mb-6 flex flex-col sm:flex-row rounded-xl bg-slate-950/50 p-4 border border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                <div className="flex flex-1 items-center gap-3 pb-3 sm:pb-0 sm:pr-3">
                  <div className="rounded-full bg-slate-800 p-2 text-slate-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15L24 9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white leading-tight">9</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">No. Of Colleges</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
                  <div className="rounded-full bg-slate-800 p-2 text-slate-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white leading-tight">34.9 K USD/Year</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">Avg. Study Cost</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-3 text-[14px] font-bold text-white">Guides</p>
                <ul className="space-y-0 text-[13px] text-slate-300">
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">Why Study in Singapore <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">Admission Requirements <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">SOP for Singapore <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 hover:text-sky-400 transition-colors">Scholarships <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                </ul>
              </div>
            </div>

            <div className="shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start rounded-[1.5rem] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
              <div className="mb-5 flex flex-col items-center sm:flex-row gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-sky-400">
                  <span className="text-2xl">🍁</span>
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-white">Study in Canada</h3>
                  <Link href="#" className="text-[13px] text-slate-400 hover:text-sky-400 flex items-center gap-1 transition-colors">Check 223 Colleges <span className="text-lg leading-none">&rsaquo;</span></Link>
                </div>
              </div>
              <div className="mb-6 flex flex-col sm:flex-row rounded-xl bg-slate-950/50 p-4 border border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                <div className="flex flex-1 items-center gap-3 pb-3 sm:pb-0 sm:pr-3">
                  <div className="rounded-full bg-slate-800 p-2 text-slate-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15L24 9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white leading-tight">223</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">No. Of Colleges</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
                  <div className="rounded-full bg-slate-800 p-2 text-slate-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white leading-tight">25.5 K USD/Year</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">Avg. Study Cost</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-3 text-[14px] font-bold text-white">Guides</p>
                <ul className="space-y-0 text-[13px] text-slate-300">
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">Why Study in Canada <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">Top Universities to study <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">SOP for Canada <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 hover:text-sky-400 transition-colors">Work Study in Canada <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                </ul>
              </div>
            </div>

            <div className="shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start rounded-[1.5rem] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
              <div className="mb-5 flex flex-col items-center sm:flex-row gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-sky-400">
                  <span className="text-2xl">🗽</span>
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-white">Study in USA</h3>
                  <Link href="#" className="text-[13px] text-slate-400 hover:text-sky-400 flex items-center gap-1 transition-colors">Check 1018 Colleges <span className="text-lg leading-none">&rsaquo;</span></Link>
                </div>
              </div>
              <div className="mb-6 flex flex-col sm:flex-row rounded-xl bg-slate-950/50 p-4 border border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                <div className="flex flex-1 items-center gap-3 pb-3 sm:pb-0 sm:pr-3">
                  <div className="rounded-full bg-slate-800 p-2 text-slate-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15L24 9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white leading-tight">1018</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">No. Of Colleges</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
                  <div className="rounded-full bg-slate-800 p-2 text-slate-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white leading-tight">34.15 K USD/Year</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">Avg. Study Cost</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-3 text-[14px] font-bold text-white">Guides</p>
                <ul className="space-y-0 text-[13px] text-slate-300">
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">Why Study in the USA? <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">SOP for USA <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">Exams for Studying in USA <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 hover:text-sky-400 transition-colors">Post Study Opportunities <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                </ul>
              </div>
            </div>

            <div className="shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start rounded-[1.5rem] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
              <div className="mb-5 flex flex-col items-center sm:flex-row gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-sky-400">
                  <span className="text-2xl">🎡</span>
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-white">Study in UK</h3>
                  <Link href="#" className="text-[13px] text-slate-400 hover:text-sky-400 flex items-center gap-1 transition-colors">Check 176 Colleges <span className="text-lg leading-none">&rsaquo;</span></Link>
                </div>
              </div>
              <div className="mb-6 flex flex-col sm:flex-row rounded-xl bg-slate-950/50 p-4 border border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                <div className="flex flex-1 items-center gap-3 pb-3 sm:pb-0 sm:pr-3">
                  <div className="rounded-full bg-slate-800 p-2 text-slate-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15L24 9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white leading-tight">176</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">No. Of Colleges</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
                  <div className="rounded-full bg-slate-800 p-2 text-slate-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white leading-tight">22.7 K USD/Year</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">Avg. Study Cost</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-3 text-[14px] font-bold text-white">Guides</p>
                <ul className="space-y-0 text-[13px] text-slate-300">
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">Why Study in UK? <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">SOP for UK <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">UK Student VISA <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 hover:text-sky-400 transition-colors">Cost to Study in UK <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                </ul>
              </div>
            </div>

            <div className="shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start rounded-[1.5rem] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
              <div className="mb-5 flex flex-col items-center sm:flex-row gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-sky-400">
                  <span className="text-2xl">🦘</span>
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-white">Study in Australia</h3>
                  <Link href="#" className="text-[13px] text-slate-400 hover:text-sky-400 flex items-center gap-1 transition-colors">Check 154 Colleges <span className="text-lg leading-none">&rsaquo;</span></Link>
                </div>
              </div>
              <div className="mb-6 flex flex-col sm:flex-row rounded-xl bg-slate-950/50 p-4 border border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                <div className="flex flex-1 items-center gap-3 pb-3 sm:pb-0 sm:pr-3">
                  <div className="rounded-full bg-slate-800 p-2 text-slate-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15L24 9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white leading-tight">154</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">No. Of Colleges</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
                  <div className="rounded-full bg-slate-800 p-2 text-slate-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white leading-tight">28.5 K USD/Year</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">Avg. Study Cost</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-3 text-[14px] font-bold text-white">Guides</p>
                <ul className="space-y-0 text-[13px] text-slate-300">
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">Why Study in Australia <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">Australian Student Visa <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">Top Universities <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 hover:text-sky-400 transition-colors">Post-Study Work Visa <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                </ul>
              </div>
            </div>

            <div className="shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start rounded-[1.5rem] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
              <div className="mb-5 flex flex-col items-center sm:flex-row gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-sky-400">
                  <span className="text-2xl">🥨</span>
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-white">Study in Germany</h3>
                  <Link href="#" className="text-[13px] text-slate-400 hover:text-sky-400 flex items-center gap-1 transition-colors">Check 120 Colleges <span className="text-lg leading-none">&rsaquo;</span></Link>
                </div>
              </div>
              <div className="mb-6 flex flex-col sm:flex-row rounded-xl bg-slate-950/50 p-4 border border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                <div className="flex flex-1 items-center gap-3 pb-3 sm:pb-0 sm:pr-3">
                  <div className="rounded-full bg-slate-800 p-2 text-slate-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15L24 9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white leading-tight">120</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">No. Of Colleges</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
                  <div className="rounded-full bg-slate-800 p-2 text-slate-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white leading-tight">10.2 K USD/Year</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">Avg. Study Cost</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-3 text-[14px] font-bold text-white">Guides</p>
                <ul className="space-y-0 text-[13px] text-slate-300">
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">Why Study in Germany <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">Free Education in Germany <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 border-b border-slate-800/50 hover:text-sky-400 transition-colors">German Student Visa <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                  <li><Link href="#" className="flex items-center justify-between py-2 hover:text-sky-400 transition-colors">Jobs in Germany <span className="text-slate-500 text-lg leading-none">&rsaquo;</span></Link></li>
                </ul>
              </div>
            </div>
`;
  content = content.substring(0, startIndex + startMarker.length) + '\n' + newCards + content.substring(endIndex);
  fs.writeFileSync(file, content);
  console.log('Successfully reverted cards!');
} else {
  console.log('Could not find markers. startIndex:', startIndex, 'endIndex:', endIndex);
}
