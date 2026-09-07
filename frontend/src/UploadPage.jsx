import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import FileDropzone from "./components/FileDropzone";
import DataSourceCard from "./components/DataSourceCard";

const sources = [
  { id: "fir", icon: "📄", title: "FIR / Police Reports", meta: "Case narratives and reports" },
  { id: "comm", icon: "📞", title: "Communication Records", meta: "Authorized call / contact records" },
  { id: "vehicle", icon: "🚗", title: "Vehicle & Location Records", meta: "Vehicle, location and metadata" },
];

export default function UploadPage() {
  const navigate = useNavigate();
  const [activeSources, setActiveSources] = useState(["fir", "vehicle"]);
  const [files, setFiles] = useState([
    { name: "FIR_Records_2026.csv" },
    { name: "Vehicle_Records.csv" },
  ]);

  const toggleSource = (id) => {
    setActiveSources((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const addFiles = (newFiles) => {
    setFiles((prev) => [...prev, ...newFiles.map((f) => ({ name: f.name }))]);
  };

  const handleUpload = () => {
    // TODO: POST files + activeSources to /api/upload
    navigate("/network");
  };

  return (
    <div className="h-screen w-full flex bg-[#0B1220] overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-8 min-h-0 flex flex-col overflow-hidden">
        <TopBar
          title="Upload Investigation Data"
          subtitle="Add authorized records to extract entities and discover potential relationships."
        />

        <div className="flex-1 min-h-0 overflow-y-auto thin-scrollbar pr-1">
          <FileDropzone onFilesSelected={addFiles} />

          <p className="text-white font-semibold text-sm mt-6 mb-3">Select Data Sources</p>
          <div className="flex gap-4">
            {sources.map((s) => (
              <DataSourceCard
                key={s.id}
                icon={s.icon}
                title={s.title}
                meta={s.meta}
                active={activeSources.includes(s.id)}
                onClick={() => toggleSource(s.id)}
              />
            ))}
          </div>

          {files.length > 0 && (
            <div className="bg-[#111a2e] border border-slate-800 rounded-lg px-4 py-3 mt-6 flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">Selected files</p>
                <p className="text-slate-500 text-xs mt-0.5">
                  {files.map((f) => f.name).join(" · ")}
                </p>
              </div>
              <p className="text-green-500 text-xs font-medium shrink-0">Ready to analyze</p>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={files.length === 0}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors text-white text-sm font-semibold px-6 py-3 rounded-md mt-6"
          >
            Upload &amp; Analyze →
          </button>
        </div>
      </main>
    </div>
  );
}