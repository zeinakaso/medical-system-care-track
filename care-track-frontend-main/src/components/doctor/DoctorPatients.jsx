import { useEffect, useState } from "react";
import PatientCard from "../component/patientcard";
const API_BASE = "http://127.0.0.1:8000/api";

export default function DoctorPatients() {
  const [patients, setPatients] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadPatients();
  }, []);

  async function loadPatients() {
    try {
      const res = await fetch(`${API_BASE}/doctor/patients`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();
      setPatients(data.data || []);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Patients</h2>

      {patients.map((p) => (
        <PatientCard key={p.id} patient={p} />
      ))}
    </div>
  );
}