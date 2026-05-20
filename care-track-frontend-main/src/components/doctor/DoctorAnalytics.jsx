// import React, { useEffect, useState } from "react";

// const API_BASE = "http://127.0.0.1:8000/api";

// export default function DoctorAnalytics() {
//   const [patients, setPatients] = useState([]);
//   const [vitalsMap, setVitalsMap] = useState({});
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   const headers = {
//     Authorization: "Bearer " + token,
//     "Content-Type": "application/json",
//   };

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/immutability
//     loadPatients();
//   }, []);

//   async function loadPatients() {
//     const res = await fetch(`${API_BASE}/doctor/patients`, { headers });
//     const json = await res.json();
//     const data = json.data || [];

//     setPatients(data);

//     data.forEach((p) => loadVitals(p));

//     setLoading(false);
//   }

//   async function loadVitals(patient) {
//     const name = patient.user_name || patient.patient_name;

//     const res = await fetch(
//       `${API_BASE}/vitalSign?patient_name=${encodeURIComponent(name)}`,
//       { headers }
//     );

//     const json = await res.json();

//     setVitalsMap((prev) => ({
//       ...prev,
//       [patient.id]: json.data || [],
//     }));
//   }

//   function getStatus(vitals) {
//     if (!vitals || !vitals.length) return "stable";

//     const v = vitals[0];

//     if (v.temperature > 39 || v.heart_rate > 120) return "critical";
//     if (v.temperature > 37.5 || v.heart_rate > 100) return "warning";

//     return "stable";
//   }

//   const stats = {
//     critical: patients.filter(p => getStatus(vitalsMap[p.id]) === "critical").length,
//     warning: patients.filter(p => getStatus(vitalsMap[p.id]) === "warning").length,
//     stable: patients.filter(p => getStatus(vitalsMap[p.id]) === "stable").length,
//   };

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center text-gray-500">
//         Loading Medical Data...
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-sky-50 min-h-screen space-y-6">

//       {/* HEADER */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-800">
//           Medical Intelligence Dashboard 🧠
//         </h1>
//         <p className="text-gray-500">
//           Real-time patient risk monitoring system
//         </p>
//       </div>

//       {/* KPI */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//         <Kpi title="Critical Patients" value={stats.critical} color="red" />
//         <Kpi title="Warning Patients" value={stats.warning} color="yellow" />
//         <Kpi title="Stable Patients" value={stats.stable} color="green" />

//       </div>

//       {/* PATIENT INSIGHTS */}
//       <div className="bg-white rounded-2xl shadow p-4">
//         <h2 className="font-bold mb-4">Patient Risk Overview</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

//           {patients.map((p) => {
//             const status = getStatus(vitalsMap[p.id]);

//             return (
//               <div
//                 key={p.id}
//                 className={`p-4 rounded-xl border shadow-sm
//                 ${status === "critical" ? "bg-red-50 border-red-200"
//                 : status === "warning" ? "bg-yellow-50 border-yellow-200"
//                 : "bg-green-50 border-green-200"}
//               `}
//               >
//                 <div className="font-semibold">
//                   {p.user_name || p.patient_name}
//                 </div>

//                 <div className="text-sm text-gray-500 mt-1">
//                   Status: {status}
//                 </div>
//               </div>
//             );
//           })}

//         </div>
//       </div>

//       {/* ALERT PANEL */}
//       <div className="bg-white rounded-2xl shadow p-4">
//         <h2 className="font-bold mb-3">Live Alerts 🔔</h2>

//         <div className="space-y-2">
//           {patients
//             .filter(p => getStatus(vitalsMap[p.id]) === "critical")
//             .map(p => (
//               <div key={p.id} className="p-3 bg-red-50 text-red-700 rounded-xl">
//                 🚨 {p.user_name || p.patient_name} requires immediate attention
//               </div>
//             ))}
//         </div>
//       </div>

//     </div>
//   );
// }

// /* KPI CARD */
// function Kpi({ title, value, color }) {
//   const colors = {
//     red: "text-red-600",
//     yellow: "text-yellow-600",
//     green: "text-green-600",
//   };

//   return (
//     <div className="bg-white p-5 rounded-2xl shadow text-center">
//       <p className="text-gray-500">{title}</p>
//       <h2 className={`text-3xl font-bold ${colors[color]}`}>
//         {value}
//       </h2>
//     </div>
//   );
// }



// 2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222


import React, { useEffect, useState } from "react";

import {
  AlertTriangle,
  Brain,
  HeartPulse,
  ShieldCheck,
  TrendingUp,
  Thermometer,
  Activity,
  Users,
  Siren,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts";

const API_BASE = "http://127.0.0.1:8000/api";

export default function DoctorAnalytics() {

  const [patients, setPatients] = useState([]);
  const [vitalsMap, setVitalsMap] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    loadPatients();
  }, []);

  async function loadPatients() {

    try {

      const res = await fetch(
        `${API_BASE}/doctor/patients`,
        { headers }
      );

      const json = await res.json();

      const data = json.data || [];

      setPatients(data);

      await Promise.all(
        data.map((p) => loadVitals(p))
      );

    } finally {

      setLoading(false);

    }
  }

  async function loadVitals(patient) {

    const name = patient.user_name || patient.patient_name;

    const res = await fetch(
      `${API_BASE}/vitalSign?patient_name=${encodeURIComponent(name)}`,
      { headers }
    );

    const json = await res.json();

    const sorted = (json.data || []).sort(
      (a, b) =>
        new Date(b.measured_at) -
        new Date(a.measured_at)
    );

    setVitalsMap((prev) => ({
      ...prev,
      [patient.id]: sorted,
    }));
  }

  /* ================= STATUS ================= */

  function getStatus(vitals) {

    if (!vitals || !vitals.length)
      return "stable";

    const v = vitals[0];

    if (
      v.temperature > 39 ||
      v.heart_rate > 120
    ) {
      return "critical";
    }

    if (
      v.temperature > 37.5 ||
      v.heart_rate > 100
    ) {
      return "warning";
    }

    return "stable";
  }

  /* ================= KPI ================= */

  const stats = {
    critical: patients.filter(
      (p) =>
        getStatus(vitalsMap[p.id]) ===
        "critical"
    ).length,

    warning: patients.filter(
      (p) =>
        getStatus(vitalsMap[p.id]) ===
        "warning"
    ).length,

    stable: patients.filter(
      (p) =>
        getStatus(vitalsMap[p.id]) ===
        "stable"
    ).length,

    total: patients.length,
  };

  /* ================= PIE ================= */

  const riskData = [
    {
      name: "Critical",
      value: stats.critical,
    },
    {
      name: "Warning",
      value: stats.warning,
    },
    {
      name: "Stable",
      value: stats.stable,
    },
  ];

  const COLORS = [
    "#ef4444",
    "#f59e0b",
    "#10b981",
  ];

  /* ================= HEART RATE TREND ================= */

  const heartTrend = patients.slice(0, 6).map(
    (p, index) => {

      const vitals =
        vitalsMap[p.id] || [];

      const latest = vitals[0];

      return {
        name: `P${index + 1}`,
        hr: Number(
          latest?.heart_rate || 0
        ),
      };
    }
  );

  /* ================= TEMPERATURE TREND ================= */

  const tempTrend = patients.slice(0, 6).map(
    (p, index) => {

      const vitals =
        vitalsMap[p.id] || [];

      const latest = vitals[0];

      return {
        name: `P${index + 1}`,
        temp: Number(
          latest?.temperature || 0
        ),
      };
    }
  );

  /* ================= RISK BAR ================= */

  const riskLevels = [
    {
      name: "Critical",
      value: stats.critical,
    },
    {
      name: "Warning",
      value: stats.warning,
    },
    {
      name: "Stable",
      value: stats.stable,
    },
  ];

  /* ================= LOADING ================= */

  if (loading) {

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-100">

        <div className="w-16 h-16 border-[5px] border-cyan-500 border-t-transparent rounded-full animate-spin mb-5"></div>

        <h1 className="text-2xl font-black text-slate-700">
          Loading Clinical Dashboard...
        </h1>

      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 md:px-8 bg-gradient-to-br from-sky-50 via-slate-50 to-indigo-100 overflow-hidden">

      {/* BG */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-300/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-300/20 blur-[120px] rounded-full"></div>

      {/* HEADER */}
      <div className="relative z-10 mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-3xl bg-white shadow-xl flex items-center justify-center">

            <Brain
              className="text-indigo-600"
              size={30}
            />

          </div>

          <div>

            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Doctor Analytics
            </h1>

            <p className="text-slate-500 mt-2">
              Smart patient monitoring and clinical insights
            </p>

          </div>

        </div>

        <div className="bg-white/70 backdrop-blur-2xl border border-white rounded-[28px] px-7 py-4 shadow-xl">

          <p className="text-slate-500 text-sm mb-1">
            Monitoring Status
          </p>

          <h2 className="text-3xl font-black text-emerald-500">
            Active
          </h2>

        </div>

      </div>

      {/* KPI */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <StatCard
          icon={<Users />}
          title="Total Patients"
          value={stats.total}
          color="cyan"
        />

        <StatCard
          icon={<Siren />}
          title="Critical"
          value={stats.critical}
          color="red"
        />

        <StatCard
          icon={<AlertTriangle />}
          title="Warning"
          value={stats.warning}
          color="yellow"
        />

        <StatCard
          icon={<ShieldCheck />}
          title="Stable"
          value={stats.stable}
          color="green"
        />

      </div>

      {/* ALERTS */}
      {stats.critical > 0 && (

        <div className="relative z-10 mb-8 bg-red-50 border border-red-200 rounded-[28px] p-5 shadow-lg">

          <div className="flex items-start gap-4">

            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">

              <AlertTriangle
                className="text-red-500"
                size={28}
              />

            </div>

            <div>

              <h2 className="text-xl font-black text-red-600 mb-2">
                Critical Patient Alert
              </h2>

              <p className="text-slate-700 leading-7 text-sm">
                Some patients currently show abnormal vital signs that may require immediate medical attention.
              </p>

            </div>

          </div>

        </div>

      )}

      {/* CHARTS */}
      <div className="relative z-10 grid xl:grid-cols-2 gap-8 mb-8">

        {/* PIE */}
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[30px] p-5 shadow-xl">

          <div className="flex items-center gap-3 mb-4">

            <ShieldCheck className="text-indigo-500" />

            <h2 className="text-xl font-black text-slate-700">
              Patient Risk Distribution
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
                  <Cell
                    key={i}
                    fill={COLORS[i]}
                  />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* BAR */}
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[30px] p-5 shadow-xl">

          <div className="flex items-center gap-3 mb-4">

            <TrendingUp className="text-cyan-500" />

            <h2 className="text-xl font-black text-slate-700">
              Risk Level Comparison
            </h2>

          </div>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={riskLevels}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />
              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#6366f1"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* HEART */}
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[30px] p-5 shadow-xl">

          <div className="flex items-center gap-3 mb-4">

            <HeartPulse className="text-pink-500" />

            <h2 className="text-xl font-black text-slate-700">
              Heart Rate Monitoring
            </h2>

          </div>

          <ResponsiveContainer width="100%" height={300}>

            <AreaChart data={heartTrend}>

              <defs>

                <linearGradient
                  id="heart"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#ec4899"
                    stopOpacity={0.5}
                  />

                  <stop
                    offset="95%"
                    stopColor="#ec4899"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />
              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="hr"
                stroke="#ec4899"
                fill="url(#heart)"
                strokeWidth={3}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

        {/* TEMP */}
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[30px] p-5 shadow-xl">

          <div className="flex items-center gap-3 mb-4">

            <Thermometer className="text-cyan-500" />

            <h2 className="text-xl font-black text-slate-700">
              Temperature Monitoring
            </h2>

          </div>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={tempTrend}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />
              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="temp"
                stroke="#06b6d4"
                strokeWidth={4}
                dot={{ r: 4 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* LIVE PATIENTS */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl border border-white rounded-[30px] p-6 shadow-xl">

        <div className="flex items-center gap-3 mb-5">

          <Activity className="text-indigo-500" />

          <h2 className="text-2xl font-black text-slate-700">
            Live Patient Monitoring
          </h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {patients.map((p) => {

            const vitals =
              vitalsMap[p.id] || [];

            const latest = vitals[0];

            const status =
              getStatus(vitals);

            return (

              <div
                key={p.id}
                className={`
                  rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1

                  ${
                    status === "critical"
                      ? "bg-red-50 border-red-200"
                      : status === "warning"
                      ? "bg-yellow-50 border-yellow-200"
                      : "bg-emerald-50 border-emerald-200"
                  }
                `}
              >

                <div className="flex items-center justify-between mb-4">

                  <h2 className="font-black text-slate-700">
                    {p.user_name ||
                      p.patient_name}
                  </h2>

                  <span
                    className={`
                      text-xs px-3 py-1 rounded-full font-bold

                      ${
                        status === "critical"
                          ? "bg-red-100 text-red-600"
                          : status === "warning"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-emerald-100 text-emerald-600"
                      }
                    `}
                  >
                    {status}
                  </span>

                </div>

                <div className="space-y-2 text-sm text-slate-700">

                  <p>
                    🌡 Temp:
                    {" "}
                    {latest?.temperature || "--"}
                  </p>

                  <p>
                    ❤️ HR:
                    {" "}
                    {latest?.heart_rate || "--"}
                  </p>

                  <p>
                    🩺 BP:
                    {" "}
                    {latest?.blood_pressure_systolic || "--"}
                    /
                    {latest?.blood_pressure_diastolic || "--"}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

/* ================= CARD ================= */

function StatCard({
  icon,
  title,
  value,
  color,
}) {

  const colors = {
    cyan: "from-cyan-400 to-cyan-500",
    red: "from-red-400 to-red-500",
    yellow: "from-yellow-400 to-yellow-500",
    green: "from-emerald-400 to-emerald-500",
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[28px] border border-white p-5 shadow-xl flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      <div
        className={`
          w-14 h-14 rounded-2xl
          bg-gradient-to-r ${colors[color]}
          flex items-center justify-center
          text-white shadow-lg
        `}
      >
        {icon}
      </div>

      <div>

        <p className="text-slate-500 text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-black text-slate-700">
          {value}
        </h2>

      </div>

    </div>
  );
}

