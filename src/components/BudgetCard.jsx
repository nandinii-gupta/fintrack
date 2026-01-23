import { useContext, useEffect, useState } from "react";
import { TransactionsContext } from "../context/TransactionsContext";

export default function BudgetCard() {
  const { transactions = [] } = useContext(TransactionsContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const storageKey = `budget_${user?.email}`;

  const [budget, setBudget] = useState(null);
  const [input, setInput] = useState("");

  /* ================= LOAD BUDGET ================= */
  useEffect(() => {
    const savedBudget = localStorage.getItem(storageKey);
    if (savedBudget) {
      setBudget(Number(savedBudget));
    }
  }, [storageKey]);

  /* ================= SAVE BUDGET ================= */
  const saveBudget = () => {
    if (!input) return;
    localStorage.setItem(storageKey, input);
    setBudget(Number(input));
    setInput("");
  };

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const percentage =
    budget > 0 ? Math.min(100, (expense / budget) * 100) : 0;

  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-2">
        Monthly Budget
      </h3>

      {/* NO BUDGET SET */}
      {!budget ? (
        <>
          <p className="text-gray-400 text-sm mb-3">
            Set your monthly budget to start tracking 📊
          </p>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Enter amount"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 rounded bg-black/30 border border-white/20"
            />
            <button
              onClick={saveBudget}
              className="px-4 bg-indigo-600 rounded"
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-2">
            ₹{expense} / ₹{budget}
          </p>

          <div className="w-full h-2 bg-white/20 rounded">
            <div
              className={`h-2 rounded ${
                expense > budget
                  ? "bg-rose-500"
                  : "bg-indigo-500"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {expense > budget ? (
            <p className="text-rose-400 text-sm mt-2">
              ⚠ Budget exceeded
            </p>
          ) : (
            <p className="text-emerald-400 text-sm mt-2">
              ✅ Spending under control
            </p>
          )}
        </>
      )}
    </div>
  );
}

