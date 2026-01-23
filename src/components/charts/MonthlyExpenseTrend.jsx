import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

export default function MonthlyExpenseTrend({ transactions }) {
  const expenseMap = {};

  transactions
    .filter(tx => tx.type === "expense")
    .forEach(tx => {
      const month = new Date(tx.date).toLocaleString("default", {
        month: "short",
      });
      expenseMap[month] = (expenseMap[month] || 0) + tx.amount;
    });

  const labels = Object.keys(expenseMap);
  const values = Object.values(expenseMap);

  if (labels.length === 0) {
    return (
      <p className="text-gray-400 text-center">
        Not enough data for trends
      </p>
    );
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Expenses",
        data: values,
        borderColor: "#6366F1",
        tension: 0.4,
      },
    ],
  };

  return <Line data={data} />;
}
