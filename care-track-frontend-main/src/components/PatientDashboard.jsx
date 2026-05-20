// import React from "react";
// import Navbar from "../components-admin/Navbar.jsx";
// import PatientSidebar from "../components-admin/PatientSidebar.jsx";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

// export default function PatientDashboard() {
//   const vitalsHistory = [
//     { day: "Sunday", temp: 37.5 },
//     { day: "Monday", temp: 37.8 },
//     { day: "Tuesday", temp: 37.6 },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar  title="Patient Dashboard"/>
//       <PatientSidebar />

//       <main className="ml-64 pt-20 p-6">
//         {/* Header */}
//         <h2 className="text-2xl font-bold mb-1">Welcome Ahmed 👋</h2>
//         <p className="text-gray-500 mb-6">Here is your health summary</p>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-5 rounded-xl shadow text-center">
//             <h6 className="text-gray-500">Last Temperature</h6>
//             <h3 className="text-2xl font-bold">37.8°C</h3>
//           </div>

//           <div className="bg-white p-5 rounded-xl shadow text-center">
//             <h6 className="text-gray-500">Last Blood Pressure</h6>
//             <h3 className="text-2xl font-bold">120 / 80</h3>
//           </div>

//           <div className="bg-white p-5 rounded-xl shadow text-center">
//             <h6 className="text-gray-500">Last Heart Rate</h6>
//             <h3 className="text-2xl font-bold">78 bpm</h3>
//           </div>
//         </div>

//         {/* Vitals Form */}
//         <div className="bg-white rounded-xl shadow p-6 mb-8">
//           <h5 className="font-semibold mb-4">Enter Your Vitals</h5>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <input
//               type="number"
//               placeholder="Temperature °C"
//               className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//             <input
//               type="text"
//               placeholder="Blood Pressure (120/80)"
//               className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//             <input
//               type="number"
//               placeholder="Heart Rate"
//               className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//             <input
//               type="number"
//               placeholder="Respiration Rate"
//               className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <div className="text-right mt-4">
//             <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
//               Submit
//             </button>
//           </div>
//         </div>

//         {/* Swiper – Vitals History */}
//         <div className="bg-white rounded-xl shadow p-6 mb-8">
//           <h5 className="font-semibold mb-4">Vitals History</h5>

//           <Swiper
//             slidesPerView={2}
//             spaceBetween={15}
//             breakpoints={{
//               768: { slidesPerView: 3 },
//               1200: { slidesPerView: 4 },
//             }}
//           >
//             {vitalsHistory.map((v, i) => (
//               <SwiperSlide
//                 key={i}
//                 className="bg-gray-50 rounded-lg p-4 text-center"
//               >
//                 <h6 className="font-semibold">{v.day}</h6>
//                 <p className="text-gray-600">Temp: {v.temp}°C</p>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//         <div className="bg-white p-4 rounded-xl shadow">
//             <h4 className="font-semibold mb-3">
//               Treatment Plan & Prescriptions
//             </h4>

//             <ul className="space-y-2 text-gray-700">
//               <li className="bg-blue-50 px-4 py-2 rounded-lg">
//                 Paracetamol 500mg – twice daily
//               </li>
//               <li className="bg-blue-50 px-4 py-2 rounded-lg">
//                 Blood pressure medication – morning & evening
//               </li>
//               <li className="bg-blue-50 px-4 py-2 rounded-lg">
//                 Daily walking – 30 minutes
//               </li>
//             </ul>
//           </div>

//       </main>
//     </div>
//   );
// }

// ************************************************************

// import React, { useState } from "react";
// import Navbar from "../components-admin/Navbar.jsx";
// import Sidebar from "../components-admin/PatientSidebar.jsx";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

// export default function PatientDashboard() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const vitalsHistory = [
//     { day: "Sunday", temp: 37.5 },
//     { day: "Monday", temp: 37.8 },
//     { day: "Tuesday", temp: 37.6 },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100">
      
//       <Navbar title="Patient Dashboard" toggleSidebar={toggleSidebar} />
//       <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

//       {/* 🔥 مهم: إزالة ml-64 بالموبايل */}
//       <main className="pt-28 md:pt-32 p-4 md:ml-64">

//         <h2 className="text-xl md:text-2xl font-bold mb-1">
//           Welcome Ahmed 👋
//         </h2>
//         <p className="text-gray-500 mb-6">
//           Here is your health summary
//         </p>

//         {/* Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
//           <div className="bg-white p-4 md:p-5 rounded-xl shadow text-center">
//             <h6 className="text-gray-500">Last Temperature</h6>
//             <h3 className="text-xl md:text-2xl font-bold">37.8°C</h3>
//           </div>

//           <div className="bg-white p-4 md:p-5 rounded-xl shadow text-center">
//             <h6 className="text-gray-500">Last Blood Pressure</h6>
//             <h3 className="text-xl md:text-2xl font-bold">120 / 80</h3>
//           </div>

//           <div className="bg-white p-4 md:p-5 rounded-xl shadow text-center">
//             <h6 className="text-gray-500">Last Heart Rate</h6>
//             <h3 className="text-xl md:text-2xl font-bold">78 bpm</h3>
//           </div>
//         </div>

//         {/* Form */}
//         <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-8">
//           <h5 className="font-semibold mb-4">Enter Your Vitals</h5>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//             <input type="number" placeholder="Temperature °C" className="border rounded-lg px-4 py-2" />
//             <input type="text" placeholder="Blood Pressure" className="border rounded-lg px-4 py-2" />
//             <input type="number" placeholder="Heart Rate" className="border rounded-lg px-4 py-2" />
//             <input type="number" placeholder="Respiration Rate" className="border rounded-lg px-4 py-2" />
//           </div>

//           <div className="text-right mt-4">
//             <button className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg">
//               Submit
//             </button>
//           </div>
//         </div>

//         {/* Swiper */}
//         <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-8">
//           <h5 className="font-semibold mb-4">Vitals History</h5>

//           <Swiper
//             slidesPerView={1}
//             spaceBetween={10}
//             breakpoints={{
//               640: { slidesPerView: 2 },
//               768: { slidesPerView: 3 },
//               1200: { slidesPerView: 4 },
//             }}
//           >
//             {vitalsHistory.map((v, i) => (
//               <SwiperSlide key={i} className="bg-gray-50 rounded-lg p-4 text-center">
//                 <h6 className="font-semibold">{v.day}</h6>
//                 <p className="text-gray-600">Temp: {v.temp}°C</p>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//         {/* Treatment */}
//         <div className="bg-white p-4 rounded-xl shadow">
//           <h4 className="font-semibold mb-3">
//             Treatment Plan & Prescriptions
//           </h4>

//           <ul className="space-y-2 text-gray-700">
//             <li className="bg-blue-50 px-4 py-2 rounded-lg">
//               Paracetamol 500mg – twice daily
//             </li>
//             <li className="bg-blue-50 px-4 py-2 rounded-lg">
//               Blood pressure medication – morning & evening
//             </li>
//             <li className="bg-blue-50 px-4 py-2 rounded-lg">
//               Daily walking – 30 minutes
//             </li>
//           </ul>
//         </div>

//       </main>
//     </div>
//   );
// }












import React, { useState } from "react";
import Navbar from "../components-admin/Navbar.jsx";
import Sidebar from "../components-admin/PatientSidebar.jsx";
import { Outlet } from "react-router-dom";

export default function PatientDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <Navbar title="Patient Dashboard ❤️ " toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* 🔥 هون المحتوى بيتغير */}
      <main className="pt-28 md:pt-32 p-4 md:ml-64">
        <Outlet />
      </main>

    </div>
  );
}