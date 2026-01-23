import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import AddIncome from "./pages/AddIncome";
import Goals from "./pages/Goals";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Budgets from "./pages/Budgets";


import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED */}
        <Route
  path="/dashboard/*"
  element={
    <ProtectedRoute>
      <>
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="add-expense" element={<AddExpense />} />
          <Route path="add-income" element={<AddIncome />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="reports" element={<Reports />} />
          <Route path="goals" element={<Goals />} />
        </Routes>
      </>
    </ProtectedRoute>
  }
/>
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <>
                <Navbar onMenuClick={() => setSidebarOpen(true)} />
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <Reports />
              </>
            </ProtectedRoute>
          }
        />

        <Route
  path="/budgets"
  element={
    <ProtectedRoute>
      <>
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <Budgets />
      </>
    </ProtectedRoute>
  }
/>


        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}











