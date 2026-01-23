import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

export default function InsightCard({ category, increase }) {
  return (
    <div className="flex items-center gap-4 bg-rose-500/10 border border-rose-400/30 rounded-xl p-4">
      <FiAlertTriangle className="text-rose-400" size={22} />
      <p className="text-sm text-rose-300">
        You spent <b>{increase}% more</b> on{" "}
        <span className="capitalize">{category}</span> than last month
      </p>
    </div>
  );
}
