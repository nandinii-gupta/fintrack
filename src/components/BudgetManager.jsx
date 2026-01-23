import { useContext, useState } from "react";
import { BudgetContext } from "../context/BudgetContext";
import { TransactionsContext } from "../context/TransactionsContext";
import { getBudgetUsage } from "../utils/budgetUtils";

export default function BudgetManager() {
  const { budgets, setBudget } = useContext(BudgetContext);
  const { transactions } = useContext(TransactionsContext);

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const usageData = getBudgetUsage(transactions, budgets);

  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">
        Monthly Budget Planner
      </h3>

      {/* SET BUDGET */}
      <div className="flex gap-3 mb-6">
        <input
          placeholder="Category (Food, Rent...)"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="flex-1 p-2 rounded bg-black/30 border border-white/20"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-32 p-2 rounded bg-black/30 border border-white/20"
        />
        <button
          onClick={() => {
            setBudget(category, Number(amount));
            setCategory("");
            setAmount("");
          }}
          className="px-4 bg-indigo-600 rounded"
        >
          Set
        </button>
      </div>

      {/* BUDGET BARS */}
      <div className="space-y-4">
        {usageData.map(b => (
          <div key={b.category}>
            <div className="flex justify-between mb-1">
              <span>{b.category}</span>
              <span>₹{b.spent} / ₹{b.limit}</span>
            </div>
            <div className="h-3 bg-white/10 rounded">
              <div
                className={`h-full rounded ${
                  b.status === "danger"
                    ? "bg-rose-500"
                    : b.status === "warning"
                    ? "bg-yellow-400"
                    : "bg-emerald-400"
                }`}
                style={{ width: `${b.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
