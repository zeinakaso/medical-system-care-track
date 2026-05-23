// import { Card, CardContent, Typography } from "@mui/material";
// import HealingIcon from "@mui/icons-material/Healing";
// import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
// import SupportAgentIcon from "@mui/icons-material/SupportAgent";
// import CloudDoneIcon from "@mui/icons-material/CloudDone";
// import EventAvailableIcon from "@mui/icons-material/EventAvailable";
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
// import { useEffect } from "react";

// export default function Features2() {
//   const features = [
//     {
//       title: "Real-Time Patient Monitoring",
//       desc: "CareTrack continuously observes vital signs and updates medical data instantly for safer decisions.",
//       icon: <MonitorHeartIcon sx={{ fontSize: 40 }} />,
//     },
//     {
//       title: "Smart Medical Records",
//       desc: "Automatically organized medical files accessible securely to doctors, nurses, and patients.",
//       icon: <HealingIcon sx={{ fontSize: 40 }} />,
//     },
//     // {
//     //   title: "Seamless Communication",
//     //   desc: "Direct messaging channels between medical staff and patients for fast and effective care.",
//     //   icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
//     // },
//     {
//       title: "AI Health Predictions",
//       desc: "AI-powered suggestions based on patient data to detect issues before they appear.",
//       icon: <AutoAwesomeIcon sx={{ fontSize: 40 }} />,
//     },
//     {
//       title: "Smart Appointment Scheduling",
//       desc: "Organize and manage medical appointments with automated reminders.",
//       icon: <EventAvailableIcon sx={{ fontSize: 40 }} />,
//     },
//     {
//       title: "Secure Cloud Storage",
//       desc: "Encrypted storage for all medical records for maximum safety and availability.",
//       icon: <CloudDoneIcon sx={{ fontSize: 40 }} />,
//     }
//   ];

//   // ⭐ Apply fade + slide + stagger
//   useEffect(() => {
//     const cards = document.querySelectorAll(".fade-card");

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             // assign stagger delay based on card index
//             entry.target.style.transitionDelay = entry.target.dataset.delay + "ms";
//             entry.target.classList.add("show");
//           }
//         });
//       },
//       { threshold: 0.2 }
//     );

//     cards.forEach((card) => observer.observe(card));
//   }, []);

//   return (
//     <section className="w-full py-24 bg-gradient-to-b from-white to-blue-50" id="features">
//       <div className="container mx-auto px-6 text-center">

//         <h2 className="text-5xl font-extrabold text-blue-700 mb-4 tracking-tight">
//           Powerful Features
//         </h2>

//         <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-700 rounded-full mx-auto mb-14"></div>

//         <div className="grid md:grid-cols-3 gap-10">
//           {features.map((f, i) => (
//             <Card
//               key={i}
//               data-delay={i * 120}   // ⭐ Stagger: 120ms between each card
//               className="
//                 fade-card opacity-0 translate-y-10 
//                 transition-all duration-700 
//                 rounded-3xl hover:-translate-y-3 
//                 hover:shadow-blue-200 shadow-xl 
//                 backdrop-blur-lg bg-white/60 border border-blue-100
//               "
//               sx={{
//                 borderRadius: "26px",
//                 padding: "20px",
//               }}
//             >
//               <CardContent>

//                 {/* Icon Circle */}
//                 <div className="flex justify-center mb-6">
//                   <div className="
//                     w-20 h-20 flex items-center justify-center rounded-full 
//                     bg-gradient-to-br from-blue-100 to-blue-300
//                     shadow-inner shadow-blue-200 
//                     text-blue-700
//                   ">
//                     {f.icon}
//                   </div>
//                 </div>

//                 <Typography
//                   variant="h6"
//                   className="text-blue-800 font-bold mb-3 tracking-wide"
//                 >
//                   {f.title}
//                 </Typography>

//                 <Typography
//                   variant="body2"
//                   className="text-gray-600 leading-relaxed px-3"
//                 >
//                   {f.desc}
//                 </Typography>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//       {/* Styles */}
//       <style>
//         {`
//           .fade-card.show {
//             opacity: 1 !important;
//             transform: translateY(0) !important;
//           }
//         `}
//       </style>
//     </section>
//   );
// }
// 222222222222222222222222222222222222222222222222222222222222222222222222222222222222
import { useEffect } from "react";

import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import HealingIcon from "@mui/icons-material/Healing";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import TimelineIcon from "@mui/icons-material/Timeline";

export default function Features2() {

  const services = [
    {
      title: "Live Clinical Monitoring",
      desc: "Monitor patient vital signs including temperature, heart rate, respiratory rate, and blood pressure in real time.",
      icon: <MonitorHeartIcon sx={{ fontSize: 34 }} />,
      color: "from-cyan-500 to-sky-500",
      bg: "bg-cyan-500/10",
    },

    {
      title: "Digital Medical Records",
      desc: "Access organized patient medical records securely through a modern healthcare dashboard.",
      icon: <HealingIcon sx={{ fontSize: 34 }} />,
      color: "from-blue-500 to-indigo-500",
      bg: "bg-blue-500/10",
    },

    {
      title: "Treatment Management",
      desc: "Review treatment plans, medications, and medical instructions in one centralized platform.",
      icon: <EventAvailableIcon sx={{ fontSize: 34 }} />,
      color: "from-indigo-500 to-blue-500",
      bg: "bg-indigo-500/10",
    },

    {
      title: "Patient Health Timeline",
      desc: "Track previous clinical records and monitor patient health progress over time.",
      icon: <TimelineIcon sx={{ fontSize: 34 }} />,
      color: "from-sky-500 to-cyan-500",
      bg: "bg-sky-500/10",
    },
  ];

  // ================= SCROLL ANIMATION =================
  useEffect(() => {

    const items = document.querySelectorAll(".service-item");

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            entry.target.classList.add("show-service");
          }

        });

      },
      {
        threshold: 0.15,
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();

  }, []);

  return (
    <section
      className="
        relative
        overflow-hidden
        py-28
        bg-gradient-to-b
        from-[#f8fbff]
        via-[#eef7ff]
        to-[#e5f3ff]
      "
    >

      {/* BACKGROUND LIGHTS */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-cyan-300/20 rounded-full blur-[130px]"></div>

      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-blue-400/20 rounded-full blur-[140px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* TOP SECTION */}
        <div className="text-center mb-24">

          <div className="
            inline-flex
            items-center
            gap-3
            px-6 py-3
            rounded-full
            bg-white/70
            backdrop-blur-xl
            border border-white/50
            shadow-lg
            mb-7
            animate-[fadeIn_1s_ease]
          ">

            <div className="relative">

              <div className="absolute w-3 h-3 rounded-full bg-green-500 animate-ping"></div>

              <div className="relative w-3 h-3 rounded-full bg-green-500"></div>

            </div>

            <span className="text-sm font-bold text-slate-700 tracking-wide">
              Advanced Healthcare Services
            </span>

          </div>

<h2
  className="
    text-3xl
    md:text-5xl
    font-black
    leading-[1.15]
    tracking-[-0.03em]
    mb-6
    animate-[fadeUp_1s_ease]
  "
>

  <span className="block text-slate-800">
    Intelligent Healthcare
  </span>

  <span
    className="
      block mt-2
      bg-gradient-to-r
      from-blue-600
      via-sky-500
      to-cyan-400
      bg-clip-text
      text-transparent
    "
  >
    Designed For Modern Care
  </span>

</h2>

          <p className="
            max-w-3xl
            mx-auto
            text-slate-600
            text-base
md:text-lg
            leading-relaxed
            animate-[fadeUp_1.2s_ease]
          ">
            A modern healthcare system that helps patients monitor vital signs,
            access medical records, review treatment plans, and follow health
            progress through an organized clinical dashboard.
          </p>

        </div>

        {/* SERVICES */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

  {services.map((item, i) => (

    <div
      key={i}
      className="
        service-item
        opacity-0
        translate-y-8
        relative
        group
      "
      style={{
        transitionDelay: `${i * 120}ms`,
      }}
    >

      {/* CARD */}
      <div
        className="
          relative
          overflow-hidden
          rounded-[32px]
          border border-white/60
          bg-white/75
          backdrop-blur-[24px]
          px-8
          py-8
          transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
          shadow-[0_10px_40px_rgba(15,23,42,0.06)]
          hover:-translate-y-2
          hover:scale-[1.015]
          hover:shadow-[0_28px_70px_rgba(59,130,246,0.16)]
          hover:border-cyan-100
        "
      >

        {/* SOFT LIGHT */}
        <div
          className={`
            absolute
            -top-10
            -right-10
            w-44
            h-44
            rounded-full
            blur-[95px]
            opacity-20
            transition-all duration-700
            group-hover:scale-125
            ${item.bg}
          `}
        ></div>

        {/* LIGHT OVERLAY */}
        <div className="
          absolute inset-0
          rounded-[32px]
          opacity-0
          transition-all duration-700
          group-hover:opacity-100
          bg-[linear-gradient(135deg,rgba(255,255,255,0.55),transparent_45%)]
        "></div>

        {/* CONTENT */}
        <div className="relative z-10 flex items-start gap-5">

          {/* ICON */}
          <div
            className={`
              relative
              min-w-[74px]
              h-[74px]
              rounded-[24px]
              flex
              items-center
              justify-center
              text-white
              bg-gradient-to-br
              ${item.color}
              shadow-[0_14px_30px_rgba(59,130,246,0.24)]
              transition-all duration-700 ease-out
              group-hover:-translate-y-1
              group-hover:scale-105
            `}
          >

            {/* ICON INNER LIGHT */}
            <div className="
              absolute inset-[1px]
              rounded-[23px]
              bg-white/10
            "></div>

            <div className="relative z-10">
              {item.icon}
            </div>

          </div>

          {/* TEXT */}
          <div className="flex-1 pt-1">

            <h3
              className="
                text-[23px]
                md:text-[24px]
                font-[850]
                tracking-[-0.03em]
                text-slate-800
                mb-3
                leading-tight
              "
            >
              {item.title}
            </h3>

            <p
              className="
                text-[15px]
                leading-[1.9]
                text-slate-500
                font-medium
              "
            >
              {item.desc}
            </p>

          </div>

        </div>

        {/* BOTTOM ACCENT */}
        <div
          className={`
            absolute
            left-8
            bottom-0
            h-[3px]
            w-14
            rounded-full
            bg-gradient-to-r
            ${item.color}
            transition-all duration-700
            group-hover:w-28
          `}
        ></div>

        {/* SHINE EFFECT */}
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
            bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.32),transparent)]
            group-hover:left-[150%]
            transition-all
            duration-[1500ms]
            ease-out
          "></div>

        </div>

      </div>

    </div>

  ))}

</div>

      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          .show-service {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(40px);
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