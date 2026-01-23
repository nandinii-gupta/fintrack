export function getSmartInsight(transactions) {
  if (transactions.length < 2) {
    return "Start tracking to see insights 📊";
  }

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  if (expense > income) {
    return "⚠️ Your expenses exceeded income this month";
  }

  const savings = income - expense;
  return `✅ You saved ₹${savings} this month. Great job!`;
}
