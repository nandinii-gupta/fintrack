import { createContext, useEffect, useState } from "react";

export const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || user?.email; // fallback safety

  const storageKey = userId ? `transactions_${userId}` : null;

  const [transactions, setTransactions] = useState(() => {
    if (!storageKey) return [];
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  /* 🔁 Sync with localStorage */
  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(transactions));
    }
  }, [transactions, storageKey]);

  /* ➕ Add */
  const addTransaction = (tx) => {
    setTransactions((prev) => [
      ...prev,
      {
        ...tx,
        id: Date.now(), // stable unique id
      },
    ]);
  };

  /* ❌ Delete */
  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((tx) => tx.id !== id)
    );
  };

  /* ✏️ Update */
  const updateTransaction = (id, updatedTx) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id ? { ...tx, ...updatedTx } : tx
      )
    );
  };

  /* 🚪 Clear on logout */
  const clearTransactions = () => {
    setTransactions([]);
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        clearTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}






