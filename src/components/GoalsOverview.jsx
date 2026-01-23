import { calculateGoalProgress } from "../utils/goalUtils";

export default function GoalsOverview({ goals, savings }) {
  if (!goals.length) {
    return (
      <p className="text-gray-400">
        No goals added yet. Start by creating one 🎯
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {goals.map((goal, index) => {
        const progress = calculateGoalProgress(
          goal.amount,
          savings
        );

        return (
          <div
            key={index}
            className="bg-white/10 border border-white/20 rounded-xl p-4"
          >
            <div className="flex justify-between mb-1">
              <p className="font-medium text-white">
                {goal.title}
              </p>
              <p className="text-gray-300">
                ₹{goal.amount}
              </p>
            </div>

            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 ${
                  progress === 100
                    ? "bg-emerald-400"
                    : "bg-indigo-400"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-xs text-gray-400 mt-1">
              {progress}% completed • ₹
              {Math.max(goal.amount - savings, 0)} remaining
            </p>
          </div>
        );
      })}
    </div>
  );
}
