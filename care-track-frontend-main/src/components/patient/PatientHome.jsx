// 111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111

// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

// const API_BASE = "http://localhost:8000/api";

// export default function PatientDashboard() {
//   const user = JSON.parse(localStorage.getItem("user") || "null");
//   const token = localStorage.getItem("token");

//   const [latest, setLatest] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ================= EDIT STATE =================
//   const [editingId, setEditingId] = useState(null);

//   const [formData, setFormData] = useState({
//     temperature: "",
//     blood_pressure_systolic: "",
//     blood_pressure_diastolic: "",
//     heart_rate: "",
//     respiratory_rate: "",
//   });

//   const getHeaders = () => ({
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token || ""}`,
//   });

//   // ================= NOTIFICATIONS =================
//   const showSuccess = (msg) => {
//     const el = document.createElement("div");
//     el.innerText = msg;

//     el.className =
//       "fixed top-5 right-5 z-[99999] bg-green-500 text-white px-4 py-3 rounded-xl shadow-2xl";

//     document.body.appendChild(el);

//     setTimeout(() => el.remove(), 3000);
//   };

//   const showError = (msg) => {
//     const el = document.createElement("div");
//     el.innerText = msg;

//     el.className =
//       "fixed top-5 right-5 z-[99999] bg-red-500 text-white px-4 py-3 rounded-xl shadow-2xl";

//     document.body.appendChild(el);

//     setTimeout(() => el.remove(), 3000);
//   };

//   // ================= INPUT =================
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ================= VALIDATION =================
//   const validateVitals = () => {
//     const t = parseFloat(formData.temperature);
//     const hr = parseInt(formData.heart_rate);
//     const sys = parseInt(formData.blood_pressure_systolic);
//     const dia = parseInt(formData.blood_pressure_diastolic);
//     const rr = parseInt(formData.respiratory_rate);

//     if (t < 30 || t > 43)
//       return "Temperature out of safe range (30–43°C)";

//     if (hr < 25 || hr > 220)
//       return "Heart rate out of safe range (25–220 bpm)";

//     if (sys < 60 || sys > 250)
//       return "Systolic pressure out of safe range";

//     if (dia < 30 || dia > 150)
//       return "Diastolic pressure out of safe range";

//     if (sys <= dia)
//       return "Systolic must be higher than diastolic";

//     if (rr < 8 || rr > 60)
//       return "Respiratory rate out of safe range (8–60)";

//     return null;
//   };

//   // ================= FETCH VITALS =================
//   const fetchVitals = async () => {
//     try {
//       if (!user?.id) return;

//       const res = await fetch(
//         `${API_BASE}/vitalSign/user/${user.id}`,
//         { headers: getHeaders() }
//       );

//       const json = await res.json();
//       const rows = json?.data?.data ?? [];

//       const sorted = [...rows].sort(
//         (a, b) => new Date(b.measured_at) - new Date(a.measured_at)
//       );

//       setLatest(sorted[0] || null);
//       setHistory(sorted.slice(0, 10));

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ================= FETCH PLANS =================
//   const fetchPlans = async () => {
//     try {
//       const res = await fetch(
//         `${API_BASE}/treatment-plan/user/${user.id}`,
//         { headers: getHeaders() }
//       );

//       const json = await res.json();
//       setPlans(json?.data?.data ?? []);

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ================= SUBMIT =================
//   const submitVital = async () => {
//     try {
//       const error = validateVitals();
//       if (error) return showError(error);

//       const payload = {
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

//       if (!res.ok) throw new Error("Request failed");

//       setFormData({
//         temperature: "",
//         blood_pressure_systolic: "",
//         blood_pressure_diastolic: "",
//         heart_rate: "",
//         respiratory_rate: "",
//       });

//       setEditingId(null);

//       showSuccess(
//         editingId ? "Vital updated successfully" : "Vital added successfully"
//       );

//       await fetchVitals();

//     } catch (err) {
//       showError(err.message);
//     }
//   };

//   // ================= EDIT =================
//   const handleEdit = (v) => {
//     setEditingId(v.id);

//     setFormData({
//       temperature: v.temperature || "",
//       blood_pressure_systolic: v.blood_pressure_systolic || "",
//       blood_pressure_diastolic: v.blood_pressure_diastolic || "",
//       heart_rate: v.heart_rate || "",
//       respiratory_rate: v.respiratory_rate || "",
//     });

//     setTimeout(() => {
//       document.querySelector(".form-box")?.scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//     }, 100);
//   };

//   // ================= CANCEL EDIT =================
//   const cancelEdit = () => {
//     setEditingId(null);

//     setFormData({
//       temperature: "",
//       blood_pressure_systolic: "",
//       blood_pressure_diastolic: "",
//       heart_rate: "",
//       respiratory_rate: "",
//     });
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this record?"))
//       return;

//     try {
//       const res = await fetch(`${API_BASE}/vitalSign/${id}`, {
//         method: "DELETE",
//         headers: getHeaders(),
//       });

//       if (!res.ok) throw new Error("Delete failed");

//       showSuccess("Vital deleted successfully");

//       await fetchVitals();

//     } catch (err) {
//       showError(err.message);
//     }
//   };

//   // ================= INIT =================
//   useEffect(() => {
//     if (!user || !token) {
//       window.location.href = "/login";
//       return;
//     }

//     (async () => {
//       setLoading(true);
//       await fetchVitals();
//       await fetchPlans();
//       setLoading(false);
//     })();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f5f5f5] p-6">

//       {/* HEADER */}
//      <div className="mb-6">
//   <h2 className="text-3xl font-bold">
//     Welcome {user?.name} 👋
//   </h2>

//   <p className="text-sm text-gray-500 mt-1">
//     Here you can view your vital signs, track your health history, and follow your treatment plans.
//   </p>
// </div>
//       {/* SUMMARY */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

//         <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
//           <p className="text-gray-500">Temp</p>
//           <h3 className="text-2xl font-bold">{latest?.temperature ?? "--"}</h3>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
//           <p className="text-gray-500">BP</p>
//           <h3 className="text-2xl font-bold">
//             {latest?.blood_pressure_systolic ?? "--"}/
//             {latest?.blood_pressure_diastolic ?? "--"}
//           </h3>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
//           <p className="text-gray-500">HR</p>
//           <h3 className="text-2xl font-bold">{latest?.heart_rate ?? "--"}</h3>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
//           <p className="text-gray-500">RR</p>
//           <h3 className="text-2xl font-bold">{latest?.respiratory_rate ?? "--"}</h3>
//         </div>

//       </div>

//       {/* FORM */}
//       <div className={`form-box p-6 rounded-2xl shadow-sm mb-8 transition-all duration-300 relative
//         ${editingId
//           ? "bg-gradient-to-br from-blue-50 to-white border-2 border-blue-400 shadow-blue-200 shadow-lg scale-[1.02]"
//           : "bg-white border border-gray-200"
//         }`}>

//         {editingId && (
//           <div className="mb-3 inline-flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm shadow">
//             ✏️ Editing Mode Active
//           </div>
//         )}

//         <h3 className="text-lg font-bold mb-4">
//           {editingId ? "Edit Vital" : "Add Vital"}
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//           <input name="temperature" value={formData.temperature} onChange={handleChange} className="p-3 border rounded-xl" placeholder="Temperature" />
//           <input name="blood_pressure_systolic" value={formData.blood_pressure_systolic} onChange={handleChange} className="p-3 border rounded-xl" placeholder="Systolic" />
//           <input name="blood_pressure_diastolic" value={formData.blood_pressure_diastolic} onChange={handleChange} className="p-3 border rounded-xl" placeholder="Diastolic" />
//           <input name="heart_rate" value={formData.heart_rate} onChange={handleChange} className="p-3 border rounded-xl" placeholder="Heart Rate" />
//           <input name="respiratory_rate" value={formData.respiratory_rate} onChange={handleChange} className="p-3 border rounded-xl" placeholder="Resp Rate" />

//         </div>

//         <div className="flex gap-3 mt-5">

//           <button
//             onClick={submitVital}
//             className="px-6 py-3 bg-black text-white rounded-xl"
//           >
//             {editingId ? "Update Vital" : "Submit"}
//           </button>

//           {editingId && (
//             <button
//               onClick={cancelEdit}
//               className="px-6 py-3 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//           )}

//         </div>

//       </div>

//       {/* HISTORY */}
//       <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">

//         <h3 className="text-lg font-bold mb-4">Vitals History</h3>

//         <Swiper slidesPerView={3} spaceBetween={15}>
//           {history.map((v) => (
//             <SwiperSlide key={v.id}>
//               <div className="p-4 border rounded-xl text-center bg-gray-50">

//                 <p className="font-bold mb-2">
//                   {new Date(v.measured_at).toLocaleString()}
//                 </p>

//                 <p>Temp: {v.temperature}</p>
//                 <p>HR: {v.heart_rate}</p>
//                 <p>RR: {v.respiratory_rate}</p>
//                 <p>BP: {v.blood_pressure_systolic}/{v.blood_pressure_diastolic}</p>

//                 <div className="flex gap-2 justify-center mt-3">

//                   <button
//                     onClick={() => handleEdit(v)}
//                     className="px-3 py-1 bg-blue-500 text-white rounded-lg"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => handleDelete(v.id)}
//                     className="px-3 py-1 bg-red-500 text-white rounded-lg"
//                   >
//                     Delete
//                   </button>

//                 </div>

//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//       </div>
// {/* TREATMENT PLANS */}
// <div className="bg-white p-6 rounded-2xl shadow-sm">
//   <h3 className="text-lg font-bold mb-4">Treatment Plans</h3>

//   {plans.map((p) => {
//     const isExpired =
//       p.end_date && new Date(p.end_date) < new Date();

//     return (
//       <div
//         key={p.id}
//         className={`p-4 border rounded-xl mb-3 transition-all duration-300 relative
//           ${isExpired
//             ? "bg-red-50 border-red-400 shadow-red-100"
//             : "bg-white"
//           }`}
//       >
//         {/* BADGE EXPIRED */}
//         {isExpired && (
//           <div className="absolute top-3 right-3">
//             <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow">
//               Expired Plan
//             </span>
//           </div>
//         )}

//         <p><b>Diagnosis:</b> {p.diagnosis}</p>
//         <p><b>Medications:</b> {p.medications}</p>
//         <p><b>Instructions:</b> {p.instructions}</p>

//         <p><b>Start Date:</b> {p.start_date || "--"}</p>
//         <p><b>End Date:</b> {p.end_date || "--"}</p>
//       </div>
//     );
//   })}
// </div>
//     </div>
//   );
// }



// 222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222



import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const API_BASE = "http://localhost:8000/api";

export default function PatientDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= EDIT STATE =================
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    temperature: "",
    blood_pressure_systolic: "",
    blood_pressure_diastolic: "",
    heart_rate: "",
    respiratory_rate: "",
  });

  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token || ""}`,
  });

  // ================= NOTIFICATIONS =================
  // const showSuccess = (msg) => {
  //   const el = document.createElement("div");
  //   el.innerText = msg;

  //   el.className =
  //     "fixed top-5 right-5 z-[99999] bg-green-500 text-white px-4 py-3 rounded-xl shadow-2xl";

  //   document.body.appendChild(el);

  //   setTimeout(() => el.remove(), 3000);
  // };

  // const showError = (msg) => {
  //   const el = document.createElement("div");
  //   el.innerText = msg;

  //   el.className =
  //     "fixed top-5 right-5 z-[99999] bg-red-500 text-white px-4 py-3 rounded-xl shadow-2xl";

  //   document.body.appendChild(el);

  //   setTimeout(() => el.remove(), 3000);
  // };
// ================= PREMIUM NOTIFICATIONS =================
const createToast = (msg, type = "success") => {
  const toast = document.createElement("div");

  toast.className = `
    fixed bottom-5 right-5 z-[99999]
    overflow-hidden
    min-w-[180px]
max-w-[280px]
    rounded-3xl
    border border-white/30
    backdrop-blur-2xl
    shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)]
    px-4 py-3
    flex items-start gap-4
    animate-[slideUp_.45s_ease]
    ${
      type === "success"
        ? "bg-gradient-to-br from-emerald-500/95 to-green-400/90 text-white"
        : "bg-gradient-to-br from-red-500/95 to-rose-400/90 text-white"
    }
  `;

  toast.innerHTML = `
    <div class="text-xl mt-0.5">
      ${type === "success" ? "✅" : "❌"}
    </div>

    <div class="flex-1">
      <div class="font-bold text-[13px] mb-0.5">
        ${type === "success" ? "Success" : "Error"}
      </div>

      <div class="text-[12px] opacity-90 leading-snug">
        ${msg}
      </div>
    </div>

    <button
      class="text-white/80 hover:text-white text-lg"
      onclick="this.parentElement.remove()"
    >
      ✕
    </button>

    <div class="absolute bottom-0 left-0 h-1 w-full bg-white/20 overflow-hidden">
      <div
        class="h-full ${
          type === "success"
            ? "bg-emerald-200"
            : "bg-rose-200"
        } animate-[progress_3s_linear]"
      ></div>
    </div>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";

    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

const showSuccess = (msg) => createToast(msg, "success");

const showError = (msg) => createToast(msg, "error");





  // ================= INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= VALIDATION =================
  const validateVitals = () => {
    const t = parseFloat(formData.temperature);
    const hr = parseInt(formData.heart_rate);
    const sys = parseInt(formData.blood_pressure_systolic);
    const dia = parseInt(formData.blood_pressure_diastolic);
    const rr = parseInt(formData.respiratory_rate);

    if (t < 30 || t > 43)
      return "Temperature out of safe range (30–43°C)";

    if (hr < 25 || hr > 220)
      return "Heart rate out of safe range (25–220 bpm)";

    if (sys < 60 || sys > 250)
      return "Systolic pressure out of safe range";

    if (dia < 30 || dia > 150)
      return "Diastolic pressure out of safe range";

    if (sys <= dia)
      return "Systolic must be higher than diastolic";

    if (rr < 8 || rr > 60)
      return "Respiratory rate out of safe range (8–60)";

    return null;
  };

  // ================= FETCH VITALS =================
  const fetchVitals = async () => {
    try {
      if (!user?.id) return;

      const res = await fetch(
        `${API_BASE}/vitalSign/user/${user.id}`,
        { headers: getHeaders() }
      );

      const json = await res.json();
      const rows = json?.data?.data ?? [];

      const sorted = [...rows].sort(
        (a, b) => new Date(b.measured_at) - new Date(a.measured_at)
      );

      setLatest(sorted[0] || null);
      setHistory(sorted.slice(0, 10));

    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH PLANS =================
  const fetchPlans = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/treatment-plan/user/${user.id}`,
        { headers: getHeaders() }
      );

      const json = await res.json();
      setPlans(json?.data?.data ?? []);

    } catch (err) {
      console.error(err);
    }
  };

  // ================= SUBMIT =================
  const submitVital = async () => {
    try {
      const error = validateVitals();
      if (error) return showError(error);

      const payload = {
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

      if (!res.ok) throw new Error("Request failed");

      setFormData({
        temperature: "",
        blood_pressure_systolic: "",
        blood_pressure_diastolic: "",
        heart_rate: "",
        respiratory_rate: "",
      });

      setEditingId(null);

      showSuccess(
        editingId ? "Vital updated successfully" : "Vital added successfully"
      );

      await fetchVitals();

    } catch (err) {
      showError(err.message);
    }
  };

  // ================= EDIT =================
  const handleEdit = (v) => {
    setEditingId(v.id);

    setFormData({
      temperature: v.temperature || "",
      blood_pressure_systolic: v.blood_pressure_systolic || "",
      blood_pressure_diastolic: v.blood_pressure_diastolic || "",
      heart_rate: v.heart_rate || "",
      respiratory_rate: v.respiratory_rate || "",
    });

    setTimeout(() => {
      document.querySelector(".form-box")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  // ================= CANCEL EDIT =================
  const cancelEdit = () => {
    setEditingId(null);

    setFormData({
      temperature: "",
      blood_pressure_systolic: "",
      blood_pressure_diastolic: "",
      heart_rate: "",
      respiratory_rate: "",
    });
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this record?"))
      return;

    try {
      const res = await fetch(`${API_BASE}/vitalSign/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (!res.ok) throw new Error("Delete failed");

      showSuccess("Vital deleted successfully");

      await fetchVitals();

    } catch (err) {
      showError(err.message);
    }
  };

  // ================= INIT =================
  useEffect(() => {
    if (!user || !token) {
      window.location.href = "/login";
      return;
    }

    (async () => {
      setLoading(true);
      await fetchVitals();
      await fetchPlans();
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

return (
  <div className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-sky-100 to-indigo-100 relative">

    {/* BACKGROUND EFFECTS */}
    <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-blue-300/30 rounded-full blur-[120px] animate-pulse"></div>

    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-300/30 rounded-full blur-[120px] animate-pulse"></div>

    <div className="relative z-10 p-4 md:p-8">

      {/* HEADER */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div className="animate-[fadeIn_0.7s_ease]">
          <h2 className="text-3xl md:text-3xl font-black text-gray-800 leading-tight">
            Welcome{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {user?.name}
            </span>{" "}
            👋
          </h2>

          <p className="text-gray-500 mt-3 text-base md:text-lg">
            Smart clinical monitoring dashboard
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3 bg-white/60 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-lg border border-white/40">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-ping"></div>

          <p className="text-sm font-medium text-gray-700">
            Real-time Monitoring Active
          </p>
        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

        {[
          {
            title: "Temperature",
            value: latest?.temperature ?? "--",
            unit: "°C",
            icon: "🌡️",
            color: "from-blue-500 to-cyan-400",
          },

          {
            title: "Blood Pressure",
            value: `${latest?.blood_pressure_systolic ?? "--"}/${latest?.blood_pressure_diastolic ?? "--"}`,
            unit: "",
            icon: "🩸",
            color: "from-indigo-500 to-blue-500",
          },

          {
            title: "Heart Rate",
            value: latest?.heart_rate ?? "--",
            unit: "BPM",
            icon: "❤️",
            color: "from-cyan-500 to-sky-500",
          },

          {
            title: "Respiration",
            value: latest?.respiratory_rate ?? "--",
            unit: "RPM",
            icon: "🫁",
            color: "from-sky-500 to-indigo-400",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              p-5
              bg-white/70
              backdrop-blur-2xl
              border border-white/40
              shadow-xl
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all duration-500
            "
          >

            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-20 rounded-full blur-3xl`} />

            <div className="relative z-10">

              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">
                  {item.icon}
                </span>

                <div className={`px-3 py-1 rounded-full text-xs text-white bg-gradient-to-r ${item.color}`}>
                  Live
                </div>
              </div>

              <p className="text-gray-500 text-sm">
                {item.title}
              </p>

              <h3 className="text-2xl font-black text-gray-800 mt-2">
                {item.value}

                <span className="text-sm ml-1 text-gray-500 font-medium">
                  {item.unit}
                </span>
              </h3>

            </div>

          </div>
        ))}

      </div>

      {/* FORM */}
      <div
        className={`
          form-box
          relative
          overflow-hidden
          rounded-[35px]
          p-[1px]
          mb-10
          bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500
          shadow-2xl
          animate-[fadeIn_0.8s_ease]
        `}
      >

        <div className="bg-white/80 backdrop-blur-2xl rounded-[35px] p-5 md:p-8">

          {/* TOP BAR */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-7">

            <div>
              <h3 className="text-xl font-black text-gray-800">
                {editingId ? "Edit Vital Record" : "Add New Vital"}
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                Fill patient clinical measurements
              </p>
            </div>

            {editingId && (
              <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold shadow">
                ✏️ Editing Mode
              </div>
            )}

          </div>

          {/* INPUTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {[
              ["temperature", "🌡️ Temperature"],
              ["blood_pressure_systolic", "🩸 Systolic Pressure"],
              ["blood_pressure_diastolic", "💉 Diastolic Pressure"],
              ["heart_rate", "❤️ Heart Rate"],
              ["respiratory_rate", "🫁 Respiratory Rate"],
            ].map(([key, label], i) => (
              <div
                key={key}
                className="relative group"
                style={{
                  animation: `fadeUp 0.5s ease ${i * 0.1}s both`,
                }}
              >

                <input
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={label}
                  className="
                    w-full
                    p-4
                    rounded-2xl
                    bg-white/70
                    border border-gray-200
                    outline-none
                    focus:border-blue-400
                    focus:ring-4 focus:ring-blue-100
                    transition-all duration-300
                    shadow-sm
                    hover:shadow-lg
                    hover:-translate-y-1
                  "
                />

              </div>
            ))}

          </div>

          {/* BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4 mt-8">

            <button
              onClick={submitVital}
              className="
                px-8 py-4
                rounded-2xl
                bg-gradient-to-r from-blue-600 to-cyan-500
                text-white
                font-bold
                shadow-xl
                hover:scale-105
                hover:shadow-blue-300
                transition-all duration-300
              "
            >
              {editingId ? "Update Vital" : "Submit Vital"}
            </button>

            {editingId && (
              <button
                onClick={cancelEdit}
                className="
                  px-8 py-4
                  rounded-2xl
                  bg-gray-100
                  hover:bg-gray-200
                  text-gray-700
                  font-semibold
                  transition-all
                "
              >
                Cancel
              </button>
            )}

          </div>

        </div>
      </div>




      {/* HISTORY */}
      <div className="mb-10">

        <div className="flex items-center justify-between mb-5">
          <h3 className="text-2xl font-black text-gray-800">
            Health Timeline
          </h3>

          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            {history.length} Records
          </div>
        </div>
{/* SLIDE HINT */}
<div className="flex justify-center md:hidden mt-4 mb-2">

  <div className="
    relative
    w-28 h-2
    rounded-full
    bg-white/40
    backdrop-blur-xl
    border border-white/30
    shadow-md
    overflow-hidden
  ">

    {/* moving highlight (feels like swipe progress) */}
    <div className="
      absolute left-0 top-0 h-full w-1/3
      bg-gradient-to-r from-sky-400 to-cyan-300
      rounded-full
      animate-pulse
    " />

  </div>

</div>

        <Swiper
          slidesPerView={1.1}
          centeredSlides={false}
          grabCursor={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={20}
        >

          {history.map((v) => (
            <SwiperSlide key={v.id}>

              <div className="
                group
                bg-white/70
                backdrop-blur-xl
                rounded-3xl
                p-5
                border border-white/40
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all duration-500
                h-full
              ">

                <div className="flex items-center justify-between mb-4">

                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-full text-xs font-bold">
                    Medical Record
                  </div>

                  <span className="text-2xl">
                    📋
                  </span>

                </div>

                <p className="text-sm text-gray-500 mb-4">
                  {new Date(v.measured_at).toLocaleString()}
                </p>

                <div className="space-y-3 text-gray-700">

                  <div className="flex justify-between">
                    <span>🌡️ Temperature</span>
                    <b>{v.temperature}</b>
                  </div>

                  <div className="flex justify-between">
                    <span>❤️ Heart Rate</span>
                    <b>{v.heart_rate}</b>
                  </div>

                  <div className="flex justify-between">
                    <span>🫁 Respiration</span>
                    <b>{v.respiratory_rate}</b>
                  </div>

                  <div className="flex justify-between">
                    <span>🩸 Blood Pressure</span>
                    <b>
                      {v.blood_pressure_systolic}/
                      {v.blood_pressure_diastolic}
                    </b>
                  </div>

                </div>

                <div className="flex gap-3 mt-6">

                  <button
                    onClick={() => handleEdit(v)}
                    className="
                      flex-1
                      py-2 rounded-xl
                      bg-blue-100
                      text-blue-700
                      font-semibold
                      hover:bg-blue-500
                      hover:text-white
                      transition-all
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(v.id)}
                    className="
                      flex-1
                      py-2 rounded-xl
                      bg-red-100
                      text-red-600
                      font-semibold
                      hover:bg-red-500
                      hover:text-white
                      transition-all
                    "
                  >
                    Delete
                  </button>

                </div>

              </div>

            </SwiperSlide>
          ))}

        </Swiper>
          {/* SLIDER INDICATOR */}
<div className="flex justify-center mt-4 md:hidden">
  <div className="flex gap-1">
    <div className="w-8 h-1 rounded-full bg-blue-500"></div>
    <div className="w-2 h-1 rounded-full bg-gray-300"></div>
    <div className="w-2 h-1 rounded-full bg-gray-300"></div>
  </div>
</div>

      </div>





      {/* TREATMENT */}
      <div>

        <div className="flex items-center justify-between mb-5">
          <h3 className="text-2xl font-black text-gray-800">
            Treatment Plans
          </h3>

          <div className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold">
            Active Plans
          </div>
        </div>

        <div className="grid gap-5">

          {plans.map((p) => {
            const isExpired =
              p.end_date && new Date(p.end_date) < new Date();

            return (
              <div
                key={p.id}
                className={`
                  relative
                  overflow-hidden
                  rounded-3xl
                  p-6
                  border
                  shadow-lg
                  hover:shadow-2xl
                  hover:-translate-y-1
                  transition-all duration-500
                  ${
                    isExpired
                      ? "bg-red-50 border-red-200"
                      : "bg-white/70 border-white/40 backdrop-blur-xl"
                  }
                `}
              >

                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl"></div>

                {isExpired && (
                  <div className="absolute top-5 right-5 bg-red-500 text-white text-xs px-4 py-2 rounded-full shadow">
                    Expired
                  </div>
                )}

                <div className="relative z-10 space-y-3">

                  <p className="text-gray-800">
                    <span className="font-bold text-blue-600">
                      🩺 Diagnosis:
                    </span>{" "}
                    {p.diagnosis}
                  </p>

                  <p className="text-gray-700">
                    <span className="font-bold text-cyan-600">
                      💊 Medications:
                    </span>{" "}
                    {p.medications}
                  </p>

                  <p className="text-gray-700">
                    <span className="font-bold text-indigo-600">
                      📋 Instructions:
                    </span>{" "}
                    {p.instructions}
                  </p>

                  <div className="flex flex-col md:flex-row gap-4 pt-2 text-sm text-gray-500">

                    <div>
                      📅 Start: {p.start_date || "--"}
                    </div>

                    <div>
                      🛑 End: {p.end_date || "--"}
                    </div>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  </div>
);
}

