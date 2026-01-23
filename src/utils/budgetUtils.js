export function getBudgetUsage(transactions, budgets) {
  const usage = {};

  transactions
    .filter(tx => tx.type === "expense")
    .forEach(tx => {
      usage[tx.category] =
        (usage[tx.category] || 0) + tx.amount;
    });

  return Object.keys(budgets).map(category => {
    const spent = usage[category] || 0;
    const limit = budgets[category];
    const percent = Math.min(
      100,
      Math.round((spent / limit) * 100)
    );

    return {
      category,
      spent,
      limit,
      percent,
      status:
        percent >= 100
          ? "danger"
          : percent >= 80
          ? "warning"
          : "safe",
    };
  });
}

