import { Search, Bell } from "lucide-react";

export default function TopBar({ title, subtitle }) {
  return (
    <>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-white text-2xl font-bold">{title}</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              placeholder="Search cases, people..."
              className="bg-[#111a2e] border border-slate-700 rounded-md pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <Bell size={16} className="text-slate-400" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              D
            </div>
            <div className="leading-tight">
              <p className="text-white text-xs font-semibold">Investigator</p>
              <p className="text-slate-500 text-[10px]">Officer ID: INV-024</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-slate-500 text-sm mb-6">{subtitle}</p>
    </>
  );
}