export default function Insights({ transactions, goal }) {
  const expenseItems = transactions.filter((tx) => tx.type === "expense");

  if (expenseItems.length === 0) {
    return (
      <div className="md:ml-64 pt-24 p-6 text-gray-300 text-xl">
        No data yet to generate insights.
      </div>
    );
  }

  const totalExpense = expenseItems.reduce((sum, tx) => sum + tx.amount, 0);

  const categoryTotals = expenseItems.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  const topCatName = topCategory[0];
  const topCatAmount = topCategory[1];
  const topPercent = ((topCatAmount / totalExpense) * 100).toFixed(1);

  const suggestions = [
    `⚠ You are spending most on "${topCatName}" category.`,
    `💡 ${topPercent}% of your total expenses is on ${topCatName}. Try reducing it.`,
    `📉 Cutting ₹${Math.ceil(topCatAmount * 0.2)} in ${topCatName} can boost your savings.`,
  ];

  return (
    <div className="md:ml-64 pt-24 p-6 text-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Insights</h1>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl space-y-4 max-w-xl">
        {suggestions.map((msg, index) => (
          <p key={index} className="text-lg">
            {msg}
          </p>
        ))}
      </div>
    </div>
  );
}
