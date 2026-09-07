import { useState, useEffect, useRef } from "react";
import { Lock, Shield, Radio } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Animated network-graph background: nodes drifting and connecting,
// like a live case-network being traced in the background.
function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const NODE_COUNT = 34;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.4 + 0.6,
    }));

    const MAX_DIST = 150;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.offsetWidth) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.offsetHeight) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const opacity = (1 - dist / MAX_DIST) * 0.18;
            ctx.strokeStyle = `rgba(56, 130, 246, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(96, 165, 250, 0.45)";
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-70"
    />
  );
}

// Falling code-rain, like a data stream being decrypted behind the scenes.
function CodeRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    const chars = "01ABCDEF#$%&+-·:";
    const fontSize = 14;
    let columns, drops;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * canvas.height) / fontSize) * -1
      );
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(11, 18, 32, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * fontSize;
        ctx.fillStyle = "rgba(96, 165, 250, 0.9)";
        ctx.fillText(char, i * fontSize, y);
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40"
    />
  );
}

// Decodes the title from scrambled characters into real text on mount,
// like a terminal resolving a decrypted string.
function DecodeText({ text, className, speed = 30 }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  useEffect(() => {
    let frame = 0;
    const totalFrames = text.length * 3;
    const interval = setInterval(() => {
      frame++;
      const revealCount = Math.floor((frame / totalFrames) * text.length);
      const next = text
        .split("")
        .map((c, i) => {
          if (c === " ") return " ";
          if (i < revealCount) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      setDisplay(next);
      if (frame >= totalFrames) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{display}</span>;
}

// Live-updating fake data readouts, like a HUD tracking case metadata.
function DataReadouts() {
  const [values, setValues] = useState({
    lat: "40.7128",
    lng: "-74.0060",
    caseId: "CX-88231",
    nodes: 128,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setValues((v) => ({
        ...v,
        lat: (40.7128 + (Math.random() - 0.5) * 0.01).toFixed(4),
        lng: (-74.006 + (Math.random() - 0.5) * 0.01).toFixed(4),
        nodes: 120 + Math.floor(Math.random() * 20),
      }));
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden sm:flex flex-col gap-1 absolute left-6 bottom-6 font-mono text-[10px] text-blue-500/50 z-10">
      <span>LAT {values.lat}</span>
      <span>LNG {values.lng}</span>
      <span>CASE {values.caseId}</span>
      <span>ACTIVE NODES {values.nodes}</span>
    </div>
  );
}

// Typewriter-style status ticker, like a live feed of system checks.
function StatusTicker() {
  const lines = [
    "ESTABLISHING SECURE CHANNEL...",
    "NODE-CLUSTER SYNC: 128 ENTITIES LINKED",
    "CROSS-REFERENCING CASE DATABASE...",
    "ENCRYPTION HANDSHAKE: AES-256 OK",
    "AWAITING AUTHORIZED CREDENTIALS...",
  ];
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const current = lines[lineIndex];
    if (phase === "typing") {
      if (text.length < current.length) {
        const t = setTimeout(() => setText(current.slice(0, text.length + 1)), 28);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("holding"), 1000);
        return () => clearTimeout(t);
      }
    }
    if (phase === "holding") {
      const t = setTimeout(() => setPhase("deleting"), 400);
      return () => clearTimeout(t);
    }
    if (phase === "deleting") {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), 12);
        return () => clearTimeout(t);
      } else {
        setLineIndex((i) => (i + 1) % lines.length);
        setPhase("typing");
      }
    }
  }, [text, phase, lineIndex]);

  return (
    <div className="flex items-center gap-2 font-mono text-[11px] text-blue-400/80 h-4">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shrink-0" />
      <span>{text}</span>
      <span className="w-[6px] h-[13px] bg-blue-400/70 animate-[blink_1s_steps(1)_infinite]" />
    </div>
  );
}

// Targeting-style corner brackets that frame the login card,
// like a locked-on surveillance target.
function CornerBrackets() {
  const corner = "absolute w-6 h-6 border-blue-500/60";
  return (
    <>
      <div className={`${corner} top-0 left-0 border-t-2 border-l-2 rounded-tl-md`} />
      <div className={`${corner} top-0 right-0 border-t-2 border-r-2 rounded-tr-md`} />
      <div className={`${corner} bottom-0 left-0 border-b-2 border-l-2 rounded-bl-md`} />
      <div className={`${corner} bottom-0 right-0 border-b-2 border-r-2 rounded-br-md`} />
    </>
  );
}

export default function LoginPage() {
  const [officerId, setOfficerId] = useState("");
  const [password, setPassword] = useState("");
  const [scanning, setScanning] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setScanning(true);
    setTimeout(() => {setScanning(false);
                      navigate("/dashboard")
    }, 1600);
    console.log({ officerId, password });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#0B1220] px-4 overflow-hidden">
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes radarSweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 0 1px rgba(59,130,246,0.15), 0 0 24px rgba(37,99,235,0.08); }
          50% { box-shadow: 0 0 0 1px rgba(59,130,246,0.35), 0 0 40px rgba(37,99,235,0.18); }
        }
        @keyframes gridDrift {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        .panel-glow { animation: borderGlow 4s ease-in-out infinite; }
        .grid-bg {
          background-image:
            linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridDrift 12s linear infinite;
        }
        @keyframes glitchShift {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(1px, -1px); }
          60% { transform: translate(-1px, -1px); }
          80% { transform: translate(1px, 1px); }
        }
        .glitching { animation: glitchShift 0.15s steps(2) 6; }
      `}</style>

      {/* Layered background: grid + drifting network graph, then code rain on top */}
      <div className="absolute inset-0 grid-bg" />
      <NetworkCanvas />
      {/* vignette so content stays readable, sits below code rain */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0B1220_75%)]" />
      <CodeRain />
      <DataReadouts />

      {/* faint radar sweep, top-right corner, decorative */}
      <div className="absolute -top-24 -right-24 w-72 h-72 opacity-20 pointer-events-none">
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(59,130,246,0.5), transparent 60%)",
            animation: "radarSweep 4s linear infinite",
          }}
        />
      </div>

      <div className="relative z-10 text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield size={18} className="text-blue-500" />
          <span className="text-blue-500 text-[11px] font-semibold tracking-[0.3em]">
            CLASSIFIED ACCESS
          </span>
        </div>
        <h1 className="text-white text-3xl font-bold tracking-wide">
          CRIMINAL NETWORK ANALYSIS
        </h1>
        <p className="text-slate-400 text-sm mt-2 tracking-widest">
          AI-POWERED INVESTIGATION INTELLIGENCE SYSTEM
        </p>
      </div>

      <div
        className={`relative z-10 bg-[#111a2e]/95 backdrop-blur-sm border border-slate-800 rounded-xl shadow-xl w-full max-w-sm p-8 panel-glow ${
          scanning ? "glitching" : ""
        }`}
      >
        <CornerBrackets />
        {/* scanline sweep across the card on submit */}
        {scanning && (
          <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
            <div
              className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-blue-500/25 to-transparent"
              style={{ animation: "scanline 1.6s ease-in-out" }}
            />
          </div>
        )}

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
              className="w-full bg-[#0d1526] border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
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
              className="w-full bg-[#0d1526] border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.99] transition-all text-white font-semibold py-2 rounded-md text-sm flex items-center justify-center gap-2"
          >
            {scanning ? (
              <>
                <Radio size={14} className="animate-pulse" />
                Verifying Credentials...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <StatusTicker />
        </div>

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