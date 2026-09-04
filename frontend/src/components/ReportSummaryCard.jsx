const stats = [
  { value: 23, label: "Entities" },
  { value: 7, label: "Cases" },
  { value: 41, label: "Connections" },
  { value: 2, label: "Bridges" },
  { value: 5, label: "Priority Leads" },
];

const findings = [
  "Node 01 is connected to Node 02 through Device A.",
  "Node 01 is connected to Node 03 through Asset X.",
  "Five potential patterns were prioritized for investigator review.",
];

const moreFindings = [
  "What Changed? — New cross-case connection detected.",
  "Explainable AI — connection supported by source-record evidence.",
  "Lead Prioritization — Device A ranked as a high-priority lead.",
];

export default function ReportSummaryCard() {
  return (
    <div className="bg-[#0d1830] border border-slate-800 rounded-lg p-6">
      <p className="text-white text-lg font-semibold">Investigation Summary</p>
      <p className="text-slate-500 text-xs mt-1">
        Network ID: NET-102 · Generated from authorized records
      </p>

      <div className="flex gap-12 mt-5 pb-5 border-b border-slate-800">
        {stats.map(({ value, label }) => (
          <div key={label}>
            <p className="text-white text-2xl font-bold leading-tight">{value}</p>
            <p className="text-slate-500 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      <p className="text-white font-semibold text-sm mt-5 mb-3">Key Findings</p>
      <ul className="space-y-3">
        {findings.map((f) => (
          <li key={f} className="flex items-start gap-2 text-slate-300 text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <div className="border-t border-slate-800 mt-4 pt-4">
        <p className="text-slate-500 text-xs">Report status</p>
        <p className="text-white text-sm font-semibold mt-0.5">
          Draft · Requires investigator review
        </p>
      </div>

      <ul className="space-y-3 mt-4">
        {moreFindings.map((f) => (
          <li key={f} className="flex items-start gap-2 text-slate-300 text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <button className="bg-blue-600 hover:bg-blue-500 transition-colors text-white text-xs font-semibold px-5 py-2.5 rounded-md mt-6 ml-auto block">
        Export Investigation Report
      </button>
    </div>
  );
}