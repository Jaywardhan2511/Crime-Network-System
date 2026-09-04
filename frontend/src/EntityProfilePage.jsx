import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import EntityHeaderCard from "./components/EntityHeaderCard";
import ConnectedEntities from "./components/ConnectedEntities";
import ActivityTimeline from "./components/ActivityTimeline";

export default function EntityProfilePage() {
  return (
    <div className="h-screen w-full flex bg-[#0B1220] overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-8 min-h-0 flex flex-col overflow-hidden">
        <TopBar title="Entity Profile" subtitle="Person entity · P-1024" />

        <div className="flex flex-col gap-6 flex-1 min-h-0">
          <EntityHeaderCard name="Node 01" entityId="P-1024" />

          <div className="flex gap-6 flex-1 min-h-0">
            <ConnectedEntities />
            <ActivityTimeline />
          </div>
        </div>
      </main>
    </div>
  );
}