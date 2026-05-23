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

//  return (
//   <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 md:p-8">

//     {/* HEADER */}
//     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

//       <div>
//         <h1 className="text-3xl font-bold text-gray-800">
//           ❤️ My Vitals Dashboard
//         </h1>
//         <p className="text-gray-500 text-sm mt-1">
//           Monitor your health records in real time
//         </p>
//       </div>

//       <button
//         onClick={() => setShowForm(true)}
//         className="
//           px-5 py-3 rounded-2xl
//           bg-gradient-to-r from-blue-600 to-cyan-500
//           text-white shadow-lg
//           hover:scale-105 transition
//         "
//       >
//         + Add New Record
//       </button>

//     </div>

//     {/* FORM (same logic, only UI upgrade) */}
//     {showForm && (
//       <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] p-4">

//         <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6">

//           <h2 className="text-xl font-bold mb-4 text-gray-800">
//             {editingId ? "Edit Record" : "New Vital Record"}
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

//             <input name="temperature" placeholder="Temperature"
//               onChange={handleChange} value={formData.temperature}
//               className="p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none" />

//             <input name="heart_rate" placeholder="Heart Rate"
//               onChange={handleChange} value={formData.heart_rate}
//               className="p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none" />

//             <input name="blood_pressure_systolic" placeholder="Systolic BP"
//               onChange={handleChange} value={formData.blood_pressure_systolic}
//               className="p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none" />

//             <input name="blood_pressure_diastolic" placeholder="Diastolic BP"
//               onChange={handleChange} value={formData.blood_pressure_diastolic}
//               className="p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none" />

//             <input name="respiratory_rate" placeholder="Respiratory Rate"
//               onChange={handleChange} value={formData.respiratory_rate}
//               className="p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none md:col-span-2" />

//           </div>

//           <div className="flex justify-end gap-3 mt-6">

//             <button
//               onClick={resetForm}
//               className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
//             >
//               Cancel
//             </button>

//             <button
//               onClick={handleSubmit}
//               className="px-5 py-2 rounded-xl bg-green-600 text-white hover:scale-105 transition"
//             >
//               Save
//             </button>

//           </div>

//         </div>
//       </div>
//     )}




//     {/* CARDS GRID */}
//     <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

//       {vitals.map((v) => (
//         <div
//           key={v.id}
//           className="
//             bg-white rounded-2xl shadow-md
//             border border-gray-100
//             p-5
//             hover:shadow-xl hover:scale-[1.02]
//             transition-all duration-300
//           "
//         >

//           {/* TOP */}
//           <div className="flex justify-between items-center mb-4">

//             <p className="text-sm font-semibold text-gray-700">
//               {new Date(v.measured_at).toLocaleString()}
//             </p>

//             <div className="flex gap-3 text-sm">

//               <button
//                 onClick={() => handleEdit(v)}
//                 className="text-blue-600 hover:underline"
//               >
//                 Edit
//               </button>

//               <button
//                 onClick={() => handleDelete(v.id)}
//                 className="text-red-500 hover:underline"
//               >
//                 Delete
//               </button>

//             </div>

//           </div>

//           {/* DATA */}
//           <div className="grid grid-cols-2 gap-3 text-sm">

//             <div className="bg-gray-50 p-3 rounded-xl">
//               🌡 Temp <div className="font-bold">{v.temperature}</div>
//             </div>

//             <div className="bg-gray-50 p-3 rounded-xl">
//               ❤️ HR <div className="font-bold">{v.heart_rate}</div>
//             </div>

//             <div className="bg-gray-50 p-3 rounded-xl">
//               🩸 BP <div className="font-bold">
//                 {v.blood_pressure_systolic}/{v.blood_pressure_diastolic}
//               </div>
//             </div>

//             <div className="bg-gray-50 p-3 rounded-xl">
//               🌬 RR <div className="font-bold">{v.respiratory_rate}</div>
//             </div>

//           </div>

//         </div>
//       ))}

//     </div>

//   </div>
// );
// }



// 33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:8000/api";

export default function VitalsPage() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [toast, setToast] = useState(null);

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

  // ================= TOAST =================
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });

    setTimeout(() => {
      setToast(null);
    }, 3500);
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
      showToast("Failed to load data", "error");
    }
  };

  // ================= INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

  // ================= RESET =================
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

      if (error) {
        return showToast(error, "error");
      }

      const payload = {
        ...formData,
        temperature: parseFloat(formData.temperature),
        heart_rate: parseInt(formData.heart_rate),
        blood_pressure_systolic: parseInt(
          formData.blood_pressure_systolic
        ),
        blood_pressure_diastolic: parseInt(
          formData.blood_pressure_diastolic
        ),
        respiratory_rate: parseInt(
          formData.respiratory_rate
        ),
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

      showToast(
        editingId
          ? "Vitals updated successfully"
          : "New record added successfully",
        "success"
      );

      resetForm();
      fetchVitals();

    } catch {
      showToast("Operation failed", "error");
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

      showToast("Record deleted", "success");
      fetchVitals();

    } catch {
      showToast("Delete failed", "error");
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

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-100 p-4 md:p-8">

      {/* ================= TOAST ================= */}
      {toast && (
        <div
          className={`
            fixed bottom-5 right-5 z-[99999]
            min-w-[320px]
            rounded-2xl
            px-5 py-4
            shadow-2xl
            backdrop-blur-xl
            border
            animate-[fadeIn_.3s_ease]
            flex items-start gap-4

            ${
              toast.type === "success"
                ? "bg-emerald-500/95 border-emerald-300 text-white"
                : "bg-red-500/95 border-red-300 text-white"
            }
          `}
        >
          <div className="text-2xl">
            {toast.type === "success" ? "✅" : "⚠️"}
          </div>

          <div className="flex-1">
            <div className="font-bold text-sm">
              {toast.type === "success"
                ? "Success"
                : "Error"}
            </div>

            <div className="text-sm opacity-90 mt-1">
              {toast.msg}
            </div>
          </div>
        </div>
      )}

      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold mb-4">
            ❤️ Health Monitoring
          </div>

          <h1 className="text-4xl font-black text-slate-800">
            My Vitals Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Track and manage your health records professionally.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="
            px-6 py-4 rounded-2xl
            bg-gradient-to-r from-sky-600 to-cyan-500
            hover:from-sky-700 hover:to-cyan-600
            text-white font-bold
            shadow-[0_15px_40px_-10px_rgba(14,165,233,0.5)]
            hover:scale-105
            transition-all duration-300
          "
        >
          + Add New Record
        </button>
      </div>

      {/* ================= MODAL ================= */}
      {showForm && (
        <div className="fixed inset-0 z-[999] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">

          <div
            className="
              relative
              w-full
              max-w-2xl
              rounded-[32px]
              overflow-hidden
              bg-white/95
              border border-white/60
              shadow-[0_30px_90px_-20px_rgba(0,0,0,0.3)]
              animate-[fadeIn_.25s_ease]
            "
          >

            {/* GLOW */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-20 w-72 h-72 bg-cyan-100/40 rounded-full blur-3xl"></div>

            {/* TOP BAR */}
            <div className="h-1.5 bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500" />

            {/* HEADER */}
            <div className="relative z-10 px-7 pt-7 pb-5 flex items-start justify-between">

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold mb-4">
                  🩺 Vital Management
                </div>

                <h2 className="text-3xl font-black text-slate-800">
                  {editingId
                    ? "Edit Vital Record"
                    : "Add New Record"}
                </h2>

                <p className="text-slate-500 text-sm mt-2">
                  Enter your latest health measurements.
                </p>
              </div>

              <button
                onClick={resetForm}
                className="
                  w-11 h-11 rounded-2xl
                  bg-slate-100
                  hover:bg-red-50
                  hover:text-red-500
                  text-slate-500
                  transition
                  flex items-center justify-center
                  text-lg
                "
              >
                ✕
              </button>
            </div>

            {/* FORM */}
            <div className="relative z-10 px-7 pb-7">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* TEMP */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    🌡 Temperature
                  </label>

                  <input
                    name="temperature"
                    placeholder="36.5"
                    onChange={handleChange}
                    value={formData.temperature}
                    className="
                      w-full
                      rounded-2xl
                      border border-slate-200
                      bg-slate-50/80
                      px-5 py-4
                      text-sm
                      shadow-sm
                      focus:outline-none
                      focus:ring-4
                      focus:ring-sky-100
                      focus:border-sky-400
                      transition-all
                    "
                  />
                </div>

                {/* HEART */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    ❤️ Heart Rate
                  </label>

                  <input
                    name="heart_rate"
                    placeholder="80 BPM"
                    onChange={handleChange}
                    value={formData.heart_rate}
                    className="
                      w-full
                      rounded-2xl
                      border border-slate-200
                      bg-slate-50/80
                      px-5 py-4
                      text-sm
                      shadow-sm
                      focus:outline-none
                      focus:ring-4
                      focus:ring-sky-100
                      focus:border-sky-400
                      transition-all
                    "
                  />
                </div>

                {/* SYS */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    🩸 Systolic BP
                  </label>

                  <input
                    name="blood_pressure_systolic"
                    placeholder="120"
                    onChange={handleChange}
                    value={formData.blood_pressure_systolic}
                    className="
                      w-full
                      rounded-2xl
                      border border-slate-200
                      bg-slate-50/80
                      px-5 py-4
                      text-sm
                      shadow-sm
                      focus:outline-none
                      focus:ring-4
                      focus:ring-sky-100
                      focus:border-sky-400
                      transition-all
                    "
                  />
                </div>

                {/* DIA */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    💉 Diastolic BP
                  </label>

                  <input
                    name="blood_pressure_diastolic"
                    placeholder="80"
                    onChange={handleChange}
                    value={formData.blood_pressure_diastolic}
                    className="
                      w-full
                      rounded-2xl
                      border border-slate-200
                      bg-slate-50/80
                      px-5 py-4
                      text-sm
                      shadow-sm
                      focus:outline-none
                      focus:ring-4
                      focus:ring-sky-100
                      focus:border-sky-400
                      transition-all
                    "
                  />
                </div>

                {/* RR */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">
                    🌬 Respiratory Rate
                  </label>

                  <input
                    name="respiratory_rate"
                    placeholder="16"
                    onChange={handleChange}
                    value={formData.respiratory_rate}
                    className="
                      w-full
                      rounded-2xl
                      border border-slate-200
                      bg-slate-50/80
                      px-5 py-4
                      text-sm
                      shadow-sm
                      focus:outline-none
                      focus:ring-4
                      focus:ring-sky-100
                      focus:border-sky-400
                      transition-all
                    "
                  />
                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-4 mt-8">

                <button
                  onClick={resetForm}
                  className="
                    px-6 py-3 rounded-2xl
                    bg-slate-100 hover:bg-slate-200
                    text-slate-700 font-semibold
                    transition
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="
                    px-7 py-3 rounded-2xl
                    bg-gradient-to-r from-sky-500 to-cyan-500
                    hover:from-sky-600 hover:to-cyan-600
                    text-white font-bold
                    shadow-lg shadow-cyan-200/60
                    hover:scale-105
                    transition-all duration-300
                  "
                >
                  {editingId ? "Update Record" : "Save Record"}
                </button>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CARDS ================= */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {vitals.map((v) => (
          <div
            key={v.id}
            className="
              relative overflow-hidden
              bg-white/80 backdrop-blur-xl
              rounded-[28px]
              border border-white/70
              shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]
              p-6
              hover:-translate-y-1
              hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.2)]
              transition-all duration-300
            "
          >

            {/* GLOW */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-sky-100/40 blur-3xl rounded-full"></div>

            {/* TOP */}
            <div className="relative z-10 flex items-start justify-between mb-5">

              <div>
                {/* <div className="text-xs font-semibold text-sky-600 uppercase tracking-wider">
                  Health Record
                </div> */}

                <p className="text-sm text-slate-500 mt-1">
                  {new Date(v.measured_at).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2">

                <button
                  onClick={() => handleEdit(v)}
                  className="
                    px-3 py-1.5 rounded-xl
                    bg-blue-50 hover:bg-blue-100
                    text-blue-600 text-xs font-semibold
                    transition
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(v.id)}
                  className="
                    px-3 py-1.5 rounded-xl
                    bg-red-50 hover:bg-red-100
                    text-red-500 text-xs font-semibold
                    transition
                  "
                >
                  Delete
                </button>

              </div>
            </div>

            {/* DATA */}
            <div className="relative z-10 grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xs text-slate-500 mb-1">
                  🌡 Temperature
                </div>

                <div className="text-xl font-black text-slate-800">
                  {v.temperature}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xs text-slate-500 mb-1">
                  ❤️ Heart Rate
                </div>

                <div className="text-xl font-black text-slate-800">
                  {v.heart_rate}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xs text-slate-500 mb-1">
                  🩸 Blood Pressure
                </div>

                <div className="text-xl font-black text-slate-800">
                  {v.blood_pressure_systolic}/
                  {v.blood_pressure_diastolic}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xs text-slate-500 mb-1">
                  🌬 Respiratory
                </div>

                <div className="text-xl font-black text-slate-800">
                  {v.respiratory_rate}
                </div>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}