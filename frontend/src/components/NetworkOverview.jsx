const nodes = [
  { id: "rahul", label: "Rahul", type: "Person", x: 15, y: 55, color: "bg-blue-500" },
  { id: "phoneA", label: "Phone A", type: "Phone", x: 40, y: 20, color: "bg-cyan-400" },
  { id: "vehicleX", label: "Vehicle X", type: "Vehicle", x: 40, y: 90, color: "bg-amber-500" },
  { id: "amit", label: "Amit", type: "Person", x: 65, y: 55, color: "bg-blue-500" },
  { id: "sameer", label: "Sameer", type: "Person", x: 88, y: 20, color: "bg-blue-500" },
];

const edges = [
  ["rahul", "phoneA"],
  ["rahul", "vehicleX"],
  ["phoneA", "amit"],
  ["vehicleX", "amit"],
  ["amit", "sameer"],
];

export default function NetworkOverview() {
  const find = (id) => nodes.find((n) => n.id === id);

  return (
    <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-5 flex-1">
      <h3 className="text-white font-semibold text-sm">Network Overview</h3>
      <p className="text-slate-500 text-xs mb-4">Cross-case relationship map</p>

      <div className="relative w-full h-72">
        <svg className="absolute inset-0 w-full h-full">
          {edges.map(([a, b], i) => {
            const na = find(a);
            const nb = find(b);
            return (
              <line
                key={i}
                x1={`${na.x}%`}
                y1={`${na.y}%`}
                x2={`${nb.x}%`}
                y2={`${nb.y}%`}
                stroke="#334155"
                strokeWidth="1.5"
              />
            );
          })}
        </svg>

        {nodes.map((n) => (
          <div
            key={n.id}
            className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <div className={`w-9 h-9 rounded-full ${n.color} shadow-md`} />
            <p className="text-white text-xs font-semibold mt-1">{n.label}</p>
            <p className="text-slate-500 text-[10px]">{n.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}