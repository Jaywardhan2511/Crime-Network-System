import { useState } from "react";

const nodes = [
  { id: "n1", label: "Device A", sub: "Phone", type: "phone", x: 300, y: 110 },
  { id: "n2", label: "Node 01", sub: "Person", type: "person", x: 140, y: 210 },
  { id: "n3", label: "Node 02", sub: "Person", type: "person", x: 460, y: 210 },
  { id: "n4", label: "Case 014", sub: "Case", type: "case", x: 600, y: 110 },
  { id: "n5", label: "Asset X", sub: "Vehicle", type: "vehicle", x: 300, y: 310 },
  { id: "n6", label: "Node 03", sub: "Person", type: "person", x: 600, y: 310 },
];

const edges = [
  ["n2", "n1"],
  ["n1", "n3"],
  ["n2", "n5"],
  ["n5", "n3"],
  ["n3", "n4"],
  ["n3", "n6"],
];

const typeColor = {
  person: "#3b82f6", // blue-500
  phone: "#22d3ee", // cyan-400
  vehicle: "#f59e0b", // amber-500
  case: "#22c55e", // green-500
};

export default function NetworkGraph({ selectedId, onSelect }) {
  return (
    <div className="bg-[#111a2e] border border-slate-800 rounded-lg p-5 flex-1 flex flex-col min-w-0 min-h-0">
      <div className="mb-3 shrink-0">
        <p className="text-white font-semibold text-sm">Network Graph</p>
        <p className="text-slate-500 text-xs mt-0.5">2-hop view · 23 entities · 41 relationships</p>
      </div>
      <div className="flex-1 rounded-md bg-[#0B1220] min-h-0">
        <svg viewBox="0 0 700 400" className="w-full h-full">
          {edges.map(([a, b], i) => {
            const na = nodes.find((n) => n.id === a);
            const nb = nodes.find((n) => n.id === b);
            return (
              <line
                key={i}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke="rgba(148,163,184,0.25)"
                strokeWidth="1.5"
              />
            );
          })}
          {nodes.map((n) => (
            <g key={n.id} className="cursor-pointer" onClick={() => onSelect(n)}>
              <circle
                cx={n.x}
                cy={n.y}
                r={selectedId === n.id ? 26 : 22}
                fill={typeColor[n.type]}
                opacity={selectedId === n.id ? 1 : 0.85}
                stroke={selectedId === n.id ? "#fff" : "none"}
                strokeWidth="2"
              />
              <text x={n.x} y={n.y + 40} textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="600">
                {n.label}
              </text>
              <text x={n.x} y={n.y + 54} textAnchor="middle" fill="#64748b" fontSize="10">
                {n.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export { nodes, typeColor };