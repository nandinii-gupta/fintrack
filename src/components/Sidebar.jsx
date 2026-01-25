import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiPlusCircle,
  FiDollarSign,
  FiBarChart2,
  FiList,
  FiLogOut,
  FiX,
  FiTarget
} from "react-icons/fi";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Sidebar({ isOpen, onClose }) {
  const { pathname } = useLocation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <FiHome /> },
    { to: "/dashboard/add-expense", label: "Add Expense", icon: <FiPlusCircle /> },
    { to: "/dashboard/add-income", label: "Add Income", icon: <FiDollarSign /> },
    { to: "/dashboard/transactions", label: "Transactions", icon: <FiList /> },
    { to: "/dashboard/reports", label: "Reports", icon: <FiBarChart2 /> },
    { to: "/dashboard/goals", label: "Goals", icon: <FiTarget /> }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully 👋");
    window.location.href = "/";
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-50
          bg-gradient-to-b from-slate-900 to-slate-950
          border-r border-white/10
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          <span className="text-lg font-semibold text-white">
            FinTrack
          </span>

          <button
            className="md:hidden text-white"
            onClick={onClose}
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-3 space-y-2">
          {links.map((item) => {
            const isActive = pathname.startsWith(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition
                  ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-300 hover:bg-white/10"
                  }
                `}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 w-full px-3">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                       text-rose-400 hover:bg-rose-500/10 transition"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">
              Are you sure?
            </h3>
            <p className="text-gray-600 mb-6">
              Do you really want to logout?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-gray-800 font-medium rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}











