// import React from "react";
// import { LayoutDashboard, HeartPulse, Activity, FileText } from "lucide-react";

// export default function PatientSidebar() {
//   return (
//     <aside className="w-64 min-h-screen bg-white border-r border-blue-100 pt-20 fixed">
//       <nav className="flex flex-col gap-2 px-4">

//         <a
//           href="#"
//           className="flex items-center gap-2 p-2 rounded bg-blue-50 font-semibold text-blue-600"
//         >
//           <LayoutDashboard size={18} /> Dashboard
//         </a>

//         <a
//           href="#"
//           className="flex items-center gap-2 p-2 rounded hover:bg-blue-50"
//         >
//           <HeartPulse size={18} /> My Vitals
//         </a>

//         <a
//           href="#"
//           className="flex items-center gap-2 p-2 rounded hover:bg-blue-50"
//         >
//           <Activity size={18} /> Health History
//         </a>

//         <a
//           href="#"
//           className="flex items-center gap-2 p-2 rounded hover:bg-blue-50"
//         >
//           <FileText size={18} /> Treatment Plan
//         </a>

//       </nav>
//     </aside>
//   );
// }

// ******************************************************

// import React from "react";
// import {
//   LayoutDashboard,
//   HeartPulse,
//   Activity,
//   FileText,
//   X,
// } from "lucide-react";

// export default function PatientSidebar({ isOpen, toggleSidebar }) {
//   return (
//     <>
//       {/* 🔥 Overlay للموبايل */}
//       {isOpen && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/30 z-40 md:hidden"
//         />
//       )}

//       <aside
//         className={`
//           fixed top-0 left-0 h-full w-64 bg-white border-r border-blue-100 pt-20 z-50
//           transform transition-transform duration-300
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0
//         `}
//       >
//         {/* زر الإغلاق بالموبايل */}
//         <div className="absolute top-4 right-4 md:hidden">
//           <button onClick={toggleSidebar}>
//             <X />
//           </button>
//         </div>

//         <nav className="flex flex-col gap-2 px-4">

//           <a
//             href="#"
//             className="flex items-center gap-2 p-2 rounded bg-blue-50 font-semibold text-blue-600"
//           >
//             <LayoutDashboard size={18} /> Dashboard
//           </a>

//           <a
//             href="#"
//             className="flex items-center gap-2 p-2 rounded hover:bg-blue-50"
//           >
//             <HeartPulse size={18} /> My Vitals
//           </a>

//           <a
//             href="#"
//             className="flex items-center gap-2 p-2 rounded hover:bg-blue-50"
//           >
//             <Activity size={18} /> Health History
//           </a>

//           <a
//             href="#"
//             className="flex items-center gap-2 p-2 rounded hover:bg-blue-50"
//           >
//             <FileText size={18} /> Treatment Plan
//           </a>

//         </nav>
//       </aside>
//     </>
//   );
// }

// ***********************************************************************

// import React from "react";
// import {
//   LayoutDashboard,
//   HeartPulse,
//   Activity,
//   FileText,
//   CalendarDays,
//   Bell,
//   MessageCircle,
//   BarChart3,
//   X,
// } from "lucide-react";

// export default function PatientSidebar({ isOpen, toggleSidebar }) {

//   const linkClass = "flex items-center gap-2 p-2 rounded hover:bg-blue-50";

//   return (
//     <>
//       {/* 🔥 Overlay للموبايل */}
//       {isOpen && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/30 z-40 md:hidden"
//         />
//       )}

//       <aside
//         className={`
//           fixed top-0 left-0 h-full w-64 bg-white border-r border-blue-100 pt-20 z-50
//           transform transition-transform duration-300
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0
//         `}
//       >
//         {/* زر الإغلاق */}
//         <div className="absolute top-4 right-4 md:hidden">
//           <button onClick={toggleSidebar}>
//             <X />
//           </button>
//         </div>

//         <nav className="flex flex-col gap-2 px-4">

//           {/* Dashboard */}
//           <a
//             href="#"
//             className="flex items-center gap-2 p-2 rounded bg-blue-50 font-semibold text-blue-600"
//           >
//             <LayoutDashboard size={18} /> Dashboard
//           </a>

//           {/* My Vitals */}
//           <a href="#" className={linkClass}>
//             <HeartPulse size={18} /> My Vitals
//           </a>

//           {/* Health History */}
//           <a href="#" className={linkClass}>
//             <Activity size={18} /> Health History
//           </a>

//           {/* Treatment Plan */}
//           <a href="#" className={linkClass}>
//             <FileText size={18} /> Treatment Plan
//           </a>

//           {/* ⭐ Appointments */}
//           <a href="#" className={linkClass}>
//             <CalendarDays size={18} /> Appointments
//           </a>

//           {/* ⭐ Notifications */}
//           <a href="#" className={linkClass}>
//             <Bell size={18} /> Notifications
//           </a>

//           {/* ⭐ Messages */}
//           <a href="#" className={linkClass}>
//             <MessageCircle size={18} /> Messages
//           </a>

//           {/* ⭐ Reports */}
//           <a href="#" className={linkClass}>
//             <BarChart3 size={18} /> Reports
//           </a>

//         </nav>
//       </aside>
//     </>
//   );
// }







// ***************************************************************************************************88

//1111111111111111111111111111111111111111111111111111
// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   HeartPulse,
//   Activity,
//   FileText,
//   CalendarDays,
//   Bell,
//   MessageCircle,
//   BarChart3,
//   X,
// } from "lucide-react";

// export default function PatientSidebar({ isOpen, toggleSidebar }) {

//   const linkClass = ({ isActive }) =>
//     `flex items-center gap-2 p-2 rounded transition ${
//       isActive
//         ? "bg-blue-50 text-blue-600 font-semibold"
//         : "hover:bg-blue-50 text-gray-700"
//     }`;

//   return (
//     <>
//       {/* 🔥 Overlay للموبايل */}
//       {isOpen && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/30 z-40 md:hidden"
//         />
//       )}

//       <aside
//         className={`
//           fixed top-0 left-0 h-full w-64 bg-white border-r border-blue-100 pt-20 z-50
//           transform transition-transform duration-300
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0
//         `}
//       >
//         {/* زر الإغلاق */}
//         <div className="absolute top-4 right-4 md:hidden">
//           <button onClick={toggleSidebar}>
//             <X />
//           </button>
//         </div>

//         <nav className="flex flex-col gap-2 px-4">

//           {/* Dashboard */}
//           <NavLink to="/patient" end className={linkClass}>
//             <LayoutDashboard size={18} /> Dashboard
//           </NavLink>

//           {/* My Vitals */}
//           <NavLink to="/patient/vitals" className={linkClass}>
//             <HeartPulse size={18} /> My Vitals
//           </NavLink>

//           {/* Health History 
//           <NavLink to="/patient/history" className={linkClass}>
//             <Activity size={18} /> Health History
//           </NavLink>
//           */}


//           {/* Treatment Plan */}
//           <NavLink to="/patient/treatment" className={linkClass}>
//             <FileText size={18} /> Treatment Plan
//           </NavLink>

//           {/* ⭐ Appointments 
//           <NavLink to="/patient/appointments" className={linkClass}>
//             <CalendarDays size={18} /> Appointments
//           </NavLink>
//           */}

//           {/* ⭐ Notifications 
//           <NavLink to="/patient/notifications" className={linkClass}>
//             <Bell size={18} /> Notifications
//           </NavLink>
//           */}


//           {/* ⭐ Messages 
//           <NavLink to="/patient/messages" className={linkClass}>
//             <MessageCircle size={18} /> Messages
//           </NavLink>
//           */}

//           {/* ⭐ Reports */}
//           <NavLink to="/patient/reports" className={linkClass}>
//             <BarChart3 size={18} /> Reports
//           </NavLink>

//         </nav>
//       </aside>
//     </>
//   );
// }





// 22222222222222222222222222222222222222222222222222222222222222222222222222222222222
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  HeartPulse,
  FileText,
  BarChart3,
  X,
} from "lucide-react";

export default function PatientSidebar({ isOpen, toggleSidebar }) {

  const linkClass = ({ isActive }) =>
    `relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group overflow-hidden
     ${
       isActive
         ? "text-blue-600 font-semibold"
         : "text-gray-700 hover:text-blue-600"
     }`;

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="
            fixed inset-0 z-40 md:hidden
            bg-black/50 backdrop-blur-sm
            animate-[fadeIn_0.25s_ease]
          "
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 z-50
          pt-20 px-4
          bg-white/90 backdrop-blur-2xl
          border-r border-blue-100
          shadow-[10px_0_40px_-20px_rgba(0,0,0,0.25)]
          transform transition-transform duration-500 ease-[cubic-bezier(.2,.9,.2,1)]
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >

        {/* TOP GLOW STRIP */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 animate-pulse" />

        {/* CLOSE */}
        <div className="absolute top-4 right-4 md:hidden">
          <button
            onClick={toggleSidebar}
            className="
              w-9 h-9 rounded-full
              bg-white shadow-md
              hover:scale-110 hover:rotate-90
              transition-all duration-300
              flex items-center justify-center
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex flex-col gap-2">

          {[
            { to: "/patient", icon: LayoutDashboard, label: "Dashboard", end: true },
            { to: "/patient/vitals", icon: HeartPulse, label: "My Vitals" },
            { to: "/patient/treatment", icon: FileText, label: "Treatment Plan" },
            { to: "/patient/reports", icon: BarChart3, label: "Reports" },
          ].map((item, i) => (
            <NavLink
              key={i}
              to={item.to}
              end={item.end}
              className={linkClass}
            >
              {({ isActive }) => (
                <>
                  {/* ACTIVE LEFT BAR */}
                  <span
                    className={`
                      absolute left-0 top-1/2 -translate-y-1/2
                      h-0 w-[4px] rounded-full
                      bg-gradient-to-b from-blue-500 to-cyan-400
                      transition-all duration-300
                      ${isActive ? "h-8" : "h-0"}
                    `}
                  />

                  {/* ICON WRAPPER */}
                  <span
                    className={`
                      w-9 h-9 rounded-xl
                      flex items-center justify-center
                      transition-all duration-300
                      ${
                        isActive
                          ? "bg-blue-50 shadow-md"
                          : "bg-gray-50 group-hover:bg-blue-50"
                      }
                    `}
                  >
                    <item.icon size={18} />
                  </span>

                  {/* LABEL */}
                  <span className="tracking-wide">
                    {item.label}
                  </span>

                  {/* HOVER GLOW */}
                  <span className="
                    absolute inset-0 opacity-0 group-hover:opacity-100
                    bg-gradient-to-r from-blue-50 to-transparent
                    transition
                  " />
                </>
              )}
            </NavLink>
          ))}

        </nav>
      </aside>
    </>
  );
}