export default function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-md text-xs font-medium border transition-colors ${
        active
          ? "bg-blue-600 border-blue-600 text-white"
          : "bg-[#0d1526] border-slate-700 text-slate-300 hover:border-slate-500"
      }`}
    >
      {label}
    </button>
  );
}