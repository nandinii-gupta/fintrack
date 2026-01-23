import { useContext } from "react";
import { TransactionsContext } from "../context/TransactionsContext";
import BudgetBar from "../components/BudgetBar";
import { getCategoryTotals } from "../utils/financeUtils";

export default function Budgets() {
  const { transactions } = useContext(TransactionsContext);

  // Default monthly limits (editable later)
  const limits = {
    Food: 6000,
    Rent: 12000,
    Travel: 4000,
    Entertainment: 3000,
    Shopping: 4000,
    Other: 2000,
  };

  const spentByCategory = getCategoryTotals(transactions);

  return (
    <div className="md:ml-64 pt-24 px-6 min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-6">
        Monthly Budgets
      </h2>

      <div className="max-w-2xl space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
        {Object.keys(limits).map((cat) => (
          <BudgetBar
            key={cat}
            label={cat}
            spent={spentByCategory[cat] || 0}
            limit={limits[cat]}
          />
        ))}
      </div>
    </div>
  );
}
