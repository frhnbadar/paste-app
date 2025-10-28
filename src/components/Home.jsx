import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";
import React from "react";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("dark");

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const createPaste = () => {
    const paste = {
      title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
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
    let msg = "";

    if (lower === "farhan") {
      msg = "Are Farhan bhai...Aap bhut mast bande ho...";
    } else if (["shahil", "badar", "danish", "shaad"].includes(lower)) {
      msg = "Kam hasa kro , aur kam hilao bsdk...";
    } else if (lower === "kamran") {
      msg = "Agar jinda rhna h to delhi se bhaag jaao...";
    } else if (lower === "golrez") {
      msg = "Kam hasa kro bsdk...";
    } else if (lower === "nayab") {
      msg = "Football kam khelo wrna football bn jaaoge nigga...";
    } else if (lower === "adeeb") {
      msg = "Le kar hi maanega kya??...";
    } else if (lower === "ahmad") {
      msg = "Mujhe apne gaadi m kab ghuma rha???????????????????...";
    } else if (lower === "tahsin") {
      msg = "Kabhi batla house se nikla bhi kro...";
    } else if (["fathima", "mumthas"].includes(lower)) {
      msg = "Thendi-Poda...";
    } else if (lower === "aadil") {
      msg = "Saale bomb kyu feka the mere oopar...";
    } else if (lower === "zaid") {
      msg = "Aur bhai, bhabhi kesi hai?...";
    } else if (lower === "saif") {
      msg = "Cooling pad mujhe de diyo...";
    } else if (["riya", "jerry"].includes(lower)) {
      msg = "Sudhar jaao wrna shaadi nhi hogi...";
    } else if (lower === "jibran") {
      msg = "Bhai reels kam dekho...";
    } else if (lower === "tabish") {
      msg = "Tabish bsdk, kam hilao, tab na jaa ke mota hoga...";
      setTheme("light");
    } else if (lower === "anas") {
      msg = "Aapki waali mil jaaegi aapko kisi din, INSHALLAH...";
    } else {
      setTheme("dark");
    }

    if (msg) {
      setPopupMessage(msg);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000); // fixed 4 seconds
    }
  }

  return (
    <div
      className={`min-h-screen w-full py-10 px-4 flex justify-center transition-all duration-500 ${
        theme === "light"
          ? "bg-gray-100 text-black"
          : "bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white"
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
        <div
          className={`w-full rounded-2xl border overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.4)] transition-all ${
            theme === "light"
              ? "border-gray-300 bg-white"
              : "border-gray-800 bg-gradient-to-br from-gray-900/70 to-gray-800/40 backdrop-blur-md"
          }`}
        >
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
                setPopupMessage("Copied to Clipboard!");
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 5000); // 5 seconds for copy message too
              }}
              className="p-2 rounded-lg hover:bg-gray-700/60 transition-all duration-300 group"
            >
              <Copy
                size={20}
                className="group-hover:text-green-400 transition-colors duration-300"
              />
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

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div
            className={`relative z-10 px-8 py-6 rounded-2xl shadow-2xl text-center max-w-md w-[90%] transition-all duration-500 ${
              theme === "light"
                ? "bg-white text-gray-900"
                : "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">Message</h2>
            <p className="text-base">{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
