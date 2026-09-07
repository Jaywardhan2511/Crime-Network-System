export default function DataSourceCard({ icon, title, meta, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-left bg-[#111a2e] border rounded-lg px-4 py-3 flex-1 min-w-0 transition-colors ${
        active ? "border-blue-500 ring-1 ring-blue-500" : "border-slate-800 hover:border-slate-700"
      }`}
    >
      <p className="text-white text-sm font-medium flex items-center gap-2">
        <span>{icon}</span>
        {title}
      </p>
      <p className="text-slate-500 text-xs mt-1">{meta}</p>
    </button>
  );
}