import { useMemo } from "react";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

const DEFAULT_BUDGETS = {
  Food: 8000,
  Travel: 5000,
  Shopping: 4000,
  Entertainment: 3000,
  Other: 2000,
};

export default function BudgetOverview({ transactions }) {
  const expenseByCategory = useMemo(() => {
    const map = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });
    return map;
  }, [transactions]);

  return (
    <div className="space-y-5">
      {Object.entries(DEFAULT_BUDGETS).map(([category, limit]) => {
        const spent = expenseByCategory[category] || 0;
        const percent = Math.min((spent / limit) * 100, 100);

        const isOver = spent > limit;
        const isWarning = spent > limit * 0.7 && !isOver;

        return (
          <div key={category}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white">{category}</span>
              <span className="text-gray-300">
                ₹{spent} / ₹{limit}
              </span>
            </div>

            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full ${
                  isOver
                    ? "bg-rose-500"
                    : isWarning
                    ? "bg-yellow-400"
                    : "bg-emerald-400"
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>

            {(isOver || isWarning) && (
              <p
                className={`text-xs mt-1 flex items-center gap-1 ${
                  isOver ? "text-rose-400" : "text-yellow-400"
                }`}
              >
                {isOver ? (
                  <FiAlertTriangle />
                ) : (
                  <FiCheckCircle />
                )}
                {isOver
                  ? "Budget exceeded"
                  : "Approaching budget limit"}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
