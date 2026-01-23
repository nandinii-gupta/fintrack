import { useContext, useMemo } from "react";
import BudgetCard from "../components/BudgetCard";
import SmartInsightCard from "../components/SmartInsightCard";
import { TransactionsContext } from "../context/TransactionsContext";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#ef4444", "#06b6d4"];

export default function Dashboard() {
  const { transactions = [] } = useContext(TransactionsContext);

  const user =
    JSON.parse(localStorage.getItem("user")) || { name: "User" };

  /* ================= CALCULATIONS ================= */

  const income = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const expense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const savings = income - expense;

  /* ================= FINANCIAL HEALTH SCORE ================= */

  const healthScore = useMemo(() => {
    if (income === 0 && expense === 0) return null;

    if (expense > income) return 20;

    const savingsRate = savings / income;

    if (savingsRate < 0.1) return 40;
    if (savingsRate < 0.3) return 70;
    return 90;
  }, [income, expense, savings]);

  /* ================= CHART DATA ================= */

  const pieData = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      if (t.type === "expense") {
        map[t.category] = (map[t.category] || 0) + t.amount;
      }
    });
    return Object.entries(map).map(([name, value]) => ({
      name,
      value,
    }));
  }, [transactions]);

  const trendData = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      if (t.type === "expense") {
        const month = new Date(t.date).toLocaleString("default", {
          month: "short",
        });
        map[month] = (map[month] || 0) + t.amount;
      }
    });
    return Object.entries(map).map(([month, amount]) => ({
      month,
      amount,
    }));
  }, [transactions]);

  const highestCategory =
    pieData.length > 0
      ? [...pieData].sort((a, b) => b.value - a.value)[0]
      : null;

  /* ================= UI ================= */

  return (
    <div className="md:ml-64 pt-24 px-6 min-h-screen text-white">
      {/* GREETING */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold">
          Hi {user?.name}! 👋
        </h1>
        <p className="text-gray-400 mt-1">
          Here’s how your money is doing this month
        </p>
      </div>

      {/* BUDGET + INSIGHT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BudgetCard />
        <SmartInsightCard />
      </div>

      {/* FINANCIAL HEALTH */}
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-semibold mb-2">
          Financial Health Score
        </h3>

        {healthScore === null ? (
          <p className="text-gray-400 text-sm">
            Start adding income and expenses to see your financial
            health 💡
          </p>
        ) : (
          <>
            <h2 className="text-4xl font-bold mb-2">
              {healthScore}/100
            </h2>

            {healthScore >= 70 ? (
              <p className="text-emerald-400 text-sm">
                ✅ Your finances are in good shape
              </p>
            ) : healthScore >= 40 ? (
              <p className="text-yellow-400 text-sm">
                ⚠ Moderate savings — room to improve
              </p>
            ) : (
              <p className="text-rose-400 text-sm">
                🚨 Expenses exceed income. Savings at risk.
              </p>
            )}
          </>
        )}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Income" value={income} color="emerald" />
        <StatCard title="Expense" value={expense} color="rose" />
        <StatCard title="Savings" value={savings} color="sky" />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PIE */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            Expense Breakdown
          </h3>

          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >
                  {pieData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400">
              Add expenses to see breakdown
            </p>
          )}
        </div>

        {/* LINE */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            Monthly Expense Trend
          </h3>

          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#6366f1"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400">
              No trend data yet
            </p>
          )}
        </div>
      </div>

      {/* SMART INSIGHT */}
      {highestCategory && (
        <div className="mt-10 bg-indigo-500/10 border border-indigo-400/30 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-2">
            Smart Insight 💡
          </h3>
          <p className="text-gray-200">
            Your highest spending category is{" "}
            <b>{highestCategory.name}</b> (₹
            {highestCategory.value}). Reducing it by
            10% could save you ₹
            {Math.round(highestCategory.value * 0.1)}.
          </p>
        </div>
      )}
    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
      <p className="text-gray-400">{title}</p>
      <p className={`text-2xl font-bold text-${color}-400`}>
        ₹{value}
      </p>
    </div>
  );
}













