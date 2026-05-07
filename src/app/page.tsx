"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState, useRef } from "react";
import { colleges } from "@/lib/colleges";
import { AdmissionPrediction, CategoryType, ExamType, getAdmissionTip, predictAdmissionChance } from "@/lib/admission";
import { useFavorites } from "@/context/FavoritesContext";
import CollegeListingCard from "@/components/CollegeListingCard";

const courseOptions = Array.from(
  new Set(colleges.flatMap((college) => college.courses.map((course) => course.name)))
).sort();
const typeOptions = Array.from(new Set(colleges.map((college) => college.type))).sort();
const locationOptions = Array.from(new Set(colleges.map((college) => `${college.city}, ${college.state}`))).sort();
const examOptions: ExamType[] = ["JEE", "NEET", "CUET"];
const categoryOptions: CategoryType[] = ["General", "OBC", "SC/ST"];

const goalTags = ["Engineering", "Management", "Medical", "Law", "Commerce", "Science", "Arts"];

const studyGoals = [
  { name: "All Colleges", count: colleges.length },
  ...goalTags.map(tag => ({
    name: tag,
    count: colleges.filter(c => c.tags.includes(tag)).length,
  }))
];

const featuredSlides = [
  {
    title: "IIT Bombay",
    subtitle: "Leading innovation and engineering excellence.",
    src: "/images/iit-bombay.jpg",
  },
  {
    title: "IIT Delhi",
    subtitle: "A top campus for technology and research.",
    src: "/images/iit-delhi.jpg",
  },
  {
    title: "AIIMS",
    subtitle: "Premier medical education with modern facilities.",
    src: "/images/aiims.jpg",
  },
  {
    title: "Jawaharlal Nehru University",
    subtitle: "Diverse campus life and academic depth.",
    src: "/images/jnu.jpg",
  },
  {
    title: "Sharda University",
    subtitle: "Growth-focused learning in a vibrant campus.",
    src: "/images/sharda-university.jpg",
  },
  {
    title: "VIT University",
    subtitle: "Strong placements and industry connections.",
    src: "/images/vit-university.jpg",
  },
];

const newsData = {
  exam: [
    {
      title: "NEET 2026 Zoology Question Paper: Download Answer Key",
      date: "May 6, 2026",
      desc: "NEET 2026 Zoology question paper is available here. NTA conducted NEET 2026 exam on May 3.",
      content: "The National Testing Agency (NTA) successfully conducted the National Eligibility cum Entrance Test (NEET UG) 2026 on May 3. Candidates who appeared for the exam can now download the Zoology question paper along with the unofficial answer key. The official answer key is expected to be released in the last week of May. Students can use the provided answer key to estimate their scores and prepare for the next steps in their medical career."
    },
    {
      title: "NEET 2026 Provisional Answer Key Released",
      date: "May 6, 2026",
      desc: "The National Testing Agency released the provisional answer key for the NEET (UG).",
      content: "The NTA has officially released the provisional answer key for NEET UG 2026. Candidates can check their responses on the official website. Challenges to the answer key can be submitted online by paying a processing fee of ₹200 per question. This window will remain open for 48 hours. After reviewing all challenges, the NTA will release the final answer key and the result shortly thereafter."
    },
    {
      title: "JEE Main 2026 Session 2 Registration Opens",
      date: "May 5, 2026",
      desc: "NTA has opened the registration window for JEE Main 2026 Session 2. Candidates can apply now.",
      content: "Registration for JEE Main 2026 Session 2 is now live. Eligible candidates can apply through the official NTA portal. Session 2 is scheduled to be held in April, providing another opportunity for students to improve their scores. Make sure to complete the application process before the deadline to avoid any last-minute technical glitches. All necessary documents and fees must be uploaded and paid during the registration window."
    }
  ],
  college: [
    {
      title: "Top Engineering Colleges in India 2026 Ranking",
      date: "May 4, 2026",
      desc: "College Discovery releases its annual ranking of the top engineering institutions for the 2026 academic year.",
      content: "College Discovery's 2026 rankings are here! This year, IIT Bombay retains its top position, followed closely by IIT Delhi and IIT Madras. The rankings are based on several factors including academic reputation, placement records, faculty quality, and campus infrastructure. Private universities like BITS Pilani and VIT have also shown significant improvement in their global standing. Check the full list to find the best fit for your engineering aspirations."
    },
    {
      title: "Sharda University Announces New Research Grants",
      date: "May 3, 2026",
      desc: "Sharda University is offering grants up to ₹50 Lakhs for innovative research projects in Biotechnology.",
      content: "Sharda University is proud to announce a new series of research grants aimed at fostering innovation in the field of Biotechnology. Grants totaling up to ₹50 Lakhs per project are available for faculty and doctoral researchers. The focus areas include genetic engineering, sustainable agriculture, and healthcare solutions. Applications are open until June 30, 2026. This initiative highlights the university's commitment to cutting-edge research and development."
    },
    {
      title: "Amity Noida Campus Placement Drive: Record High Packages",
      date: "May 2, 2026",
      desc: "The recent placement drive at Amity Noida saw top recruiters offering packages exceeding ₹45 LPA.",
      content: "Amity University Noida continues its streak of record-breaking placements. In the recent 2026 campus drive, the highest package offered reached a staggering ₹45 LPA by a leading global tech giant. Over 200 companies participated in the drive, recruiting students from various departments including B.Tech, MBA, and MCA. The university's strong industry-academic interface continues to provide students with excellent career opportunities."
    }
  ],
  admission: [
    {
      title: "Delhi University UG Admissions 2026 via CUET",
      date: "May 1, 2026",
      desc: "DU confirms that UG admissions for 2026 will be solely based on CUET scores. Register before the deadline.",
      content: "Delhi University (DU) has officially announced that admissions for all undergraduate programs for the 2026-27 session will be based on the Common University Entrance Test (CUET) scores. There will be no cut-off based admissions this year. Candidates must register for CUET and select DU as one of their preferred universities. Detailed counseling schedules and seat allocation processes will be published on the CSAS portal after the CUET results are announced."
    },
    {
      title: "IIT Madras Direct Admission for Sports Medalists",
      date: "April 30, 2026",
      desc: "IIT Madras introduces a new admission pathway for national and international sports medalists for B.Tech.",
      content: "In a landmark move, IIT Madras has introduced a 'Sports Excellence Admission' (SEA) category. Under this, students who have won medals in recognized national or international sporting events can get direct admission to B.Tech programs, provided they meet the minimum academic eligibility criteria. This initiative aims to encourage talented athletes to pursue world-class technical education alongside their sporting careers."
    },
    {
      title: "MBA Admission 2026: CAT Cut-offs for Top IIMs",
      date: "April 29, 2026",
      desc: "Analysis of CAT 2025 scores and expected cut-offs for admission to flagship MBA programs at IIMs.",
      content: "With the CAT 2025 results out, the focus now shifts to IIM admissions for 2026. Based on previous trends, the top IIMs (Ahmedabad, Bangalore, Calcutta) are expected to have a percentile cut-off above 99.5. New and baby IIMs might offer admissions at percentiles ranging from 92 to 95. Candidates are advised to start preparing for the Writing Ability Test (WAT) and Personal Interview (PI) rounds, which are crucial components of the final selection process."
    }
  ]
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [maxFees, setMaxFees] = useState(() => Math.max(...colleges.map((college) => college.feesRange[1])));
  const [compareList, setCompareList] = useState<number[]>([]);
  const [exam, setExam] = useState<ExamType>("JEE");
  const [category, setCategory] = useState<CategoryType>("General");
  const [scoreText, setScoreText] = useState("");
  const [prediction, setPrediction] = useState<AdmissionPrediction | null>(null);
  const [showExpertForm, setShowExpertForm] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<any>(null);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [activeNewsTab, setActiveNewsTab] = useState<'exam' | 'college' | 'admission'>('exam');
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    const course = searchParams.get("course") ?? "";
    const type = searchParams.get("type") ?? "";
    const location = searchParams.get("location") ?? "";
    const compareIds = searchParams.get("compareIds") ?? searchParams.get("ids") ?? "";
    const feesValue = Number(searchParams.get("maxFees"));

    setQuery(q);
    setSearchTerm(q);
    setSelectedCourse(course);
    setSelectedType(type);
    setSelectedLocation(location);
    const goal = searchParams.get("goal") ?? "";
    setSelectedGoal(goal);
    if (!Number.isNaN(feesValue) && feesValue > 0) {
      setMaxFees(feesValue);
    }
    if (compareIds) {
      const ids = compareIds
        .split(",")
        .map((value) => Number(value.trim()))
        .filter((id) => Number.isFinite(id) && id > 0);
      if (ids.length > 0) {
        setCompareList(ids.slice(0, 3));
      }
    }
  }, [searchParams]);

  const updateSearchUrl = (searchValue: string = query) => {
    const params = new URLSearchParams();
    if (searchValue) params.set("q", searchValue);
    if (selectedCourse) params.set("course", selectedCourse);
    if (selectedType) params.set("type", selectedType);
    if (selectedLocation) params.set("location", selectedLocation);
    if (selectedGoal) params.set("goal", selectedGoal);
    if (compareList.length > 0) params.set("compareIds", compareList.join(","));
    const defaultMaxFees = Math.max(...colleges.map((college) => college.feesRange[1]));
    if (maxFees !== defaultMaxFees) params.set("maxFees", String(maxFees));

    const searchString = params.toString();
    router.replace(searchString ? `/?${searchString}` : "/");
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = query.toLowerCase().trim();
    
    // Check for "study in [country]" or just "[country]" pattern
    const countryPattern = /^(?:study in )?(ireland|singapore|sweden|canada|germany|uae|uk|usa|australia)$/;
    const countryMatch = normalized.match(countryPattern);
    if (countryMatch) {
      const country = countryMatch[1];
      router.push(`/study-abroad/${country}/colleges`);
      return;
    }

    // Redirect for sections/streams
    if (normalized === "newsletter") {
      router.push("/newsletter");
      return;
    }
    if (normalized === "about") {
      router.push("/about");
      return;
    }
    if (["engineering", "management", "medical", "arts", "law", "commerce", "science"].includes(normalized)) {
      const goal = normalized.charAt(0).toUpperCase() + normalized.slice(1);
      setSelectedGoal(goal);
      setQuery("");
      router.push(`/?goal=${goal}`);
      return;
    }

    setSearchTerm(query);
    updateSearchUrl(query);
  };

  useEffect(() => {
    updateSearchUrl();
  }, [compareList, selectedCourse, selectedType, selectedLocation, maxFees, query, selectedGoal]);

  useEffect(() => {
    const stored = window.localStorage.getItem("college-compare-ids");
    if (stored && compareList.length === 0) {
      const ids = stored
        .split(",")
        .map((value) => Number(value.trim()))
        .filter((id) => Number.isFinite(id) && id > 0);
      if (ids.length > 0) {
        setCompareList(ids.slice(0, 3));
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("college-compare-ids", compareList.join(","));
  }, [compareList]);

  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      const matchesQuery = query.length === 0 || college.name.toLowerCase().includes(query.toLowerCase()) || college.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
      const matchesType = selectedType.length === 0 || college.type === selectedType;
      const matchesCourse = selectedCourse.length === 0 || college.courses.some((course) => course.name === selectedCourse);
      const matchesLocation = selectedLocation.length === 0 || `${college.city}, ${college.state}` === selectedLocation;
      const matchesFees = college.feesRange[1] <= maxFees;
      const matchesGoal = selectedGoal.length === 0 || selectedGoal === "All Colleges" || college.tags.includes(selectedGoal);
      return matchesQuery && matchesType && matchesCourse && matchesLocation && matchesFees && matchesGoal;
    });
  }, [query, selectedType, selectedCourse, selectedLocation, maxFees, selectedGoal]);

  const compareItems = colleges.filter((college) => compareList.includes(college.id));
  const filterParams = new URLSearchParams();
  if (query) filterParams.set("q", query);
  if (selectedCourse) filterParams.set("course", selectedCourse);
  if (selectedType) filterParams.set("type", selectedType);
  if (selectedLocation) filterParams.set("location", selectedLocation);
  const defaultMaxFees = Math.max(...colleges.map((college) => college.feesRange[1]));
  if (maxFees !== defaultMaxFees) filterParams.set("maxFees", String(maxFees));
  if (compareList.length > 0) filterParams.set("compareIds", compareList.join(","));
  const compareUrl = `/compare?ids=${compareList.join(",")}${filterParams.toString() ? `&${filterParams.toString()}` : ""}`;

  const detailHref = (college: (typeof colleges)[number]) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (selectedCourse) params.set("course", selectedCourse);
    if (selectedType) params.set("type", selectedType);
    if (selectedLocation) params.set("location", selectedLocation);
    if (compareList.length > 0) params.set("compareIds", compareList.join(","));
    if (maxFees !== defaultMaxFees) params.set("maxFees", String(maxFees));
    return `/college/${college.slug}${params.toString() ? `?${params.toString()}` : ""}`;
  };

  function clearCompare() {
    setCompareList([]);
    window.localStorage.removeItem("college-compare-ids");
  }

  const suggestedColleges = useMemo(() => {
    if (!prediction) return [];
    if (prediction.chance === "High") {
      return colleges.filter((college) => college.ranking <= 45).slice(0, 3);
    }
    if (prediction.chance === "Medium") {
      return colleges.filter((college) => college.acceptance !== "Low").slice(0, 3);
    }
    return colleges.slice(0, 3);
  }, [prediction]);

  function toggleCompare(id: number) {
    setCompareList((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : current.length < 3 ? [...current, id] : current
    );
  }

  function handlePredict(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = Number(scoreText.replace(/[^0-9]/g, ""));
    if (!Number.isFinite(value) || value <= 0) {
      return;
    }
    setPrediction(predictAdmissionChance(exam, value, category));
  }

  const inputLabel = exam === "NEET" ? "Enter NEET score" : `Enter ${exam} rank`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="bg-slate-950/95 border-b border-slate-800 py-8 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:flex lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            <Link href="/" className="flex items-center gap-3 group mb-4">
              <img src="/images/logo-horizontal.png" alt="Logo" className="h-10 w-auto brightness-0 invert" />
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors">College Discovery</span>
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white">Find your best college with confident search, compare and admission guidance.</h1>
            <p className="mt-5 max-w-xl text-slate-300 text-lg leading-relaxed">Explore top Indian colleges by course, ranking, location, fees, and admission chances — all in a single smart platform.</p>
          </div>

          <form onSubmit={handleSearch} className="w-full max-w-3xl rounded-[2rem] border border-slate-800 bg-slate-900/90 p-4 shadow-2xl shadow-slate-950/40">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for colleges, exams, courses..."
                className="w-full px-4 py-3 border border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button type="submit" className="btn-primary px-6 py-3 rounded-2xl whitespace-nowrap">Search</button>
            </div>
          </form>
        </div>
      </header>

      <section className="bg-slate-950/95 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/30">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-orange-400">Stream Explorer</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Find the right path for every stream student</h2>
                <p className="mt-3 max-w-2xl text-slate-400">Choose from engineering, medical, management, arts, and science guides to start your college journey with confidence.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">
                <Link href="/?course=B.Tech" className="rounded-[1.5rem] border border-slate-800 bg-slate-950 p-5 text-center transition hover:-translate-y-1 hover:border-orange-400 hover:bg-slate-900">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-300 text-2xl">🧑‍🔬</div>
                  <h3 className="text-lg font-semibold text-white">Engineering</h3>
                  <p className="mt-2 text-sm text-slate-400">Top IITs, NITs & private tech colleges.</p>
                </Link>
                <Link href="/?course=MBBS" className="rounded-[1.5rem] border border-slate-800 bg-slate-950 p-5 text-center transition hover:-translate-y-1 hover:border-emerald-400 hover:bg-slate-900">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300 text-2xl">🩺</div>
                  <h3 className="text-lg font-semibold text-white">Medical</h3>
                  <p className="mt-2 text-sm text-slate-400">MBBS, BDS, nursing and allied health programs.</p>
                </Link>
                <Link href="/?course=MBA" className="rounded-[1.5rem] border border-slate-800 bg-slate-950 p-5 text-center transition hover:-translate-y-1 hover:border-orange-400 hover:bg-slate-900">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-300 text-2xl">📈</div>
                  <h3 className="text-lg font-semibold text-white">Management</h3>
                  <p className="mt-2 text-sm text-slate-400">MBA, BBA and business analytics streams.</p>
                </Link>
                <Link href="/?course=BA" className="rounded-[1.5rem] border border-slate-800 bg-slate-950 p-5 text-center transition hover:-translate-y-1 hover:border-violet-400 hover:bg-slate-900">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300 text-2xl">🎨</div>
                  <h3 className="text-lg font-semibold text-white">Arts & Science</h3>
                  <p className="mt-2 text-sm text-slate-400">Humanities, commerce, science and creative fields.</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800 bg-slate-950/95 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-orange-400">Campus showcase</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Explore featured college campuses</h2>
            </div>
            <p className="text-sm text-slate-400 hidden md:block">Swipe or scroll to preview top college imagery.</p>
          </div>

          <div className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-4">
            {featuredSlides.map((slide) => (
              <div key={slide.title} className="snap-center min-w-[320px] md:min-w-[360px] lg:min-w-[400px] flex-none rounded-[2rem] overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-950/40">
                <div className="relative h-64 w-full">
                  <Image src={slide.src} alt={slide.title} fill className="object-cover" />
                </div>
                <div className="p-5 bg-slate-950">
                  <h3 className="text-xl font-semibold text-white">{slide.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{slide.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <section className="mb-12">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-slate-950/40">
            <div className="text-center">
              <h2 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">Find Over {colleges.length} Colleges in India</h2>
              <p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-300">Discover your perfect college with our curated search experience. Explore colleges by course, fees, location, ranking, and compare top choices side by side.</p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm uppercase tracking-[0.24em] text-orange-500 dark:text-orange-400">Total colleges</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{colleges.length}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm uppercase tracking-[0.24em] text-orange-500 dark:text-orange-400">Selected for compare</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{compareItems.length}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm uppercase tracking-[0.24em] text-orange-500 dark:text-orange-400">Courses covered</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{courseOptions.length}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm uppercase tracking-[0.24em] text-orange-500 dark:text-orange-400">Filter options</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{locationOptions.length}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Select Your Study Goal</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {studyGoals.map((goal) => (
              <button
                key={goal.name}
                onClick={() => setSelectedGoal(goal.name)}
                className={`group rounded-[1.5rem] border p-6 text-center transition duration-200 hover:-translate-y-1 shadow-lg shadow-slate-950/10 dark:shadow-slate-950/20 ${
                  selectedGoal === goal.name
                    ? "border-orange-400 bg-slate-900 dark:bg-slate-800"
                    : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/95 hover:border-orange-400 hover:bg-slate-50 dark:hover:border-orange-400 dark:hover:bg-slate-900"
                }`}
              >
                <h4 className={`text-xl font-semibold mb-2 ${
                  selectedGoal === goal.name
                    ? "text-orange-400"
                    : "text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-300"
                }`}>{goal.name}</h4>
                <p className="text-slate-600 dark:text-slate-400">{goal.count} Colleges</p>
              </button>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-slate-950/20">
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-200">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(event) => setSelectedLocation(event.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 bg-white text-slate-900 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    <option value="">All locations</option>
                    {locationOptions.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-200">Course</label>
                  <select
                    value={selectedCourse}
                    onChange={(event) => setSelectedCourse(event.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 bg-white text-slate-900 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    <option value="">All courses</option>
                    {courseOptions.map((course) => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-200">College type</label>
                  <select
                    value={selectedType}
                    onChange={(event) => setSelectedType(event.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 bg-white text-slate-900 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    <option value="">All types</option>
                    {typeOptions.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Max annual fee</label>
                  <input
                    type="range"
                    min={0}
                    max={Math.max(...colleges.map((college) => college.feesRange[1]))}
                    value={maxFees}
                    onChange={(event) => setMaxFees(Number(event.target.value))}
                    className="w-full accent-sky-500"
                  />
                  <p className="text-sm text-slate-400 mt-1">Up to ₹{maxFees.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Active Filters Tags */}
            {(query || selectedCourse || selectedType || selectedLocation || selectedGoal || maxFees !== Math.max(...colleges.map((college) => college.feesRange[1]))) && (
              <div className="card p-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Active Filters</h3>
                  <button
                    onClick={() => {
                      setQuery("");
                      setSelectedCourse("");
                      setSelectedType("");
                      setSelectedLocation("");
                      setSelectedGoal("");
                      setMaxFees(Math.max(...colleges.map((college) => college.feesRange[1])));
                    }}
                    className="text-sm text-orange-600 hover:text-orange-800 font-medium"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {query && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100/10 border border-orange-500/20 text-orange-400">
                      Search: {query}
                      <button
                        onClick={() => setQuery("")}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedCourse && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100/10 border border-orange-500/20 text-orange-400">
                      Course: {selectedCourse}
                      <button
                        onClick={() => setSelectedCourse("")}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedType && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100/10 border border-orange-500/20 text-orange-400">
                      Type: {selectedType}
                      <button
                        onClick={() => setSelectedType("")}
                        className="ml-2 text-purple-600 hover:text-purple-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedLocation && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                      Location: {selectedLocation}
                      <button
                        onClick={() => setSelectedLocation("")}
                        className="ml-2 text-orange-600 hover:text-orange-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {maxFees !== Math.max(...colleges.map((college) => college.feesRange[1])) && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                      Max Fee: ₹{maxFees.toLocaleString()}
                      <button
                        onClick={() => setMaxFees(Math.max(...colleges.map((college) => college.feesRange[1])))}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedGoal && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100/10 border border-orange-500/20 text-orange-400">
                      Goal: {selectedGoal}
                      <button
                        onClick={() => setSelectedGoal("")}
                        className="ml-2 text-orange-600 hover:text-orange-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 mt-6 shadow-lg shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-slate-950/20">
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Admission Predictor</h3>
              <form onSubmit={handlePredict} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Exam</label>
                  <select
                    value={exam}
                    onChange={(event) => setExam(event.target.value as ExamType)}
                    className="w-full px-3 py-2 border border-slate-300 bg-white text-slate-900 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {examOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value as CategoryType)}
                    className="w-full px-3 py-2 border border-slate-300 bg-white text-slate-900 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{inputLabel}</label>
                  <input
                    value={scoreText}
                    onChange={(event) => setScoreText(event.target.value)}
                    placeholder={exam === "NEET" ? "e.g. 495" : "e.g. 56000"}
                    className="w-full px-3 py-2 border border-slate-300 bg-white text-slate-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">Predict Chance</button>
              </form>

              {prediction && (
                <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-3xl dark:bg-slate-800 dark:border-slate-700">
                  <p className="font-semibold text-slate-900 dark:text-white">{prediction.chance} chance</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{prediction.explanation}</p>
                </div>
              )}
            </div>
          </aside>

          <div className="lg:col-span-3">
            <section className="mb-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{filteredColleges.length} Colleges Found</h3>
                  <p className="text-sm text-slate-400">Browse top colleges and compare the best fits for your goals.</p>
                </div>
                {compareItems.length > 0 && (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-orange-400">{compareItems.length} selected</span>
                    <Link href={compareUrl} className="btn-secondary">Compare</Link>
                  </div>
                )}
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredColleges.map((college) => (
                  <CollegeListingCard
                    key={college.id}
                    name={college.name}
                    location={`${college.city}, ${college.state}`}
                    image={college.image}
                    rating={college.rating.toString()}
                    featuredCourse={college.courses[0]?.name || "N/A"}
                    fees={`₹${(college.feesRange[0] / 100000).toFixed(1)}L - ₹${(college.feesRange[1] / 100000).toFixed(1)}L`}
                    duration={college.courses[0]?.duration || "N/A"}
                    exam={college.tags[0] || "JEE/CUET"}
                    ranking={`${college.ranking} by College Discovery`}
                    onApply={() => { setSelectedCollege(college); setShowExpertForm(true); }}
                    onDetails={() => router.push(detailHref(college))}
                    onCompare={() => toggleCompare(college.id)}
                  />
                ))}
              </div>

              {filteredColleges.length === 0 && (
                <div className="rounded-[3rem] border border-slate-800 border-dashed bg-slate-900/50 p-16 text-center">
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="text-xl font-bold text-white">No colleges match your filters</h3>
                  <p className="mt-2 text-slate-400">Try adjusting your search or clearing filters to see more results.</p>
                  <button
                    onClick={() => {
                      setQuery("");
                      setSelectedCourse("");
                      setSelectedType("");
                      setSelectedLocation("");
                      setSelectedGoal("");
                      setMaxFees(Math.max(...colleges.map((college) => college.feesRange[1])));
                    }}
                    className="mt-8 text-sky-400 font-bold underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Expert Consultation Modal */}
      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl rounded-[2.5rem] border border-slate-800 bg-slate-900 p-8 shadow-2xl lg:p-12 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-8 right-8 text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-400">{activeNewsTab} Alert</p>
            <h2 className="mt-4 text-3xl font-extrabold text-white leading-tight">{selectedNews.title}</h2>
            <p className="mt-4 text-sm font-semibold text-slate-500">{selectedNews.date}</p>

            <div className="mt-8 border-t border-slate-800 pt-8">
              <p className="text-slate-300 leading-relaxed text-lg">
                {selectedNews.content}
              </p>
            </div>

            <div className="mt-10 flex gap-4">
              <button
                onClick={() => setSelectedNews(null)}
                className="btn-primary flex-1"
              >
                Close Details
              </button>
              <button className="rounded-2xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                Share News
              </button>
            </div>
          </div>
        </div>
      )}

      {showExpertForm && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowExpertForm(false)}></div>
          <div className="relative w-full max-w-md rounded-[2.5rem] border border-slate-800 bg-slate-900 p-10 shadow-2xl">
            <button className="absolute right-8 top-8 text-slate-400 hover:text-white" onClick={() => setShowExpertForm(false)}>✕</button>
            <h2 className="text-3xl font-bold text-white">Talk to an Expert</h2>
            <p className="mt-3 text-slate-400">
              {selectedCollege ? `Get admission guidance for ${selectedCollege.name}` : "Our experts will help you find the right college."}
            </p>
            <form className="mt-10 space-y-5" onSubmit={(e) => { e.preventDefault(); setShowExpertForm(false); alert('Our expert will call you shortly!'); }}>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2 ml-1">Full Name</label>
                <input type="text" required placeholder="John Doe" className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4 text-sm text-white focus:border-orange-500 transition-colors outline-none" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2 ml-1">Email Address</label>
                <input type="email" required placeholder="john@example.com" className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4 text-sm text-white focus:border-orange-500 transition-colors outline-none" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2 ml-1">Phone Number</label>
                <input type="tel" required placeholder="+91 98765 43210" className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4 text-sm text-white focus:border-orange-500 transition-colors outline-none" />
              </div>
              <div className="p-5 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Inquiry for</p>
                <p className="text-sm text-orange-400 font-bold truncate">{selectedCollege?.name || "Multiple Institutions"}</p>
              </div>
              <button type="submit" className="w-full mt-4 rounded-2xl bg-orange-500 py-5 text-sm font-bold text-white hover:bg-orange-400 shadow-xl shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                Request Free Callback
              </button>
            </form>
          </div>
        </div>
      )}


      <hr className="border-t border-slate-800/60" />

      <section className="border-b border-slate-800 bg-slate-950/95 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-400 font-semibold">Study Abroad</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Explore popular study abroad destinations</h2>
            <p className="mt-4 text-slate-400">Find the best overseas destinations, average costs, top college counts, and guidance to make your international education journey smoother.</p>
          </div>

          <div className="relative group">
            <div ref={carouselRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

              <div className="shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start rounded-[1.5rem] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
                <div className="mb-5 flex flex-col items-center sm:flex-row gap-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-800/50 border border-slate-700 overflow-hidden p-2">
                    <img src="/images/logos/HongKong.webp" alt="Hong Kong" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-white">Study in Hong Kong</h3>
                    <Link href="/study-abroad/hong-kong/colleges" className="text-[13px] text-orange-400 font-bold underline flex items-center gap-1 transition-colors hover:text-orange-300">Top 8 Colleges <span className="text-lg leading-none">&rsaquo;</span></Link>
                  </div>
                </div>

                <div className="mb-6 flex flex-col sm:flex-row rounded-xl bg-slate-950/50 p-4 border border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                  <div className="flex flex-1 items-center gap-3 pb-3 sm:pb-0 sm:pr-3">
                    <div className="rounded-full bg-slate-800 p-2 text-orange-400">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15L24 9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-orange-400 leading-tight">8</span>
                      <span className="text-[11px] text-slate-400 mt-0.5">No. Of Colleges</span>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
                    <div className="rounded-full bg-slate-800 p-2 text-orange-400">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-orange-400 leading-tight">1.62 L USD/Year</span>
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
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-800/50 border border-slate-700 overflow-hidden p-2">
                    <img src="/images/logos/UAE.webp" alt="UAE" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-white">Study in UAE</h3>
                    <Link href="/study-abroad/uae/colleges" className="text-[13px] text-orange-400 font-bold underline flex items-center gap-1 transition-colors hover:text-orange-300">Top 5 Colleges <span className="text-lg leading-none">&rsaquo;</span></Link>
                  </div>
                </div>

                <div className="mb-6 flex flex-col sm:flex-row rounded-xl bg-slate-950/50 p-4 border border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                  <div className="flex flex-1 items-center gap-3 pb-3 sm:pb-0 sm:pr-3">
                    <div className="rounded-full bg-slate-800 p-2 text-orange-400">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15L24 9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-orange-400 leading-tight">5</span>
                      <span className="text-[11px] text-slate-400 mt-0.5">No. Of Colleges</span>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
                    <div className="rounded-full bg-slate-800 p-2 text-orange-400">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-orange-400 leading-tight">57.81 K USD/Year</span>
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
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-800/50 border border-slate-700 overflow-hidden p-2">
                    <img src="/images/logos/Singapore.webp" alt="Singapore" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-white">Study in Singapore</h3>
                    <Link href="/study-abroad/singapore/colleges" className="text-[13px] text-orange-400 font-bold underline flex items-center gap-1 transition-colors hover:text-orange-300">Top 9 Colleges <span className="text-lg leading-none">&rsaquo;</span></Link>
                  </div>
                </div>

                <div className="mb-6 flex flex-col sm:flex-row rounded-xl bg-slate-950/50 p-4 border border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                  <div className="flex flex-1 items-center gap-3 pb-3 sm:pb-0 sm:pr-3">
                    <div className="rounded-full bg-slate-800 p-2 text-orange-400">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15L24 9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-orange-400 leading-tight">9</span>
                      <span className="text-[11px] text-slate-400 mt-0.5">Top Colleges</span>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
                    <div className="rounded-full bg-slate-800 p-2 text-orange-400">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-orange-400 leading-tight">34.9 K USD/Year</span>
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
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-800/50 border border-slate-700 overflow-hidden p-2">
                    <img src="/images/logos/Canada.webp" alt="Canada" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-white">Study in Canada</h3>
                    <Link href="/study-abroad/canada/colleges" className="text-[13px] text-orange-400 font-bold underline flex items-center gap-1 transition-colors hover:text-orange-300">Top 8 Colleges <span className="text-lg leading-none">&rsaquo;</span></Link>
                  </div>
                </div>
                <div className="mb-6 flex flex-col sm:flex-row rounded-xl bg-slate-950/50 p-4 border border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                  <div className="flex flex-1 items-center gap-3 pb-3 sm:pb-0 sm:pr-3">
                    <div className="rounded-full bg-slate-800 p-2 text-orange-400">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15L24 9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-orange-400 leading-tight">8</span>
                      <span className="text-[11px] text-slate-400 mt-0.5">No. Of Colleges</span>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
                    <div className="rounded-full bg-slate-800 p-2 text-orange-400">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-orange-400 leading-tight">25.5 K USD/Year</span>
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
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-800/50 border border-slate-700 overflow-hidden p-2">
                    <img src="/images/logos/USA.webp" alt="USA" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-white">Study in USA</h3>
                    <Link href="/study-abroad/usa/colleges" className="text-[13px] text-orange-400 font-bold underline flex items-center gap-1 transition-colors hover:text-orange-300">Top 8 Colleges <span className="text-lg leading-none">&rsaquo;</span></Link>
                  </div>
                </div>
                <div className="mb-6 flex flex-col sm:flex-row rounded-xl bg-slate-950/50 p-4 border border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                  <div className="flex flex-1 items-center gap-3 pb-3 sm:pb-0 sm:pr-3">
                    <div className="rounded-full bg-slate-800 p-2 text-orange-400">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15L24 9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-orange-400 leading-tight">8</span>
                      <span className="text-[11px] text-slate-400 mt-0.5">No. Of Colleges</span>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
                    <div className="rounded-full bg-slate-800 p-2 text-orange-400">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-orange-400 leading-tight">34.15 K USD/Year</span>
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
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-800/50 border border-slate-700 overflow-hidden p-2">
                    <img src="/images/logos/UK.webp" alt="UK" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-white">Study in UK</h3>
                    <Link href="/study-abroad/uk/colleges" className="text-[13px] text-orange-400 font-bold underline flex items-center gap-1 transition-colors hover:text-orange-300">Top 8 Colleges <span className="text-lg leading-none">&rsaquo;</span></Link>
                  </div>
                </div>
                <div className="mb-6 flex flex-col sm:flex-row rounded-xl bg-slate-950/50 p-4 border border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                  <div className="flex flex-1 items-center gap-3 pb-3 sm:pb-0 sm:pr-3">
                    <div className="rounded-full bg-slate-800 p-2 text-orange-400">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15L24 9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-orange-400 leading-tight">8</span>
                      <span className="text-[11px] text-slate-400 mt-0.5">No. Of Colleges</span>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
                    <div className="rounded-full bg-slate-800 p-2 text-orange-400">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-orange-400 leading-tight">22.7 K USD/Year</span>
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
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-800/50 border border-slate-700 overflow-hidden p-2">
                    <img src="/images/logos/Australia.webp" alt="Australia" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-white">Study in Australia</h3>
                    <Link href="/study-abroad/australia/colleges" className="text-[13px] text-orange-400 font-bold underline flex items-center gap-1 transition-colors hover:text-orange-300">Top 6 Colleges <span className="text-lg leading-none">&rsaquo;</span></Link>
                  </div>
                </div>
                <div className="mb-6 flex flex-col sm:flex-row rounded-xl bg-slate-950/50 p-4 border border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                  <div className="flex flex-1 items-center gap-3 pb-3 sm:pb-0 sm:pr-3">
                    <div className="rounded-full bg-slate-800 p-2 text-orange-400">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15L24 9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-orange-400 leading-tight">6</span>
                      <span className="text-[11px] text-slate-400 mt-0.5">No. Of Colleges</span>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
                    <div className="rounded-full bg-slate-800 p-2 text-orange-400">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-orange-400 leading-tight">28.5 K USD/Year</span>
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
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-800/50 border border-slate-700 overflow-hidden p-2">
                    <img src="/images/logos/Germany.webp" alt="Germany" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-white">Study in Germany</h3>
                    <Link href="/study-abroad/germany/colleges" className="text-[13px] text-orange-400 font-bold underline flex items-center gap-1 transition-colors hover:text-orange-300">Top 6 Colleges <span className="text-lg leading-none">&rsaquo;</span></Link>
                  </div>
                </div>
                <div className="mb-6 flex flex-col sm:flex-row rounded-xl bg-slate-950/50 p-4 border border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                  <div className="flex flex-1 items-center gap-3 pb-3 sm:pb-0 sm:pr-3">
                    <div className="rounded-full bg-slate-800 p-2 text-orange-400">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15L24 9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-orange-400 leading-tight">6</span>
                      <span className="text-[11px] text-slate-400 mt-0.5">No. Of Colleges</span>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
                    <div className="rounded-full bg-slate-800 p-2 text-orange-400">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-orange-400 leading-tight">10.2 K USD/Year</span>
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
            </div>
            <button onClick={() => scrollCarousel('left')} className="absolute left-0 top-[45%] -translate-y-1/2 -translate-x-4 lg:-translate-x-6 h-12 w-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-orange-400 hover:border-orange-500/50 hover:bg-slate-700 shadow-2xl z-10 hidden sm:flex pointer-events-auto transition-colors" aria-label="Previous card">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={() => scrollCarousel('right')} className="absolute right-0 top-[45%] -translate-y-1/2 translate-x-4 lg:translate-x-6 h-12 w-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-orange-400 hover:border-orange-500/50 hover:bg-slate-700 shadow-2xl z-10 hidden sm:flex pointer-events-auto transition-colors" aria-label="Next card">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800 bg-slate-950/95 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-400">Latest News & Stories</p>
              <h2 className="mt-3 text-4xl font-bold text-white leading-tight">Stay updated with exam alerts and college news</h2>
              <p className="mt-4 text-slate-400">Get the most recent updates on national level entrance exams, top university rankings, and admission notifications.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveNewsTab('exam')}
                className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 border ${activeNewsTab === 'exam'
                    ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20'
                    : 'bg-slate-900/50 text-slate-300 border-slate-700 hover:border-orange-500/50 hover:text-white'
                  }`}
              >
                Exam Alerts
              </button>
              <button
                onClick={() => setActiveNewsTab('college')}
                className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 border ${activeNewsTab === 'college'
                    ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20'
                    : 'bg-slate-900/50 text-slate-300 border-slate-700 hover:border-orange-500/50 hover:text-white'
                  }`}
              >
                College Alerts
              </button>
              <button
                onClick={() => setActiveNewsTab('admission')}
                className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 border ${activeNewsTab === 'admission'
                    ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20'
                    : 'bg-slate-900/50 text-slate-300 border-slate-700 hover:border-orange-500/50 hover:text-white'
                  }`}
              >
                Admission Alerts
              </button>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {newsData[activeNewsTab].map((item, index) => (
              <article
                key={`${activeNewsTab}-${index}`}
                className="group relative rounded-[2rem] border border-slate-800 bg-slate-900/50 p-8 shadow-xl shadow-slate-950/40 transition-all duration-300 hover:border-orange-500/30 hover:bg-slate-900 hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-orange-500/10 p-2 text-orange-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm font-semibold text-slate-500">{item.date}</p>
                <p className="mt-5 text-slate-400 leading-relaxed text-[15px]">
                  {item.desc}
                </p>
                <div
                  onClick={() => setSelectedNews(item)}
                  className="mt-8 flex items-center gap-2 text-sm font-bold text-orange-400 group-hover:gap-3 transition-all cursor-pointer"
                >
                  Read more <span>→</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-100 pb-12 pt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 grid gap-8 rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/30 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-orange-400 font-semibold">Subscribe to Our News Letter</p>
              <h2 className="text-3xl font-bold text-white">Get College Notifications, Exam Notifications and News Updates</h2>
              <p className="text-slate-400 max-w-2xl">Stay updated with the latest college alerts, exam news, and study abroad announcements right in your inbox.</p>
            </div>
            <form className="grid gap-4 sm:grid-cols-3 items-end">
              <div>
                <label className="sr-only" htmlFor="footer-first-name">First Name</label>
                <input id="footer-first-name" type="text" placeholder="Enter your first name" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30" />
              </div>
              <div>
                <label className="sr-only" htmlFor="footer-last-name">Last Name</label>
                <input id="footer-last-name" type="text" placeholder="Enter your last name" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30" />
              </div>
              <button type="submit" className="w-full rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400">Submit</button>
            </form>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <h3 className="mb-6 text-[15px] font-bold text-slate-100">Top Colleges</h3>
              <ul className="space-y-3 text-[13px] text-slate-400">
                <li><Link href="/?course=MBA" className="hover:text-orange-400 active:text-orange-500 transition-colors">M.B.A</Link></li>
                <li><Link href="/?course=B.Tech" className="hover:text-orange-400 active:text-orange-500 transition-colors">B.Tech/B.E</Link></li>
                <li><Link href="/?course=MCA" className="hover:text-orange-400 active:text-orange-500 transition-colors">MCA</Link></li>
                <li><Link href="/?course=BCA" className="hover:text-orange-400 active:text-orange-500 transition-colors">BCA</Link></li>
                <li><Link href="/?course=M.Tech" className="hover:text-orange-400 active:text-orange-500 transition-colors">M.Tech</Link></li>
                <li><Link href="/?course=MA" className="hover:text-orange-400 active:text-orange-500 transition-colors">M.A</Link></li>
                <li><Link href="/?course=BA" className="hover:text-orange-400 active:text-orange-500 transition-colors">B.A</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-[15px] font-bold text-slate-100">Top Universities</h3>
              <ul className="space-y-3 text-[13px] text-slate-400">
                <li><Link href="/?goal=Engineering" className="hover:text-orange-400 active:text-orange-500 transition-colors">Engineering</Link></li>
                <li><Link href="/?goal=Management" className="hover:text-orange-400 active:text-orange-500 transition-colors">Management</Link></li>
                <li><Link href="/?goal=Medical" className="hover:text-orange-400 active:text-orange-500 transition-colors">Medical</Link></li>
                <li><Link href="/?goal=Law" className="hover:text-orange-400 active:text-orange-500 transition-colors">Law</Link></li>
                <li><Link href="/?goal=Commerce" className="hover:text-orange-400 active:text-orange-500 transition-colors">Commerce</Link></li>
                <li><Link href="/?goal=Science" className="hover:text-orange-400 active:text-orange-500 transition-colors">Science</Link></li>
                <li><Link href="/?goal=Arts" className="hover:text-orange-400 active:text-orange-500 transition-colors">Arts</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-[15px] font-bold text-slate-100">Top Exam</h3>
              <ul className="space-y-3 text-[13px] text-slate-400">
                <li><Link href="/?q=CAT" className="hover:text-orange-400 active:text-orange-500 transition-colors">CAT</Link></li>
                <li><Link href="/?q=GATE" className="hover:text-orange-400 active:text-orange-500 transition-colors">GATE</Link></li>
                <li><Link href="/?q=JEE" className="hover:text-orange-400 active:text-orange-500 transition-colors">Jee-Main</Link></li>
                <li><Link href="/?q=NEET" className="hover:text-orange-400 active:text-orange-500 transition-colors">NEET</Link></li>
                <li><Link href="/?q=XAT" className="hover:text-orange-400 active:text-orange-500 transition-colors">XAT</Link></li>
                <li><Link href="/?q=CLAT" className="hover:text-orange-400 active:text-orange-500 transition-colors">CLAT</Link></li>
                <li><Link href="/?q=MAT" className="hover:text-orange-400 active:text-orange-500 transition-colors">MAT</Link></li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h3 className="mb-6 text-[15px] font-bold text-slate-100">Study Abroad</h3>
              <div className="grid grid-cols-2 gap-x-4">
                <ul className="space-y-3 text-[13px] text-slate-400">
                  <li><Link href="/study-abroad#canada" className="hover:text-orange-500 active:text-orange-600 transition-colors">Canada</Link></li>
                  <li><Link href="/study-abroad#usa" className="hover:text-orange-500 active:text-orange-600 transition-colors">USA</Link></li>
                  <li><Link href="/study-abroad#uk" className="hover:text-orange-500 active:text-orange-600 transition-colors">UK</Link></li>
                  <li><Link href="/study-abroad#uae" className="hover:text-orange-500 active:text-orange-600 transition-colors">UAE</Link></li>
                  <li><Link href="/study-abroad#australia" className="hover:text-orange-500 active:text-orange-600 transition-colors">Australia</Link></li>
                  <li><Link href="/study-abroad#germany" className="hover:text-orange-500 active:text-orange-600 transition-colors">Germany</Link></li>
                  <li><Link href="/study-abroad#sweden" className="hover:text-orange-500 active:text-orange-600 transition-colors">Sweden</Link></li>
                </ul>
                <ul className="space-y-3 text-[13px] text-slate-400">
                  <li><Link href="/study-abroad#ireland" className="hover:text-orange-500 active:text-orange-600 transition-colors">Ireland</Link></li>
                  <li><Link href="/study-abroad" className="hover:text-orange-500 active:text-orange-600 transition-colors">New Zealand</Link></li>
                  <li><Link href="/study-abroad" className="hover:text-orange-500 active:text-orange-600 transition-colors">Hong Kong</Link></li>
                  <li><Link href="/study-abroad#singapore" className="hover:text-orange-500 active:text-orange-600 transition-colors">Singapore</Link></li>
                  <li><Link href="/study-abroad" className="hover:text-orange-500 active:text-orange-600 transition-colors">Malaysia</Link></li>
                  <li><Link href="/study-abroad" className="hover:text-orange-500 active:text-orange-600 transition-colors">Netherlands</Link></li>
                  <li><Link href="/study-abroad" className="hover:text-orange-500 active:text-orange-600 transition-colors">Italy</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="my-8 border-slate-800" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <h3 className="text-[15px] font-bold text-slate-100">Other Links</h3>
              <div className="flex flex-wrap items-center gap-6 text-[13px] text-slate-400">
                <Link href="/about" className="hover:text-orange-400 transition-colors">About College Discovery</Link>
                <Link href="/contact" className="hover:text-orange-400 transition-colors">Contact Us</Link>
                <Link href="/advertising" className="hover:text-orange-400 transition-colors">Advertising</Link>
                <Link href="/career" className="hover:text-orange-400 transition-colors">Career</Link>
                <Link href="/terms" className="hover:text-orange-400 transition-colors">Terms & Conditions</Link>
                <Link href="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <Link href="#" className="hover:text-orange-400 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </Link>
              <Link href="#" className="hover:text-orange-400 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </Link>
              <Link href="#" className="hover:text-orange-400 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
              </Link>
              <Link href="#" className="hover:text-orange-400 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </Link>
              <Link href="#" className="hover:text-orange-400 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </Link>
            </div>
          </div>

          <hr className="my-8 border-slate-800" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
              <div className="flex items-center gap-2">
                <img src="/images/logo-horizontal.png" alt="College Discovery" className="h-14 w-auto brightness-0 invert" />
              </div>
              <p className="text-[13px] text-slate-500 text-center">© 2026 College Discovery. All Rights Reserved</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <span className="text-[13px] font-bold text-slate-300">Download the College Discovery app on</span>
              <div className="flex gap-3">
                <Link href="#" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors text-white px-3 py-1.5 rounded-lg">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M3.609 1.814L13.792 12 3.609 22.186c-.164-.176-.266-.416-.266-.686V2.5c0-.27.102-.51.266-.686zM14.853 13.061l3.155 3.154-12.756 7.36c-.456.263-1.01.196-1.393-.146l10.994-10.368zM14.853 10.939L3.859.57C4.243.229 4.796.162 5.252.425l12.756 7.36-3.155 3.154zM18.715 12l2.368-2.368c.594.343.996.953.996 1.66s-.402 1.317-.996 1.66L18.715 12z" /></svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] text-slate-400">GET IT ON</span>
                    <span className="text-[13px] font-semibold text-slate-100">Google Play</span>
                  </div>
                </Link>
                <Link href="#" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors text-white px-3 py-1.5 rounded-lg">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M16.365 14.122c-.035-3.082 2.508-4.575 2.62-4.646-1.428-2.096-3.634-2.383-4.42-2.42-1.898-.192-3.707 1.118-4.675 1.118-.96 0-2.45-1.088-3.997-1.057-2.023.033-3.889 1.18-4.933 2.996-2.115 3.676-.54 9.112 1.521 12.11 1.01 1.464 2.193 3.116 3.766 3.055 1.512-.063 2.083-.984 3.916-.984 1.82 0 2.355.984 3.938.951 1.636-.031 2.651-1.492 3.644-2.95 1.144-1.681 1.615-3.308 1.637-3.393-.037-.015-3.167-1.218-3.204-4.526M15.422 4.492c.833-1.012 1.396-2.42 1.242-3.82-.1.006-.2.012-.303.012-1.394 0-2.883-.873-3.75-1.91-.762-.907-1.433-2.366-1.242-3.819 1.488.118 3.042.992 3.864 1.954.78.914 1.448 2.425 1.256 3.868-.113.013-.232.02-.349.02-.27 0-.54-.035-.718-.305" /></svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] text-slate-400">Download on the</span>
                    <span className="text-[13px] font-semibold text-slate-100">App Store</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
