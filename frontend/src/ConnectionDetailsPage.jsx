import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import ConnectionDetailsCard from "./components/ConnectionDetailsCard";

export default function ConnectionDetailsPage() {
  return (
    <div className="h-screen w-full flex bg-[#0B1220] overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-8 min-h-0 flex flex-col overflow-hidden">
        <TopBar title="Connection Details" subtitle="Explainable relationship analysis" />

        <div className="flex-1 min-h-0 overflow-y-auto thin-scrollbar pr-1">
          <ConnectionDetailsCard entityA="Node 01" entityB="Node 02" confidence={87} />
        </div>
      </main>
    </div>
  );
}