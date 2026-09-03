export default function StatCard({ value, label, dotColor }) {
  return (
    <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-4 flex items-center justify-between">
      <div>
        <p className="text-white text-2xl font-bold">{value}</p>
        <p className="text-slate-400 text-xs mt-1">{label}</p>
      </div>
      <span className={`w-7 h-7 rounded-full ${dotColor}`} />
    </div>
  );
}