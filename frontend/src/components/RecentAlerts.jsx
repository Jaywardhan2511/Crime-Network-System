const alerts = [
  {
    color: "bg-amber-500",
    title: "What Changed? New connection detected",
    meta: "2 min ago • Phone A links two cases",
  },
  {
    color: "bg-red-500",
    title: "High-Priority Lead: Phone A",
    meta: "18 min ago • 5 cases linked",
  },
  {
    color: "bg-blue-400",
    title: "Network change: Vehicle X",
    meta: "42 min ago • 3 cases linked",
  },
];

export default function RecentAlerts() {
  return (
    <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-5 w-80">
      <h3 className="text-white font-semibold text-sm mb-4">Recent Alerts</h3>
      <div className="space-y-4">
        {alerts.map((a, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className={`w-2.5 h-2.5 rounded-full mt-1 ${a.color}`} />
            <div>
              <p className="text-white text-xs font-semibold leading-snug">{a.title}</p>
              <p className="text-slate-500 text-[11px] mt-0.5">{a.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}