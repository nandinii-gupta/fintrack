import { FiAlertTriangle, FiTrendingUp, FiInfo } from "react-icons/fi";

export default function InsightsEngine({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const categories = ["Food", "Travel", "Shopping", "Bills", "Other"];

  // Total spent per category
  const categorySpends = categories.map((cat) => ({
    name: cat,
    total: transactions
      .filter((t) => t.category === cat && t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0),
  }));

  let insights = [];

  // 1️⃣ If spending > 60% of income
  if (income > 0 && expenses > income * 0.6) {
    insights.push({
      icon: <FiAlertTriangle className="text-red-500" size={22} />,
      msg: "You're spending more than 60% of your income. Try limiting lifestyle expenses.",
    });
  }

  // 2️⃣ High category alert
  const highest = categorySpends.sort((a, b) => b.total - a.total)[0];
  if (highest.total > income * 0.3) {
    insights.push({
      icon: <FiTrendingUp className="text-yellow-500" size={22} />,
      msg: `Your biggest expense this month is ${highest.name}. Reduce it to increase savings.`,
    });
  }

  // 3️⃣ No savings detected
  if (income > 0 && income - expenses < income * 0.2) {
    insights.push({
      icon: <FiInfo className="text-blue-500" size={22} />,
      msg: "Your savings are below 20% of income. Try saving first before spending.",
    });
  }

  if (insights.length === 0) {
    insights.push({
      icon: <FiInfo className="text-green-500" size={22} />,
      msg: "Good job! Your spending habits look balanced this month.",
    });
  }

  return (
    <div className="bg-white border shadow-md rounded-xl p-6 mt-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Smart Insights</h2>

      {insights.map((i, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border"
        >
          {i.icon}
          <p className="text-gray-700">{i.msg}</p>
        </div>
      ))}
    </div>
  );
}
