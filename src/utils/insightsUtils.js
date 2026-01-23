// src/utils/insightsUtils.js

export const getCurrentMonthData = (transactions) => {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  return transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });
};

export const getPreviousMonthData = (transactions) => {
  const now = new Date();
  let month = now.getMonth() - 1;
  let year = now.getFullYear();

  if (month < 0) {
    month = 11;
    year -= 1;
  }

  return transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });
};

export const getCategoryTotals = (transactions) => {
  const map = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      map[t.category] = (map[t.category] || 0) + t.amount;
    }
  });
  return map;
};

export const detectOverspending = (current, previous) => {
  const alerts = [];

  Object.keys(current).forEach((cat) => {
    if (previous[cat] && current[cat] > previous[cat] * 1.3) {
      alerts.push({
        category: cat,
        increase: Math.round(
          ((current[cat] - previous[cat]) / previous[cat]) * 100
        ),
      });
    }
  });

  return alerts;
};
