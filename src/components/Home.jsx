import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";
import React from "react";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const createPaste = () => {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    pasteId ? dispatch(updatePastes(paste)) : dispatch(addToPastes(paste));
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white py-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        
        {/* Header Inputs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Enter a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white placeholder-gray-400 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />

          <button
            onClick={createPaste}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-5 py-3 rounded-xl shadow-lg hover:shadow-blue-600/50 transition-all duration-300 whitespace-nowrap"
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>

          {pasteId && (
            <button
              onClick={resetPaste}
              className="p-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 rounded-xl shadow-md hover:shadow-pink-600/50 transition-all duration-300"
            >
              <PlusCircle size={22} />
            </button>
          )}
        </div>

        {/* Paste Box */}
        <div className="w-full rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/70 to-gray-800/40 backdrop-blur-md overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.4)] transition-all">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-700 bg-gradient-to-r from-gray-800/80 to-gray-900/60">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-400" />
              <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(value);
                toast.success("Copied to Clipboard", { position: "top-right" });
              }}
              className="p-2 rounded-lg hover:bg-gray-700/60 transition-all duration-300 group"
            >
              <Copy size={20} className="group-hover:text-green-400 transition-colors duration-300" />
            </button>
          </div>

          {/* Text Area */}
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write your content here..."
            className="w-full h-[400px] p-4 text-gray-100 bg-transparent focus:outline-none resize-none placeholder-gray-500"
            style={{ caretColor: "#3b82f6" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
