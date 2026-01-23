import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function MonthlyTrendChart({ transactions }) {
  const monthlyData = {};

  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short"
    });

    monthlyData[month] = (monthlyData[month] || 0) + t.amount;
  });

  const data = Object.keys(monthlyData).map((m) => ({
    month: m,
    amount: monthlyData[m],
  }));

  if (data.length === 0) return null;

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#818cf8"
            strokeWidth={3}
            dot={{ r: 4 }}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
