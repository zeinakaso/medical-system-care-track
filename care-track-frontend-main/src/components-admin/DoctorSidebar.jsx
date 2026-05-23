/* eslint-disable no-unused-vars */
// import React from "react";
// import { Users, Bell, BarChart3, X } from "lucide-react";
// import { NavLink } from "react-router-dom";

// export default function DoctorSidebar({ isOpen, toggleSidebar }) {

//   const linkClass = "flex items-center gap-2 p-2 rounded hover:bg-blue-50";

//   return (
//     <>
//       {/* Overlay */}
//       {isOpen && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/40 z-40 md:hidden"
//         />
//       )}

//       <aside
//         className={`
//           fixed top-0 left-0 h-full w-64 bg-white border-r pt-20 z-50 shadow
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

//           <NavLink to="/doctor/patients" className={linkClass}>
//   <Users size={18} /> My Patients
// </NavLink>

//           <NavLink to="/doctor/analytics" className={linkClass}>
//             <BarChart3 size={18} /> Analytics
//           </NavLink>

//           <NavLink to="/doctor/notifications" className={linkClass}>
//             <Bell size={18} /> Notifications
//           </NavLink>

//         </nav>
//       </aside>
//     </>
//   );
// }





// 2222222222222222222222222222222222222222222222222222222222222222222222222222

/* eslint-disable no-unused-vars */
import React from "react";
import { Users, Bell, BarChart3, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function DoctorSidebar({ isOpen, toggleSidebar }) {

  const linkClass =
    "group relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 overflow-hidden";

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="
            fixed inset-0 bg-black/40 z-40 md:hidden
            backdrop-blur-sm
            animate-[fadeIn_0.2s_ease]
          "
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-50 pt-20
          bg-white/80 backdrop-blur-2xl
          border-r border-sky-100
          shadow-[8px_0_30px_-15px_rgba(0,0,0,0.25)]
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >

        {/* TOP GLOW LINE */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-500 animate-pulse" />

        <div className="absolute top-4 right-4 md:hidden">
          <button
            onClick={toggleSidebar}
            className="
              w-9 h-9 rounded-xl
              bg-white shadow-md
              hover:scale-110 hover:rotate-90
              transition-all duration-300
              flex items-center justify-center
            "
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 px-4">

          {/* PATIENTS */}
          <NavLink
  to="/doctor/patients"
  end
  className={({ isActive }) =>
    `${linkClass}
    ${
      isActive || window.location.pathname === "/doctor"
        ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg scale-[1.03]"
        : "text-gray-700 hover:bg-sky-50 hover:translate-x-1"
    }`
  }
>
  <span className="absolute left-0 w-1 h-0 bg-cyan-400 rounded-full transition-all duration-300 group-hover:h-full" />

  <Users size={18} />

  My Patients
</NavLink>

          {/* ANALYTICS */}
          <NavLink
            to="/doctor/analytics"
            className={({ isActive }) =>
              `${linkClass}
              ${
                isActive
                  ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg scale-[1.03]"
                  : "text-gray-700 hover:bg-sky-50 hover:translate-x-1"
              }`
            }
          >
            <span className="absolute left-0 w-1 h-0 bg-cyan-400 rounded-full transition-all duration-300 group-hover:h-full" />
            <BarChart3 size={18} />
            Analytics
          </NavLink>

          {/* NOTIFICATIONS */}
          <NavLink
            to="/doctor/notifications"
            className={({ isActive }) =>
              `${linkClass}
              ${
                isActive
                  ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg scale-[1.03]"
                  : "text-gray-700 hover:bg-sky-50 hover:translate-x-1"
              }`
            }
          >
            <span className="absolute left-0 w-1 h-0 bg-cyan-400 rounded-full transition-all duration-300 group-hover:h-full" />
            <Bell size={18} />
            Notifications
          </NavLink>

        </nav>
      </aside>
    </>
  );
}