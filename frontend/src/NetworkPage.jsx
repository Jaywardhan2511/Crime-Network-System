import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import NetworkGraph from "./components/NetworkGraph";
import GraphFilters from "./components/GraphFilters";
import SelectedEntityCard from "./components/SelectedEntityCard";

const API_URL = "http://127.0.0.1:8000";

export default function NetworkPage() {
  const [network, setNetwork] = useState({ nodes: [], edges: [] });
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // Start with entity 1, which is one of our existing database entities.
  const [entityId, setEntityId] = useState(null);

  useEffect(() => {
  fetch(`${API_URL}/entities`)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load entities");
      return response.json();
    })
    .then((data) => {
      const entities = data.entities || [];

      if (entities.length === 0) {
        setLoading(false);
        return;
      }

      // Use the most recently created entity
      const latestEntity =
  [...entities]
    .filter((entity) => entity.type === "person")
    .sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
      const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
      return dateB - dateA;
    })[0] || entities[0];

      setEntityId(latestEntity.id);

      return fetch(
        `${API_URL}/network/${latestEntity.id}?depth=2`
      );
    })
    .then((response) => {
      if (!response) return null;
      if (!response.ok) throw new Error("Failed to load network");
      return response.json();
    })
    .then((data) => {
      if (!data) return;

      setNetwork({
        nodes: data.nodes || [],
        edges: data.edges || [],
      });

      if (data.nodes?.length > 0) {
        setSelected(data.nodes[0]);
      }
    })
    .catch((error) => {
      console.error("Network API error:", error);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

  return (
    <div className="h-screen w-full flex bg-[#0B1220] overflow-hidden">
      <Sidebar />

      <main className="flex-1 p-8 min-h-0 flex flex-col overflow-hidden">
        <TopBar
          title="Network Analysis"
          subtitle="Explore relationships across authorized records"
        />

        <div className="flex gap-6 flex-1 min-h-0">

          {loading ? (
            <div className="flex-1 flex items-center justify-center text-slate-400">
              Loading investigation network...
            </div>
          ) : network.nodes.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-slate-400">
              No network data available. Upload investigation data first.
            </div>
          ) : (
            <NetworkGraph
              nodes={network.nodes}
              edges={network.edges}
              selectedId={selected?.id}
              onSelect={setSelected}
            />
          )}

          <div className="w-72 shrink-0 flex flex-col gap-4 min-h-0 overflow-y-auto thin-scrollbar pr-1">
            <GraphFilters />

            {selected && <SelectedEntityCard entity={selected} />}

            <div className="bg-[#111a2e] border border-slate-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Bell size={14} className="text-blue-400" />
                <p className="text-white font-semibold text-sm">
                  What Changed?
                </p>
              </div>

              <p className="text-slate-500 text-xs mb-1">
                Network analysis
              </p>

              <p className="text-slate-300 text-xs mb-2">
                Relationships discovered from uploaded investigation records.
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