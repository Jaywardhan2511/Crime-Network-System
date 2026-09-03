export default function WhatChanged() {
  return (
    <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-5 flex items-center justify-between mt-6">
      <div>
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <span>📩</span> What Changed?
        </div>
        <p className="text-slate-400 text-xs mt-1">
          New data created a link between two previously separate cases.
        </p>
        <p className="text-slate-500 text-xs mt-1">
          Phone A → Case #102 ↔ Case #109
        </p>
      </div>
      <div className="text-right">
        <p className="text-blue-400 text-xs font-semibold">High-priority lead</p>
        <p className="text-slate-500 text-xs">5 cases connected</p>
      </div>
    </div>
  );
}