import { createContext, useState } from "react";

export const BudgetContext = createContext();

export function BudgetProvider({ children }) {
  const [monthlyBudget, setMonthlyBudget] = useState(
    Number(localStorage.getItem("budget")) || 30000
  );

  const updateBudget = (amount) => {
    setMonthlyBudget(amount);
    localStorage.setItem("budget", amount);
  };

  return (
    <BudgetContext.Provider value={{ monthlyBudget, updateBudget }}>
      {children}
    </BudgetContext.Provider>
  );
}

