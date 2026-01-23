import React from "react";

export default function BudgetBar({ label, spent, limit }) {
  const percent = Math.min((spent / limit) * 100, 100);

  let color = "bg-emerald-500";
  if (percent > 80) color = "bg-yellow-500";
  if (percent >= 100) color = "bg-rose-500";

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-300">
        <span>{label}</span>
        <span>
          ₹{spent} / ₹{limit}
        </span>
      </div>

      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

