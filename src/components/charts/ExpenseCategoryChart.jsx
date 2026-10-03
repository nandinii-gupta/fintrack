import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseCategoryChart({ transactions = [] }) {
  // Get only expense transactions
  // toLowerCase() makes it work with "expense", "Expense", etc.
  const expenses = transactions.filter(
    (tx) => tx?.type?.toLowerCase() === "expense"
  );

  // Show message if there are no expenses
  if (expenses.length === 0) {
    return (
      <p className="text-gray-400 text-center py-8">
        No expense data available yet
      </p>
    );
  }

  // Create category-wise expense totals
  const categoryMap = {};

  expenses.forEach((tx) => {
    const category = tx.category || "Other";
    const amount = Number(tx.amount) || 0;

    categoryMap[category] = (categoryMap[category] || 0) + amount;
  });

  // Chart data
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
          "#06B6D4",
          "#EC4899",
          "#8B5CF6",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#D1D5DB",
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw || 0;
            return ` ₹${Number(value).toLocaleString("en-IN")}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Pie data={data} options={options} />
    </div>
  );
}