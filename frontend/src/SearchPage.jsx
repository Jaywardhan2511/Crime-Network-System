import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import FilterChip from "./components/FilterChip";
import SearchResultItem from "./components/SearchResultItem";

const filters = ["Person", "Phone", "Vehicle", "Location", "Organization", "Case"];

const results = [
  { name: "Node 01", meta: "Person • 4 cases • 8 connections", dotColor: "bg-blue-500" },
  { name: "Device A", meta: "Phone • 3 linked entities", dotColor: "bg-cyan-400" },
  { name: "Asset X", meta: "Vehicle • 2 linked entities", dotColor: "bg-amber-500" },
  { name: "Case #014", meta: "Case • 7 related entities", dotColor: "bg-green-500" },
];

export default function SearchPage() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [query, setQuery] = useState("");

  return (
    <div className="h-screen w-full flex bg-[#0B1220] overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-8 min-h-0 flex flex-col overflow-hidden">
        <TopBar
          title="Search Investigation Data"
          subtitle="Find people, cases, phones, vehicles and locations"
        />

        <div className="flex-1 min-h-0 overflow-y-auto thin-scrollbar pr-1">
          <div className="relative mb-6">
            <SearchIcon
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, case ID, phone, vehicle or location..."
              className="w-full bg-[#111a2e] border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-5 mb-6">
            <h3 className="text-white font-semibold text-sm mb-3">Filters</h3>
            <div className="flex flex-wrap gap-3">
              {filters.map((f) => (
                <FilterChip
                  key={f}
                  label={f}
                  active={activeFilter === f}
                  onClick={() => setActiveFilter(activeFilter === f ? null : f)}
                />
              ))}
            </div>
          </div>

          <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-5">
            <h3 className="text-white font-semibold text-sm mb-2">Search Results</h3>
            <div>
              {results.map((r) => (
                <SearchResultItem key={r.name} {...r} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}