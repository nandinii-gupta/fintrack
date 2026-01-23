export function generateMonthlyReport(transactions) {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const monthlyTx = transactions.filter(tx => {
    const d = new Date(tx.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });

  const income = monthlyTx
    .filter(tx => tx.type === "income")
    .reduce((s, tx) => s + tx.amount, 0);

  const expense = monthlyTx
    .filter(tx => tx.type === "expense")
    .reduce((s, tx) => s + tx.amount, 0);

  const savings = income - expense;

  const categoryMap = {};
  monthlyTx
    .filter(tx => tx.type === "expense")
    .forEach(tx => {
      categoryMap[tx.category] =
        (categoryMap[tx.category] || 0) + tx.amount;
    });

  const topCategory =
    Object.keys(categoryMap).length > 0
      ? Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]
      : null;

  let status = "Good";
  let insight = "You are managing your finances well.";

  if (income === 0 && expense > 0) {
    status = "Risk";
    insight = "No income recorded but expenses exist.";
  } else if (expense > income) {
    status = "Risk";
    insight = "You spent more than your income this month.";
  } else if (expense / income > 0.7) {
    status = "Warning";
    insight = "High spending detected. Consider reducing expenses.";
  }

  return {
    income,
    expense,
    savings,
    status,
    insight,
    topCategory,
    totalTransactions: monthlyTx.length,
  };
}
