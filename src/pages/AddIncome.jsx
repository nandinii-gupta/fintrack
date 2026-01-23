import { useContext, useState } from "react";
import { TransactionsContext } from "../context/TransactionsContext";
import toast from "react-hot-toast";

const INCOME_CATEGORIES = [
  "Salary 💼",
  "Freelance 💻",
  "Business 🏢",
  "Investment 📈",
  "Gift 🎁",
  "Other",
];

export default function AddIncome() {
  const { addTransaction } = useContext(TransactionsContext);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(""); // 👈 empty initially
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    if (!amount || !category || !date) {
      toast.error("Please fill all fields");
      return;
    }

    addTransaction({
      type: "income",
      amount: Number(amount),
      category,
      date: new Date(date).toISOString(),
    });

    toast.success("Income added successfully 💰");

    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <div className="md:ml-64 pt-24 px-6 min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-6">Add Income</h2>

      <div className="max-w-md space-y-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 rounded bg-white/10 border border-white/20 text-white"
        />

        {/* CATEGORY DROPDOWN */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="
            w-full p-3 rounded 
            bg-white/10 border border-white/20 
            text-white
          "
        >
          <option value="" disabled>
            Select Category
          </option>

          {INCOME_CATEGORIES.map((cat) => (
            <option key={cat} value={cat} className="text-black">
              {cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 rounded bg-white/10 border border-white/20 text-white"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-emerald-500 hover:bg-emerald-600 transition py-3 rounded-xl font-semibold"
        >
          Add Income
        </button>
      </div>
    </div>
  );
}




