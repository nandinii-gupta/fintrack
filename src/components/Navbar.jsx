import { FiMenu } from "react-icons/fi";

export default function Navbar({ onMenuClick }) {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4
      bg-black/30 backdrop-blur-xl border-b border-white/10 z-50">

      {/* Hamburger (mobile) */}
      <button
        onClick={onMenuClick}
        className="md:hidden text-white"
      >
        <FiMenu size={24} />
      </button>

      <h1 className="text-lg font-semibold text-white">
        FinTrack
      </h1>
    </nav>
  );
}

