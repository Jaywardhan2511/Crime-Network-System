const stats = [
  { value: 4, label: "Cases" },
  { value: 2, label: "Phones" },
  { value: 1, label: "Vehicle" },
  { value: 3, label: "Locations" },
  { value: 8, label: "Connections" },
];

export default function EntityHeaderCard({ name, entityId }) {
  return (
    <div className="bg-[#111a2e] border border-slate-800 rounded-lg p-5 flex items-center gap-10">
      <div className="flex items-center gap-4 shrink-0">
        <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
          {name[0]}
        </div>
        <div>
          <p className="text-white text-lg font-semibold leading-tight">{name}</p>
          <p className="text-slate-500 text-xs mt-1">Person · Entity ID {entityId}</p>
        </div>
      </div>

      <div className="flex gap-10 ml-auto">
        {stats.map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="text-white text-xl font-bold leading-tight">{value}</p>
            <p className="text-slate-500 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}