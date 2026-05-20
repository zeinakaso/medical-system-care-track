


// // *************************


// import React from "react";
// import { Users, Stethoscope, AlertTriangle, HeartPulse } from "lucide-react";

// export default function AdminAnalytics() {
//   return (
//     <div className="pt-24 px-4 md:px-6 bg-gray-50 min-h-screen">

//       {/* Header */}
//       <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">
//         📊 System Analytics
//       </h1>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">

//         <StatCard icon={<Users className="text-blue-600" />} title="Total Users" value="1,240" />
//         <StatCard icon={<Stethoscope className="text-green-600" />} title="Doctors" value="86" />
//         <StatCard icon={<HeartPulse className="text-pink-600" />} title="Patients" value="920" />
//         <StatCard icon={<AlertTriangle className="text-red-600" />} title="Emergency Today" value="12" />

//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//         {/* Bar Chart */}
//         <ChartCard title="Daily Visits">
//           <div className="flex items-end gap-2 h-48 w-full">
//             {[40, 70, 55, 90, 60, 80, 100].map((v, i) => (
//               <div
//                 key={i}
//                 style={{ height: `${v}%` }}
//                 className="w-6 sm:w-8 bg-blue-500 rounded"
//               />
//             ))}
//           </div>
//         </ChartCard>

//         {/* Line Chart */}
//         <ChartCard title="Average Heart Rate">
//           <div className="flex items-end gap-2 h-48 w-full">
//             {[65, 72, 70, 78, 75, 80, 82].map((v, i) => (
//               <div
//                 key={i}
//                 style={{ height: `${v}%` }}
//                 className="w-6 sm:w-8 bg-pink-500 rounded"
//               />
//             ))}
//           </div>
//         </ChartCard>

//       </div>
//     </div>
//   );
// }

// /* Components */
// function StatCard({ icon, title, value }) {
//   return (
//     <div className="bg-white p-4 md:p-5 rounded-xl shadow flex items-center gap-3">
//       {icon}
//       <div>
//         <p className="text-sm md:text-base text-gray-500">{title}</p>
//         <p className="text-xl md:text-2xl font-bold">{value}</p>
//       </div>
//     </div>
//   );
// }

// function ChartCard({ title, children }) {
//   return (
//     <div className="bg-white p-4 md:p-5 rounded-xl shadow w-full">
//       <h2 className="font-semibold mb-4">{title}</h2>
//       {children}
//     </div>
//   );
// }


// 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222

// import React, { useEffect, useMemo, useState } from "react";
// import API from "../../api";
// import {
//   Users,
//   Activity,
//   AlertTriangle,
//   HeartPulse,
// } from "lucide-react";

// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
//   CartesianGrid,
//   Legend,
// } from "recharts";

// export default function AdminAnalytics() {
//   const [treatments, setTreatments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await API.get("/treatment-plan");
//         setTreatments(res.data.data || []);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   /* ================= KPIs ================= */
//   const stats = useMemo(() => {
//     const total = treatments.length;

//     const active = treatments.filter(
//       (t) => new Date(t.end_date) > new Date()
//     ).length;

//     const expired = total - active;

//     const highRisk = treatments.filter((t) =>
//       (t.diagnosis || "").toLowerCase().includes("emergency")
//     ).length;

//     return { total, active, expired, highRisk };
//   }, [treatments]);

//   /* ================= 1. RISK DISTRIBUTION ================= */
//   const riskData = useMemo(() => {
//     return [
//       { name: "High Risk", value: stats.highRisk },
//       { name: "Stable", value: stats.active - stats.highRisk },
//       { name: "Completed", value: stats.expired },
//     ];
//   }, [stats]);

//   /* ================= 2. DIAGNOSIS LOAD ================= */
//   const diagnosisData = useMemo(() => {
//     const map = {};

//     treatments.forEach((t) => {
//       const key = t.diagnosis || "Unknown";
//       map[key] = (map[key] || 0) + 1;
//     });

//     return Object.keys(map).map((k) => ({
//       name: k,
//       value: map[k],
//     }));
//   }, [treatments]);

//   /* ================= 3. CLINICAL LOAD OVER TIME ================= */
//   const loadTrend = useMemo(() => {
//     return treatments.slice(0, 10).map((t, i) => ({
//       name: `Day ${i + 1}`,
//       load: Math.floor(Math.random() * 100) + 20,
//     }));
//   }, [treatments]);

//   const COLORS = ["#ef4444", "#10b981", "#6366f1"];

//   return (
//     <div className="min-h-screen pt-24 px-6 bg-gradient-to-br from-sky-50 via-white to-indigo-50">

//       {/* HEADER */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-black text-indigo-700 flex items-center gap-2">
//           Clinical Intelligence Dashboard 📊
//         </h1>
//         <p className="text-gray-500">
//           Turning medical data into decision support insights
//         </p>
//       </div>

//       {/* KPIs */}
//       <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">

//         <StatCard icon={<Users />} title="Total Cases" value={stats.total} />
//         <StatCard icon={<Activity />} title="Active Treatments" value={stats.active} />
//         <StatCard icon={<AlertTriangle />} title="High Risk" value={stats.highRisk} />
//         <StatCard icon={<HeartPulse />} title="Completed" value={stats.expired} />

//       </div>

//       {/* CHARTS */}
//       <div className="grid md:grid-cols-2 gap-6">

//         {/* PIE - RISK LEVEL (IMPORTANT CLINICAL VIEW) */}
//         <div className="bg-white p-5 rounded-2xl shadow">
//           <h2 className="font-semibold mb-4">Patient Risk Stratification</h2>

//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie data={riskData} dataKey="value" outerRadius={110} label>
//                 {riskData.map((_, i) => (
//                   <Cell key={i} fill={COLORS[i]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>

//           <p className="text-xs text-gray-500 mt-2">
//             → Used to prioritize medical attention and ICU allocation
//           </p>
//         </div>

//         {/* BAR - DIAGNOSIS LOAD */}
//         <div className="bg-white p-5 rounded-2xl shadow">
//           <h2 className="font-semibold mb-4">Diagnosis Frequency Load</h2>

//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={diagnosisData}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>

//           <p className="text-xs text-gray-500 mt-2">
//             → Helps detect most common medical conditions
//           </p>
//         </div>

//         {/* LINE - SYSTEM LOAD */}
//         <div className="bg-white p-5 rounded-2xl shadow md:col-span-2">
//           <h2 className="font-semibold mb-4">Hospital Workload Pressure Index</h2>

//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={loadTrend}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="load"
//                 stroke="#10b981"
//                 strokeWidth={3}
//               />
//             </LineChart>
//           </ResponsiveContainer>

//           <p className="text-xs text-gray-500 mt-2">
//             → Indicates hospital workload and resource demand
//           </p>
//         </div>

//       </div>

//       {loading && (
//         <p className="text-gray-500 mt-6">Loading clinical intelligence...</p>
//       )}
//     </div>
//   );
// }

// /* ================= CARD ================= */
// function StatCard({ icon, title, value }) {
//   return (
//     <div className="bg-white/70 backdrop-blur-xl p-5 rounded-2xl shadow flex items-center gap-3">
//       <div className="text-indigo-600">{icon}</div>
//       <div>
//         <p className="text-gray-500 text-sm">{title}</p>
//         <p className="text-2xl font-bold">{value}</p>
//       </div>
//     </div>
//   );
// }

// 3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333

import React, { useEffect, useMemo, useState } from "react";
import API from "../../api";

import {
  Users,
  Activity,
  AlertTriangle,
  HeartPulse,
  ShieldCheck,
  Brain,
  TrendingUp,
  ClipboardList,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
 Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from "recharts";

export default function AdminAnalytics() {

  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await API.get("/treatment-plan");

        setTreatments(res.data.data || []);

      } finally {

        setLoading(false);

      }
    };

    fetchData();

  }, []);

  /* ================= KPIs ================= */

  const stats = useMemo(() => {

    const total = treatments.length;

    const active = treatments.filter(
      (t) => new Date(t.end_date) > new Date()
    ).length;

    const expired = total - active;

    const highRisk = treatments.filter((t) =>
      (t.diagnosis || "").toLowerCase().includes("emergency")
    ).length;

    return {
      total,
      active,
      expired,
      highRisk,
    };

  }, [treatments]);

  /* ================= RISK ================= */

  const riskData = useMemo(() => {

    return [
      {
        name: "High Risk",
        value: stats.highRisk,
      },
      {
        name: "Stable",
        value: stats.active - stats.highRisk,
      },
      {
        name: "Completed",
        value: stats.expired,
      },
    ];

  }, [stats]);

  /* ================= DIAGNOSIS ================= */

  const diagnosisData = useMemo(() => {

    const map = {};

    treatments.forEach((t) => {

      const key = t.diagnosis || "Unknown";

      map[key] = (map[key] || 0) + 1;

    });

    return Object.keys(map).map((k) => ({
      name: k,
      value: map[k],
    }));

  }, [treatments]);

  /* ================= REAL TREATMENT TREND ================= */

  const treatmentTrend = useMemo(() => {

    const grouped = {};

    treatments.forEach((t) => {

      const date = new Date(
        t.created_at || t.updated_at
      ).toLocaleDateString();

      grouped[date] = (grouped[date] || 0) + 1;

    });

    return Object.keys(grouped).map((date) => ({
      date,
      treatments: grouped[date],
    }));

  }, [treatments]);

  /* ================= TREATMENT STATUS ================= */

  const treatmentProgress = useMemo(() => {

    return [
      {
        name: "Active",
        value: stats.active,
      },
      {
        name: "Completed",
        value: stats.expired,
      },
    ];

  }, [stats]);

  /* ================= COLORS ================= */

  const COLORS = [
    "#ef4444",
    "#10b981",
    "#6366f1",
  ];

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-100">

        <div className="w-14 h-14 border-[5px] border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>

        <h1 className="text-xl font-bold text-slate-700">
          Loading Analytics...
        </h1>

      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 md:px-8 bg-gradient-to-br from-sky-50 via-slate-50 to-indigo-100 overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[320px] h-[320px] bg-cyan-300/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-indigo-300/20 blur-[120px] rounded-full"></div>

      {/* HEADER */}
      <div className="relative z-10 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>

          <div className="flex items-center gap-4 mb-3">

            <div className="w-14 h-14 rounded-3xl bg-white shadow-lg flex items-center justify-center">

              <Brain className="text-indigo-600" size={28} />

            </div>

            <div>

              <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                Clinical Intelligence
              </h1>

              <p className="text-slate-500 mt-1 text-sm md:text-base">
                Smart analytics for patient treatment monitoring
              </p>

            </div>

          </div>

        </div>

        {/* STATUS */}
        <div className="bg-white/70 backdrop-blur-2xl border border-white rounded-[24px] px-6 py-4 shadow-lg">

          <p className="text-slate-500 text-xs mb-1">
            System Status
          </p>

          <h2 className="text-3xl font-black text-emerald-500">
            Stable
          </h2>

        </div>

      </div>

      {/* KPI */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <StatCard
          icon={<Users />}
          title="Total Cases"
          value={stats.total}
          color="cyan"
        />

        <StatCard
          icon={<Activity />}
          title="Active"
          value={stats.active}
          color="emerald"
        />

        <StatCard
          icon={<AlertTriangle />}
          title="High Risk"
          value={stats.highRisk}
          color="red"
        />

        <StatCard
          icon={<HeartPulse />}
          title="Completed"
          value={stats.expired}
          color="purple"
        />

      </div>

      {/* ALERT */}
      {stats.highRisk > 0 && (

        <div className="relative z-10 mb-8 bg-red-50 border border-red-200 rounded-[28px] p-5 shadow-lg">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">

              <AlertTriangle className="text-red-500" size={24} />

            </div>

            <div>

              <h2 className="text-xl font-bold text-red-600 mb-1">
                High Risk Patients Detected
              </h2>

              <p className="text-slate-600 text-sm leading-7">
                Emergency-level diagnoses were identified and may require immediate medical attention.
              </p>

            </div>

          </div>

        </div>

      )}

      {/* CHARTS */}
      <div className="relative z-10 grid xl:grid-cols-2 gap-7 mb-8">

        {/* PIE */}
        <div className="bg-white/70 backdrop-blur-2xl border border-white rounded-[30px] p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

          <div className="flex items-center gap-3 mb-4">

            <ShieldCheck className="text-indigo-500" size={22} />

            <h2 className="text-xl font-bold text-slate-700">
              Patient Risk Stratification
            </h2>

          </div>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={riskData}
                dataKey="value"
                outerRadius={110}
                label
              >

                {riskData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

          <p className="text-sm text-slate-500 mt-2">
            Patient distribution based on medical risk severity.
          </p>

        </div>

        {/* BAR */}
        <div className="bg-white/70 backdrop-blur-2xl border border-white rounded-[30px] p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

          <div className="flex items-center gap-3 mb-4">

            <ClipboardList className="text-cyan-500" size={22} />

            <h2 className="text-xl font-bold text-slate-700">
              Diagnosis Frequency
            </h2>

          </div>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={diagnosisData}>

              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="value"
                fill="#6366f1"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

          <p className="text-sm text-slate-500 mt-2">
            Shows the most common diagnoses inside the system.
          </p>

        </div>

        {/* REAL TREND */}
        <div className="bg-white/70 backdrop-blur-2xl border border-white rounded-[30px] p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl xl:col-span-2">

          <div className="flex items-center gap-3 mb-4">

            <TrendingUp className="text-emerald-500" size={22} />

            <h2 className="text-xl font-bold text-slate-700">
              Treatment Activity Trend
            </h2>

          </div>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={treatmentTrend}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />
              <YAxis />

              <Tooltip />
              <Legend />

              <Line
                type="monotone"
                dataKey="treatments"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />

            </LineChart>

          </ResponsiveContainer>

          <p className="text-sm text-slate-500 mt-2">
            Displays treatment activity growth based on real treatment plan records over time.
          </p>

        </div>

        {/* AREA */}
        <div className="bg-white/70 backdrop-blur-2xl border border-white rounded-[30px] p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl xl:col-span-2">

          <div className="flex items-center gap-3 mb-4">

            <HeartPulse className="text-pink-500" size={22} />

            <h2 className="text-xl font-bold text-slate-700">
              Treatment Completion Analytics
            </h2>

          </div>

          <ResponsiveContainer width="100%" height={300}>

            <AreaChart data={treatmentProgress}>

              <defs>

                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">

                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.7} />

                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />

                </linearGradient>

              </defs>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />
              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorUv)"
                strokeWidth={3}
              />

            </AreaChart>

          </ResponsiveContainer>

          <p className="text-sm text-slate-500 mt-2">
            Compares ongoing treatment plans with completed ones.
          </p>

        </div>

      </div>

    </div>
  );
}

/* ================= CARD ================= */

function StatCard({ icon, title, value, color }) {

  const colors = {
    cyan: "from-cyan-400 to-cyan-500",
    emerald: "from-emerald-400 to-emerald-500",
    red: "from-red-400 to-red-500",
    purple: "from-purple-400 to-purple-500",
  };

  return (
    <div className="bg-white/70 backdrop-blur-2xl border border-white rounded-[24px] p-5 shadow-lg flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${colors[color]} text-white flex items-center justify-center shadow-lg`}>

        {icon}

      </div>

      <div>

        <p className="text-slate-500 text-sm">
          {title}
        </p>

        <h2 className="text-2xl font-black text-slate-700">
          {value}
        </h2>

      </div>

    </div>
  );
}