import React from "react";

export default function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 text-center">
      <div className={`text-3xl mb-2 ${color}`}>{icon}</div>
      <h4 className="text-gray-600 text-sm">{title}</h4>
      <p className="text-2xl font-bold text-blue-700">{value}</p>
    </div>
  );
}
