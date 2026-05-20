
// ****************************************************************************

// import { useState } from "react";
// import { Menu, X } from "lucide-react";
// import caretrack from "../assets/caretrack.png";
// import { Link, useLocation } from "react-router-dom";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const location = useLocation();

//   const navLinks = [
//     { name: "Home", to: "/" },
//     { name: "Services", to: "/services" },
//     { name: "About", to: "/about" },
//     { name: "Contact us", to: "/contact" },
//   ];

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50">

//       {/* NAVBAR */}
//       <div className="backdrop-blur-xl bg-white/70 border-b border-blue-100 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

//           {/* LOGO */}
//           <Link
//             to="/"
//             className="
//               w-14 h-14 md:w-16 md:h-16
//               rounded-full p-1
//               bg-gradient-to-tr from-blue-400 to-cyan-300
//               shadow-lg hover:scale-110
//               transition-all duration-500
//               overflow-hidden group
//             "
//           >
//             <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition" />
//             <img
//               src={caretrack}
//               alt="logo"
//               className="w-full h-full object-cover rounded-full bg-white relative z-10"
//             />
//           </Link>

//           {/* DESKTOP LINKS */}
//           <ul className="hidden md:flex gap-10 text-gray-700 font-medium">
//             {navLinks.map((link) => {
//               const isActive = location.pathname === link.to;

//               return (
//                 <li key={link.name} className="relative">
//                   <Link
//                     to={link.to}
//                     className={`transition-all duration-300 hover:text-blue-600 ${
//                       isActive ? "text-blue-600" : ""
//                     }`}
//                   >
//                     {link.name}
//                   </Link>

//                   <div
//                     className={`
//                       absolute left-0 -bottom-2 h-[2px] w-full
//                       bg-gradient-to-r from-blue-500 to-cyan-400
//                       transition-all duration-300 origin-left
//                       ${isActive ? "scale-x-100" : "scale-x-0"}
//                     `}
//                   />
//                 </li>
//               );
//             })}
//           </ul>

//           {/* BUTTONS */}
//           <div className="hidden md:flex gap-4 items-center">
//             <Link
//               to="/login"
//               className="px-4 py-2 rounded-xl border border-blue-500 text-blue-600 hover:bg-blue-50 hover:scale-105 transition"
//             >
//               Log in
//             </Link>

//             <Link
//               to="/register"
//               className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:shadow-xl hover:scale-105 transition"
//             >
//               Register
//             </Link>
//           </div>

//           {/* MOBILE BUTTON */}
//           <button
//             className="md:hidden text-gray-700 hover:scale-110 transition"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </div>

//       {/* OVERLAY */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* ========================= */}
//       {/* MOBILE MENU (UPGRADED) */}
//       {/* ========================= */}
//       <div
//         className={`
//           fixed top-0 left-0 h-full w-[85%] max-w-sm z-50
//           bg-white/95 backdrop-blur-xl
//           shadow-2xl border-r border-gray-100
//           transform transition-transform duration-500 ease-in-out
//           ${open ? "translate-x-0" : "-translate-x-full"}
//         `}
//       >

//         {/* HEADER */}
//         <div className="relative px-5 py-6 border-b overflow-hidden">

//           <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-blue-500/10 animate-pulse" />

//           <div className="relative flex items-center justify-between">
//             <h2 className="text-lg font-bold text-blue-700">CareTrack</h2>

//             <button
//               onClick={() => setOpen(false)}
//               className="
//                 w-10 h-10 rounded-full
//                 bg-gray-100
//                 hover:rotate-90
//                 transition-all duration-300
//                 flex items-center justify-center
//               "
//             >
//               <X size={20} />
//             </button>
//           </div>
//         </div>

//         {/* LINKS */}
//         <div className="p-5 space-y-3">

//           {navLinks.map((link, i) => (
//             <Link
//               key={link.name}
//               to={link.to}
//               onClick={() => setOpen(false)}
//               className="
//                 block
//                 px-4 py-4
//                 rounded-2xl
//                 bg-gray-50
//                 hover:bg-blue-50
//                 hover:scale-[1.03]
//                 transition-all duration-300
//                 shadow-sm
//                 font-medium text-gray-700
//               "
//               style={{
//                 animationDelay: `${i * 80}ms`,
//                 animation: "fadeInUp 0.4s ease forwards",
//               }}
//             >
//               {link.name}
//             </Link>
//           ))}

//           {/* ACTION BUTTONS */}
//           <div className="pt-6 space-y-3">

//             <Link
//               to="/login"
//               onClick={() => setOpen(false)}
//               className="
//                 block text-center
//                 py-3 rounded-2xl
//                 border border-blue-600
//                 text-blue-600
//                 hover:bg-blue-50
//                 transition
//                 font-medium
//               "
//             >
//               Log in
//             </Link>

//             <Link
//               to="/register"
//               onClick={() => setOpen(false)}
//               className="
//                 block text-center
//                 py-3 rounded-2xl
//                 bg-blue-600 text-white
//                 hover:bg-blue-700
//                 transition
//                 shadow-md
//                 font-medium
//               "
//             >
//               Register
//             </Link>

//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }


// _______________________________________________________________________________



// import { useState, useEffect } from "react";
// import { Menu, X } from "lucide-react";
// import caretrack from "../assets/caretrack.png";
// import { Link, useLocation } from "react-router-dom";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const location = useLocation();

//   const navLinks = [
//     { name: "Home", to: "/" },
//     { name: "Services", to: "/services" },
//     { name: "About", to: "/about" },
//     { name: "Contact us", to: "/contact" },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`
//         fixed top-0 left-0 w-full z-50 transition-all duration-500
//         ${scrolled
//           ? "bg-white shadow-lg backdrop-blur-xl"
//           : "bg-white/70 backdrop-blur-xl"
//         }
//       `}
//     >

//       {/* NAVBAR */}
//       <div
//         className={`
//           border-b border-blue-100 transition-all duration-500
//           ${scrolled ? "py-2" : "py-3"}
//         `}
//       >
//         <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

//           {/* LOGO */}
//           <Link
//             to="/"
//             className={`
//               rounded-full p-1
//               bg-gradient-to-tr from-blue-400 to-cyan-300
//               shadow-lg hover:scale-110 transition-all duration-500
//               ${scrolled ? "w-12 h-12" : "w-14 h-14 md:w-16 md:h-16"}
//             `}
//           >
//             <img
//               src={caretrack}
//               alt="logo"
//               className="w-full h-full object-cover rounded-full bg-white"
//             />
//           </Link>

//           {/* DESKTOP LINKS */}
//           <ul className="hidden md:flex gap-10 text-gray-700 font-medium">

//             {navLinks.map((link) => {
//               const isActive = location.pathname === link.to;

//               return (
//                 <li key={link.name} className="relative group">

//                   <Link
//                     to={link.to}
//                     className={`
//                       transition-all duration-300
//                       group-hover:text-blue-600
//                       ${isActive ? "text-blue-600 font-semibold" : ""}
//                     `}
//                   >
//                     {link.name}
//                   </Link>

//                   {/* animated underline */}
//                   <div
//                     className={`
//                       absolute left-0 -bottom-2 h-[2px] w-full
//                       bg-gradient-to-r from-blue-500 to-cyan-400
//                       origin-left transition-transform duration-300
//                       ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
//                     `}
//                   />
//                 </li>
//               );
//             })}

//           </ul>

//           {/* BUTTONS */}
//           <div className="hidden md:flex gap-4 items-center">

//             <Link
//               to="/login"
//               className="
//                 px-4 py-2 rounded-xl
//                 border border-blue-500
//                 text-blue-600
//                 hover:bg-blue-50
//                 hover:scale-105
//                 transition-all duration-300
//               "
//             >
//               Log in
//             </Link>

//             <Link
//               to="/register"
//               className="
//                 px-4 py-2 rounded-xl
//                 bg-gradient-to-r from-blue-600 to-cyan-500
//                 text-white
//                 shadow-md
//                 hover:shadow-xl
//                 hover:scale-105
//                 transition-all duration-300
//               "
//             >
//               Register
//             </Link>

//           </div>

//           {/* MOBILE BUTTON */}
//           <button
//             className="md:hidden text-gray-700 hover:scale-110 transition"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <X size={28} /> : <Menu size={28} />}
//           </button>

//         </div>
//       </div>

//       {/* OVERLAY */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* MOBILE MENU */}
//       <div
//         className={`
//           fixed top-0 left-0 h-full w-[85%] max-w-sm z-50
//          bg-white dark:bg-gray-900 opacity-100
//           shadow-2xl border-r border-gray-100
//           transform transition-transform duration-500 ease-in-out
//           ${open ? "translate-x-0" : "-translate-x-full"}
//         `}
//       >

//         {/* HEADER */}
//         <div className="relative px-5 py-6 border-b overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-blue-500/10 animate-pulse" />

//           <div className="relative flex items-center justify-between">
//             <h2 className="text-lg font-bold text-blue-700">CareTrack</h2>

//             <button
//               onClick={() => setOpen(false)}
//               className="w-10 h-10 rounded-full bg-gray-100 hover:rotate-90 transition flex items-center justify-center"
//             >
//               <X size={20} />
//             </button>
//           </div>
//         </div>

//         {/* LINKS */}
//         <div className="p-5 space-y-3">

//           {navLinks.map((link, i) => (
//             <Link
//               key={link.name}
//               to={link.to}
//               onClick={() => setOpen(false)}
//               className="
//                 block px-4 py-4 rounded-2xl
//                 bg-gray-50 hover:bg-blue-50
//                 hover:scale-[1.03]
//                 transition-all duration-300
//                 font-medium text-gray-700
//               "
//               style={{
//                 animationDelay: `${i * 80}ms`,
//                 animation: "fadeInUp 0.4s ease forwards",
//               }}
//             >
//               {link.name}
//             </Link>
//           ))}

//           {/* ACTIONS */}
//           <div className="pt-6 space-y-3">

//             <Link
//               to="/login"
//               onClick={() => setOpen(false)}
//               className="block text-center py-3 rounded-2xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
//             >
//               Log in
//             </Link>

//             <Link
//               to="/register"
//               onClick={() => setOpen(false)}
//               className="block text-center py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
//             >
//               Register
//             </Link>

//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// }




// 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111

// import { useState, useEffect } from "react";
// import { Menu, X, Moon, Sun, Settings } from "lucide-react";
// import caretrack from "../assets/caretrack.png";
// import { Link, useLocation } from "react-router-dom";
// import { useTheme } from "../context/ThemeContext";

// export default function Navbar() {

//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   // 🌙 THEME CONTEXT
//   const { dark, setDark } = useTheme();

//   const location = useLocation();

//   const navLinks = [
//     { name: "Home", to: "/" },
//     { name: "Services", to: "/services" },
//     { name: "About", to: "/about" },
//     { name: "Contact us", to: "/contact" },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`
//         fixed top-0 left-0 w-full z-50 transition-all duration-500
//         ${
//           scrolled
//             ? "bg-white dark:bg-gray-900 shadow-lg backdrop-blur-xl"
//             : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl"
//         }
//       `}
//     >

//       {/* NAVBAR */}
//       <div
//         className={`
//           border-b border-blue-100 dark:border-gray-700 transition-all duration-500
//           ${scrolled ? "py-2" : "py-3"}
//         `}
//       >
//         <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

//           {/* LOGO */}
//           <Link
//             to="/"
//             className={`
//               rounded-full p-1
//               bg-gradient-to-tr from-blue-400 to-cyan-300
//               shadow-lg hover:scale-110 transition-all duration-500
//               ${scrolled ? "w-12 h-12" : "w-14 h-14 md:w-16 md:h-16"}
//             `}
//           >
//             <img
//               src={caretrack}
//               alt="logo"
//               className="w-full h-full object-cover rounded-full bg-white"
//             />
//           </Link>

//           {/* DESKTOP LINKS */}
//           <ul className="hidden md:flex gap-10 text-gray-700 dark:text-white font-medium">

//             {navLinks.map((link) => {
//               const isActive = location.pathname === link.to;

//               return (
//                 <li key={link.name} className="relative group">

//                   <Link
//                     to={link.to}
//                     className={`
//                       transition-all duration-300
//                       group-hover:text-blue-600 dark:group-hover:text-cyan-400
//                       ${isActive ? "text-blue-600 dark:text-cyan-400 font-semibold" : ""}
//                     `}
//                   >
//                     {link.name}
//                   </Link>

//                   {/* underline */}
//                   <div
//                     className={`
//                       absolute left-0 -bottom-2 h-[2px] w-full
//                       bg-gradient-to-r from-blue-500 to-cyan-400
//                       origin-left transition-transform duration-300
//                       ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
//                     `}
//                   />
//                 </li>
//               );
//             })}

//           </ul>

//           {/* RIGHT SIDE */}
//           <div className="flex items-center gap-3">

//             {/* 🌙 DARK MODE BUTTON */}
//             <button
//               onClick={() => setDark(!dark)}
//               className="
//                 w-11 h-11 rounded-full
//                 bg-white dark:bg-gray-800
//                 border border-gray-200 dark:border-gray-700
//                 shadow-md hover:shadow-xl
//                 hover:scale-110
//                 transition-all duration-300
//                 flex items-center justify-center
//               "
//             >
//               {dark ? (
//                 <Sun size={18} className="text-yellow-400" />
//               ) : (
//                 <Moon size={18} className="text-blue-600" />
//               )}
//             </button>

//             {/* ⚙️ SETTINGS ICON */}
//             <Link
//               to="/setting"
//               className="
//                 w-11 h-11 rounded-full
//                 bg-white dark:bg-gray-800
//                 border border-gray-200 dark:border-gray-700
//                 shadow-md hover:shadow-xl
//                 hover:scale-110
//                 transition-all duration-300
//                 flex items-center justify-center
//               "
//             >
//               <Settings size={18} className="text-gray-700 dark:text-white" />
//             </Link>

//             {/* BUTTONS */}
//             <div className="hidden md:flex gap-4 items-center">

//               <Link
//                 to="/login"
//                 className="
//                   px-4 py-2 rounded-xl
//                   border border-blue-500
//                   text-blue-600 dark:text-cyan-400
//                   hover:bg-blue-50 dark:hover:bg-gray-800
//                   hover:scale-105
//                   transition-all duration-300
//                 "
//               >
//                 Log in
//               </Link>

//               <Link
//                 to="/register"
//                 className="
//                   px-4 py-2 rounded-xl
//                   bg-gradient-to-r from-blue-600 to-cyan-500
//                   text-white
//                   shadow-md
//                   hover:shadow-xl
//                   hover:scale-105
//                   transition-all duration-300
//                 "
//               >
//                 Register
//               </Link>

//             </div>

//             {/* MOBILE BUTTON */}
//             <button
//               className="md:hidden text-gray-700 dark:text-white hover:scale-110 transition"
//               onClick={() => setOpen(!open)}
//             >
//               {open ? <X size={28} /> : <Menu size={28} />}
//             </button>

//           </div>

//         </div>
//       </div>

//       {/* OVERLAY */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* MOBILE MENU (ما تغير) */}
//       <div
//         className={`
//           fixed top-0 left-0 h-full w-[85%] max-w-sm z-50
//           bg-white dark:bg-[#0f172a]
//           shadow-2xl border-r border-blue-100 dark:border-gray-700
//           transform transition-transform duration-500 ease-in-out
//           ${open ? "translate-x-0" : "-translate-x-full"}
//         `}
//       >
//         <div className="p-5 space-y-4">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               to={link.to}
//               onClick={() => setOpen(false)}
//               className="block px-5 py-4 rounded-2xl bg-white dark:bg-slate-800 border hover:bg-sky-50 dark:hover:bg-slate-700 transition"
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>
//       </div>

//     </nav>
//   );
// }


// 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222

import { useState, useEffect } from "react";
import { Menu, X, Settings } from "lucide-react";
import caretrack from "../assets/caretrack.png";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const { dark } = useTheme(); // (موجود بس ما عاد نستخدم زر القمر)

  const location = useLocation();

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Services", to: "/services" },
    { name: "About", to: "/about" },
    { name: "Contact us", to: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${
          scrolled
            ? "bg-white dark:bg-gray-900 shadow-lg backdrop-blur-xl"
            : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl"
        }
      `}
    >

      {/* NAVBAR */}
      <div
        className={`
          border-b border-blue-100 dark:border-gray-700 transition-all duration-500
          ${scrolled ? "py-2" : "py-3"}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className={`
              rounded-full p-1
              bg-gradient-to-tr from-blue-400 to-cyan-300
              shadow-lg hover:scale-110 transition-all duration-500
              ${scrolled ? "w-12 h-12" : "w-14 h-14 md:w-16 md:h-16"}
            `}
          >
            <img
              src={caretrack}
              alt="logo"
              className="w-full h-full object-cover rounded-full bg-white"
            />
          </Link>

          {/* DESKTOP LINKS */}
          <ul className="hidden md:flex gap-10 text-gray-700 dark:text-white font-medium">

            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;

              return (
                <li key={link.name} className="relative group">

                  <Link
                    to={link.to}
                    className={`
                      transition-all duration-300
                      group-hover:text-blue-600 dark:group-hover:text-cyan-400
                      ${isActive ? "text-blue-600 dark:text-cyan-400 font-semibold" : ""}
                    `}
                  >
                    {link.name}
                  </Link>

                  <div
                    className={`
                      absolute left-0 -bottom-2 h-[2px] w-full
                      bg-gradient-to-r from-blue-500 to-cyan-400
                      origin-left transition-transform duration-300
                      ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                    `}
                  />
                </li>
              );
            })}

          </ul>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* ⚙️ SETTINGS ICON (FANCY VERSION) */}
            <Link
              to="/setting"
              className="
                relative w-11 h-11 rounded-full
                bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400
                shadow-lg hover:shadow-2xl
                hover:scale-110
                transition-all duration-300
                flex items-center justify-center
                group
                overflow-hidden
              "
            >
              {/* glow effect */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />

              <Settings
                size={18}
                className="text-white drop-shadow-md group-hover:rotate-90 transition duration-300"
              />
            </Link>

            {/* BUTTONS */}
            <div className="hidden md:flex gap-4 items-center">

              <Link
                to="/login"
                className="
                  px-4 py-2 rounded-xl
                  border border-blue-500
                  text-blue-600 dark:text-cyan-400
                  hover:bg-blue-50 dark:hover:bg-gray-800
                  hover:scale-105
                  transition-all duration-300
                "
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="
                  px-4 py-2 rounded-xl
                  bg-gradient-to-r from-blue-600 to-cyan-500
                  text-white
                  shadow-md
                  hover:shadow-xl
                  hover:scale-105
                  transition-all duration-300
                "
              >
                Register
              </Link>

            </div>

            {/* MOBILE BUTTON */}
            <button
              className="md:hidden text-gray-700 dark:text-white hover:scale-110 transition"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>

          </div>

        </div>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE MENU */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[85%] max-w-sm z-50
          bg-white dark:bg-[#0f172a]
          shadow-2xl border-r border-blue-100 dark:border-gray-700
          transform transition-transform duration-500 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-5 space-y-4">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setOpen(false)}
              className="
                block px-5 py-4 rounded-2xl
                bg-white dark:bg-slate-800
                border hover:bg-sky-50 dark:hover:bg-slate-700
                transition
              "
            >
              {link.name}
            </Link>
          ))}

        </div>
      </div>

    </nav>
  );
}








