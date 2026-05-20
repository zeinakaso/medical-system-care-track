import { useState } from "react";

const API_BASE = "http://127.0.0.1:8000/api";

export default function PatientCard({ patient }) {
  const [vitals, setVitals] = useState([]);
  const [plans, setPlans] = useState([]);
  const [mode, setMode] = useState(null);

  const token = localStorage.getItem("token");

  async function loadVitals() {
    const res = await fetch(
      `${API_BASE}/vitalSign?patient_name=${patient.user_name}`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await res.json();
    setVitals(data.data || []);
    setMode("vitals");
  }

  async function loadPlans() {
    const res = await fetch(
      `${API_BASE}/treatment-plan/patient/${patient.id}`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await res.json();
    setPlans(data.data?.data || []);
    setMode("plans");
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">
        {patient.user_name}
      </h3>

      <div className="text-gray-600 text-sm mb-3">
        Gender: {patient.gender} | Blood: {patient.blood_clique}
      </div>

      <div className="flex gap-2 mb-3">
        <button onClick={loadVitals} className="px-3 py-1 bg-blue-500 text-white rounded">
          Vitals
        </button>

        <button onClick={loadPlans} className="px-3 py-1 bg-green-500 text-white rounded">
          Plans
        </button>
      </div>

      {/* VITALS */}
      {mode === "vitals" && (
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th>Date</th>
              <th>Temp</th>
              <th>Heart</th>
              <th>BP</th>
            </tr>
          </thead>
          <tbody>
            {vitals.map((v) => (
              <tr key={v.id}>
                <td>{v.measured_at}</td>
                <td>{v.temperature}</td>
                <td>{v.heart_rate}</td>
                <td>
                  {v.blood_pressure_systolic}/
                  {v.blood_pressure_diastolic}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* PLANS */}
      {mode === "plans" && (
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th>Diagnosis</th>
              <th>Medications</th>
              <th>Period</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((p) => (
              <tr key={p.id}>
                <td>{p.diagnosis}</td>
                <td>{p.medications}</td>
                <td>
                  {p.start_date} → {p.end_date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}



// 2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222



