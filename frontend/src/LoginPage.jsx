import { useState } from "react";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const [officerId, setOfficerId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ officerId, password });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0B1220] px-4">
      <div className="text-center mb-8">
        <h1 className="text-white text-3xl font-bold tracking-wide">
          CRIMINAL NETWORK ANALYSIS
        </h1>
        <p className="text-slate-400 text-sm mt-2 tracking-widest">
          AI-POWERED INVESTIGATION INTELLIGENCE SYSTEM
        </p>
      </div>

      <div className="bg-[#111a2e] border border-slate-800 rounded-xl shadow-xl w-full max-w-sm p-8">
        <div className="text-center mb-6">
          <h2 className="text-white text-xl font-bold">Investigator Login</h2>
          <p className="text-slate-400 text-sm mt-1">
            Secure access to investigation intelligence
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-1">
              Officer ID
            </label>
            <input
              type="text"
              value={officerId}
              onChange={(e) => setOfficerId(e.target.value)}
              placeholder="Enter Officer ID"
              className="w-full bg-[#0d1526] border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-[#0d1526] border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 transition-colors text-white font-semibold py-2 rounded-md text-sm"
          >
            Secure Login
          </button>
        </form>

        <div className="flex items-center justify-center gap-1 mt-4 text-slate-400 text-xs">
          <Lock size={12} />
          <span>Authorized investigators only</span>
        </div>

        <p className="text-center text-slate-500 text-[11px] mt-3">
          All activity is logged for audit purposes.
        </p>
      </div>
    </div>
  );
}