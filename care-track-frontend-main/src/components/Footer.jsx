// import React from "react";
// import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
// import caretrack from "../assets/caretrack.png";

// export default function Footer() {

 
//   return (
//     <footer
//       className="
         
//         mt-30
//          bottom-0 left-0 w-full
//         bg-white
//         shadow-[0_-2px_15px_rgba(0,0,0,0.08)]
//         border-t border-blue-100
//         py-12 px-6
//         z-50
//       "
//     >
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

//         {/* logo + description */}
//         <div>
//            <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-blue-400 to-teal-300 shadow-lg">
//   <div className="w-full h-full rounded-full overflow-hidden bg-white">
//     <img src={caretrack} alt="logo" className="w-full h-full object-cover" />
//   </div>
// </div>
//           <p className="text-gray-600 leading-relaxed">
//             Smart Medical Monitoring System that helps patients track their health
//             and connect with doctors easily.
//           </p>
//         </div>

//         {/* Column 1 */}
//         <div>
//           <h3 className="text-blue-700 font-semibold text-lg mb-3">Navigation</h3>
//           <ul className="space-y-2 text-gray-600">
//             <li><a href="#" className="hover:text-blue-600">Home</a></li>
//             <li><a href="#" className="hover:text-blue-600">Services</a></li>
//             <li><a href="#" className="hover:text-blue-600">About</a></li>
//             <li><a href="#" className="hover:text-blue-600">Contact</a></li>
//           </ul>
//         </div>

//         {/* Column 2 */}
//         <div>
//           <h3 className="text-blue-700 font-semibold text-lg mb-3">Medical Tools</h3>
//           <ul className="space-y-2 text-gray-600">
//             <li><a href="#" className="hover:text-blue-600">Heart Monitor</a></li>
//             <li><a href="#" className="hover:text-blue-600">Blood Pressure</a></li>
//             <li><a href="#" className="hover:text-blue-600">Temperature</a></li>
//             <li><a href="#" className="hover:text-blue-600">Body Oxygen</a></li>
//           </ul>
//         </div>

//         {/* Column 3 */}
//         <div>
//           <h3 className="text-blue-700 font-semibold text-lg mb-3">Support</h3>
//           <ul className="space-y-2 text-gray-600">
//             <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
//             <li><a href="#" className="hover:text-blue-600">FAQs</a></li>
//             <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
//             <li><a href="#" className="hover:text-blue-600">Terms of Use</a></li>
//           </ul>
//         </div>
//       </div>

//       <hr className="my-10 border-blue-100" />

//       {/* bottom bar */}
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
//         <p className="text-gray-600">
//           © {new Date().getFullYear()} CareTrack — All Rights Reserved
//         </p>

//         <div className="flex gap-5 text-blue-700">
//           <Facebook className="cursor-pointer hover:text-blue-900" />
//           <Instagram className="cursor-pointer hover:text-blue-900" />
//           <Twitter className="cursor-pointer hover:text-blue-900" />
//           <Mail className="cursor-pointer hover:text-blue-900" />
//         </div>
//       </div>


      
//     </footer>
//   );
// }



// 2222222222222222222222222222222222222222222222222222222222222222222222222222
import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Mail, ShieldCheck, Activity, AlertTriangle } from "lucide-react";
import caretrack from "../assets/caretrack.png";

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-gradient-to-b from-white via-[#f6fbff] to-[#eef7ff] border-t border-sky-100 overflow-hidden">

      {/* glow */}
      <div className="absolute top-0 left-10 w-72 h-72 bg-sky-300/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-cyan-300/20 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 py-14">

        {/* TOP STATUS BAR */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">

          {/* BRAND */}
          <div className="flex items-center gap-3">
            <img src={caretrack} className="w-12 h-12 rounded-full" />
            <div>
              <h2 className="font-bold text-sky-700">CareTrack System</h2>
              <p className="text-xs text-slate-500">Clinical Monitoring Dashboard</p>
            </div>
          </div>

          {/* SYSTEM STATUS */}
          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-xl border border-sky-100 px-4 py-2 rounded-full shadow-sm">

            <Activity className="text-green-600 animate-pulse" size={16} />

            <span className="text-sm text-slate-700 font-medium">
              System Operational
            </span>

          </div>

        </div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* SECURITY PANEL */}
          <div className="bg-white/60 backdrop-blur-xl border border-sky-100 rounded-2xl p-6 shadow-sm">

            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="text-sky-600" />
              <h3 className="font-semibold text-sky-700">Security</h3>
            </div>

            <p className="text-sm text-slate-600">
              All patient data is securely encrypted and handled under strict healthcare privacy standards.
            </p>

          </div>

          {/* SUPPORT */}
          <div className="bg-white/60 backdrop-blur-xl border border-sky-100 rounded-2xl p-6 shadow-sm">

            <div className="flex items-center gap-2 mb-3">
              <Mail className="text-sky-600" />
              <h3 className="font-semibold text-sky-700">Support</h3>
            </div>

            <p className="text-sm text-slate-600">
              support@caretrack.health
            </p>

          </div>

          {/* ALERT INFO */}
          <div className="bg-white/60 backdrop-blur-xl border border-sky-100 rounded-2xl p-6 shadow-sm">

            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="text-amber-500" />
              <h3 className="font-semibold text-sky-700">Alerts</h3>
            </div>

            <p className="text-sm text-slate-600">
              Emergency monitoring active for critical patients.
            </p>

          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-10 pt-5 border-t border-sky-100 flex flex-col md:flex-row justify-between items-center gap-3">

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} CareTrack Medical System
          </p>

          <p className="text-xs text-slate-500">
            Designed for clinical decision support
          </p>
          <div className="flex items-center gap-4">

  <span className="text-xs text-slate-400 hidden md:block">
    Official Channels:
  </span>

  <a
    href="https://facebook.com"
    target="_blank"
    rel="noreferrer"
    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/70 border border-sky-100 text-sky-600 hover:bg-sky-50 hover:scale-105 transition"
  >
    <Facebook size={16} />
  </a>

  <a
    href="https://instagram.com"
    target="_blank"
    rel="noreferrer"
    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/70 border border-sky-100 text-sky-600 hover:bg-sky-50 hover:scale-105 transition"
  >
    <Instagram size={16} />
  </a>

  <a
    href="https://twitter.com"
    target="_blank"
    rel="noreferrer"
    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/70 border border-sky-100 text-sky-600 hover:bg-sky-50 hover:scale-105 transition"
  >
    <Twitter size={16} />
  </a>

</div>

        </div>

      </div>
    </footer>
  );
}