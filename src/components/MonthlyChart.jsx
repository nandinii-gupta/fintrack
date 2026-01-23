import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function MonthlyChart({ transactions }) {
  const categories = ["Food", "Travel", "Shopping", "Bills", "Other"];

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Monthly Spending (₹)",
        data: categories.map((cat) =>
          transactions
            .filter((t) => t.type === "expense" && t.category === cat)
            .reduce((sum, t) => sum + t.amount, 0)
        ),
        backgroundColor: "rgba(59,130,246,0.7)", // blue
      },
    ],
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl mt-10">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Monthly Spending Chart
      </h2>
      <Bar data={data} height={100} />
    </div>
  );
}
