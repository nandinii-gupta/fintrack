import { useContext } from "react";
import { TransactionsContext } from "../context/TransactionsContext";
import { generateMonthlyReport } from "../utils/reportUtils";

export default function Reports() {
  const { transactions } = useContext(TransactionsContext);
  const report = generateMonthlyReport(transactions);

  return (
    <div className="md:ml-64 pt-24 px-6 min-h-screen text-white">

      <h1 className="text-3xl font-semibold mb-2">
        Monthly Financial Report
      </h1>
      <p className="text-gray-400 mb-8">
        Auto-generated summary of your finances
      </p>

      {/* STATUS BADGE */}
      <div
        className={`inline-block px-4 py-2 rounded-full mb-6 text-sm font-medium
        ${
          report.status === "Good"
            ? "bg-emerald-500/20 text-emerald-300"
            : report.status === "Warning"
            ? "bg-yellow-500/20 text-yellow-300"
            : "bg-rose-500/20 text-rose-300"
        }`}
      >
        {report.status} Financial Health
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <Card label="Total Income" value={report.income} color="emerald" />
        <Card label="Total Expense" value={report.expense} color="rose" />
        <Card label="Net Savings" value={report.savings} color="sky" />
      </div>

      {/* INSIGHT BOX */}
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-semibold mb-2">
          Financial Insight
        </h3>
        <p className="text-gray-300">
          {report.insight}
        </p>
      </div>

      {/* EXTRA DETAILS */}
      <div className="grid md:grid-cols-2 gap-6">
        <Detail label="Total Transactions" value={report.totalTransactions} />
        {report.topCategory && (
          <Detail
            label="Highest Spending Category"
            value={`${report.topCategory[0]} (₹${report.topCategory[1]})`}
          />
        )}
      </div>
    </div>
  );
}

function Card({ label, value, color }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-xl p-5">
      <p className="text-gray-400">{label}</p>
      <p className={`text-2xl font-bold text-${color}-400`}>
        ₹{value}
      </p>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-xl p-5">
      <p className="text-gray-400 mb-1">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}



