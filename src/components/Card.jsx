export default function Card({ title, amount, icon, color }) {
  return (
    <div
      className={`p-6 rounded-2xl shadow-xl bg-gradient-to-br ${color} text-white flex justify-between items-center`}
    >
      <div>
        <h3 className="text-lg opacity-80">{title}</h3>
        <p className="text-2xl font-bold mt-2">{amount}</p>
      </div>
      <div className="opacity-80">{icon}</div>
    </div>
  );
}


