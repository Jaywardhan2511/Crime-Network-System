import { useState } from "react";

const entityTypes = [
  { label: "People", color: "bg-blue-500" },
  { label: "Phones", color: "bg-cyan-400" },
  { label: "Vehicles", color: "bg-amber-500" },
  { label: "Cases", color: "bg-green-500" },
];

const depths = ["1 hop", "2 hops", "3 hops"];

export default function GraphFilters() {
  const [activeDepth, setActiveDepth] = useState("2 hops");

  return (
    <div className="bg-[#111a2e] border border-slate-800 rounded-lg p-4">
      <p className="text-white font-semibold text-sm mb-3">Graph Filters</p>

      <p className="text-slate-500 text-xs mb-2">Entity types</p>
      <div className="space-y-1.5 mb-4">
        {entityTypes.map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2 text-slate-300 text-xs">
            <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
            {label}
          </div>
        ))}
      </div>

      <p className="text-slate-500 text-xs mb-2">Network depth</p>
      <div className="flex gap-2">
        {depths.map((d) => (
          <button
            key={d}
            onClick={() => setActiveDepth(d)}
            className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeDepth === d
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}