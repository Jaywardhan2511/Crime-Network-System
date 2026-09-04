import { useState } from "react";
import { Bell } from "lucide-react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import NetworkGraph, { nodes } from "./components/NetworkGraph";
import GraphFilters from "./components/GraphFilters";
import SelectedEntityCard from "./components/SelectedEntityCard";

export default function NetworkPage() {
  const [selected, setSelected] = useState(nodes[1]); // default: Node 01

  return (
    <div className="h-screen w-full flex bg-[#0B1220] overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-8 min-h-0 flex flex-col overflow-hidden">
        <TopBar title="Network Analysis" subtitle="Explore relationships across authorized records" />

        <div className="flex gap-6 flex-1 min-h-0">
          <NetworkGraph selectedId={selected?.id} onSelect={setSelected} />

          <div className="w-72 shrink-0 flex flex-col gap-4 min-h-0 overflow-y-auto thin-scrollbar pr-1">
            <GraphFilters />
            <SelectedEntityCard entity={selected} />

            <div className="bg-[#111a2e] border border-slate-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Bell size={14} className="text-blue-400" />
                <p className="text-white font-semibold text-sm">What Changed?</p>
              </div>
              <p className="text-slate-500 text-xs mb-1">New network change detected</p>
              <p className="text-slate-300 text-xs mb-2">
                Device A now links two previously separate cases.
              </p>
              <button className="text-blue-400 text-xs font-medium hover:text-blue-300">
                View Change →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}