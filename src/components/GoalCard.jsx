import React from "react";

export default function GoalCard({ title, target, saved, eta }) {
  const percent = Math.min((saved / target) * 100, 100);

  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-5 space-y-3">
      <h3 className="font-semibold text-lg">{title}</h3>

      <p className="text-sm text-gray-300">
        ₹{saved} / ₹{target}
      </p>

      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-sm text-gray-400">
        {percent}% completed • ETA:{" "}
        <span className="text-white">{eta} months</span>
      </p>
    </div>
  );
}
