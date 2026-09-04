import { useNavigate } from "react-router-dom";
import { typeColor } from "./NetworkGraph";

export default function SelectedEntityCard({ entity }) {
  const navigate = useNavigate();

  if (!entity) {
    return (
      <div className="bg-[#111a2e] border border-slate-800 rounded-lg p-4">
        <p className="text-white font-semibold text-sm mb-2">Selected Entity</p>
        <p className="text-slate-500 text-xs">Click a node in the graph to see details.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#111a2e] border border-slate-800 rounded-lg p-4">
      <p className="text-white font-semibold text-sm mb-3">Selected Entity</p>

      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
          style={{ backgroundColor: typeColor[entity.type] }}
        >
          {entity.label[0]}
        </div>
        <div>
          <p className="text-white text-sm font-medium leading-tight">{entity.label}</p>
          <p className="text-slate-500 text-xs leading-tight">
            {entity.sub} · {entity.id.toUpperCase()}
          </p>
        </div>
      </div>

      <p className="text-slate-400 text-xs mb-1">8 connections</p>
      <p className="text-slate-400 text-xs mb-4">4 associated cases</p>

      <button
        onClick={() => navigate(`/entity/${entity.id}`)}
        className="w-full bg-blue-600 hover:bg-blue-500 transition-colors text-white text-xs font-semibold py-2 rounded-md"
      >
        Explore Entity
      </button>
    </div>
  );
}