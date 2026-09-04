import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import AnomalyCard from "./components/AnomalyCard";
import LeadPrioritizationCard from "./components/LeadPrioritizationCard";

const anomalies = [
  {
    id: "a1",
    severity: "High",
    title: "Multiple entities linked through Asset X",
    meta: "4 cases involved",
    confidence: 91,
  },
  {
    id: "a2",
    severity: "Medium",
    title: "Unusual transaction relationship",
    meta: "3 entities involved",
    confidence: 84,
  },
  {
    id: "a3",
    severity: "Medium",
    title: "Common location across separate cases",
    meta: "5 cases involved",
    confidence: 76,
  },
];

export default function AlertsPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex bg-[#0B1220] overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-8 min-h-0 flex flex-col overflow-hidden">
        <TopBar title="Anomaly Detection" subtitle="AI-assisted patterns requiring investigator review" />

        <div className="flex-1 min-h-0 overflow-y-auto space-y-4 thin-scrollbar pr-1">
          <div className="bg-[#111a2e] border border-slate-800 rounded-lg p-5 flex items-center gap-4">
            <p className="text-white text-2xl font-bold">{anomalies.length}</p>
            <div>
              <p className="text-white text-sm font-semibold">potential patterns detected</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Prioritized by confidence and investigation relevance
              </p>
            </div>
          </div>

          {anomalies.map((a) => (
            <AnomalyCard
              key={a.id}
              severity={a.severity}
              title={a.title}
              meta={a.meta}
              confidence={a.confidence}
              onInvestigate={() => navigate(`/connection/${a.id}`)}
            />
          ))}

          <LeadPrioritizationCard />
        </div>
      </main>
    </div>
  );
}