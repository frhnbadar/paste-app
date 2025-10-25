import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);

  const paste = pastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-400 text-xl">
        Paste not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white py-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        
        {/* Title */}
        <input
          type="text"
          value={paste.title}
          disabled
          className="w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white placeholder-gray-400 border border-gray-700 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-0 cursor-not-allowed opacity-90"
        />

        {/* Paste Box */}
        <div className="w-full rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/70 to-gray-800/40 backdrop-blur-xl overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.4)]">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-700 bg-gradient-to-r from-gray-800/80 to-gray-900/60">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-400" />
              <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
            </div>

            {/* Copy Button */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(paste.content);
                toast.success("Copied to Clipboard", { position: "top-right" });
              }}
              className="p-2 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-md hover:shadow-emerald-500/40 transition-all duration-300 group"
            >
              <Copy size={20} className="group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>

          {/* Content Area */}
          <textarea
            value={paste.content}
            disabled
            className="w-full h-[500px] p-5 bg-transparent text-gray-100 text-base leading-relaxed focus:outline-none resize-none cursor-not-allowed placeholder-gray-500"
            style={{ caretColor: "#3b82f6" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
