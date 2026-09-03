import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import StatCard from "./components/StatCard";
import NetworkOverview from "./components/NetworkOverview";
import RecentAlerts from "./components/RecentAlerts";
import WhatChanged from "./components/WhatChanged";

const stats = [
  { value: 23, label: "Entities", dotColor: "bg-blue-500" },
  { value: 7, label: "Connected Cases", dotColor: "bg-cyan-400" },
  { value: 3, label: "Network Bridges", dotColor: "bg-amber-500" },
  { value: 5, label: "Priority Leads", dotColor: "bg-red-500" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen w-full flex bg-[#0B1220]">
      <Sidebar />
      <main className="flex-1 p-8">
        <TopBar title="Investigation Overview" subtitle="Network intelligence at a glance" />

        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        <div className="flex gap-6">
          <NetworkOverview />
          <RecentAlerts />
        </div>

        <WhatChanged />
      </main>
    </div>
  );
}