import { useMemo } from "react";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function HealthScore({ transactions }) {
  
  const score = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    if (income === 0 && expense === 0) return 50; // neutral score

    const ratio = income > 0 ? (expense / income) * 100 : 100;

    let value = 100 - ratio;
    return Math.max(10, Math.min(100, Math.round(value)));
  }, [transactions]);

  const getLabel = () => {
    if (score >= 80) return { text: "Excellent", color: "#10B981" };
    if (score >= 60) return { text: "Good", color: "#3B82F6" };
    if (score >= 40) return { text: "Average", color: "#F59E0B" };
    return { text: "Poor", color: "#EF4444" };
  };

  const feedback = getLabel();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg flex gap-6 items-center">
      <div className="w-40">
        <CircularProgressbar
          value={score}
          text={`${score}`}
          styles={buildStyles({
            pathColor: feedback.color,
            textColor: feedback.color,
            trailColor: "#E5E7EB",
            textSize: "24px",
          })}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold">Financial Health</h2>
        <p className="text-gray-500 mb-2">
          Your current spending habits are:
        </p>
        <p className="font-semibold text-lg" style={{ color: feedback.color }}>
          {feedback.text}
        </p>
      </div>

      {score >= 60 ? (
        <FiArrowUpRight size={32} className="text-green-500 ml-auto" />
      ) : (
        <FiArrowDownRight size={32} className="text-red-500 ml-auto" />
      )}
    </div>
  );
}
