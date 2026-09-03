export default function SearchResultItem({ name, meta, dotColor }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
      <div className="flex items-center gap-3">
        <span className={`w-8 h-8 rounded-full ${dotColor}`} />
        <div>
          <p className="text-white text-sm font-semibold">{name}</p>
          <p className="text-slate-500 text-xs mt-0.5">{meta}</p>
        </div>
      </div>
      <button className="text-blue-400 text-xs font-semibold hover:text-blue-300">
        View →
      </button>
    </div>
  );
}