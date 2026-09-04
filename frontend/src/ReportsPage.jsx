import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import ReportSummaryCard from "./components/ReportSummaryCard";

export default function ReportsPage() {
  return (
    <div className="h-screen w-full flex bg-[#0B1220] overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-8 min-h-0 flex flex-col overflow-hidden">
        <TopBar title="Investigation Report" subtitle="Network summary for investigator review" />

        <div className="flex-1 min-h-0 overflow-y-auto thin-scrollbar pr-1">
          <ReportSummaryCard />
        </div>
      </main>
    </div>
  );
}