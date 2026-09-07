import { useRef, useState } from "react";

export default function FileDropzone({ onFilesSelected }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    onFilesSelected(Array.from(e.dataTransfer.files));
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`border rounded-xl px-6 py-10 text-center transition-colors ${
        dragOver ? "border-blue-500 bg-[#0f1d38]" : "border-slate-800 bg-[#0d1830]"
      }`}
    >
      <p className="text-white text-base font-semibold">Drag &amp; Drop Investigation Files</p>
      <p className="text-slate-500 text-xs mt-1">CSV, PDF, JSON or structured case records</p>
      <button
        onClick={() => inputRef.current?.click()}
        className="bg-blue-600 hover:bg-blue-500 transition-colors text-white text-xs font-semibold px-5 py-2 rounded-md mt-4"
      >
        Browse Files
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => onFilesSelected(Array.from(e.target.files))}
      />
    </div>
  );
}