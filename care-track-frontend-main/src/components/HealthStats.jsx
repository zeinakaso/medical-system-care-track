
// import React, { useEffect, useState } from "react";
// import { Card, CardContent, Typography } from "@mui/material";
// /* eslint-disable no-unused-vars */
// import { motion } from "framer-motion";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import OpacityIcon from "@mui/icons-material/Opacity";
// import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
// import BloodtypeIcon from "@mui/icons-material/Bloodtype";

// const stats = [
//   { id: 1, label: "Heart Rate", icon: <FavoriteIcon fontSize="large" />, target: 78, unit: "bpm" },
//   { id: 2, label: "Oxygen Level", icon: <OpacityIcon fontSize="large" />, target: 97, unit: "%" },
//   { id: 3, label: "Temperature", icon: <DeviceThermostatIcon fontSize="large" />, target: 36.6, unit: "°C" },
//   { id: 4, label: "Blood Pressure", icon: <BloodtypeIcon fontSize="large" />, target: 120, unit: "mmHg" },
// ];

// export default function HealthStats() {
//   // التخزين للأرقام المتحركة
//   const [values, setValues] = useState(stats.map(() => 0));

//   // عدّاد Animated Counter
//   useEffect(() => {
//     const intervals = stats.map((item, index) => {
//       let current = 0;

//       return setInterval(() => {
//         current += item.target / 50;
//         if (current >= item.target) current = item.target;

//         setValues((prev) => {
//           const updated = [...prev];
//           updated[index] = Number(current.toFixed(1));
//           return updated;
//         });
//       }, 40);
//     });

//     return () => intervals.forEach((i) => clearInterval(i));
//   }, []);

//   return (
//     <div
//       style={{
//         padding: "60px 20px",
//         background: "linear-gradient(to bottom, #e8f1ff, #f6f9ff)",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* خلفية ECG */}
//       <div
//   style={{
//     position: "absolute",
//     inset: 0,
//     backgroundImage: `url("data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 200 C150 100 350 300 500 200 C650 100 750 300 900 200' stroke='%230a3d62' stroke-width='3' fill='none' opacity='0.08'/%3E%3C/svg%3E")`,
//     backgroundRepeat: "repeat-x",
//     backgroundSize: "cover",
//     opacity: 0.2,
//   }}
// ></div>

//       <div style={{ textAlign: "center", marginBottom: "40px" }}>
//         <h2 style={{ fontSize: "36px", color: "#0a3d62", marginBottom: "10px" }}>
//           Health Stats Live
//         </h2>
//         <p style={{ fontSize: "18px", color: "#555" }}>
//           Real-time vital signs with animated dynamic counters
//         </p>
//       </div>

//       {/* البطاقات */}
//       <motion.div
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true }}
//         variants={{
//           show: { transition: { staggerChildren: 0.25 } },
//         }}
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//           gap: "25px",
//           maxWidth: "1100px",
//           margin: "auto",
//         }}
//       >
//         {stats.map((stat, index) => (
//           <motion.div
//             key={stat.id}
//             variants={{
//               hidden: { opacity: 0, y: 40 },
//               show: { opacity: 1, y: 0 },
//             }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             <Card
//               elevation={3}
//               sx={{
//                 p: 2,
//                 textAlign: "center",
//                 borderRadius: "20px",
//                 background: "white",
//               }}
//             >
//               <CardContent>
//                 <div style={{ color: "#1e88e5", marginBottom: "10px" }}>{stat.icon}</div>

//                 <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                   {stat.label}
//                 </Typography>

//                 <Typography
//                   variant="h4"
//                   sx={{ color: "#0a3d62", marginTop: "10px", fontWeight: "bold" }}
//                 >
//                   {values[index]} {stat.unit}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   );
// }


// 2222222222222222222222222222222222222222222222222222222222222222222222222222

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

import FavoriteIcon from "@mui/icons-material/Favorite";
import OpacityIcon from "@mui/icons-material/Opacity";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";

const stats = [
  {
    id: 1,
    label: "Heart Rate",
    icon: <FavoriteIcon fontSize="large" />,
    target: 78,
    unit: "bpm",
    color: "from-rose-500 to-pink-500",
    glow: "bg-rose-400/20",
  },

  {
    id: 2,
    label: "Oxygen Level",
    icon: <OpacityIcon fontSize="large" />,
    target: 97,
    unit: "%",
    color: "from-cyan-500 to-sky-500",
    glow: "bg-cyan-400/20",
  },

  {
    id: 3,
    label: "Temperature",
    icon: <DeviceThermostatIcon fontSize="large" />,
    target: 36.6,
    unit: "°C",
    color: "from-amber-500 to-orange-500",
    glow: "bg-orange-400/20",
  },

  {
    id: 4,
    label: "Blood Pressure",
    icon: <BloodtypeIcon fontSize="large" />,
    target: 120,
    unit: "mmHg",
    color: "from-indigo-500 to-blue-500",
    glow: "bg-blue-400/20",
  },
];

export default function HealthStats() {

  const [values, setValues] = useState(stats.map(() => 0));

  // ================= COUNTER =================
  useEffect(() => {

    const intervals = stats.map((item, index) => {

      let current = 0;

      return setInterval(() => {

        current += item.target / 50;

        if (current >= item.target) current = item.target;

        setValues((prev) => {

          const updated = [...prev];

          updated[index] = Number(current.toFixed(1));

          return updated;

        });

      }, 40);

    });

    return () => intervals.forEach((i) => clearInterval(i));

  }, []);

  return (
    <section
      className="
        relative
        overflow-hidden
        py-28
        px-6
        bg-gradient-to-b
        from-[#eef6ff]
        via-[#f7fbff]
        to-[#e6f2ff]
      "
    >

      {/* BACKGROUND LIGHTS */}
      <div className="absolute top-0 left-0 w-[340px] h-[340px] bg-cyan-300/20 rounded-full blur-[130px]"></div>

      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-blue-400/20 rounded-full blur-[140px]"></div>

      {/* ECG BACKGROUND */}
      <div
        className="
          absolute inset-0 opacity-[0.05]
          bg-repeat-x bg-center
        "
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='900' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 200 C150 100 350 300 500 200 C650 100 750 300 900 200' stroke='%230f172a' stroke-width='3' fill='none'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-20">

          {/* BADGE */}
          <div className="
            inline-flex
            items-center
            gap-3
            px-6 py-3
            rounded-full
            bg-white/70
            backdrop-blur-xl
            border border-white/60
            shadow-lg
            mb-7
            animate-[fadeIn_1s_ease]
          ">

            <div className="relative">

              <div className="absolute w-3 h-3 rounded-full bg-green-500 animate-ping"></div>

              <div className="relative w-3 h-3 rounded-full bg-green-500"></div>

            </div>

            <span className="text-sm font-bold tracking-wide text-slate-700">
              Live Healthcare Monitoring
            </span>

          </div>

          {/* TITLE */}
          <h2
            className="
              text-4xl
              md:text-5xl
              font-black
              tracking-tight
              leading-[1.1]
              mb-6
            "
          >

            <span className="text-slate-800">
              Real-Time Patient
            </span>

            <br />

            <span
              className="
                bg-gradient-to-r
                from-blue-600
                via-sky-500
                to-cyan-400
                bg-clip-text
                text-transparent
              "
            >
              Health Statistics
            </span>

          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              max-w-3xl
              mx-auto
              text-slate-600
              text-lg
              md:text-xl
              leading-relaxed
            "
          >
            Real-time vital signs with animated dynamic counters
            displayed through a modern and intelligent healthcare dashboard.
          </p>

        </div>

        {/* STATS */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            show: {
              transition: {
                staggerChildren: 0.18,
              },
            },
          }}
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-7
          "
        >

          {stats.map((stat, index) => (

            <motion.div
              key={stat.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 40,
                },

                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
              className="group"
            >

              <Card
                elevation={0}
                className="
                  relative
                  overflow-hidden
                  rounded-[32px]
                  border border-white/60
                  bg-white/75
                  backdrop-blur-2xl
                  transition-all duration-700
                  hover:-translate-y-2
                  hover:shadow-[0_25px_60px_rgba(59,130,246,0.14)]
                "
                sx={{
                  borderRadius: "32px",
                  background: "rgba(255,255,255,0.75)",
                }}
              >

                {/* GLOW */}
                <div
                  className={`
                    absolute
                    -top-12
                    -right-12
                    w-40
                    h-40
                    rounded-full
                    blur-[90px]
                    opacity-30
                    transition-all duration-700
                    group-hover:scale-125
                    ${stat.glow}
                  `}
                ></div>

                {/* SHINE */}
                <div className="
                  absolute inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity duration-700
                  pointer-events-none
                ">

                  <div className="
                    absolute
                    top-0
                    -left-[120%]
                    h-full
                    w-[45%]
                    rotate-[12deg]
                    bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.35),transparent)]
                    group-hover:left-[150%]
                    transition-all duration-[1400ms]
                  "></div>

                </div>

                <CardContent className="relative z-10 p-8 text-center">

                  {/* ICON */}
                  <div className="flex justify-center mb-6">

                    <div
                      className={`
                        relative
                        w-[82px]
                        h-[82px]
                        rounded-[26px]
                        flex
                        items-center
                        justify-center
                        text-white
                        bg-gradient-to-br
                        ${stat.color}
                        shadow-[0_14px_35px_rgba(59,130,246,0.20)]
                        transition-all duration-500
                        group-hover:scale-105
                        group-hover:-translate-y-1
                      `}
                    >

                      <div className="
                        absolute inset-[1px]
                        rounded-[25px]
                        bg-white/10
                      "></div>

                      <div className="relative z-10">
                        {stat.icon}
                      </div>

                    </div>

                  </div>

                  {/* LABEL */}
                  <Typography
                    variant="h6"
                    className="
                      !text-slate-700
                      !font-bold
                      !text-[16px]
                      !mb-5
                    "
                  >
                    {stat.label}
                  </Typography>

                  {/* VALUE */}
                  <Typography
                    variant="h3"
                    className="
                      !font-black
                      tracking-tight
                    "
                  >

                   <span
  className="
    bg-gradient-to-r from-slate-800 to-slate-600
    bg-clip-text text-transparent
    text-2xl
  "
>
  {values[index]}
</span>

                    <span className="text-slate-400 text-[15px] ml-2">
                      {stat.unit}
                    </span>

                  </Typography>

                  {/* MINI LINE */}
                  <div
                    className={`
                      mt-7
                      mx-auto
                      h-[4px]
                      w-14
                      rounded-full
                      bg-gradient-to-r
                      ${stat.color}
                      transition-all duration-700
                      group-hover:w-24
                    `}
                  ></div>

                </CardContent>

              </Card>

            </motion.div>

          ))}

        </motion.div>

      </div>

      {/* ANIMATIONS */}
      <style>
        {`
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