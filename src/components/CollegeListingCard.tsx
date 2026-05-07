import Image from "next/image";

interface CollegeListingCardProps {
  name: string;
  location: string;
  image: string;
  rating: string;
  featuredCourse: string;
  fees: string;
  duration: string;
  exam: string;
  ranking: string;
  onDetails?: () => void;
  onApply?: () => void;
  onCompare?: () => void;
}

export default function CollegeListingCard({
  name,
  location,
  image,
  rating,
  featuredCourse,
  fees,
  duration,
  exam,
  ranking,
  onDetails,
  onApply,
  onCompare
}: CollegeListingCardProps) {
  // Replace any instance of Collegedunia with College Discovery
  const displayRanking = ranking.replace(/Collegedunia/g, "College Discovery");

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/95 shadow-2xl shadow-slate-950/50 transition-all hover:border-orange-500/50">
      {/* Top Image Section */}
      <div className="relative h-48 w-full">
        <Image src={image} alt={name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        {/* Rating */}
        <div className="absolute right-3 top-3 text-right">
          <div className="rounded-lg bg-slate-900/80 p-2 backdrop-blur-md border border-slate-700/50">
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Rating</p>
            <p className="text-sm font-bold text-white">{rating}/10</p>
          </div>
        </div>
      </div>

      {/* College Info Header */}
      <div className="relative px-5 pb-4 pt-4">
        <h3 className="text-base font-bold text-white leading-tight">{name}</h3>
        <p className="mt-1.5 text-xs text-slate-400 flex items-center gap-1.5">
          <span className="text-orange-400">📍</span> {location}
        </p>
      </div>

      {/* Course Details */}
      <div className="px-5 py-4 bg-slate-800/30 border-y border-slate-800/50 grid grid-cols-2 gap-y-3">
        <div>
          <p className="text-xs font-semibold text-orange-400 truncate">{featuredCourse}</p>
          <p className="mt-1 text-[11px] text-slate-400 font-medium">Duration: <span className="text-orange-400">{duration}</span></p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-orange-400">{fees}</p>
          <p className="mt-1 text-[11px] text-slate-400 font-medium">{exam}</p>
        </div>
      </div>

      {/* Ranking - Updated to College Discovery */}
      <div className="px-5 py-2.5 text-center border-b border-slate-800/50 bg-slate-950/30">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.2em]">Ranked {displayRanking}</p>
      </div>

      {/* Actions */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={onCompare}
            className="flex items-center justify-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/5 py-2.5 text-[11px] font-bold text-orange-400 transition hover:bg-orange-500/10"
          >
            <span className="text-lg leading-none">+</span> COMPARE
          </button>
          <button 
            onClick={onDetails}
            className="flex items-center justify-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/5 py-2.5 text-[11px] font-bold text-orange-400 transition hover:bg-orange-500/10"
          >
            <span className="text-xs">📥</span> DETAILS
          </button>
        </div>
        <button 
          onClick={onApply}
          className="w-full rounded-xl bg-orange-500 py-3 text-xs font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400 hover:scale-[1.02] active:scale-[0.98]"
        >
          📄 APPLY NOW
        </button>
      </div>
    </div>
  );
}
