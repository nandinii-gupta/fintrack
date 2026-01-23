// src/utils/financeUtils.js

export const getCategoryTotals = (transactions = []) => {
  const totals = {};

  transactions.forEach((tx) => {
    if (tx.type === "expense") {
      totals[tx.category] =
        (totals[tx.category] || 0) + tx.amount;
    }
  });

  return totals;
};

export const getMonthKey = (date = new Date()) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth() + 1}`;
};
