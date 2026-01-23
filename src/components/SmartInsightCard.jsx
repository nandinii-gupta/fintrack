import { useContext } from "react";
import { TransactionsContext } from "../context/TransactionsContext";
import { getSmartInsight } from "../utils/insightUtils";

export default function SmartInsightCard() {
  const { transactions } = useContext(TransactionsContext);
  const insight = getSmartInsight(transactions);

  return (
    <div className="bg-indigo-600/20 border border-indigo-500/30 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-2">Smart Insight</h3>
      <p className="text-sm text-indigo-100">{insight}</p>
    </div>
  );
}
