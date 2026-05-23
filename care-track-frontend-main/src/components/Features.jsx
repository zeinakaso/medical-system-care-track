// // MUI Components
// import { Card, CardContent, CardMedia, Typography } from "@mui/material";
// import {
//   HealthAndSafety,
//   MonitorHeart,
//   Groups,
//   EventAvailable,
// } from "@mui/icons-material";

// export default function Features() {
//   const features = [
//     {
//       title: "Medical Records",
//       desc: "Track and access your full medical history in a secure, organized dashboard.",
//       icon: <HealthAndSafety sx={{ fontSize: 60, color: "#0d5f8a" }} />,
//     },
//     {
//       title: "Smart Monitoring",
//       desc: "Monitor symptoms, vitals, and medications with intelligent reminders.",
//       icon: <MonitorHeart sx={{ fontSize: 60, color: "#0d5f8a" }} />,
//     },
//     // {
//     //   title: "Doctor Connection",
//     //   desc: "Stay connected with your doctors through instant updates and communication.",
//     //   icon: <Groups sx={{ fontSize: 60, color: "#0d5f8a" }} />,
//     // },
//     {
//       title: "Appointments",
//       desc: "Manage appointments easily with automated follow-ups and reminders.",
//       icon: <EventAvailable sx={{ fontSize: 60, color: "#0d5f8a" }} />,
//     },
//   ];

//   return (
//     <section className="w-full py-24 bg-gradient-to-b from-white to-[#e1f3ff]">

//       <div className="text-center mb-16 px-4">
//         <h2 className="text-4xl md:text-5xl font-bold text-[#0d5f8a] mb-4">
//           What Our System Provides
//         </h2>
//         <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//           A modern digital healthcare system designed to simplify your journey,
//           enhance communication, and keep you in control of your health.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-8 md:px-20">
//         {features.map((f, index) => (
//           <Card
//             key={index}
//             className="shadow-xl rounded-3xl hover:scale-105 transition-all duration-300"
//             sx={{
//               borderRadius: "26px",
//               paddingTop: "20px",
//               background: "white",
//             }}
//           >
//             <div className="flex justify-center">{f.icon}</div>

//             <CardContent>
//               <Typography
//                 variant="h5"
//                 className="text-center font-bold text-[#0d5f8a] mb-2"
//               >
//                 {f.title}
//               </Typography>

//               <Typography
//                 variant="body2"
//                 className="text-center text-gray-600 leading-relaxed"
//               >
//                 {f.desc}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </section>
//   );
// }
// // 22222222222222222222222222222222222222222222222222222222222222222222222222222222
// import React, { useEffect, useState } from "react";
// import { Card, CardContent, Typography } from "@mui/material";
// import {
//   HealthAndSafety,
//   MonitorHeart,
// } from "@mui/icons-material";

// export default function Features() {

//   const [heartRate, setHeartRate] = useState(78);
//   const [temp, setTemp] = useState(36.7);

//   // live simulation
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setHeartRate((prev) =>
//         Math.max(60, Math.min(110, prev + (Math.random() * 4 - 2)))
//       );

//       setTemp((prev) =>
//         Math.max(36, Math.min(38, prev + (Math.random() * 0.1 - 0.05)))
//       );
//     }, 2500);

//     return () => clearInterval(interval);
//   }, []);

//   const getStatus = (value, type) => {
//     if (type === "heart") {
//       if (value < 60 || value > 100) return "Critical";
//       if (value < 70 || value > 90) return "Risk";
//       return "Normal";
//     }

//     if (type === "temp") {
//       if (value < 36 || value > 38) return "Critical";
//       if (value < 36.5 || value > 37.5) return "Risk";
//       return "Normal";
//     }
//   };

//   const statusStyle = (status) => {
//     if (status === "Normal") return "text-emerald-600 bg-emerald-50";
//     if (status === "Risk") return "text-amber-600 bg-amber-50";
//     return "text-red-600 bg-red-50";
//   };

//   const features = [
//     {
//       title: "Medical Records",
//       desc: "Secure access to full patient medical history in a structured system.",
//       icon: <HealthAndSafety sx={{ fontSize: 60, color: "#0d5f8a" }} />,
//       type: "static",
//     },
//     {
//       title: "Smart Monitoring",
//       desc: "Real-time patient monitoring with integrated vital signs tracking.",
//       icon: <MonitorHeart sx={{ fontSize: 60, color: "#0d5f8a" }} />,
//       type: "live",
//     },
//   ];

//   return (
//     <section className="w-full py-24 bg-gradient-to-b from-white to-[#e1f3ff]">

//       {/* HEADER */}
//       <div className="text-center mb-16 px-4">
//         <h2 className="text-4xl font-bold text-[#0d5f8a] mb-4">
//           What Our System Provides
//         </h2>

//         <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//           A clinical healthcare system designed for structured records and real-time monitoring.
//         </p>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-8 md:px-20">

//         {features.map((f, index) => (
//           <Card
//             key={index}
//             sx={{
//               borderRadius: "26px",
//               background: "white",
//               boxShadow: "0 10px 25px rgba(13, 95, 138, 0.08)",
//               border: "1px solid rgba(13, 95, 138, 0.1)",
//             }}
//           >

//             <CardContent className="p-6 text-center">

//               {/* STATIC CARD */}
//               {f.type === "static" && (
//                 <>
//                   <div className="flex justify-center mb-4">
//                     {f.icon}
//                   </div>

//                   <Typography
//                     variant="h6"
//                     sx={{ fontWeight: "bold", color: "#0d5f8a", mb: 1 }}
//                   >
//                     {f.title}
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     sx={{ color: "#6b7280" }}
//                   >
//                     {f.desc}
//                   </Typography>
//                 </>
//               )}

//               {/* LIVE MONITORING CARD */}
//               {f.type === "live" && (
//                 <div className="space-y-5">

//                   <Typography
//                     variant="h6"
//                     sx={{ fontWeight: "bold", color: "#0d5f8a" }}
//                   >
//                     🫀 {f.title}
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     sx={{ color: "#6b7280", mb: 2 }}
//                   >
//                     {f.desc}
//                   </Typography>

//                   {/* HEART */}
//                   <div className="text-left">
//                     <div className="flex justify-between mb-1">
//                       <span className="text-xs text-[#0d5f8a]">Heart Rate</span>
//                       <span className={`text-xs px-2 py-1 rounded-full ${statusStyle(getStatus(heartRate, "heart"))}`}>
//                         {getStatus(heartRate, "heart")}
//                       </span>
//                     </div>

//                     <div className="text-xl font-bold text-[#0d5f8a]">
//                       {Math.round(heartRate)} bpm
//                     </div>

//                     <div className="h-2 bg-sky-100 rounded-full overflow-hidden mt-2">
//                       <div
//                         className="h-full bg-[#0d5f8a]"
//                         style={{
//                           width: `${(heartRate / 120) * 100}%`,
//                           transition: "width 0.5s ease",
//                         }}
//                       />
//                     </div>
//                   </div>

//                   {/* TEMP */}
//                   <div className="text-left">
//                     <div className="flex justify-between mb-1 mt-4">
//                       <span className="text-xs text-[#0d5f8a]">Temperature</span>
//                       <span className={`text-xs px-2 py-1 rounded-full ${statusStyle(getStatus(temp, "temp"))}`}>
//                         {getStatus(temp, "temp")}
//                       </span>
//                     </div>

//                     <div className="text-xl font-bold text-[#0d5f8a]">
//                       {temp.toFixed(1)} °C
//                     </div>
//                   </div>

//                 </div>
//               )}

//             </CardContent>
//           </Card>
//         ))}

//       </div>

//     </section>
//   );
// }

// 33333333333333333333333333333333333333333333333333333333333333333333333333
import {
  HeartPulse,
  Activity,
  ShieldCheck,
  FileHeart,
} from "lucide-react";

export default function Features() {

  const features = [
    {
      title: "Medical Records",
      desc: "Access and manage patient medical records securely through an organized healthcare dashboard.",
      icon: <FileHeart size={42} />,
      color: "from-blue-500 to-cyan-400",
      glow: "bg-blue-400/20",
      badge: "Secure Access",
    },

    {
      title: "Vitals Monitoring",
      desc: "Track important vital signs including temperature, heart rate, blood pressure, and respiratory rate.",
      icon: <HeartPulse size={42} />,
      color: "from-cyan-500 to-sky-400",
      glow: "bg-cyan-400/20",
      badge: "Real-Time",
    },

    {
      title: "Treatment Plans",
      desc: "View treatment plans, medications, and patient clinical instructions in one place.",
      icon: <ShieldCheck size={42} />,
      color: "from-indigo-500 to-blue-500",
      glow: "bg-indigo-400/20",
      badge: "Clinical Care",
    },

    {
      title: "Health History",
      desc: "Monitor previous clinical records and review patient health progress over time.",
      icon: <Activity size={42} />,
      color: "from-sky-500 to-cyan-500",
      glow: "bg-sky-400/20",
      badge: "Patient Insights",
    },
  ];

  return (
    <section className="relative overflow-hidden py-28 bg-gradient-to-b from-white via-sky-50 to-blue-100">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-cyan-300/20 rounded-full blur-[120px] animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[120px] animate-pulse"></div>

      {/* GRID BACKGROUND */}
      {/* <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:45px_45px]"></div>
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20 animate-[fadeIn_1s_ease]">

          {/* TOP BADGE */}
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-2xl border border-white/50 shadow-xl px-6 py-3 rounded-full mb-7">

            <div className="relative flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full relative"></div>
            </div>

            <span className="text-sm font-bold text-slate-700 tracking-wide">
              Smart Healthcare Monitoring Platform
            </span>

          </div>

          {/* TITLE */}
         <h2 className="
    text-4xl
    md:text-6xl
    font-black
    leading-[1.15]
    tracking-tight
    mb-7
    text-slate-800
  ">


    <span className="
      bg-gradient-to-r
      from-blue-600
      via-sky-500
      to-cyan-400
      bg-clip-text
      text-transparent
    ">
     What Our System Provides
    </span>

  </h2>

          {/* DESCRIPTION */}
          <p className="max-w-3xl mx-auto text-slate-600 text-lg leading-relaxed">
            A smart healthcare dashboard designed to help patients monitor vital signs,
            access medical records, and manage treatment plans securely through an
            organized and modern clinical platform.
          </p>

        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          {features.map((f, index) => (

            <div
              key={index}
              className="
                group
                relative
                overflow-hidden
                rounded-[34px]
                bg-white/65
                backdrop-blur-2xl
                border border-white/50
                shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)]
                hover:shadow-[0_25px_70px_-15px_rgba(59,130,246,0.35)]
                hover:-translate-y-4
                transition-all duration-700
                p-7
              "
              style={{
                animation: `fadeUp 0.7s ease ${index * 0.15}s both`,
              }}
            >

              {/* GLOW */}
              <div className={`absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl ${f.glow} group-hover:scale-125 transition-all duration-700`} />

              {/* SHINE EFFECT */}
              <div className="
                absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700
                bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.35),transparent)]
                -translate-x-full group-hover:translate-x-full
              "></div>

              {/* BADGE */}
              <div className="relative z-10 mb-5">

                <div className={`
                  inline-flex
                  items-center
                  px-4 py-2
                  rounded-full
                  text-xs
                  font-bold
                  text-white
                  bg-gradient-to-r ${f.color}
                  shadow-lg
                `}>
                  {f.badge}
                </div>

              </div>

              {/* ICON */}
              <div
                className={`
                  relative z-10
                  w-20 h-20
                  rounded-[26px]
                  bg-gradient-to-r ${f.color}
                  text-white
                  flex items-center justify-center
                  shadow-xl
                  mb-7
                  group-hover:scale-110
                  group-hover:rotate-3
                  transition-all duration-500
                `}
              >

                {/* ICON GLOW */}
                <div className="absolute inset-0 rounded-[26px] bg-white/20 blur-xl"></div>

                <div className="relative z-10">
                  {f.icon}
                </div>

              </div>

              {/* CONTENT */}
              <div className="relative z-10">

                <h3 className="text-2xl font-black text-slate-800 mb-4 leading-snug">
                  {f.title}
                </h3>

                <p className="text-slate-600 leading-relaxed text-[15px]">
                  {f.desc}
                </p>

              </div>

              {/* HOVER LINE */}
              <div className={`
                absolute bottom-0 left-0
                h-1.5 w-0
                bg-gradient-to-r ${f.color}
                rounded-full
                group-hover:w-full
                transition-all duration-700
              `}></div>

            </div>

          ))}

        </div>

      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }
        `}
      </style>

    </section>
  );
}