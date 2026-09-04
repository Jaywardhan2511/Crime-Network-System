const leads = [
  { rank: 1, label: "Device A", meta: "5 cases connected" },
  { rank: 2, label: "Asset X", meta: "3 cases across locations" },
];

export default function LeadPrioritizationCard() {
  return (
    <div className="bg-[#111a2e] border border-slate-800 rounded-lg p-5">
      <div className="flex items-center gap-2 mb-1">
        <span>🎯</span>
        <p className="text-white font-semibold text-sm">Investigation Lead Prioritization</p>
      </div>
      <p className="text-slate-500 text-xs mb-4">
        Leads are ranked using pattern strength, cross-case frequency and network relevance.
      </p>
      <div className="space-y-2">
        {leads.map(({ rank, label, meta }) => (
          <div key={rank} className="flex items-center gap-2 text-xs">
            <span className="text-white font-semibold">#{rank} {label}</span>
            <span className="text-slate-500">{meta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}