/* eslint-disable react-hooks/immutability */
// /* eslint-disable react-hooks/immutability */
// import React, { useEffect, useState } from "react";
// import Navbar from "../components-admin/Navbar.jsx";
// import CaregiverSidebar from "../components-admin/CaregiverSidebar.jsx";

// const API_BASE = "http://127.0.0.1:8000/api";

// export default function CaregiverDashboard() {
//   const [isOpen, setIsOpen] = useState(false);

//   const [patients, setPatients] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [vitals, setVitals] = useState([]);
//   const [plans, setPlans] = useState([]);

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   if (!user) {
//     window.location.href = "/login";
//   }

//   // ================= AUTH HEADERS =================
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + token,
//   };

//   // ================= LOAD PATIENTS =================
//   useEffect(() => {
//     async function loadPatients() {
//       try {
//         const res = await fetch(
//           `${API_BASE}/relative/${user.id}/patients`,
//           { headers }
//         );

//         const json = await res.json();
//         setPatients(json.data || []);
//       } catch (err) {
//         console.error("Error loading patients:", err);
//       }
//     }

//     loadPatients();
//   }, []);

//   // ================= SELECT PATIENT =================
//   async function selectPatient(patient) {
//   setSelected(patient);

//   try {
//     const userId = patient.user_id;

//     console.log("📌 Selected Patient:", patient);
//     console.log("📌 Extracted userId:", userId);

//     if (!userId) {
//       console.error("❌ userId is missing in patient object");
//       return;
//     }

//     // ================= VITALS =================
//     const vRes = await fetch(
//       `${API_BASE}/vitalSign/user/${userId}`,
//       { headers }
//     );

//     const vJson = await vRes.json();
//     setVitals(vJson?.data?.data || []);

//     // ================= PLANS =================
//     const pRes = await fetch(
//       `${API_BASE}/treatment-plan/user/${userId}`,
//       { headers }
//     );

//     const pJson = await pRes.json();
//     setPlans(pJson?.data?.data || []);

//   } catch (err) {
//     console.error("Error loading details:", err);
//   }
// }
//   // ================= UI =================
//   return (
//     <div className="bg-blue-50 min-h-screen">

//       {/* ================= NAVBAR ================= */}
//       <Navbar
//         title="Caregiver Dashboard ❤️"
//         toggleSidebar={toggleSidebar}
//       />

//       {/* ================= SIDEBAR ================= */}
//       <CaregiverSidebar
//         isOpen={isOpen}
//         toggleSidebar={toggleSidebar}
//       />

//       {/* ================= MAIN ================= */}
//       <main className="pt-24 md:pt-28 p-4 md:ml-64">

//         {/* HERO */}
//         <div className="max-w-6xl mx-auto mb-6">
//           <h2 className="text-xl md:text-2xl font-bold">
//             Welcome 👋 {user.name}
//           </h2>
//           <p className="text-gray-600">
//             View your relatives, vitals and treatment plans
//           </p>
//         </div>

//         <div className="max-w-6xl mx-auto flex gap-6">

//           {/* ================= PATIENTS LIST ================= */}
//           <div className="w-1/3 bg-white rounded-xl shadow p-4 h-fit">

//             <h2 className="text-xl font-bold mb-4">
//               👨‍👩‍👧 Your Relatives
//             </h2>

//             {patients.map((p) => (
//               <div
//                 key={p.id}
//                 onClick={() => selectPatient(p)}
//                 className={`p-3 mb-3 rounded-lg cursor-pointer transition
//                   ${
//                     selected?.id === p.id
//                       ? "bg-blue-100 border-l-4 border-blue-500"
//                       : "bg-gray-50 hover:bg-gray-100"
//                   }
//                 `}
//               >
//                 <div className="font-semibold">
//                   {p.patient_name}
//                 </div>

//                 <div className="text-xs text-gray-500">
//                   {p.gender} • {p.birth_date}
//                 </div>
//               </div>
//             ))}

//           </div>

//           {/* ================= DETAILS ================= */}
//           <div className="flex-1">

//             {!selected && (
//               <div className="text-center text-gray-500 mt-20">
//                 Select a patient to view data
//               </div>
//             )}

//             {selected && (
//               <>
//                 {/* VITALS */}
//                 <div className="bg-white p-4 rounded-xl shadow mb-6">

//                   <h2 className="text-lg font-bold mb-3">
//                     📊 Vital Signs
//                   </h2>

//                   <table className="w-full text-sm text-center">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="p-2">Date</th>
//                         <th>Temp</th>
//                         <th>Heart</th>
//                         <th>BP</th>
//                         <th>Resp</th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {vitals.map((v) => (
//                         <tr key={v.id} className="border-t">
//                           <td className="p-2">{v.measured_at}</td>
//                           <td>{v.temperature}</td>
//                           <td>{v.heart_rate}</td>
//                           <td>
//                             {v.blood_pressure_systolic}/
//                             {v.blood_pressure_diastolic}
//                           </td>
//                           <td>{v.respiratory_rate}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>

//                 </div>

//                 {/* TREATMENT PLANS */}
//                 <div className="bg-white p-4 rounded-xl shadow">

//                   <h2 className="text-lg font-bold mb-3">
//                     💊 Treatment Plans
//                   </h2>

//                   {plans.length === 0 ? (
//                     <p className="text-gray-500">
//                       No treatment plans available
//                     </p>
//                   ) : (
// <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                       {plans.map((p) => {
//   const isExpired = p.end_date && new Date(p.end_date) < new Date();

//   return (
//     <div
//       key={p.id}
//       className={`p-3 rounded-lg border
//         ${isExpired
//           ? "bg-red-50 border-red-400"
//           : "bg-blue-50 border-blue-200"
//         }`}
//     >
//       {/* STATUS BADGE */}
//       <div className="mb-2">
//         <span
//           className={`text-xs px-2 py-1 rounded-full font-bold
//             ${isExpired
//               ? "bg-red-500 text-white"
//               : "bg-green-500 text-white"
//             }`}
//         >
//           {isExpired ? "Expired" : "Active"}
//         </span>
//       </div>

//       <p>
//         <b>Diagnosis:</b> {p.diagnosis}
//       </p>

//       <p>
//         <b>Medications:</b> {p.medications}
//       </p>

//       <p>
//         <b>Instructions:</b> {p.instructions}
//       </p>

//       <p className="text-xs text-gray-500 mt-1">
//         {p.start_date} → {p.end_date}
//       </p>
//     </div>
//   );
// })}

//                     </div>
//                   )}

//                 </div>
//               </>
//             )}

//           </div>

//         </div>
//       </main>
//     </div>
//   );
// }



// 2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222


import React, { useEffect, useState } from "react";
import Navbar from "../components-admin/Navbar.jsx";
import CaregiverSidebar from "../components-admin/CaregiverSidebar.jsx";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

const API_BASE = "http://127.0.0.1:8000/api";

export default function CaregiverDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const [patients, setPatients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [vitals, setVitals] = useState([]);
  const [plans, setPlans] = useState([]);
  const [search, setSearch] = useState("");

  const toggleSidebar = () => setIsOpen(!isOpen);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user) window.location.href = "/login";

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  useEffect(() => {
    async function loadPatients() {
      const res = await fetch(`${API_BASE}/relative/${user.id}/patients`, { headers });
      const json = await res.json();
      setPatients(json.data || []);
    }
    loadPatients();
  }, []);

  async function selectPatient(patient) {
    setSelected(patient);

    const userId = patient.user_id;
    if (!userId) return;

    const vRes = await fetch(`${API_BASE}/vitalSign/user/${userId}`, { headers });
    const vJson = await vRes.json();
    setVitals(vJson?.data?.data || []);

    const pRes = await fetch(`${API_BASE}/treatment-plan/user/${userId}`, { headers });
    const pJson = await pRes.json();
    setPlans(pJson?.data?.data || []);
  }


  const chartData = [...vitals]
  .reverse()
  .map((v, i) => ({
    index: i + 1,
    heart: Number(v.heart_rate || 0),
    temp: Number(v.temperature || 0),
    bp: Number(v.blood_pressure_systolic || 0),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

      <Navbar title="👨‍👩‍👧‍👦 Caregiver Family Hub" toggleSidebar={toggleSidebar} />
      <CaregiverSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <main className="pt-24 md:pt-28 p-4 md:ml-64">

        {/* HEADER */}
        <div className="max-w-6xl mx-auto mb-10">
          <h2 className="text-3xl font-black text-gray-800">
            Welcome 👋, <span className="text-blue-600">{user.name}</span> 
          </h2>
          <p className="text-gray-500">
            Clinical monitoring workspace for real-time patient supervision
          </p>
        </div>

        {/* GRID */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">




          {/* ================= PATIENT WORKSPACE ================= */}
<div className="bg-white/70 backdrop-blur-2xl rounded-[32px] border border-sky-100 shadow-[0_25px_80px_-30px_rgba(14,165,233,0.25)] p-5">

  {/* HEADER */}
  <div className="flex items-start justify-between mb-4">

    <div>
      <h2 className="text-lg font-bold bg-gradient-to-r from-sky-600 via-cyan-500 to-indigo-500 bg-clip-text text-transparent flex items-center gap-2">
        🧬 Patient Workspace
      </h2>

      <p className="text-xs text-slate-500 mt-1">
        Select a patient to view full medical profile
      </p>
    </div>

    <span className="text-xs px-3 py-1 rounded-full bg-sky-50 text-sky-600 border border-sky-100 shadow-sm">
      {patients.length} Active Patients
    </span>

  </div>

  {/* SEARCH (إضافة قوية) */}
  <div className="mb-4">
    <input
     
  placeholder="Search patient..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full px-4 py-2 rounded-2xl border border-sky-100 bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-cyan-300 text-sm"
/>
  
  </div>

  {/* LIST */}
  <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1 custom-scroll">

   

  {patients.length === 0 && (
    <div className="text-center py-10 text-slate-400 text-sm">
      No patients found 🫤
    </div>
  )}

  {patients
    .filter((p) =>
      p.patient_name?.toLowerCase().includes(search.toLowerCase())
    )
    .map((p) => {
      const isActive = selected?.id === p.id;

      return (
        <div
          key={p.id}
          onClick={() => selectPatient(p)}
          className={`
            relative group cursor-pointer rounded-2xl p-4 border transition-all duration-300 overflow-hidden

            ${isActive
              ? "bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-500 text-white shadow-xl border-transparent scale-[1.01]"
              : "bg-white border-sky-100 hover:border-cyan-200 hover:shadow-md hover:-translate-y-0.5"
            }
          `}
        >

          {/* animated glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-sky-100/40 to-cyan-100/20" />

          <div className="relative flex items-center justify-between">

            {/* LEFT */}
            <div className="flex items-center gap-3">

              {/* avatar */}
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                ${isActive ? "bg-white/20 text-white" : "bg-sky-100 text-sky-600"}
              `}>
                {p.patient_name?.charAt(0)}
              </div>

              <div>
                <p className={`font-semibold ${isActive ? "text-white" : "text-slate-800"}`}>
                  {p.patient_name}
                </p>

                <p className={`text-xs mt-0.5 ${isActive ? "text-white/80" : "text-slate-500"}`}>
                  {p.gender} • {p.birth_date}
                </p>
              </div>

            </div>

            {/* status dot */}
            <span className={`
              w-2.5 h-2.5 rounded-full shadow-sm
              ${isActive ? "bg-white" : "bg-cyan-400"}
            `} />

          </div>

          {/* BOTTOM */}
          <div className="relative flex items-center justify-between mt-3">

            <button
              className={`
                text-xs px-3 py-1.5 rounded-xl font-medium transition

                ${isActive
                  ? "bg-white/20 text-white"
                  : "bg-sky-50 text-sky-600 hover:bg-sky-100"
                }
              `}
            >
              Open File →
            </button>

            <div className="flex items-center gap-2">

              <span className={`
                text-[11px] px-2 py-0.5 rounded-full
                ${isActive ? "bg-white/20 text-white" : "bg-slate-50 text-slate-500"}
              `}>
                ID #{p.id}
              </span>

            </div>

          </div>

        </div>
      );
    })}

  </div>


</div>












          {/* ================= DETAILS ================= */}
          <div className="md:col-span-2 space-y-6">

           {!selected && (
  <div className="flex items-center justify-center mt-24">
    <div className="text-center max-w-md bg-white/60 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-10 animate-fadeIn">

      {/* ICON */}
      <div className="text-5xl mb-4 animate-bounce">
        🧠
      </div>

      {/* TITLE */}
      <h3 className="text-xl font-bold text-gray-700">
        Clinical Workspace Ready
      </h3>

      {/* DESCRIPTION */}
      <p className="text-gray-500 mt-2">
        Select a patient from the left panel to load:
        <br />
        vitals, treatment plans and real-time medical data.
      </p>

      {/* MINI INDICATORS */}
      <div className="flex justify-center gap-2 mt-6">
        <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
          Vitals
        </span>
        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
          Treatments
        </span>
        <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-600">
          Monitoring
        </span>
      </div>

    </div>
  </div>
)}

          {selected && (
  <div className="space-y-6">

    {/* ================= VITALS ================= */}
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white p-5">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-indigo-700 flex items-center gap-2">
          📊 Vital Signs Monitor
        </h2>

        <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-600">
          Live Clinical Data
        </span>
      </div>

      {/* RESPONSIVE GRID INSTEAD OF TABLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {vitals.map((v) => {
          const critical =
            v.heart_rate > 100 ||
            v.temperature > 38;

          return (
            <div
              key={v.id}
              className={`p-4 rounded-2xl border transition hover:scale-[1.02]
                ${
                  critical
                    ? "bg-gradient-to-br from-red-50 to-red-100 border-red-200"
                    : "bg-gradient-to-br from-emerald-50 to-blue-50 border-blue-100"
                }`}
            >

              {/* HEADER */}
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs text-gray-500">
                  {v.measured_at}
                </p>

                <span className={`text-xs px-2 py-1 rounded-full font-semibold
                  ${critical
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                  }`}
                >
                  {critical ? "CRITICAL" : "STABLE"}
                </span>
              </div>

              {/* VALUES */}
              <div className="grid grid-cols-2 gap-2 text-sm">

                <div>
                  <p className="text-gray-500">Temperature</p>
                  <p className={`font-bold ${v.temperature > 38 ? "text-red-600" : ""}`}>
                    {v.temperature}°
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Heart Rate</p>
                  <p className={`font-bold ${v.heart_rate > 100 ? "text-red-600" : ""}`}>
                    {v.heart_rate} bpm
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Blood Pressure</p>
                  <p className="font-bold">
                    {v.blood_pressure_systolic}/{v.blood_pressure_diastolic}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Respiration</p>
                  <p className="font-bold">
                    {v.respiratory_rate}
                  </p>
                </div>

              </div>

            </div>
          );
        })}

      </div>
    </div>

    {/* ================= TREATMENTS ================= */}
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white p-5">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-indigo-700 flex items-center gap-2">
          💊 Treatment Intelligence
        </h2>

        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600">
          Clinical Plans
        </span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {plans.map((p) => {
          const expired =
            p.end_date &&
            new Date(p.end_date) < new Date();

          return (
            <div
              key={p.id}
              className={`p-5 rounded-2xl border transition hover:scale-[1.02]
                ${
                  expired
                    ? "bg-gradient-to-br from-red-50 to-red-100 border-red-200"
                    : "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100"
                }`}
            >

              {/* HEADER */}
              <div className="flex justify-between items-center mb-3">

                <h3 className="font-bold text-gray-800">
                  {p.diagnosis}
                </h3>

                <span className={`text-xs px-3 py-1 rounded-full font-bold
                  ${expired
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                  }`}
                >
                  {expired ? "Expired" : "Active"}
                </span>

              </div>

              {/* CONTENT */}
              <div className="space-y-2 text-sm text-gray-700">

                <p>
                  <span className="font-semibold">💊 Meds:</span>{" "}
                  {p.medications}
                </p>

                <p>
                  <span className="font-semibold">📌 Instructions:</span>{" "}
                  {p.instructions}
                </p>

                <p className="text-xs text-gray-500 pt-2 border-t">
                  {p.start_date} → {p.end_date}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>



    {/* ================= REPORTS (NO DESIGN CHANGE) ================= */}
<div className="bg-white/80 backdrop-blur-2xl rounded-[28px] border border-white shadow-[0_25px_70px_-25px_rgba(0,0,0,0.15)] p-6">

  {/* HEADER */}
  <div className="flex items-center justify-between mb-6">

    <div>
      <h2 className="text-xl font-black bg-gradient-to-r from-indigo-600 via-cyan-500 to-sky-500 bg-clip-text text-transparent flex items-center gap-2">
        📈 Patient Health Analytics
      </h2>
      <p className="text-xs text-slate-500 mt-1">
        Real-time physiological trends overview
      </p>
    </div>

    <span className="text-xs px-4 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-cyan-50 text-indigo-600 border border-indigo-100 shadow-sm">
      Live Reports
    </span>

  </div>

  {/* CHART GRID */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* HEART RATE */}
    <div className="bg-gradient-to-br from-rose-50 via-white to-rose-50 border border-rose-100 rounded-2xl p-4 shadow-sm hover:shadow-lg transition">

      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-rose-600">
          ❤️ Heart Rate Trend
        </p>

        <span className="text-[11px] px-3 py-1 rounded-full bg-rose-100 text-rose-600">
          bpm
        </span>
      </div>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="hr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fb7185" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#fb7185" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="heart"
              stroke="#fb7185"
              strokeWidth={3}
              fill="url(#hr)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>

    {/* TEMPERATURE */}
    <div className="bg-gradient-to-br from-sky-50 via-white to-cyan-50 border border-sky-100 rounded-2xl p-4 shadow-sm hover:shadow-lg transition">

      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-cyan-600">
          🌡 Temperature Trend
        </p>

        <span className="text-[11px] px-3 py-1 rounded-full bg-cyan-100 text-cyan-600">
          °C
        </span>
      </div>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="temp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="temp"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>

  </div>

 

</div>

  </div>
)}

          </div>

        </div>
      </main>
    </div>
  );
}


// 333333333333333333333333333333333333333333333333333333333333333333333333333333333333
