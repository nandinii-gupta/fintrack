import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function MonthlyExpenseTrend({ transactions = [] }) {
  // Get only expense transactions
  const expenses = transactions.filter(
    (tx) => tx?.type?.toLowerCase() === "expense"
  );

  // Store expenses month-wise
  const expenseMap = {};

  expenses.forEach((tx) => {
    if (!tx.date) return;

    const date = new Date(tx.date);

    // Ignore invalid dates
    if (isNaN(date.getTime())) return;

    const month = date.toLocaleString("default", {
      month: "short",
    });

    const amount = Number(tx.amount) || 0;

    expenseMap[month] = (expenseMap[month] || 0) + amount;
  });

  const labels = Object.keys(expenseMap);
  const values = Object.values(expenseMap);

  // No expense data
  if (labels.length === 0) {
    return (
      <p className="text-gray-400 text-center py-8">
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
        backgroundColor: "rgba(99, 102, 241, 0.15)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          color: "#D1D5DB",
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

    scales: {
      x: {
        ticks: {
          color: "#9CA3AF",
        },
        grid: {
          color: "rgba(156, 163, 175, 0.1)",
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          color: "#9CA3AF",

          callback: function (value) {
            return `₹${Number(value).toLocaleString("en-IN")}`;
          },
        },

        grid: {
          color: "rgba(156, 163, 175, 0.1)",
        },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Line data={data} options={options} />
    </div>
  );
}