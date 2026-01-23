import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart({ transactions }) {
  const categories = ["Food", "Travel", "Shopping", "Bills", "Other"];

  // Generate dynamic chart data by summing values category-wise
  const data = {
    labels: categories,
    datasets: [
      {
        data: categories.map((cat) =>
          transactions
            .filter((t) => t.category === cat)
            .reduce((sum, t) => sum + t.amount, 0)
        ),
        backgroundColor: [
          "rgba(251, 113, 133, 0.7)", // Food
          "rgba(96, 165, 250, 0.7)", // Travel
          "rgba(251, 191, 36, 0.7)", // Shopping
          "rgba(52, 211, 153, 0.7)", // Bills
          "rgba(167, 139, 250, 0.7)", // Other
        ],
        borderColor: "rgba(255, 255, 255, 0.4)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div
      className="
        bg-white/10 backdrop-blur-xl border border-white/20
        p-6 rounded-2xl shadow-xl max-w-2xl mx-auto text-white
      "
    >
      <h2 className="text-2xl font-semibold mb-6">
        Expense Breakdown
      </h2>

      {/* Chart Container */}
      <div className="h-[320px]">
        <Pie
          data={data}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
                labels: {
                  color: "#e2e8f0", // Visible on dark mode
                  font: {
                    size: 14,
                    weight: "500",
                    family: "Inter",
                  },
                  padding: 18,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}


