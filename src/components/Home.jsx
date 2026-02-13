import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Put your video at: src/assets/ayan.mp4
import ayanVideo from "../assets/ayan.mp4";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("dark");

  // Existing popup (your fun messages + copy message)
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // ✅ New: Ayan confirmation + video overlay
  const [showAyanConfirm, setShowAyanConfirm] = useState(false);
  const [showAyanVideo, setShowAyanVideo] = useState(false);

  // prevents spamming popup every keystroke while "ayan" remains in textarea
  const [ayanLock, setAyanLock] = useState(false);

  const videoRef = useRef(null);

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
    const funMsgs = {
      farhan: "Are Farhan bhai... Aap bhut mast bande ho...",
      shahil: "Kam hasa kro , aur kam hilao bsdk...",
      badar: "Bhai jaan aap to hot ho, aap k wajah se galcier pighal rhe...",
      danish: "Kam hasa kro , aur kam hilao bsdk...",
      shaad: "Kam hasa kro , aur kam hilao bsdk...",
      kamran: "Agar jinda rhna h to delhi se bhaag jaao...",
      golrez: "Kam hasa kro bsdk...",
      nayab: "Football kam khelo wrna football bn jaaoge nigga...",
      adeeb: "Le kar hi maanega kya??...",
      ahmad: "Mujhe apne gaadi m kab ghuma rha???????????????????...",
      tahsin: "Kabhi batla house se nikla bhi kro...",
      fathima: "Thendi-Poda...",
      mumthas: "Thendi-Poda...",
      aadil: "Saale bomb kyu feka the mere oopar...",
      zaid: "Aur bhai, bhabhi kesi hai?...",
      saif: "Cooling pad mujhe de diyo...",
      riya: "Sudhar jaao wrna shaadi nhi hogi...",
      jerry: "Sudhar jaao wrna shaadi nhi hogi...",
      jibran: "Bhai reels kam dekho...",
      tabish: "Ab to room m aagye hm , ab mza aaega...",
      anas: "Bhai aap apna thoda sa height mujhe de do...",
      muzamil: "Bhai tu serious kab hota hai zindagi mein?",
      azad: "Life Doesn't give us a second chance...",
      nehal: "Itna overthink mat kar, exam me bhi nahi likhta tu itna.",
      shaharyar: "Royal feel aati hai naam se, par attendance zero!",
      touhid: "Always late, lekin entry heroic hoti hai!",
      rayyan: "Bhai tera hairstyle hi syllabus se lamba hai.",
      salman: "Naam bhari, kaam halke.",
      kaif: "Class me sabse zyada chill banda – marks me sabse kam thrill.",
      israth: "Tera calmness hi sabko irritate karta hai.",
      sohail: "Har waqt energy high, jaise battery charge pe chadha ho.",
      mobashir: "Banda mast hai, bas dimag kabhi kabhi restart maangta hai.",
      faizal: "Don banne ka sapna, attendance bhi 50 nahi.",
      ali: "Ali bhai, logic aur luck dono se durr.",
      hayat: "Naam romantic, coding tragic.",
      ashraf: "Har cheez me ‘bhai bhai’, but assignment kabhi time pe nahi.",
      huzaifa: "Banda chill, par system crash hone me expert.",
      kisa: "Queen attitude, logic zero.",
      yusuf: "Har jagah advice deta hai, khud pass mushkil se hota hai.",
      harrish: "Itna silent banda, teachers bhool jaate hain roll call me.",
      hilal: "Always confused, jaise syllabus dictionary me likha ho.",
      imbisat: "Bahar se shareef andar se Basmosh’.",
      kartik: "Har baar bolta hai padhta hu, par result reality check hai.",
      keshav: "Har project me entry last day pe karta hai.",
      ahsan: "Tera confidence hi tera biggest scam hai.",
      fahim: "Har waqt timepass, lekin marks pe shock.",
      ayan: "MR. Freshers",
      kaiz: "Naam style ka, attendance file ka.",
      faizan: "Overconfidence aur underperformance ka combo pack.",
      kanak: "Har time gossip mode ON, study mode OFF.",
      divyesh: "Tu IT support nahi bhai, human lag switch hai.",
      mohafiz: "Bhai tu har jagah serious hota hai, bas practical me nahi.",
      zayed: "Banda silent killer… mostly attendance ka.",
      parvez: "Always busy, par padhai ke time vanish.",
      wasfa: "Class ki drama queen, logic 404.",
      affan: "Itna chill banda, teacher bhi ignore kar dete.",
      adnan: "Har baar bolta ‘next time padhta hu’… next time kabhi aata nahi.",
      umar: "Mujhe lagta tu sirf tea break ke liye college aata hai.",
      zidan: "Naam footballer ka, attendance wicketkeeper jaisa.",
      hussain: "Banda serious sirf khaane ke time.",
      amman: "Always tired, jaise UPSC ka aspirant ho.",
      bisma: "Selfie pe topper, coding me flop.",
      arsh: "Tera coding style error ka museum hai.",
      irfan: "Bhai presentation me speaker, viva me mute.",
      nafis: "Har baar bolta ‘easy hai’, fail hone ke baad ‘error tha’.",
      saad: "Chill level itna high, teachers bhi surrender karte.",
      owais: "Tu banda mast hai, par punctuality se allergic.",
      saqib: "Everyday attendance zero, excuses hero.",
      tahir: "Har time ‘bhai adjust kar’ mood me.",
      sundus: "Har baat pe ‘I know’ bolti hai, result opposite.",
      aarish: "Banda smart, par kabhi timely nahi.",
      izyan: "Coding se zyada concern hairstyle ka.",
      shayan: "Always in cool mode, assignments in pending mode.",
      parwez: "Chup reh kar bhi dikkat karta hai.",
      saud: "Sab ka dost, padhai ka dushman.",
      aiza: "Instagram pe scholar, class me tourist.",
      faraz: "Itna lost rehta hai, teachers bhi confuse ho jaate hain.",
      shamma: "Great pattukari, want to see you singing with atif aslam",
      alok: "Kyu re m@darchod, bhubaneshwar and RKL m bhi girlfriend bna liya, bsdk",
      zafar: "Banglore m reh kr abhi tk s3x nhi mila aapko",
      tarun: "Bhai aapka to set hai , IIIT kota + Girlfrend",
      davar: "kyu re saste srk, kb mil rha delhi mai",
      tanish: "Saale kam hilaya kr , patla hote jaa rha...",
      fiza: "thoda kam padho , itna sgpa ka kya kroge",
      priya: "itne chup kyu rhte ho aap?",
    };

    let msg = funMsgs[lower] || "";
    if (lower === "tabish" || lower === "alok") setTheme("light");
    else setTheme("dark");

    if (msg) {
      setPopupMessage(msg);
      setShowPopup(true);
    }
  }

  // ✅ Detect "ayan" in textarea (case-insensitive), show confirm popup once per presence
  useEffect(() => {
    const hasAyan = value.toLowerCase().includes("ayan");

    if (hasAyan && !ayanLock) {
      setShowAyanConfirm(true);
      setAyanLock(true);
    }

    // unlock only when "ayan" is removed, so it can trigger again later
    if (!hasAyan && ayanLock) {
      setAyanLock(false);
    }
  }, [value, ayanLock]);

  // ✅ When video overlay opens, auto-play
  useEffect(() => {
    if (showAyanVideo && videoRef.current) {
      const v = videoRef.current;
      v.currentTime = 0;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  }, [showAyanVideo]);

  const confirmAyan = () => {
    setShowAyanConfirm(false);
    setShowAyanVideo(true);
  };

  const cancelAyan = () => {
    setShowAyanConfirm(false);
  };

  const closeAyanVideo = () => {
    setShowAyanVideo(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={`min-h-screen w-full py-10 px-4 flex justify-center transition-all duration-500 ${
        theme === "light"
          ? "bg-black text-cyan-300"
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
                setTimeout(() => setShowPopup(false), 5000);
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

      {/* ✅ Existing Popup Modal (fun msgs + copy msg) */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 flex items-start justify-center pt-6 bg-black/30 backdrop-blur-sm z-50">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`relative px-8 py-5 rounded-xl shadow-2xl text-center max-w-md w-[90%] border ${
                theme === "light"
                  ? "bg-white text-gray-900 border-gray-300"
                  : "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-gray-700"
              }`}
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-3 text-2xl font-bold text-gray-400 hover:text-red-500 transition-colors duration-300"
                aria-label="Close popup"
              >
                ×
              </button>

              <h2 className="text-lg font-semibold mb-2">Message</h2>
              <p className="text-base">{popupMessage}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ✅ NEW: Ayan Confirm Popup */}
      <AnimatePresence>
        {showAyanConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[60] px-4">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`w-full max-w-md rounded-2xl border shadow-2xl p-6 ${
                theme === "light"
                  ? "bg-white text-gray-900 border-gray-300"
                  : "bg-gray-950 text-white border-gray-800"
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">Confirmation</h3>
              <p className="text-sm text-gray-300 mb-6">
                You typed <span className="font-semibold text-white">ayan</span>.
                Kya aap ye risk lena chahte h, bas kilas mat jaaiyega?
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={cancelAyan}
                  className="px-4 py-2 rounded-xl border border-gray-700 hover:bg-gray-800 transition"
                >
                  No
                </button>
                <button
                  onClick={confirmAyan}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
                >
                  Yes, Play
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ✅ NEW: Video Overlay */}
      <AnimatePresence>
        {showAyanVideo && (
          <div className="fixed inset-0 bg-black/80 z-[70] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-3xl rounded-2xl overflow-hidden border border-gray-800 shadow-2xl relative bg-black"
            >
              <button
                onClick={closeAyanVideo}
                className="absolute top-3 right-3 z-10 px-3 py-1 rounded-lg bg-black/60 hover:bg-black/80 text-white border border-white/20"
                aria-label="Close video"
              >
                ✕
              </button>

              <video
                ref={videoRef}
                src={ayanVideo}
                controls
                autoPlay
                className="w-full h-auto"
                onEnded={closeAyanVideo}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
