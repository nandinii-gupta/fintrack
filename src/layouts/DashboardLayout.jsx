import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  );
}
