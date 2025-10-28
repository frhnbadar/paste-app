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
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("dark"); // 👈 added theme state

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

  // --- bakchodi function ---
  function bakchodi(val) {
    const lower = val.toLowerCase();

    if (lower === "farhan") {
      toast.success("Are Farhan bhai...Aap bhut mast bande ho...");
    }
    else if (lower === "shahil" || lower==="badar" || lower==="danish" || lower==="shaad") {
      toast.success("Kam hasa kro , aur kam hilao bsdk...");
    } 
    else if (lower === "kamran") {
      toast.success("Agar jinda rhna h to delhi se bhaag jaao...");
    } 
    else if (lower === "golrez") {
      toast.success("Kam hasa kro bsdk...");
    } 
    else if (lower === "nayab") {
      toast.success("Football kam khelo wrna football bn jaaoge nigga...");
    } 
    else if (lower === "adeeb") {
      toast.success("Le kar hi maanega kya??...");
    } 
    else if (lower === "ahmad") {
      toast.success("Mujhe apne gaadi m kab ghuma rha???????????????????...");
    } 
    else if (lower === "tahsin") {
      toast.success("Kabhi batla house se nikla bhi kro...");
    } 
    else if (lower === "fathima" || lower === "mumthas") {
      toast.success("Thendi-Poda...");
    } 
    else if (lower === "aadil") {
      toast.success("Saale bomb kyu feka the mere oopar...");
    } 
    else if (lower === "zaid") {
      toast.success("Aur bhai, bhabhi kesi hai?...");
    } 
    else if (lower === "saif") {
      toast.success("Cooling pad mujhe de diyo...");
    } 
    else if (lower === "riya" || lower === "jerry") {
      toast.success("Sudhar jaao wrna shaadi nhi hogi...");
    } 
    else if (lower === "jibran") {
      toast.success("Bhai reels kam dekho...");
    } 
    else if (lower === "shaad") {
      toast.success("Bhai reels kam dekho...");
    } 
    
    else if (lower === "tabish") {
      toast.success("Tabish bsdk, kam hilao, tab na jaa ke mota hoga...");
      setTheme("light"); // 👈 switch to light theme
    } else if (lower === "anas") {
      toast.success("Aapki waali mil jaaegi aapko kisi din, INSHALLAH...");
    } else {
      setTheme("dark"); // 👈 revert to dark theme when different name
    }
  }

  return (
    <div
      className={`min-h-screen w-full py-10 px-4 flex justify-center transition-all duration-500 ${
        theme === "light"
          ? "bg-gray-100 text-black" // 👈 light mode
          : "bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white" // 👈 dark mode
      }`}
    >
      <div className="w-full max-w-4xl flex flex-col gap-6">
        
        {/* Header Inputs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Enter a title..."
            value={title}
            onChange={(e) => {
              const val = e.target.value;
              setTitle(val);
              bakchodi(val);
            }}
            className={`flex-1 w-full ${
              theme === "light"
                ? "bg-white text-black border-gray-300"
                : "bg-gradient-to-r from-gray-800 to-gray-700 text-white border-gray-700"
            } placeholder-gray-400 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
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
        <div className={`w-full rounded-2xl border overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.4)] transition-all ${
          theme === "light"
            ? "border-gray-300 bg-white"
            : "border-gray-800 bg-gradient-to-br from-gray-900/70 to-gray-800/40 backdrop-blur-md"
        }`}>
          
          {/* Top Bar */}
          <div
            className={`flex items-center justify-between px-5 py-3 border-b ${
              theme === "light"
                ? "border-gray-200 bg-gray-100"
                : "border-gray-700 bg-gradient-to-r from-gray-800/80 to-gray-900/60"
            }`}
          >
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
            className={`w-full h-[400px] p-4 resize-none focus:outline-none ${
              theme === "light"
                ? "text-black bg-white placeholder-gray-500"
                : "text-gray-100 bg-transparent placeholder-gray-500"
            }`}
            style={{ caretColor: "#3b82f6" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
