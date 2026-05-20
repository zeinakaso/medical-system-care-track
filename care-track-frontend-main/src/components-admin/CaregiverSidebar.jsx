// import {
//   LayoutDashboard,
//   HeartPulse,
//   FileText,
//   Activity,
//   X,
// } from "lucide-react";

// export default function CaregiverSidebar({ isOpen, toggleSidebar }) {
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
//         {/* زر إغلاق */}
//         <div className="absolute top-4 right-4 md:hidden">
//           <button onClick={toggleSidebar}>
//             <X />
//           </button>
//         </div>

//         <nav className="flex flex-col gap-2 px-4">

//           <a className="flex items-center gap-2 p-2 rounded bg-blue-50 text-blue-600 font-semibold">
//             <LayoutDashboard size={18} /> Dashboard
//           </a>

//         </nav>
//       </aside>
//     </>
//   );
// }



// 2222222222222222222222222222222222222222222222222222222222222222222222222222

import {
  LayoutDashboard,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CaregiverSidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname === "/caregiver";

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64
          bg-gradient-to-b from-white via-white to-blue-50/40
          backdrop-blur-xl
          border-r border-blue-100
          shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >

        {/* TOP HEADER */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-blue-100">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500 shadow-lg shadow-blue-200 flex items-center justify-center">
              <LayoutDashboard size={16} className="text-white" />
            </div>

            <h2 className="text-lg font-extrabold text-blue-600">
              Care Panel
            </h2>
          </div>

          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-blue-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* MENU */}
        <nav className="px-3 py-6">

          <button
            onClick={() => navigate("/caregiver")}
            className={`
              relative w-full flex items-center gap-3
              px-4 py-3 rounded-2xl
              transition-all duration-300
              overflow-hidden group
              ${
                isActive
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-200"
                  : "text-gray-600 hover:bg-blue-50"
              }
            `}
          >

            {/* glow effect */}
            <div
              className={`
                absolute inset-0 opacity-0 group-hover:opacity-100 transition
                bg-gradient-to-r from-blue-400/10 to-cyan-400/10
              `}
            />

            {/* ICON */}
            <div
              className={`
                relative z-10 flex items-center justify-center
                w-9 h-9 rounded-xl
                ${
                  isActive
                    ? "bg-white/20"
                    : "bg-blue-100 text-blue-600"
                }
              `}
            >
              <LayoutDashboard size={18} />
            </div>

            {/* TEXT */}
            <span className="relative z-10 font-semibold">
              Dashboard
            </span>

            {/* ACTIVE DOT */}
            {isActive && (
              <span className="ml-auto w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            )}

            {/* RIGHT GLOW LINE */}
            {isActive && (
              <span className="absolute right-0 top-2 bottom-2 w-[3px] bg-white/60 rounded-full" />
            )}
          </button>

        </nav>

        {/* FOOTER */}
        <div className="absolute bottom-4 left-0 w-full px-4">
          <div className="text-xs text-center text-blue-400">
            Smart Care System • v1.0
          </div>
        </div>
      </aside>
    </>
  );
}