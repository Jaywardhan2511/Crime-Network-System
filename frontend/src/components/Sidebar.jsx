import { NavLink } from "react-router-dom";
import { LayoutGrid, Folder, Search, Share2, AlertTriangle, FileText } from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutGrid, path: "/" },
  { label: "Cases", icon: Folder, path: "/cases" },
  { label: "Search", icon: Search, path: "/search" },
  { label: "Network", icon: Share2, path: "/network" },
  { label: "Alerts", icon: AlertTriangle, path: "/alerts" },
  { label: "Reports", icon: FileText, path: "/reports" },
];

export default function Sidebar() {
  return (
    <aside className="w-60 bg-[#0d1526] border-r border-slate-800 flex flex-col justify-between py-6 px-4">
      <div>
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">
            ◆
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">CNA</p>
            <p className="text-slate-500 text-[10px] mt-1">Investigation Intelligence</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={label}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="px-2 text-xs text-slate-500 space-y-1">
        <div className="flex items-center gap-2 text-green-400">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          System operational
        </div>
        <p>Authorized investigator</p>
      </div>
    </aside>
  );
}