/* eslint-disable no-unused-vars */

// 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
// import React, { useEffect, useState } from "react";

// const API_BASE = "http://localhost:8000/api";

// export default function VitalsPage() {
//   const user = JSON.parse(localStorage.getItem("user") || "null");
//   const token = localStorage.getItem("token");

//   const [vitals, setVitals] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const [formData, setFormData] = useState({
//     temperature: "",
//     blood_pressure_systolic: "",
//     blood_pressure_diastolic: "",
//     heart_rate: "",
//     respiratory_rate: "",
//   });

//   // ================= HEADERS =================
//   const getHeaders = () => ({
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token || ""}`,
//   });

//   // ================= NOTIFICATIONS =================
//   const showSuccess = (msg) => {
//     const el = document.createElement("div");
//     el.innerText = msg;
//     el.className =
//       "fixed top-5 right-5 z-[99999] bg-green-500 text-white px-4 py-3 rounded-xl shadow-xl";
//     document.body.appendChild(el);
//     setTimeout(() => el.remove(), 3000);
//   };

//   const showError = (msg) => {
//     const el = document.createElement("div");
//     el.innerText = msg;
//     el.className =
//       "fixed top-5 right-5 z-[99999] bg-red-500 text-white px-4 py-3 rounded-xl shadow-xl";
//     document.body.appendChild(el);
//     setTimeout(() => el.remove(), 3000);
//   };

//   // ================= FETCH =================
//   const fetchVitals = async () => {
//     try {
//       if (!user?.id) return;

//       const res = await fetch(
//         `${API_BASE}/vitalSign/user/${user.id}`,
//         { headers: getHeaders() }
//       );

//       const json = await res.json();
//       const rows = json?.data?.data ?? [];

//       const sorted = rows.sort(
//         (a, b) => new Date(b.measured_at) - new Date(a.measured_at)
//       );

//       setVitals(sorted);
//     } catch (err) {
//       showError("Failed to load data");
//     }
//   };

//   // ================= INPUT =================
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ================= VALIDATION =================
//   const validate = () => {
//     const t = parseFloat(formData.temperature);
//     const hr = parseInt(formData.heart_rate);
//     const sys = parseInt(formData.blood_pressure_systolic);
//     const dia = parseInt(formData.blood_pressure_diastolic);
//     const rr = parseInt(formData.respiratory_rate);

//     if (t < 30 || t > 43) return "Invalid temperature";
//     if (hr < 25 || hr > 220) return "Invalid heart rate";
//     if (sys <= dia) return "BP invalid";
//     if (rr < 8 || rr > 60) return "Invalid respiratory rate";

//     return null;
//   };

//   // ================= RESET FORM =================
//   const resetForm = () => {
//     setFormData({
//       temperature: "",
//       blood_pressure_systolic: "",
//       blood_pressure_diastolic: "",
//       heart_rate: "",
//       respiratory_rate: "",
//     });
//     setEditingId(null);
//     setShowForm(false);
//   };

//   // ================= SUBMIT =================
//   const handleSubmit = async () => {
//     try {
//       const error = validate();
//       if (error) return showError(error);

//       const payload = {
//         ...formData,
//         temperature: parseFloat(formData.temperature),
//         heart_rate: parseInt(formData.heart_rate),
//         blood_pressure_systolic: parseInt(formData.blood_pressure_systolic),
//         blood_pressure_diastolic: parseInt(formData.blood_pressure_diastolic),
//         respiratory_rate: parseInt(formData.respiratory_rate),
//         patient_id: user.id,
//         measured_at: new Date().toISOString(),
//       };

//       let res;

//       if (editingId) {
//         res = await fetch(`${API_BASE}/vitalSign/${editingId}`, {
//           method: "PUT",
//           headers: getHeaders(),
//           body: JSON.stringify(payload),
//         });
//       } else {
//         res = await fetch(`${API_BASE}/vitalSign`, {
//           method: "POST",
//           headers: getHeaders(),
//           body: JSON.stringify(payload),
//         });
//       }

//       if (!res.ok) throw new Error();

//       showSuccess(editingId ? "Updated successfully" : "Added successfully");

//       resetForm();
//       fetchVitals();
//     } catch {
//       showError("Operation failed");
//     }
//   };

//   // ================= EDIT =================
//   const handleEdit = (v) => {
//     setFormData({
//       temperature: v.temperature,
//       blood_pressure_systolic: v.blood_pressure_systolic,
//       blood_pressure_diastolic: v.blood_pressure_diastolic,
//       heart_rate: v.heart_rate,
//       respiratory_rate: v.respiratory_rate,
//     });

//     setEditingId(v.id);
//     setShowForm(true);
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     if (!confirm("Delete this record?")) return;

//     try {
//       const res = await fetch(`${API_BASE}/vitalSign/${id}`, {
//         method: "DELETE",
//         headers: getHeaders(),
//       });

//       if (!res.ok) throw new Error();

//       showSuccess("Deleted successfully");
//       fetchVitals();
//     } catch {
//       showError("Delete failed");
//     }
//   };

//   // ================= INIT =================
//   useEffect(() => {
//     if (!user || !token) {
//       window.location.href = "/login";
//       return;
//     }

//     fetchVitals();
//     setLoading(false);
//   }, []);

//   if (loading) return <div className="p-10">Loading...</div>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
// <h1 className="text-2xl font-bold text-blue-700 mb-4">
//         ❤️ My Vitals
//       </h1>
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-black text-white px-4 py-2 rounded-xl"
//         >
//           + Add New
//         </button>
//       </div>

//       {/* FORM */}
//       {showForm && (
//         <div className="bg-white p-5 rounded-xl mb-6 shadow">
//           <h2 className="font-bold mb-3">
//             {editingId ? "Edit Record" : "New Record"}
//           </h2>

//           <div className="grid grid-cols-2 gap-3">
//             <input name="temperature" placeholder="Temp" onChange={handleChange} value={formData.temperature} className="p-2 border rounded" />
//             <input name="heart_rate" placeholder="HR" onChange={handleChange} value={formData.heart_rate} className="p-2 border rounded" />
//             <input name="blood_pressure_systolic" placeholder="SYS" onChange={handleChange} value={formData.blood_pressure_systolic} className="p-2 border rounded" />
//             <input name="blood_pressure_diastolic" placeholder="DIA" onChange={handleChange} value={formData.blood_pressure_diastolic} className="p-2 border rounded" />
//             <input name="respiratory_rate" placeholder="RR" onChange={handleChange} value={formData.respiratory_rate} className="p-2 border rounded" />
//           </div>

//           <div className="flex gap-2 mt-4">
//             <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
//               Save
//             </button>

//             <button onClick={resetForm} className="bg-gray-400 text-white px-4 py-2 rounded">
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* CARDS */}
//       <div className="grid gap-4">
//         {vitals.map((v) => (
//           <div key={v.id} className="bg-white p-4 rounded-xl shadow">

//             <div className="flex justify-between">
//               <p className="font-bold">
//                 {new Date(v.measured_at).toLocaleString()}
//               </p>

//               <div className="flex gap-2">
//                 <button onClick={() => handleEdit(v)} className="text-blue-600">
//                   Edit
//                 </button>
//                 <button onClick={() => handleDelete(v.id)} className="text-red-600">
//                   Delete
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 mt-3 text-sm">
//               <p>Temp: {v.temperature}</p>
//               <p>HR: {v.heart_rate}</p>
//               <p>BP: {v.blood_pressure_systolic}/{v.blood_pressure_diastolic}</p>
//               <p>RR: {v.respiratory_rate}</p>
//             </div>

//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }






// 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:8000/api";

export default function VitalsPage() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    temperature: "",
    blood_pressure_systolic: "",
    blood_pressure_diastolic: "",
    heart_rate: "",
    respiratory_rate: "",
  });

  // ================= HEADERS =================
  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token || ""}`,
  });

  // ================= NOTIFICATIONS =================
  const showSuccess = (msg) => {
    const el = document.createElement("div");
    el.innerText = msg;
    el.className =
      "fixed top-5 right-5 z-[99999] bg-green-500 text-white px-4 py-3 rounded-xl shadow-xl";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  };

  const showError = (msg) => {
    const el = document.createElement("div");
    el.innerText = msg;
    el.className =
      "fixed top-5 right-5 z-[99999] bg-red-500 text-white px-4 py-3 rounded-xl shadow-xl";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  };

  // ================= FETCH =================
  const fetchVitals = async () => {
    try {
      if (!user?.id) return;

      const res = await fetch(
        `${API_BASE}/vitalSign/user/${user.id}`,
        { headers: getHeaders() }
      );

      const json = await res.json();
      const rows = json?.data?.data ?? [];

      const sorted = rows.sort(
        (a, b) => new Date(b.measured_at) - new Date(a.measured_at)
      );

      setVitals(sorted);
    } catch (err) {
      showError("Failed to load data");
    }
  };

  // ================= INPUT =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= VALIDATION =================
  const validate = () => {
    const t = parseFloat(formData.temperature);
    const hr = parseInt(formData.heart_rate);
    const sys = parseInt(formData.blood_pressure_systolic);
    const dia = parseInt(formData.blood_pressure_diastolic);
    const rr = parseInt(formData.respiratory_rate);

    if (t < 30 || t > 43) return "Invalid temperature";
    if (hr < 25 || hr > 220) return "Invalid heart rate";
    if (sys <= dia) return "BP invalid";
    if (rr < 8 || rr > 60) return "Invalid respiratory rate";

    return null;
  };

  // ================= RESET FORM =================
  const resetForm = () => {
    setFormData({
      temperature: "",
      blood_pressure_systolic: "",
      blood_pressure_diastolic: "",
      heart_rate: "",
      respiratory_rate: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      const error = validate();
      if (error) return showError(error);

      const payload = {
        ...formData,
        temperature: parseFloat(formData.temperature),
        heart_rate: parseInt(formData.heart_rate),
        blood_pressure_systolic: parseInt(formData.blood_pressure_systolic),
        blood_pressure_diastolic: parseInt(formData.blood_pressure_diastolic),
        respiratory_rate: parseInt(formData.respiratory_rate),
        patient_id: user.id,
        measured_at: new Date().toISOString(),
      };

      let res;

      if (editingId) {
        res = await fetch(`${API_BASE}/vitalSign/${editingId}`, {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE}/vitalSign`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error();

      showSuccess(editingId ? "Updated successfully" : "Added successfully");

      resetForm();
      fetchVitals();
    } catch {
      showError("Operation failed");
    }
  };

  // ================= EDIT =================
  const handleEdit = (v) => {
    setFormData({
      temperature: v.temperature,
      blood_pressure_systolic: v.blood_pressure_systolic,
      blood_pressure_diastolic: v.blood_pressure_diastolic,
      heart_rate: v.heart_rate,
      respiratory_rate: v.respiratory_rate,
    });

    setEditingId(v.id);
    setShowForm(true);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm("Delete this record?")) return;

    try {
      const res = await fetch(`${API_BASE}/vitalSign/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (!res.ok) throw new Error();

      showSuccess("Deleted successfully");
      fetchVitals();
    } catch {
      showError("Delete failed");
    }
  };

  // ================= INIT =================
  useEffect(() => {
    if (!user || !token) {
      window.location.href = "/login";
      return;
    }

    fetchVitals();
    setLoading(false);
  }, []);

  if (loading) return <div className="p-10">Loading...</div>;

 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 md:p-8">

    {/* HEADER */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          ❤️ My Vitals Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Monitor your health records in real time
        </p>
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="
          px-5 py-3 rounded-2xl
          bg-gradient-to-r from-blue-600 to-cyan-500
          text-white shadow-lg
          hover:scale-105 transition
        "
      >
        + Add New Record
      </button>

    </div>

    {/* FORM (same logic, only UI upgrade) */}
    {showForm && (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] p-4">

        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6">

          <h2 className="text-xl font-bold mb-4 text-gray-800">
            {editingId ? "Edit Record" : "New Vital Record"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            <input name="temperature" placeholder="Temperature"
              onChange={handleChange} value={formData.temperature}
              className="p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none" />

            <input name="heart_rate" placeholder="Heart Rate"
              onChange={handleChange} value={formData.heart_rate}
              className="p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none" />

            <input name="blood_pressure_systolic" placeholder="Systolic BP"
              onChange={handleChange} value={formData.blood_pressure_systolic}
              className="p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none" />

            <input name="blood_pressure_diastolic" placeholder="Diastolic BP"
              onChange={handleChange} value={formData.blood_pressure_diastolic}
              className="p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none" />

            <input name="respiratory_rate" placeholder="Respiratory Rate"
              onChange={handleChange} value={formData.respiratory_rate}
              className="p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none md:col-span-2" />

          </div>

          <div className="flex justify-end gap-3 mt-6">

            <button
              onClick={resetForm}
              className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-xl bg-green-600 text-white hover:scale-105 transition"
            >
              Save
            </button>

          </div>

        </div>
      </div>
    )}

    {/* CARDS GRID */}
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

      {vitals.map((v) => (
        <div
          key={v.id}
          className="
            bg-white rounded-2xl shadow-md
            border border-gray-100
            p-5
            hover:shadow-xl hover:scale-[1.02]
            transition-all duration-300
          "
        >

          {/* TOP */}
          <div className="flex justify-between items-center mb-4">

            <p className="text-sm font-semibold text-gray-700">
              {new Date(v.measured_at).toLocaleString()}
            </p>

            <div className="flex gap-3 text-sm">

              <button
                onClick={() => handleEdit(v)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(v.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>

            </div>

          </div>

          {/* DATA */}
          <div className="grid grid-cols-2 gap-3 text-sm">

            <div className="bg-gray-50 p-3 rounded-xl">
              🌡 Temp <div className="font-bold">{v.temperature}</div>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl">
              ❤️ HR <div className="font-bold">{v.heart_rate}</div>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl">
              🩸 BP <div className="font-bold">
                {v.blood_pressure_systolic}/{v.blood_pressure_diastolic}
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl">
              🌬 RR <div className="font-bold">{v.respiratory_rate}</div>
            </div>

          </div>

        </div>
      ))}

    </div>

  </div>
);
}