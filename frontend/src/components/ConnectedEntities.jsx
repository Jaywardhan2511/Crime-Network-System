import { useNavigate } from "react-router-dom";

const items = [
  { id: "c1", label: "Device A", sub: "Shared phone number", color: "bg-cyan-400" },
  { id: "c2", label: "Asset X", sub: "Associated vehicle", color: "bg-amber-500" },
  { id: "c3", label: "Location P", sub: "Common location", color: "bg-green-500" },
  { id: "c4", label: "Case #014", sub: "Case association", color: "bg-blue-500" },
];

export default function ConnectedEntities() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#111a2e] border border-slate-800 rounded-lg p-5 flex-1 min-w-0">
      <p className="text-white font-semibold text-sm mb-4">Connected Entities</p>
      <div className="space-y-4">
        {items.map(({ id, label, sub, color }) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${color} shrink-0`} />
              <div>
                <p className="text-white text-sm font-medium leading-tight">{label}</p>
                <p className="text-slate-500 text-xs leading-tight mt-0.5">{sub}</p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/connection/${id}`)}
              className="text-blue-400 text-xs font-medium hover:text-blue-300 shrink-0"
            >
              View →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}