import { useContext, useMemo, useState } from "react";
import { TransactionsContext } from "../context/TransactionsContext";
import { FiTrash2, FiEdit2, FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Transactions() {
  const { transactions = [], deleteTransaction } =
    useContext(TransactionsContext);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  /* ================= SUMMARY ================= */

  const income = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  const expense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  const balance = income - expense;

  /* ================= FILTERED DATA ================= */

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => (filter === "all" ? true : t.type === filter))
      .filter(
        (t) =>
          t.amount.toString().includes(search) ||
          t.type.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, filter, search]);

  /* ================= EMPTY STATE ================= */

  if (!transactions.length) {
    return (
      <div className="md:ml-64 pt-24 px-6 min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-gray-400 mb-2 text-lg">
            No transactions yet 💸
          </p>
          <p className="text-gray-500 text-sm">
            Start by adding income or expenses
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="md:ml-64 pt-24 px-6 min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-6">
        Transaction History
      </h2>

      {/* ================= SUMMARY STRIP ================= */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <SummaryCard title="Income" value={income} color="emerald" />
        <SummaryCard title="Expense" value={expense} color="rose" />
        <SummaryCard title="Balance" value={balance} color="sky" />
        <SummaryCard
          title="Transactions"
          value={transactions.length}
          isCount
        />
      </div>

      {/* ================= FILTER BAR ================= */}

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by amount or type"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-sm w-full md:w-64"
        />

        <div className="flex gap-2">
          {["all", "income", "expense"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-lg text-sm capitalize transition ${
                filter === t
                  ? "bg-indigo-600"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ================= TRANSACTION LIST ================= */}

      <div className="space-y-4 max-w-4xl">
        {filteredTransactions.map((tx, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-xl border border-white/20 bg-white/10
              hover:scale-[1.01] transition-all duration-200
              ${
                tx.type === "income"
                  ? "border-l-4 border-l-emerald-400"
                  : "border-l-4 border-l-rose-400"
              }`}
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <div
                className={`p-2 rounded-full ${
                  tx.type === "income"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-rose-500/20 text-rose-400"
                }`}
              >
                {tx.type === "income" ? (
                  <FiArrowDownLeft />
                ) : (
                  <FiArrowUpRight />
                )}
              </div>

              <div>
                <p className="font-medium capitalize">
                  {tx.type}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(tx.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              <span
                className={`font-semibold ${
                  tx.type === "income"
                    ? "text-emerald-400"
                    : "text-rose-400"
                }`}
              >
                ₹{tx.amount}
              </span>

              <button
                onClick={() => {
                  deleteTransaction(index);
                  toast.success("Transaction deleted");
                }}
                className="text-gray-400 hover:text-rose-400"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SummaryCard({ title, value, color, isCount }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-xl p-4">
      <p className="text-gray-400 text-sm">{title}</p>
      <p
        className={`text-xl font-bold ${
          isCount ? "text-white" : `text-${color}-400`
        }`}
      >
        {isCount ? value : `₹${value}`}
      </p>
    </div>
  );
}



