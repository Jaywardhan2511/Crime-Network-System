import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import StatCard from "./components/StatCard";
import NetworkOverview from "./components/NetworkOverview";
import RecentAlerts from "./components/RecentAlerts";
import WhatChanged from "./components/WhatChanged";

const API_URL = "http://127.0.0.1:8000";

export default function DashboardPage() {
  const [stats, setStats] = useState([
    { value: 0, label: "Entities", dotColor: "bg-blue-500" },
    { value: 0, label: "Connected Cases", dotColor: "bg-cyan-400" },
    { value: 0, label: "Network Bridges", dotColor: "bg-amber-500" },
    { value: 0, label: "Priority Leads", dotColor: "bg-red-500" },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/dashboard/overview`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        return response.json();
      })
      .then((data) => {
        setStats([
          {
            value: data.stats.entities,
            label: "Entities",
            dotColor: "bg-blue-500",
          },
          {
            value: data.stats.connected_cases,
            label: "Connected Cases",
            dotColor: "bg-cyan-400",
          },
          {
            value: data.stats.network_bridges,
            label: "Network Bridges",
            dotColor: "bg-amber-500",
          },
          {
            value: data.stats.priority_leads,
            label: "Priority Leads",
            dotColor: "bg-red-500",
          },
        ]);
      })
      .catch((error) => {
        console.error("Dashboard API error:", error);
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
          title="Investigation Overview"
          subtitle="Network intelligence at a glance"
        />

        <div className="flex-1 min-h-0 overflow-y-auto thin-scrollbar pr-1">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          <div className="flex gap-6 mb-6">
            <NetworkOverview />
            <RecentAlerts />
          </div>

          <WhatChanged />
        </div>
      </main>
    </div>
  );
}