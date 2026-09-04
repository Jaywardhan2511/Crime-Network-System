import { Check } from "lucide-react";
import SourceRecordItem from "./SourceRecordItem";

const reasons = [
  "Device A appears in FIR #23",
  "Device A is linked to Node 02 in Case #67",
  "Device A is linked to Node 01",
];

const records = [
  { title: "FIR #102", meta: "Case record · 10 Jan" },
  { title: "Call Record #C458", meta: "Communication record · 15 Jan" },
  { title: "Case #109", meta: "Related case · 22 Jan" },
];

export default function ConnectionDetailsCard({ entityA, entityB, confidence }) {
  return (
    <div className="border border-blue-500/40 rounded-lg p-6 bg-[#0d1830]">
      <p className="text-white text-lg font-semibold">Potential Connection Detected</p>
      <p className="text-slate-400 text-sm mt-1">
        {entityA} <span className="text-slate-600">↔</span> {entityB}
      </p>

      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="bg-[#111a2e] border border-slate-800 rounded-lg p-4">
          <p className="text-slate-500 text-xs mb-2">Connection type</p>
          <p className="text-white text-sm font-semibold mb-3">Shared phone number</p>
          <p className="text-slate-400 text-xs mb-3">Device A appears in both records.</p>
          <div className="flex items-center justify-between">
            <p className="text-slate-500 text-xs">Confidence</p>
            <p className="text-blue-400 text-xl font-bold">{confidence}%</p>
          </div>
        </div>

        <div className="bg-[#111a2e] border border-slate-800 rounded-lg p-4">
          <p className="text-white text-sm font-semibold mb-3">Why was this connection identified?</p>
          <ul className="space-y-2">
            {reasons.map((r) => (
              <li key={r} className="flex items-start gap-2 text-slate-300 text-xs">
                <Check size={13} className="text-green-500 mt-0.5 shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-white text-sm font-semibold mt-6 mb-3">Source Records</p>
      <div className="space-y-2">
        {records.map((r) => (
          <SourceRecordItem key={r.title} title={r.title} meta={r.meta} />
        ))}
      </div>

      <div className="bg-[#0B1220] border border-slate-800 rounded-md px-4 py-3 mt-4">
        <p className="text-blue-400 text-xs font-medium mb-1">AI Explanation</p>
        <p className="text-slate-400 text-xs">
          Potential connection flagged because shared identifiers appear across multiple authorized source records.
        </p>
      </div>

      <button className="bg-blue-600 hover:bg-blue-500 transition-colors text-white text-xs font-semibold px-5 py-2.5 rounded-md mt-5">
        View Evidence
      </button>

      <p className="text-slate-600 text-xs text-center mt-4">
        This is an investigative lead, not a determination of guilt.
      </p>
    </div>
  );
}