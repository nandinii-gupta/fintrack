export function getDashboardInsights(transactions) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const thisMonthTx = transactions.filter(tx => {
    const d = new Date(tx.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const income = thisMonthTx
    .filter(tx => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expense = thisMonthTx
    .filter(tx => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const savings = income - expense;

  // Category analysis
  const categoryMap = {};
  thisMonthTx
    .filter(tx => tx.type === "expense")
    .forEach(tx => {
      categoryMap[tx.category] =
        (categoryMap[tx.category] || 0) + tx.amount;
    });

  const topCategory = Object.keys(categoryMap).length
    ? Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]
    : null;

  // Health Score (0–100)
  let healthScore = 100;
  if (income > 0) {
    healthScore -= (expense / income) * 50;
  }
  if (expense > income) {
    healthScore -= 25;
  }
  healthScore = Math.max(0, Math.round(healthScore));

  // Risk detection
  let riskMessage = null;
  if (income > 0 && expense / income > 0.7) {
    riskMessage = "High spending detected. Savings at risk.";
  }
  if (expense > income) {
    riskMessage = "You are spending more than you earn!";
  }

  return {
    income,
    expense,
    savings,
    healthScore,
    topCategory,
    riskMessage,
  };
}
