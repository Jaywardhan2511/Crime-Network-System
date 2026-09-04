const severityStyles = {
  High: "bg-red-500 text-white",
  Medium: "bg-amber-500 text-white",
};

const barColor = {
  High: "bg-red-500",
  Medium: "bg-amber-500",
};

export default function AnomalyCard({ severity, title, meta, confidence, onInvestigate }) {
  return (
    <div className="bg-[#111a2e] border border-slate-800 rounded-lg p-5 flex items-center gap-5">
      <span className={`text-xs font-semibold px-2.5 py-1 rounded shrink-0 ${severityStyles[severity]}`}>
        {severity}
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold leading-tight">{title}</p>
        <p className="text-slate-500 text-xs mt-1">{meta}</p>
      </div>

      <div className="w-48 shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-slate-500 text-xs">Confidence</p>
          <p className="text-white text-base font-bold">{confidence}%</p>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${barColor[severity]}`}
            style={{ width: `${confidence}%` }}
          />
        </div>
        <button
          onClick={onInvestigate}
          className="text-blue-400 text-xs font-medium hover:text-blue-300 mt-1.5 block ml-auto"
        >
          Investigate →
        </button>
      </div>
    </div>
  );
}