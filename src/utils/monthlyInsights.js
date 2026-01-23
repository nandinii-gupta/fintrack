export function getMonthlyComparison(transactions) {
  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const isSameMonth = (date, m, y) =>
    date.getMonth() === m && date.getFullYear() === y;

  const currentMonthTx = transactions.filter(tx =>
    isSameMonth(new Date(tx.date), currentMonth, currentYear)
  );

  const lastMonthTx = transactions.filter(tx =>
    isSameMonth(new Date(tx.date), lastMonth, lastMonthYear)
  );

  const sum = (txs, type) =>
    txs
      .filter(t => t.type === type)
      .reduce((acc, t) => acc + t.amount, 0);

  const currentIncome = sum(currentMonthTx, "income");
  const currentExpense = sum(currentMonthTx, "expense");

  const lastIncome = sum(lastMonthTx, "income");
  const lastExpense = sum(lastMonthTx, "expense");

  return {
    currentIncome,
    currentExpense,
    lastIncome,
    lastExpense,
    incomeDiff: currentIncome - lastIncome,
    expenseDiff: currentExpense - lastExpense,
  };
}
