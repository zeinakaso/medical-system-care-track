// import React, { useEffect, useState } from "react";

// const API_BASE = "http://localhost:8000/api";

// export default function PatientReports() {
//   const user = JSON.parse(localStorage.getItem("user") || "null");
//   const token = localStorage.getItem("token");

//   const [vitals, setVitals] = useState([]);
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getHeaders = () => ({
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token || ""}`,
//   });

//   // ================= FETCH VITALS =================
//   const fetchVitals = async () => {
//     const res = await fetch(
//       `${API_BASE}/vitalSign/user/${user.id}`,
//       { headers: getHeaders() }
//     );

//     const json = await res.json();
//     const rows = json?.data?.data ?? [];

//     const sorted = [...rows].sort(
//       (a, b) => new Date(b.measured_at) - new Date(a.measured_at)
//     );

//     setVitals(sorted.slice(0, 20)); // آخر 20 قراءة
//   };

//   // ================= FETCH PLANS =================
//   const fetchPlans = async () => {
//     const res = await fetch(
//       `${API_BASE}/treatment-plan/user/${user.id}`,
//       { headers: getHeaders() }
//     );

//     const json = await res.json();
//     setPlans(json?.data?.data ?? []);
//   };

//   // ================= ANALYTICS =================
//   const avg = (arr, key) => {
//     if (!arr.length) return 0;
//     return (
//       arr.reduce((sum, v) => sum + Number(v[key] || 0), 0) / arr.length
//     ).toFixed(1);
//   };

//   const latest = vitals[0];

//   const trend = () => {
//     if (vitals.length < 5) return "Not enough data";

//     const first = vitals[vitals.length - 1];
//     const last = vitals[0];

//     if (last.heart_rate > first.heart_rate) return "⚠ Increasing HR";
//     if (last.temperature > first.temperature) return "⚠ Rising Temp";

//     return "✅ Stable Condition";
//   };

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
//         Loading Reports...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-24 p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">

//       {/* HEADER */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">
//           📊 Patient Reports
//         </h1>
//         <p className="text-gray-500">
//           AI-powered summary based on your real medical data
//         </p>
//       </div>

//       {/* SUMMARY */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">

//         <div className="bg-white p-5 rounded-2xl shadow">
//           <p className="text-gray-500">Avg Temp</p>
//           <h2 className="text-xl font-bold">
//             {avg(vitals, "temperature")}°C
//           </h2>
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow">
//           <p className="text-gray-500">Avg HR</p>
//           <h2 className="text-xl font-bold">
//             {avg(vitals, "heart_rate")} bpm
//           </h2>
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow">
//           <p className="text-gray-500">Avg BP</p>
//           <h2 className="text-xl font-bold">
//             {avg(vitals, "blood_pressure_systolic")}/
//             {avg(vitals, "blood_pressure_diastolic")}
//           </h2>
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow">
//           <p className="text-gray-500">Records</p>
//           <h2 className="text-xl font-bold">{vitals.length}</h2>
//         </div>

//       </div>

//       {/* INSIGHT */}
//       <div className="bg-white p-6 rounded-2xl shadow mb-8 border">

//         <h2 className="text-xl font-bold mb-3">
//           🧠 Health Insight
//         </h2>

//         <div className="p-4 rounded-xl bg-blue-50 border">
//           {trend()}
//         </div>

//       </div>

//       {/* LATEST VITAL */}
//       <div className="bg-white p-6 rounded-2xl shadow mb-8">

//         <h2 className="text-xl font-bold mb-4">
//           📌 Latest Reading
//         </h2>

//         {latest ? (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">

//             <div>Temp: {latest.temperature}</div>
//             <div>HR: {latest.heart_rate}</div>
//             <div>
//               BP: {latest.blood_pressure_systolic}/
//               {latest.blood_pressure_diastolic}
//             </div>
//             <div>RR: {latest.respiratory_rate}</div>

//           </div>
//         ) : (
//           <p>No data</p>
//         )}

//       </div>

//       {/* TREATMENT SUMMARY */}
//       <div className="bg-white p-6 rounded-2xl shadow">

//         <h2 className="text-xl font-bold mb-4">
//           💊 Treatment Overview
//         </h2>

//         {plans.length === 0 ? (
//           <p className="text-gray-500">No active treatment plans</p>
//         ) : (
//           plans.slice(0, 2).map((p) => (
//             <div
//               key={p.id}
//               className="p-4 border rounded-xl mb-3 bg-gray-50"
//             >
//               <p><b>Diagnosis:</b> {p.diagnosis}</p>
//               <p><b>Medications:</b> {p.medications}</p>
//               <p><b>Status:</b> {p.end_date ? "Active/Expired check" : "Active"}</p>
//             </div>
//           ))
//         )}

//       </div>

//     </div>
//   );
// }


// 2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222

// import React, { useEffect, useState } from "react";

// import {
//   Activity,
//   Thermometer,
//   HeartPulse,
//   ShieldAlert,
//   FileText,
//   Brain,
// } from "lucide-react";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   AreaChart,
//   Area,
// } from "recharts";

// const API_BASE = "http://localhost:8000/api";

// export default function PatientReports() {

//   const user = JSON.parse(localStorage.getItem("user") || "null");
//   const token = localStorage.getItem("token");

//   const [vitals, setVitals] = useState([]);
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ================= HEADERS =================
//   const getHeaders = () => ({
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token || ""}`,
//   });

//   // ================= FETCH VITALS =================
//   const fetchVitals = async () => {

//     const res = await fetch(
//       `${API_BASE}/vitalSign/user/${user.id}`,
//       { headers: getHeaders() }
//     );

//     const json = await res.json();

//     const rows = json?.data?.data ?? [];

//     const sorted = [...rows].sort(
//       (a, b) => new Date(b.measured_at) - new Date(a.measured_at)
//     );

//     setVitals(sorted.slice(0, 20));
//   };

//   // ================= FETCH PLANS =================
//   const fetchPlans = async () => {

//     const res = await fetch(
//       `${API_BASE}/treatment-plan/user/${user.id}`,
//       { headers: getHeaders() }
//     );

//     const json = await res.json();

//     setPlans(json?.data?.data ?? []);
//   };

//   // ================= AVERAGE =================
//   const avg = (arr, key) => {

//     if (!arr.length) return 0;

//     return (
//       arr.reduce((sum, v) => sum + Number(v[key] || 0), 0) / arr.length
//     ).toFixed(1);
//   };

//   const latest = vitals[0];

//   // ================= RISK DETECTION =================
//   const detectRisk = () => {

//     if (!latest) return null;

//     if (
//       latest.temperature > 39 ||
//       latest.heart_rate > 120
//     ) {
//       return {
//         level: "HIGH RISK",
//         color: "red",
//         message:
//           "Patient shows abnormal vitals. Immediate medical attention may be required.",
//       };
//     }

//     if (
//       latest.temperature > 37.8 ||
//       latest.heart_rate > 100
//     ) {
//       return {
//         level: "MODERATE RISK",
//         color: "yellow",
//         message:
//           "Vitals slightly elevated. Monitoring is recommended.",
//       };
//     }

//     return {
//       level: "STABLE",
//       color: "green",
//       message:
//         "Patient vitals are stable and within normal ranges.",
//     };
//   };

//   const risk = detectRisk();

//   // ================= TREND =================
//   const trend = () => {

//     if (vitals.length < 5) return "Not enough data";

//     const first = vitals[vitals.length - 1];
//     const last = vitals[0];

//     if (last.heart_rate > first.heart_rate)
//       return "⚠ Heart rate trend increasing";

//     if (last.temperature > first.temperature)
//       return "⚠ Temperature trend rising";

//     return "✅ Stable health trend";
//   };

//   // ================= CHART DATA =================
//   const chartData = [...vitals]
//     .reverse()
//     .map((v, i) => ({
//       name: i + 1,
//       heart_rate: Number(v.heart_rate || 0),
//       temperature: Number(v.temperature || 0),
//       systolic: Number(v.blood_pressure_systolic || 0),
//     }));

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

//   // ================= LOADING =================
//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-blue-100">

//         <div className="w-16 h-16 border-[5px] border-cyan-500 border-t-transparent rounded-full animate-spin mb-5"></div>

//         <h1 className="text-2xl font-bold text-slate-700">
//           Loading Reports...
//         </h1>

//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-24 p-4 md:p-8 bg-gradient-to-br from-cyan-50 via-slate-50 to-blue-100">

//       {/* HEADER */}
//       <div className="mb-10">

//         <div className="flex items-center gap-3 mb-3">

//           <div className="w-14 h-14 rounded-3xl bg-white flex items-center justify-center shadow-lg">

//             <Brain className="text-cyan-500" size={28} />

//           </div>

//           <div>

//             <h1 className="text-4xl font-black text-slate-800">
//               Patient Reports
//             </h1>

//             <p className="text-slate-500">
//               Smart analytics based on real patient vitals
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* SUMMARY */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">

//         <SummaryCard
//           title="Avg Temp"
//           value={`${avg(vitals, "temperature")}°C`}
//           icon={<Thermometer size={22} />}
//           color="cyan"
//         />

//         <SummaryCard
//           title="Avg HR"
//           value={`${avg(vitals, "heart_rate")} bpm`}
//           icon={<HeartPulse size={22} />}
//           color="pink"
//         />

//         <SummaryCard
//           title="Avg BP"
//           value={`${avg(vitals, "blood_pressure_systolic")}/${avg(vitals, "blood_pressure_diastolic")}`}
//           icon={<Activity size={22} />}
//           color="purple"
//         />

//         <SummaryCard
//           title="Records"
//           value={vitals.length}
//           icon={<FileText size={22} />}
//           color="blue"
//         />

//       </div>

//       {/* RISK ALERT */}
//       {risk && (
//         <div
//           className={`
//             mb-8 p-6 rounded-[30px] border shadow-lg backdrop-blur-xl
//             ${
//               risk.color === "red"
//                 ? "bg-red-50 border-red-200"
//                 : risk.color === "yellow"
//                 ? "bg-yellow-50 border-yellow-200"
//                 : "bg-emerald-50 border-emerald-200"
//             }
//           `}
//         >

//           <div className="flex items-start gap-4">

//             <div
//               className={`
//                 w-14 h-14 rounded-2xl flex items-center justify-center
//                 ${
//                   risk.color === "red"
//                     ? "bg-red-100 text-red-500"
//                     : risk.color === "yellow"
//                     ? "bg-yellow-100 text-yellow-500"
//                     : "bg-emerald-100 text-emerald-500"
//                 }
//               `}
//             >

//               <ShieldAlert size={28} />

//             </div>

//             <div>

//               <h2
//                 className={`
//                   text-2xl font-black mb-2
//                   ${
//                     risk.color === "red"
//                       ? "text-red-600"
//                       : risk.color === "yellow"
//                       ? "text-yellow-600"
//                       : "text-emerald-600"
//                   }
//                 `}
//               >
//                 🚨 {risk.level}
//               </h2>

//               <p className="text-slate-700 leading-7">
//                 {risk.message}
//               </p>

//             </div>

//           </div>

//         </div>
//       )}

//       {/* INSIGHT */}
//       <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[30px] shadow-lg mb-8 border border-white">

//         <h2 className="text-2xl font-black text-slate-800 mb-4">
//           🧠 AI Health Insight
//         </h2>

//         <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-5 text-slate-700 font-medium">
//           {trend()}
//         </div>

//       </div>

//       {/* CHARTS */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">

//         {/* HEART RATE */}
//         <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[30px] shadow-lg border border-white transition hover:shadow-2xl">

//           <div className="flex items-center gap-3 mb-5">

//             <HeartPulse className="text-pink-500" />

//             <h2 className="text-xl font-black text-slate-700">
//               Heart Rate Trend
//             </h2>

//           </div>

//           <ResponsiveContainer width="100%" height={300}>
//             <AreaChart data={chartData}>

//               <defs>
//                 <linearGradient id="heart" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#ec4899" stopOpacity={0.5}/>
//                   <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
//                 </linearGradient>
//               </defs>

//               <CartesianGrid strokeDasharray="3 3" />

//               <XAxis dataKey="name" />
//               <YAxis />

//               <Tooltip />

//               <Area
//                 type="monotone"
//                 dataKey="heart_rate"
//                 stroke="#ec4899"
//                 fill="url(#heart)"
//                 strokeWidth={4}
//               />

//             </AreaChart>
//           </ResponsiveContainer>

//         </div>

//         {/* TEMPERATURE */}
//         <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[30px] shadow-lg border border-white transition hover:shadow-2xl">

//           <div className="flex items-center gap-3 mb-5">

//             <Thermometer className="text-cyan-500" />

//             <h2 className="text-xl font-black text-slate-700">
//               Temperature Trend
//             </h2>

//           </div>

//           <ResponsiveContainer width="100%" height={300}>

//             <LineChart data={chartData}>

//               <CartesianGrid strokeDasharray="3 3" />

//               <XAxis dataKey="name" />
//               <YAxis />

//               <Tooltip />

//               <Line
//                 type="monotone"
//                 dataKey="temperature"
//                 stroke="#06b6d4"
//                 strokeWidth={4}
//                 dot={{ r: 5 }}
//                 activeDot={{ r: 8 }}
//               />

//             </LineChart>

//           </ResponsiveContainer>

//         </div>

//       </div>

//       {/* BLOOD PRESSURE */}
//       <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[30px] shadow-lg border border-white mb-8 transition hover:shadow-2xl">

//         <div className="flex items-center gap-3 mb-5">

//           <Activity className="text-purple-500" />

//           <h2 className="text-xl font-black text-slate-700">
//             Blood Pressure Trend
//           </h2>

//         </div>

//         <ResponsiveContainer width="100%" height={320}>

//           <LineChart data={chartData}>

//             <CartesianGrid strokeDasharray="3 3" />

//             <XAxis dataKey="name" />
//             <YAxis />

//             <Tooltip />

//             <Line
//               type="monotone"
//               dataKey="systolic"
//               stroke="#8b5cf6"
//               strokeWidth={4}
//               dot={{ r: 5 }}
//             />

//           </LineChart>

//         </ResponsiveContainer>

//       </div>

//       {/* LATEST */}
//       <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[30px] shadow-lg border border-white mb-8">

//         <h2 className="text-2xl font-black text-slate-700 mb-5">
//           📌 Latest Reading
//         </h2>

//         {latest ? (

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

//             <VitalCard
//               title="Temperature"
//               value={`${latest.temperature}°C`}
//             />

//             <VitalCard
//               title="Heart Rate"
//               value={`${latest.heart_rate} bpm`}
//             />

//             <VitalCard
//               title="Blood Pressure"
//               value={`${latest.blood_pressure_systolic}/${latest.blood_pressure_diastolic}`}
//             />

//             <VitalCard
//               title="Respiratory"
//               value={latest.respiratory_rate}
//             />

//           </div>

//         ) : (
//           <p>No data available</p>
//         )}

//       </div>

//       {/* TREATMENT */}
//       <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[30px] shadow-lg border border-white">

//         <h2 className="text-2xl font-black text-slate-700 mb-5">
//           💊 Treatment Overview
//         </h2>

//         {plans.length === 0 ? (

//           <p className="text-slate-500">
//             No active treatment plans
//           </p>

//         ) : (

//           plans.slice(0, 2).map((p) => (

//             <div
//               key={p.id}
//               className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-4 transition hover:shadow-md"
//             >

//               <p className="mb-2">
//                 <b>Diagnosis:</b> {p.diagnosis}
//               </p>

//               <p className="mb-2">
//                 <b>Medications:</b> {p.medications}
//               </p>

//               <p>
//                 <b>Status:</b> {p.end_date ? "Under Monitoring" : "Active"}
//               </p>

//             </div>

//           ))

//         )}

//       </div>

//     </div>
//   );
// }

// /* ================= SUMMARY CARD ================= */

// function SummaryCard({ title, value, icon, color }) {

//   const styles = {
//     cyan: "from-cyan-400 to-cyan-500",
//     pink: "from-pink-400 to-pink-500",
//     purple: "from-purple-400 to-purple-500",
//     blue: "from-blue-400 to-blue-500",
//   };

//   return (
//     <div className="bg-white/80 backdrop-blur-xl rounded-[28px] p-5 shadow-lg border border-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

//       <div className={`
//         w-12 h-12 rounded-2xl bg-gradient-to-r ${styles[color]}
//         flex items-center justify-center text-white mb-4
//       `}>
//         {icon}
//       </div>

//       <p className="text-slate-500 text-sm mb-1">
//         {title}
//       </p>

//       <h2 className="text-2xl font-black text-slate-800">
//         {value}
//       </h2>

//     </div>
//   );
// }

// /* ================= VITAL CARD ================= */

// function VitalCard({ title, value }) {
//   return (
//     <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 text-center">

//       <p className="text-slate-500 text-sm mb-2">
//         {title}
//       </p>

//       <h2 className="text-xl font-black text-slate-700">
//         {value}
//       </h2>

//     </div>
//   );
// }


// 33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333


import React, { useEffect, useState } from "react";

import {
  HeartPulse,
  Thermometer,
  Activity,
  ShieldCheck,
  ShieldAlert,
  TrendingUp,
  FileText,
  Pill,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const API_BASE = "http://localhost:8000/api";

export default function PatientHealthOverview() {

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  const [vitals, setVitals] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= HEADERS ================= */

  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token || ""}`,
  });

  /* ================= FETCH VITALS ================= */

  const fetchVitals = async () => {

    const res = await fetch(
      `${API_BASE}/vitalSign/user/${user.id}`,
      {
        headers: getHeaders(),
      }
    );

    const json = await res.json();

    const rows = json?.data?.data ?? [];

    const sorted = [...rows].sort(
      (a, b) => new Date(b.measured_at) - new Date(a.measured_at)
    );

    setVitals(sorted.slice(0, 15));
  };

  /* ================= FETCH PLANS ================= */

  const fetchPlans = async () => {

    const res = await fetch(
      `${API_BASE}/treatment-plan/user/${user.id}`,
      {
        headers: getHeaders(),
      }
    );

    const json = await res.json();

    setPlans(json?.data?.data ?? []);
  };

  /* ================= INIT ================= */

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

  /* ================= DATA ================= */

  const latest = vitals[0];

  const chartData = [...vitals]
    .reverse()
    .map((v, i) => ({
      day: i + 1,
      heart_rate: Number(v.heart_rate || 0),
      temperature: Number(v.temperature || 0),
      pressure: Number(v.blood_pressure_systolic || 0),
    }));

  /* ================= PATIENT STATUS ================= */

  const getStatus = () => {

    if (!latest) return null;

    if (
      latest.temperature > 39 ||
      latest.heart_rate > 120
    ) {
      return {
        label: "Needs Attention",
        color: "red",
        message:
          "Some readings are higher than normal. Please contact your healthcare provider.",
      };
    }

    if (
      latest.temperature > 37.8 ||
      latest.heart_rate > 100
    ) {
      return {
        label: "Under Monitoring",
        color: "yellow",
        message:
          "Your vitals are slightly elevated and should continue to be monitored.",
      };
    }

    return {
      label: "Stable Condition",
      color: "green",
      message:
        "Your recent vital signs are within normal ranges.",
    };
  };

  const status = getStatus();

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-blue-100">

        <div className="w-16 h-16 border-[5px] border-cyan-500 border-t-transparent rounded-full animate-spin mb-5"></div>

        <h1 className="text-2xl font-bold text-slate-700">
          Loading Health Overview...
        </h1>

      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 p-4 md:p-8 bg-gradient-to-br from-cyan-50 via-slate-50 to-blue-100 overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[320px] h-[320px] bg-cyan-300/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-blue-300/20 blur-[120px] rounded-full"></div>

      {/* HEADER */}
      <div className="relative z-10 mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>

          <div className="flex items-center gap-4 mb-3">

            <div className="w-16 h-16 rounded-3xl bg-white shadow-xl flex items-center justify-center">

              <HeartPulse className="text-cyan-500" size={30} />

            </div>

            <div>

              <h1 className="text-2xl md:text-2xl font-black bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                My Health Overview
              </h1>

              <p className="text-slate-500 mt-2">
                Monitor your health progress and vital signs
              </p>

            </div>

          </div>

        </div>

        {/* STATUS */}
        {status && (
          <div
            className={`
              px-6 py-4 rounded-[28px] border shadow-lg backdrop-blur-xl
              ${
                status.color === "red"
                  ? "bg-red-50 border-red-200"
                  : status.color === "yellow"
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-emerald-50 border-emerald-200"
              }
            `}
          >

            <div className="flex items-center gap-3">

              <div
                className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center
                  ${
                    status.color === "red"
                      ? "bg-red-100 text-red-500"
                      : status.color === "yellow"
                      ? "bg-yellow-100 text-yellow-500"
                      : "bg-emerald-100 text-emerald-500"
                  }
                `}
              >

                {status.color === "green" ? (
                  <ShieldCheck size={24} />
                ) : (
                  <ShieldAlert size={24} />
                )}

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Current Status
                </p>

                <h2
                  className={`
                    text-lg font-black
                    ${
                      status.color === "red"
                        ? "text-red-600"
                        : status.color === "yellow"
                        ? "text-yellow-600"
                        : "text-emerald-600"
                    }
                  `}
                >
                  {status.label}
                </h2>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* QUICK SUMMARY */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">

        <SummaryCard
          title="Temperature"
          value={latest ? `${latest.temperature}°C` : "--"}
          icon={<Thermometer size={22} />}
          color="cyan"
        />

        <SummaryCard
          title="Heart Rate"
          value={latest ? `${latest.heart_rate} bpm` : "--"}
          icon={<HeartPulse size={22} />}
          color="pink"
        />

        <SummaryCard
          title="Blood Pressure"
          value={
            latest
              ? `${latest.blood_pressure_systolic}/${latest.blood_pressure_diastolic}`
              : "--"
          }
          icon={<Activity size={22} />}
          color="purple"
        />

        <SummaryCard
          title="Treatment Plans"
          value={plans.length}
          icon={<FileText size={22} />}
          color="blue"
        />

      </div>

      {/* MESSAGE */}
      {status && (
        <div className="relative z-10 bg-white/80 backdrop-blur-xl border border-white rounded-[30px] p-6 shadow-lg mb-8">

          <h2 className="text-2xl font-black text-slate-800 mb-4">
            🩺 Health Insight
          </h2>

          <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-5 text-slate-700 leading-7">
            {status.message}
          </div>

        </div>
      )}

      {/* CHARTS */}
      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">

        {/* HEART RATE */}
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[30px] shadow-lg border border-white transition hover:shadow-2xl">

          <div className="flex items-center gap-3 mb-5">

            <HeartPulse className="text-pink-500" />

            <h2 className="text-xl font-black text-slate-700">
              Heart Rate Trend
            </h2>

          </div>

          <ResponsiveContainer width="100%" height={280}>

            <AreaChart data={chartData}>

              <defs>

                <linearGradient id="heartGradient" x1="0" y1="0" x2="0" y2="1">

                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.5} />

                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />

                </linearGradient>

              </defs>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="day" />
              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="heart_rate"
                stroke="#ec4899"
                strokeWidth={4}
                fill="url(#heartGradient)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

        {/* TEMPERATURE */}
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[30px] shadow-lg border border-white transition hover:shadow-2xl">

          <div className="flex items-center gap-3 mb-5">

            <TrendingUp className="text-cyan-500" />

            <h2 className="text-xl font-black text-slate-700">
              Temperature Trend
            </h2>

          </div>

          <ResponsiveContainer width="100%" height={280}>

            <LineChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="day" />
              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#06b6d4"
                strokeWidth={4}
                dot={{ r: 4 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

     {/* ================= TREATMENT OVERVIEW ================= */}
<div
  className="
    relative overflow-hidden
    bg-white/80 backdrop-blur-2xl
    border border-white/60
    rounded-[32px]
    p-7
    shadow-[0_25px_70px_-20px_rgba(0,0,0,0.12)]
  "
>

  {/* BG GLOW */}
  <div className="absolute -top-16 -right-16 w-56 h-56 bg-sky-100/40 rounded-full blur-3xl"></div>
  <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-cyan-100/40 rounded-full blur-3xl"></div>

  {/* HEADER */}
  <div className="relative z-10 flex items-center justify-between mb-6">

    <div className="flex items-center gap-4">

      <div
        className="
          w-14 h-14 rounded-2xl
          bg-gradient-to-br from-sky-500 to-cyan-400
          text-white shadow-lg
          flex items-center justify-center
        "
      >
        <Pill size={26} />
      </div>

      <div>
        <h2 className="text-2xl font-black text-slate-800">
          Treatment Overview
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Current medications & treatment progress
        </p>
      </div>

    </div>

    <div
      className="
        px-4 py-2 rounded-2xl
        bg-sky-100 text-sky-700
        text-sm font-bold
      "
    >
      {plans.length} Plans
    </div>

  </div>

  {/* EMPTY */}
  {plans.length === 0 ? (

    <div
      className="
        relative z-10
        rounded-3xl
        border border-dashed border-slate-200
        bg-slate-50/70
        py-14 px-6
        text-center
      "
    >

      <div className="text-5xl mb-4">
        💊
      </div>

      <h3 className="text-lg font-bold text-slate-700">
        No Active Treatments
      </h3>

      <p className="text-sm text-slate-500 mt-2">
        There are currently no treatment plans assigned.
      </p>

    </div>

  ) : (

    <div className="relative z-10 space-y-5">

      {plans.slice(0, 2).map((p) => (

        <div
          key={p.id}
          className="
            group
            relative overflow-hidden
            rounded-[28px]
            border border-slate-100
            bg-gradient-to-br from-white to-slate-50
            p-6
            shadow-sm
            hover:shadow-xl
            hover:-translate-y-1
            transition-all duration-300
          "
        >

          {/* hover glow */}
          <div
            className="
              absolute inset-0 opacity-0
              group-hover:opacity-100
              transition
              bg-gradient-to-r from-sky-100/20 to-cyan-100/10
              pointer-events-none
            "
          />

          {/* TOP */}
          <div className="relative z-10 flex items-start justify-between mb-5">

            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-sky-600 mb-2">
                Diagnosis
              </div>

              <h3 className="text-xl font-black text-slate-800">
                {p.diagnosis}
              </h3>
            </div>

            <div
              className="
                px-4 py-2 rounded-2xl
                bg-emerald-100 text-emerald-700
                text-xs font-bold
              "
            >
              Active
            </div>

          </div>

          {/* MEDICATIONS */}
          <div className="relative z-10 mb-5">

            <div className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">
              Medications
            </div>

            <div
              className="
                rounded-2xl
                bg-slate-50
                border border-slate-100
                p-4
                text-slate-700
                leading-relaxed
              "
            >
              {p.medications}
            </div>

          </div>

          {/* STATUS */}
          <div className="relative z-10 flex flex-wrap gap-3">

            <div
              className="
                px-4 py-2 rounded-2xl
                bg-blue-50 text-blue-700
                text-sm font-semibold
              "
            >
              🩺 Under Monitoring
            </div>

            <div
              className="
                px-4 py-2 rounded-2xl
                bg-cyan-50 text-cyan-700
                text-sm font-semibold
              "
            >
              💊 Treatment Active
            </div>

          </div>

        </div>

      ))}

    </div>

  )}

</div>

    </div>
  );
}

/* ================= SUMMARY CARD ================= */

function SummaryCard({ title, value, icon, color }) {

  const styles = {
    cyan: "from-cyan-400 to-cyan-500",
    pink: "from-pink-400 to-pink-500",
    purple: "from-purple-400 to-purple-500",
    blue: "from-blue-400 to-blue-500",
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[28px] p-5 shadow-lg border border-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      <div
        className={`
          w-12 h-12 rounded-2xl bg-gradient-to-r ${styles[color]}
          flex items-center justify-center text-white mb-4
        `}
      >
        {icon}
      </div>

      <p className="text-slate-500 text-sm mb-1">
        {title}
      </p>

      <h2 className="text-2xl font-black text-slate-800">
        {value}
      </h2>

    </div>
  );
}