import { FiLogOut } from "react-icons/fi";

export default function LogoutConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white text-slate-800 w-[90%] max-w-sm rounded-2xl p-6 shadow-xl animate-fadeIn">
        <div className="flex items-center gap-3 mb-4">
          <FiLogOut className="text-rose-500 text-xl" />
          <h2 className="text-lg font-semibold">Log out</h2>
        </div>

        <p className="text-sm text-slate-600 mb-6">
          Are you sure you want to log out? You’ll need to sign in again to
          access your dashboard.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}
