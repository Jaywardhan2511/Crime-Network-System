export default function SourceRecordItem({ title, meta }) {
  return (
    <div className="flex items-center justify-between bg-[#0B1220] border border-slate-800 rounded-md px-4 py-3">
      <div>
        <p className="text-white text-sm font-medium leading-tight">{title}</p>
        <p className="text-slate-500 text-xs leading-tight mt-0.5">{meta}</p>
      </div>
      <button className="text-blue-400 text-xs font-medium hover:text-blue-300 shrink-0">
        View record →
      </button>
    </div>
  );
}