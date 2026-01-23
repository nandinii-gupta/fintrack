import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseCategoryChart({ transactions }) {
  const expenses = transactions.filter(tx => tx.type === "expense");

  if (expenses.length === 0) {
    return (
      <p className="text-gray-400 text-center">
        No expense data available yet
      </p>
    );
  }

  const categoryMap = {};
  expenses.forEach(tx => {
    categoryMap[tx.category] =
      (categoryMap[tx.category] || 0) + tx.amount;
  });

  const data = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        data: Object.values(categoryMap),
        backgroundColor: [
          "#6366F1",
          "#22C55E",
          "#F97316",
          "#EF4444",
          "#EAB308",
        ],
      },
    ],
  };

  return <Pie data={data} />;
}
