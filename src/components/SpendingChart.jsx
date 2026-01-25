import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function SpendingChart({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-4">
        No data to display yet
      </p>
    );
  }

  const chartData = data.map((t, index) => ({
    name: `Txn ${index + 1}`,
    amount: t.amount
  }));

  return (
    <div className="w-full h-64 mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="name" stroke="#94a3b8" />
          <Tooltip />
          <Bar dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


