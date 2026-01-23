export function getSmartInsights(transactions) {
  if (!transactions || transactions.length === 0) return [];

  const expenses = transactions.filter(t => t.type === "expense");

  const categoryMap = {};
  expenses.forEach(tx => {
    categoryMap[tx.category] =
      (categoryMap[tx.category] || 0) + tx.amount;
  });

  const sortedCategories = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1]
  );

  const insights = [];

  if (sortedCategories.length > 0) {
    const [topCategory, amount] = sortedCategories[0];
    insights.push({
      type: "warning",
      message: `Your highest spending category is "${topCategory}" (₹${amount}). Try reducing it slightly next month.`,
    });

    const possibleSaving = Math.round(amount * 0.1);
    insights.push({
      type: "tip",
      message: `Reducing ${topCategory} spending by 10% can save you ₹${possibleSaving} next month.`,
    });
  }

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);

  if (totalExpense < totalIncome * 0.6) {
    insights.push({
      type: "success",
      message: "Excellent control! Your expenses are well below your income.",
    });
  }

  return insights;
}
