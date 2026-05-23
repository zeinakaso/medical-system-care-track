// import { LogOut, Menu, User } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// export default function Navbar({ title, toggleSidebar }) {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <header className="fixed top-0 left-0 w-full h-16 bg-white shadow z-[100] flex items-center justify-between px-3 md:px-6">

//       {/* 🔥 LEFT */}
//       <div className="flex items-center gap-3">

//         <button onClick={toggleSidebar} className="md:hidden p-1">
//           <Menu size={24} />
//         </button>

//         <h1 className="text-base md:text-xl font-bold text-blue-600">
//           {title}
//         </h1>
//       </div>

//       {/* 🔥 RIGHT */}
//       <div className="flex items-center gap-4 relative">

//         {/* 👤 PROFILE ICON */}
//         <div className="relative">

//           <button
//             onClick={() => setOpen(!open)}
//             className="p-2 rounded-full hover:bg-gray-100"
//           >
//             <User className="text-gray-700" />
//           </button>

//           {/* DROPDOWN */}
//           {open && (
//             <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl border rounded-xl overflow-hidden">

//               <div className="p-4 border-b">
//                 <p className="font-semibold text-gray-800">
//                   {user?.name || "User"}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {user?.email || "No email"}
//                 </p>
//               </div>

//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center gap-2 p-3 text-red-500 hover:bg-red-50"
//               >
//                 <LogOut size={16} />
//                 Logout
//               </button>

//             </div>
//           )}
//         </div>

//       </div>
//     </header>
//   );
// }





// *****************************************************************************************8

import { LogOut, Menu, User, ArrowLeft, Settings,Phone} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ title, toggleSidebar }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getInitial = () => {
    return user?.name?.charAt(0)?.toUpperCase() || "U";
  };

  return (
    <header className="
      fixed top-0 left-0 w-full h-16
      bg-white/80 dark:bg-gray-900/80
      backdrop-blur-xl
      shadow-md
      z-[100]
      flex items-center justify-between
      px-3 md:px-6
      border-b border-gray-100 dark:border-gray-800
    ">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <Menu size={24} className="text-gray-700 dark:text-white" />
        </button>

        <h1 className="text-base md:text-2xl font-bold text-blue-600 dark:text-cyan-400">
          {title}
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 relative">

        {/* AVATAR */}
       <Link
  to="/contact-us"
  className="
    relative z-[300]
    w-12 h-12 rounded-full
    bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400
    shadow-lg hover:shadow-cyan-500/40
    hover:scale-110
    transition-all duration-300
    flex items-center justify-center
    group overflow-hidden
  "
>
              {/* glow effect */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />

              <Phone
                size={18}
                className="text-white drop-shadow-md group-hover:rotate-90 transition duration-300"
              />
            </Link>



         {/* ⚙️ SETTINGS ICON (FANCY VERSION) */}
            <Link
  to="/setting"
  className="
    relative z-[200]
    w-12 h-12 rounded-full
    bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400
    shadow-lg hover:shadow-cyan-500/40
    hover:scale-110
    transition-all duration-300
    flex items-center justify-center
    group overflow-hidden
  "
>
              {/* glow effect */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />

              <Settings
                size={18}
                className="text-white drop-shadow-md group-hover:rotate-90 transition duration-300"
              />
            </Link>
        <div className="relative">
           
           







          <button
            onClick={() => setOpen(!open)}
            className="
              w-12 h-12 rounded-full
              flex items-center justify-center
              bg-gradient-to-tr from-blue-500 to-cyan-400
              text-white font-bold
              shadow-md
              hover:scale-110
              transition-all duration-300
            "
          >
             <ArrowLeft size={15} className="text-white" />
            {user?.avatar ? (
              <img
                src={user.avatar}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
                 getInitial()
            )}
          </button>

          {/* DROPDOWN (SLIDE DOWN) */}
          <div
            className={`
              absolute right-0 mt-3 w-72
              bg-white dark:bg-gray-900
              border border-gray-200 dark:border-gray-700
              shadow-2xl rounded-2xl
              overflow-hidden
              transition-all duration-300 origin-top
              ${open ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 -translate-y-3 pointer-events-none"}
            `}
          >

            {/* HEADER (LIKE GOOGLE STYLE) */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800">

              <div className="
                w-11 h-11 rounded-full
                bg-gradient-to-tr from-blue-500 to-cyan-400
                flex items-center justify-center
                text-white font-bold
              ">
                {getInitial()}
              </div>

              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {user?.name || "User"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email || "No email"}
                </p>
              </div>

            </div>

            {/* MENU */}
            <div className="p-2">

              <button
                onClick={() => setConfirmLogout(true)}
                className="
                  w-full flex items-center gap-2
                  px-4 py-3 rounded-xl
                  text-red-500
                  hover:bg-red-50 dark:hover:bg-red-900/20
                  transition
                  font-medium
                "
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>

          </div>

        </div>



      </div>

      {/* BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* CONFIRM LOGOUT MODAL */}
     {confirmLogout && (
  <div className="fixed inset-0 z-[200] flex items-center justify-center">

    {/* BACKDROP */}
    <div
      className="
        absolute inset-0
        bg-black/40
        backdrop-blur-sm
        animate-[fadeIn_0.2s_ease]
      "
      onClick={() => setConfirmLogout(false)}
    />

    {/* MODAL CARD */}
    <div
      className="
        relative w-[92%] max-w-sm
        rounded-3xl
        bg-white/90 dark:bg-gray-900/90
        backdrop-blur-2xl
        border border-white/30 dark:border-gray-700
        shadow-[0_20px_70px_-10px_rgba(0,0,0,0.35)]
        p-6 text-center
        animate-[fadeInUp_0.35s_ease]
        overflow-hidden
      "
    >

      {/* soft glowing top accent */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-red-400/20 blur-3xl rounded-full" />

      {/* ICON */}
      <div className="flex justify-center mb-4">
        <div className="
          w-14 h-14 rounded-full
          bg-red-100 dark:bg-red-900/30
          flex items-center justify-center
          animate-pulse
        ">
          <span className="text-red-500 text-xl">⚠️</span>
        </div>
      </div>

      {/* TITLE */}
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
        Confirm Logout
      </h2>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        You are about to sign out of your account.  
        You will need to login again to continue.
      </p>

      {/* BUTTONS */}
      <div className="flex gap-3 justify-center">

        {/* CANCEL */}
        <button
          onClick={() => setConfirmLogout(false)}
          className="
            px-4 py-2 rounded-xl
            bg-gray-100 dark:bg-gray-800
            text-gray-700 dark:text-gray-200
            hover:scale-105 hover:bg-gray-200 dark:hover:bg-gray-700
            transition-all duration-200
            min-w-[90px]
          "
        >
          Cancel
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            px-5 py-2 rounded-xl
            bg-gradient-to-r from-red-500 to-pink-500
            text-white font-semibold
            shadow-lg shadow-red-500/30
            hover:scale-105 hover:shadow-red-500/50
            active:scale-95
            transition-all duration-200
            min-w-[90px]
          "
        >
          Logout
        </button>

      </div>

      {/* subtle bottom glow line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-400/40 to-transparent" />

    </div>
  </div>
)}

    </header>
  );
}