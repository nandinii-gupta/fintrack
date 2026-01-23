import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { TransactionsProvider } from "./context/TransactionsContext";
import { BudgetProvider } from "./context/BudgetContext";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <React.StrictMode>
    <TransactionsProvider>
      <BudgetProvider>
        <App />
        <Toaster position="top-right" />
      </BudgetProvider>
    </TransactionsProvider>
  </React.StrictMode>
);



