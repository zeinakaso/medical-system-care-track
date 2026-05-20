// import {
//   HeartPulse,
//   AlertTriangle,
//   Stethoscope,
//   BarChart3,
//   FileText,
//   Users,
//   Settings,
// } from "lucide-react";

// export default function Services() {
//   const services = [
//     {
//       title: "Patient Monitoring",
//       desc: "Real-time monitoring of patient vitals including temperature, heart rate, and blood pressure.",
//       icon: <HeartPulse size={30} />,
//       color: "from-red-400 to-pink-500",
//     },
//     {
//       title: "Emergency & Alerts",
//       desc: "Automatic detection of critical cases with instant alerts for rapid response.",
//       icon: <AlertTriangle size={30} />,
//       color: "from-yellow-400 to-orange-500",
//     },
//     {
//       title: "Doctor Dashboard",
//       desc: "Centralized dashboard for doctors to manage patients, alerts, and medical notes.",
//       icon: <Stethoscope size={30} />,
//       color: "from-blue-400 to-cyan-500",
//     },
//     {
//       title: "Medical Analytics",
//       desc: "Advanced charts and reports to analyze patient health trends and statistics.",
//       icon: <BarChart3 size={30} />,
//       color: "from-indigo-400 to-purple-500",
//     },
//     {
//       title: "Medical Records",
//       desc: "Secure storage and management of patient medical records and reports.",
//       icon: <FileText size={30} />,
//       color: "from-emerald-400 to-teal-500",
//     },
//     {
//       title: "User Management",
//       desc: "Role-based access control for admins, doctors, and staff members.",
//       icon: <Users size={30} />,
//       color: "from-sky-400 to-blue-500",
//     },
//     {
//       title: "System Settings",
//       desc: "Customization options including theme, language, and notification settings.",
//       icon: <Settings size={30} />,
//       color: "from-gray-400 to-slate-500",
//     },
//   ];

//   return (
//     <div className="pt-28 min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">

//       {/* Header */}
//       <div className="max-w-6xl mx-auto px-6 text-center mb-20">
//         <h1 className="text-4xl font-bold text-blue-700 mb-4">
//           CareTrack System Services
//         </h1>
//         <p className="text-gray-600 max-w-3xl mx-auto text-lg">
//           A smart healthcare platform designed to enhance patient care, emergency response,
//           and medical decision-making.
//         </p>
//       </div>

//       {/* Services Grid */}
//       <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

//         {services.map((s, i) => (
//           <div
//             key={i}
//             className="
//               relative
//               group
//               rounded-3xl
//               p-[2px]
//               bg-gradient-to-r
//               from-blue-200 via-cyan-200 to-blue-200
//               hover:from-blue-400 hover:via-cyan-400 hover:to-blue-400
//               transition-all
//               duration-500
//             "
//           >
//             {/* Card */}
//             <div
//               className="
//                 h-full
//                 bg-white
//                 rounded-3xl
//                 p-8
//                 text-center
//                 shadow-lg
//                 group-hover:shadow-2xl
//                 transform
//                 group-hover:-translate-y-2
//                 transition-all
//                 duration-500
//               "
//             >
//               {/* Icon */}
//               <div
//                 className={`
//                   w-16 h-16 mx-auto mb-5
//                   rounded-full
//                   flex items-center justify-center
//                   text-white
//                   bg-gradient-to-br ${s.color}
//                   shadow-lg
//                 `}
//               >
//                 {s.icon}
//               </div>

//               {/* Title */}
//               <h3 className="text-xl font-semibold mb-3 text-gray-800">
//                 {s.title}
//               </h3>

//               {/* Description */}
//               <p className="text-sm text-gray-600 leading-relaxed">
//                 {s.desc}
//               </p>

//               {/* Decorative Line */}
//               <div className="mt-6 w-16 h-1 mx-auto bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
//             </div>
//           </div>
//         ))}

//       </div>

//       {/* Footer Note */}
//       <div className="mt-24 text-center text-gray-500 text-sm pb-10">
//         © 2026 CareTrack Healthcare System – Designed for Smart Medical Solutions
//       </div>
//     </div>
//   );
// }





// *****************************************************************************

import {
  HeartPulse,
  AlertTriangle,
  Stethoscope,
  BarChart3,
  FileText,
  Users,
  Settings,
  Home,
   ArrowLeft,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Services() {

  const navigate = useNavigate();

  const services = [
    {
      title: "Patient Monitoring",
      desc: "Real-time monitoring of patient vitals including temperature, heart rate, and blood pressure.",
      icon: <HeartPulse size={30} />,
      color: "from-red-400 to-pink-500",
    },
    {
      title: "Emergency & Alerts",
      desc: "Automatic detection of critical cases with instant alerts for rapid response.",
      icon: <AlertTriangle size={30} />,
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Doctor Dashboard",
      desc: "Centralized dashboard for doctors to manage patients, alerts, and medical notes.",
      icon: <Stethoscope size={30} />,
      color: "from-blue-400 to-cyan-500",
    },
    {
      title: "Medical Analytics",
      desc: "Advanced charts and reports to analyze patient health trends and statistics.",
      icon: <BarChart3 size={30} />,
      color: "from-indigo-400 to-purple-500",
    },
    {
      title: "Medical Records",
      desc: "Secure storage and management of patient medical records and reports.",
      icon: <FileText size={30} />,
      color: "from-emerald-400 to-teal-500",
    },
    {
      title: "User Management",
      desc: "Role-based access control for admins, doctors, and staff members.",
      icon: <Users size={30} />,
      color: "from-sky-400 to-blue-500",
    },
    {
      title: "System Settings",
      desc: "Customization options including theme, language, and notification settings.",
      icon: <Settings size={30} />,
      color: "from-gray-400 to-slate-500",
    },
  ];

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-20 relative">

        {/* Home Button */}
        {/* Navigation Button */}
{/* <button
  onClick={() => navigate("/")}
  className="
    absolute
    right-6
    top-0
    group
    flex
    items-center
    gap-3
    px-5
    py-3
    rounded-2xl
    backdrop-blur-xl
    bg-white/70
    border border-white/40
    shadow-xl
    hover:shadow-2xl
    hover:scale-105
    transition-all
    duration-500
    overflow-hidden
  "
>

  
  <div
    className="
      absolute
      inset-0
      bg-gradient-to-r
      from-blue-400
      via-cyan-400
      to-blue-500
      opacity-0
      group-hover:opacity-10
      transition-all
      duration-500
    "
  ></div>

  
  <div
    className="
      absolute
      -left-2
      -top-2
      w-6
      h-6
      bg-cyan-300
      rounded-full
      blur-lg
      opacity-60
      animate-pulse
    "
  ></div>

 
  <div
    className="
      relative
      z-10
      w-11
      h-11
      rounded-xl
      bg-gradient-to-br
      from-blue-500
      to-cyan-500
      flex
      items-center
      justify-center
      shadow-lg
      group-hover:rotate-12
      transition-all
      duration-500
    "
  >
    <Home
      size={22}
      className="text-white"
    />
  </div>


  <div className="relative z-10 text-left">

    

    <p
      className="
        text-sm
        font-bold
        text-blue-800
        group-hover:text-cyan-700
        transition
      "
    >
      Back to Home
    </p>

  </div>
</button> */}

{/* Floating Back Home Button */}
<div className="fixed top-6 right-6 z-50">

  <button
    onClick={() => navigate("/")}
    className="
      group
      relative
      flex
      items-center
      justify-center
      w-16
      h-16
      rounded-2xl
      bg-white/80
      backdrop-blur-xl
      border
      border-blue-100
      shadow-2xl
      hover:scale-110
      hover:-translate-y-1
      transition-all
      duration-500
      overflow-hidden
    "
  >

    {/* Animated Gradient */}
    <div
      className="
        absolute
        inset-0
        opacity-0
        group-hover:opacity-100
        transition-all
        duration-500
        bg-gradient-to-br
        from-blue-400/20
        via-cyan-300/20
        to-blue-500/20
      "
    ></div>

    {/* Glow Effect */}
    <div
      className="
        absolute
        w-24
        h-24
        bg-cyan-300
        rounded-full
        blur-3xl
        opacity-0
        group-hover:opacity-30
        transition-all
        duration-700
      "
    ></div>

    {/* Pulse Dot */}
   <div className="absolute top-2 right-2 w-2 h-2">

  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-ping opacity-50"></div>

  <div className="relative w-full h-full rounded-full bg-cyan-500 shadow-lg"></div>

</div>

    {/* Icon + Arrow (NEW) */}
    <div className="relative z-10 flex items-center gap-1 text-blue-700 group-hover:text-cyan-600 transition-all duration-500">

      {/* Small Arrow */}
      <ArrowLeft
        size={14}
        className="
          opacity-70
          group-hover:-translate-x-1
          transition-all
          duration-500
        "
      />

      {/* Home Icon */}
      <Home
        size={30}
        className="
          group-hover:rotate-12
          transition-all
          duration-500
        "
      />

    </div>

    {/* Tooltip */}
    <div
      className="
        absolute
        right-20
        opacity-0
        group-hover:opacity-100
        transition-all
        duration-500
        bg-blue-700
        text-white
        text-sm
        px-4
        py-2
        rounded-xl
        whitespace-nowrap
        shadow-lg
      "
    >
      Back to Home
    </div>

  </button>
</div>












        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          CareTrack System Services
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          A smart healthcare platform designed to enhance patient care,
          emergency response, and medical decision-making.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10">

        {services.map((s, i) => (
          <div
            key={i}
            className="
              relative
              group
              rounded-3xl
              p-[2px]
              bg-gradient-to-r
              from-blue-200 via-cyan-200 to-blue-200
              hover:from-blue-400 hover:via-cyan-400 hover:to-blue-400
              transition-all
              duration-500
            "
          >

            {/* Card */}
            <div
              className="
                h-full
                bg-white
                rounded-3xl
                p-8
                text-center
                shadow-lg
                group-hover:shadow-2xl
                transform
                group-hover:-translate-y-3
                transition-all
                duration-500
                relative
                overflow-hidden
              "
            >

              {/* Background Blur */}
              <div
                className="
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition-all
                  duration-700
                  bg-gradient-to-br
                  from-blue-50
                  to-cyan-50
                "
              ></div>

              {/* Content */}
              <div className="relative z-10">

                {/* Icon */}
                <div
                  className={`
                    w-16 h-16 mx-auto mb-5
                    rounded-full
                    flex items-center justify-center
                    text-white
                    bg-gradient-to-br ${s.color}
                    shadow-lg
                    group-hover:scale-110
                    group-hover:rotate-6
                    transition-all
                    duration-500
                  `}
                >
                  {s.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {s.desc}
                </p>

                {/* Decorative Line */}
                <div
                  className="
                    mt-6
                    w-16
                    h-1
                    mx-auto
                    bg-gradient-to-r
                    from-blue-400
                    to-cyan-400
                    rounded-full
                    group-hover:w-24
                    transition-all
                    duration-500
                  "
                />
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Footer */}
      <div className="mt-24 text-center text-gray-500 text-sm pb-10">
        © 2026 CareTrack Healthcare System – Designed for Smart Medical Solutions
      </div>

    </div>
  );
}