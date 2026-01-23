// src/utils/goalUtils.js

export const calculateSavings = (transactions = []) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  return income - expense;
};

export const getGoalProgress = (goalAmount, saved) => {
  if (goalAmount <= 0) return 0;
  return Math.min(Math.round((saved / goalAmount) * 100), 100);
};

export const getETA = (goalAmount, saved, monthlySaving) => {
  if (monthlySaving <= 0) return "N/A";
  const remaining = goalAmount - saved;
  return Math.ceil(remaining / monthlySaving);
};
