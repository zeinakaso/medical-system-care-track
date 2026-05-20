
// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   HeartPulse,
//   Stethoscope,
//   Settings,
//   BarChart3,
//   Activity,
//   ClipboardList,
//   X,
// } from "lucide-react";

// export default function Sidebar({ isOpen, toggleSidebar }) {
//   const linkClass = ({ isActive }) =>
//     `flex items-center gap-2 p-2 rounded hover:bg-blue-50 ${
//       isActive ? "bg-blue-50 font-semibold text-blue-600" : ""
//     }`;

//   return (
//     <>
//       {/* 🔥 Overlay للموبايل */}
//       {isOpen && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/40 z-40 md:hidden"
//         />
//       )}

//       <aside
//         className={`
//           fixed top-0 left-0 h-full w-64 bg-white border-r border-blue-100 pt-20 z-50 shadow
//           transform transition-transform duration-300
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0
//         `}
//       >
//         {/* 🔥 زر إغلاق */}
//         <div className="absolute top-4 right-4 md:hidden">
//           <button onClick={toggleSidebar}>
//             <X />
//           </button>
//         </div>

//         <nav className="flex flex-col gap-2 px-4">

//           <NavLink to="/admin" className={linkClass}>
//             <LayoutDashboard size={18} /> Dashboard
//           </NavLink>

//           <NavLink to="/admin/users" className={linkClass}>
//             <Users size={18} /> Users
//           </NavLink>

//           <NavLink to="/admin/patients" className={linkClass}>
//             <HeartPulse size={18} /> Patients
//           </NavLink>

//           <NavLink to="/admin/doctors" className={linkClass}>
//             <Stethoscope size={18} /> Doctors
//           </NavLink>

//           <NavLink to="/admin/relatives" className={linkClass}>
//             <HeartPulse size={18} /> Relatives
//           </NavLink>

//           <NavLink to="/admin/vitals" className={linkClass}>
//             <Activity size={18} /> Vital Signs
//           </NavLink>

//           <NavLink to="/admin/treatments" className={linkClass}>
//             <ClipboardList size={18} /> Treatment Plans
//           </NavLink>

//           <NavLink to="/admin/analytics" className={linkClass}>
//             <BarChart3 size={18} /> Analytics
//           </NavLink>

//           <NavLink to="/admin/settings" className={linkClass}>
//             <Settings size={18} /> Settings
//           </NavLink>

//         </nav>
//       </aside>
//     </>
//   );
// }



// 222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222

import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  HeartPulse,
  Stethoscope,
  Settings,
  BarChart3,
  Activity,
  ClipboardList,
  X,
} from "lucide-react";

export default function Sidebar({ isOpen, toggleSidebar }) {
  // eslint-disable-next-line no-unused-vars
  const linkClass = ({ isActive }) =>
    `relative flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 group
     ${
       isActive
         ? "bg-gradient-to-r from-sky-50 to-cyan-50 text-sky-600 shadow-md"
         : "text-gray-600 hover:bg-gray-50 hover:translate-x-1"
     }`;

  return (
    <>
      {/* OVERLAY MOBILE */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72
          bg-white/70 backdrop-blur-2xl
          border-r border-sky-100
          shadow-2xl z-50
          pt-20 px-3
          transform transition-all duration-500 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* CLOSE BUTTON */}
        <div className="absolute top-4 right-4 md:hidden">
          <button
            onClick={toggleSidebar}
            className="w-9 h-9 rounded-xl bg-white shadow hover:scale-110 transition flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex flex-col gap-2">

          <SidebarLink icon={<LayoutDashboard size={18} />} label="Dashboard" to="/admin" />
          <SidebarLink icon={<Users size={18} />} label="Users" to="/admin/users" />
          <SidebarLink icon={<HeartPulse size={18} />} label="Patients" to="/admin/patients" />
          <SidebarLink icon={<Stethoscope size={18} />} label="Doctors" to="/admin/doctors" />
          <SidebarLink icon={<HeartPulse size={18} />} label="Relatives" to="/admin/relatives" />
          <SidebarLink icon={<Activity size={18} />} label="Vital Signs" to="/admin/vitals" />
          <SidebarLink icon={<ClipboardList size={18} />} label="Treatment Plans" to="/admin/treatments" />
          <SidebarLink icon={<BarChart3 size={18} />} label="Analytics" to="/admin/analytics" />
          {/* <SidebarLink icon={<Settings size={18} />} label="Settings" to="/admin/settings" /> */}

        </nav>
      </aside>

      {/* animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
      `}</style>
    </>
  );
}

/* 🔥 reusable animated link */
function SidebarLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 group
        ${
          isActive
            ? "bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-700 shadow-md"
            : "text-gray-600 hover:bg-gray-50 hover:translate-x-1"
        }`
      }
    >
      {/* active glow bar */}
      <span
        className="absolute left-0 top-2 bottom-2 w-1 rounded-full
        bg-sky-400 scale-y-0 group-[.active]:scale-y-100 transition"
      />

      {/* icon */}
      <span className="text-sky-500 group-hover:scale-110 transition">
        {icon}
      </span>

      {/* label */}
      <span className="font-medium text-sm">{label}</span>

      {/* hover glow */}
      <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-sky-50/40" />
    </NavLink>
  );
}