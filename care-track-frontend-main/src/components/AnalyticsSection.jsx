// import React from "react";
// import {
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// export default function AnalyticsSection() {
//   // بيانات نبض القلب (Line)
//   const heartRateData = [
//     { time: "10:00", bpm: 72 },
//     { time: "10:05", bpm: 76 },
//     { time: "10:10", bpm: 80 },
//     { time: "10:15", bpm: 78 },
//     { time: "10:20", bpm: 74 },
//     { time: "10:25", bpm: 77 },
//   ];

//   // توزيع الحالات (Pie)
//   const conditionsData = [
//     { name: "Cardio", value: 40 },
//     { name: "Diabetes", value: 25 },
//     { name: "Respiratory", value: 20 },
//     { name: "Other", value: 15 },
//   ];

//   const COLORS = ["#1e88e5", "#6f42c1", "#00b894", "#fdcb6e"];

//   // مواعيد المرضى (Bar)
//   const appointmentsData = [
//     { month: "Jan", count: 30 },
//     { month: "Feb", count: 22 },
//     { month: "Mar", count: 40 },
//     { month: "Apr", count: 28 },
//     { month: "May", count: 35 },
//   ];

//   return (
//     <div
//       style={{
//         padding: "50px 20px",
//         background: "#f5f8ff",
//       }}
//     >
//       <h2 style={{ textAlign: "center", marginBottom: "40px", fontSize: "32px", color: "#0a3d62" }}>
//         System Analytics Dashboard
//       </h2>

//       {/* المخططات */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
//           gap: "25px",
//           maxWidth: "1200px",
//           margin: "auto",
//         }}
//       >
//         {/* Line Chart */}
//         <div
//           style={{
//             background: "white",
//             borderRadius: "20px",
//             padding: "20px",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//           }}
//         >
//           <h3 style={{ marginBottom: "15px", color: "#1e88e5" }}>Heart Rate Over Time</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={heartRateData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="time" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="bpm" stroke="#1e88e5" strokeWidth={3} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Pie Chart */}
//         <div
//           style={{
//             background: "white",
//             borderRadius: "20px",
//             padding: "20px",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//           }}
//         >
//           <h3 style={{ marginBottom: "15px", color: "#6f42c1" }}>Medical Conditions</h3>

//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie
//                 data={conditionsData}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={40}
//                 outerRadius={80}
//                 paddingAngle={5}
//                 dataKey="value"
//               >
//                 {conditionsData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Bar Chart */}
//         <div
//           style={{
//             background: "white",
//             borderRadius: "20px",
//             padding: "20px",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//           }}
//         >
//           <h3 style={{ marginBottom: "15px", color: "#00b894" }}>Appointments Per Month</h3>

//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={appointmentsData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="count" fill="#00b894" radius={[6, 6, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }


// 222222222222222222222222222222222222222222222222222222222222222222222222222222222
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { Activity, HeartPulse, Thermometer } from "lucide-react";

export default function AnalyticsSection() {

  const vitalsData = [
    { time: "10:00", heart: 72, temp: 36.6 },
    { time: "10:05", heart: 76, temp: 36.7 },
    { time: "10:10", heart: 80, temp: 36.8 },
    { time: "10:15", heart: 78, temp: 36.7 },
    { time: "10:20", heart: 74, temp: 36.6 },
    { time: "10:25", heart: 77, temp: 36.7 },
  ];

  const riskData = [
    { name: "Normal", value: 65 },
    { name: "Risk", value: 25 },
    { name: "Critical", value: 10 },
  ];

  const COLORS = ["#0ea5e9", "#f59e0b", "#ef4444"];

  return (
    <section className="py-24 bg-gradient-to-b from-[#f8fbff] via-white to-[#eef7ff]">

      {/* HEADER */}
      <div className="text-center mb-16 px-4">

        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-sky-50 border border-sky-100 animate-pulse">
          <Activity className="text-sky-500" size={16} />
          <span className="text-xs text-sky-600 font-medium">
            Live Patient Monitoring
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-black">
          {/* <span className="text-sky-700">Clinical</span>{" "} */}
          <span className="bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
           System Analytics Dashboard
          </span>
        </h2>

        <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
          Real-time monitoring of heart rate, temperature, and patient risk status
          inside the medical system.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* HEART */}
        <div className="group bg-white/70 backdrop-blur-2xl border border-sky-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <HeartPulse className="text-rose-500" />
              <h3 className="font-bold text-slate-800">Heart Rate</h3>
            </div>

            <span className="text-[10px] px-2 py-1 rounded-full bg-rose-50 text-rose-500">
              LIVE
            </span>
          </div>

          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={vitalsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="heart"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* TEMP */}
        <div className="group bg-white/70 backdrop-blur-2xl border border-sky-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <Thermometer className="text-cyan-500" />
              <h3 className="font-bold text-slate-800">Temperature</h3>
            </div>

            <span className="text-[10px] px-2 py-1 rounded-full bg-cyan-50 text-cyan-600">
              STABLE
            </span>
          </div>

          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={vitalsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" />
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

        {/* RISK */}
        <div className="group bg-white/70 backdrop-blur-2xl border border-sky-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <Activity className="text-indigo-500" />
              <h3 className="font-bold text-slate-800">Health Status</h3>
            </div>

            <span className="text-[10px] px-2 py-1 rounded-full bg-indigo-50 text-indigo-600">
              ANALYSIS
            </span>
          </div>

          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={riskData} dataKey="value" outerRadius={90}>
                {riskData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </section>
  );
}