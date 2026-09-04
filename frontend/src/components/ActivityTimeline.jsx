const events = [
  { date: "10 Jan", text: "Device A recorded" },
  { date: "15 Jan", text: "Entity associated with Device A" },
  { date: "28 Jan", text: "Asset X linked" },
  { date: "03 Feb", text: "Case #014 updated" },
];

export default function ActivityTimeline() {
  return (
    <div className="bg-[#111a2e] border border-slate-800 rounded-lg p-5 flex-1 min-w-0">
      <p className="text-white font-semibold text-sm mb-4">Activity Timeline</p>
      <div>
        {events.map((e, i) => (
          <div key={e.date} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1 shrink-0" />
              {i !== events.length - 1 && (
                <span className="w-px flex-1 bg-slate-700 my-1" />
              )}
            </div>
            <div className={i !== events.length - 1 ? "pb-5" : ""}>
              <p className="text-slate-500 text-xs">{e.date}</p>
              <p className="text-white text-sm mt-0.5">{e.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}