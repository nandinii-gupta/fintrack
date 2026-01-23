import { useContext, useEffect, useState } from "react";
import { TransactionsContext } from "../context/TransactionsContext";
import GoalCard from "../components/GoalCard";
import {
  calculateSavings,
  getGoalProgress,
  getETA,
} from "../utils/goalUtils";
import { FiPlus, FiTrash2 } from "react-icons/fi";

export default function Goals() {
  const { transactions } = useContext(TransactionsContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const monthlySaving = calculateSavings(transactions);

  const storageKey = `goals_${user?.email}`;

  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    amount: "",
  });

  /* ================= LOAD GOALS ================= */
  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem(storageKey)) || [];
    setGoals(savedGoals);
  }, [storageKey]);

  /* ================= SAVE GOALS ================= */
  const persistGoals = (updatedGoals) => {
    setGoals(updatedGoals);
    localStorage.setItem(storageKey, JSON.stringify(updatedGoals));
  };

  /* ================= ADD GOAL ================= */
  const addGoal = () => {
    if (!form.title || !form.amount) return;

    const newGoal = {
      id: Date.now(),
      title: form.title,
      amount: Number(form.amount),
    };

    persistGoals([...goals, newGoal]);
    setForm({ title: "", amount: "" });
    setShowModal(false);
  };

  /* ================= DELETE GOAL ================= */
  const deleteGoal = (id) => {
    persistGoals(goals.filter((g) => g.id !== id));
  };

  return (
    <div className="md:ml-64 pt-24 px-6 min-h-screen text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Savings Goals</h2>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg"
        >
          <FiPlus /> Add Goal
        </button>
      </div>

      <p className="text-gray-400 mb-8">
        Based on your current saving rate of{" "}
        <b>₹{monthlySaving}/month</b>
      </p>

      {/* EMPTY STATE */}
      {goals.length === 0 && (
        <div className="bg-white/10 border border-white/20 rounded-xl p-8 text-center text-gray-400">
          You haven’t created any savings goals yet 🎯  
          <br />
          Click <b>Add Goal</b> to start tracking.
        </div>
      )}

      {/* GOALS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goals.map((g) => {
          const saved = monthlySaving;
          const eta = getETA(g.amount, saved, monthlySaving);

          return (
            <div key={g.id} className="relative">
              <GoalCard
                title={g.title}
                target={g.amount}
                saved={saved}
                eta={eta}
              />

              {/* DELETE BUTTON */}
              <button
                onClick={() => deleteGoal(g.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-rose-400"
                title="Delete goal"
              >
                <FiTrash2 />
              </button>
            </div>
          );
        })}
      </div>

      {/* ================= ADD GOAL MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-6 rounded-2xl w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">
              Add New Goal
            </h3>

            <input
              type="text"
              placeholder="Goal name (e.g. Travel Fund)"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full mb-3 p-3 rounded bg-black/30 border border-white/20"
            />

            <input
              type="number"
              placeholder="Target amount"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
              className="w-full mb-4 p-3 rounded bg-black/30 border border-white/20"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={addGoal}
                className="px-4 py-2 bg-indigo-600 rounded"
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



