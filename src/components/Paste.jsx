import { Calendar, Copy, Eye, PencilLine, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utils/formatDate";
import React from "react";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null); // store paste to delete

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      dispatch(removeFromPastes(deleteTarget._id));
      toast.success("Paste deleted successfully", { position: "top-right" });
      setDeleteTarget(null);
    }
  };

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white py-10 px-4 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col gap-8">
        {/* Search Bar */}
        <div className="w-full flex items-center gap-3 bg-gradient-to-r from-gray-900/60 to-gray-800/40 backdrop-blur-md border border-gray-700 rounded-xl px-4 py-3 shadow-lg shadow-black/40">
          <input
            type="search"
            placeholder="Search your pastes..."
            className="w-full bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-0 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Paste Container */}
        <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.4)]">
          <h2 className="text-3xl sm:text-4xl font-bold border-b border-gray-700 p-6 bg-gradient-to-r from-gray-800/70 to-gray-900/50 rounded-t-2xl">
            All Pastes
          </h2>

          <div className="p-6 flex flex-col gap-6">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div
                  key={paste?._id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border border-gray-700/60 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/40 p-5 hover:border-blue-500/50 transition-all duration-300"
                >
                  {/* Paste Info */}
                  <div className="flex-1 flex flex-col gap-3">
                    <p className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {paste?.title}
                    </p>
                    <p className="text-sm sm:text-base text-gray-400 line-clamp-3">
                      {paste?.content}
                    </p>
                  </div>

                  {/* Right Side Controls */}
                  <div className="flex flex-col items-start sm:items-end gap-4">
                    {/* Buttons */}
                    <div className="flex flex-wrap sm:flex-nowrap gap-3">
                      <a
                        href={`/?pasteId=${paste?._id}`}
                        className="p-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-blue-600/40 transition-all duration-300"
                      >
                        <PencilLine size={20} />
                      </a>

                      <button
                        onClick={() => setDeleteTarget(paste)}
                        className="p-2.5 rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 shadow-md hover:shadow-rose-600/40 transition-all duration-300"
                      >
                        <Trash2 size={20} />
                      </button>

                      <a
                        href={`/pastes/${paste?._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-amber-500/40 transition-all duration-300"
                      >
                        <Eye size={20} />
                      </a>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard", { position: "top-right" });
                        }}
                        className="p-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-md hover:shadow-emerald-500/40 transition-all duration-300"
                      >
                        <Copy size={20} />
                      </button>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="text-gray-400" size={18} />
                      {FormatDate(paste?.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-2xl text-gray-400 font-medium tracking-wide">
                No pastes found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 max-w-md w-full mx-4 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Confirm Deletion</h3>
              <button
                onClick={() => setDeleteTarget(null)}
                className="text-gray-400 hover:text-gray-200 transition"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete{" "}
              <span className="text-rose-400 font-medium">
                "{deleteTarget?.title}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 transition text-white font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Paste;
