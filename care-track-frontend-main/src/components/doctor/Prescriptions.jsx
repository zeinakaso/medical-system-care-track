// import React from "react";
// import Navbar from "../../components-admin/Navbar.jsx";
// import DoctorSidebar from "../../components-admin/DoctorSidebar.jsx";

// export default function Prescriptions() {
//   const prescriptions = [
//     { id: 1, patient: "Omar Khaled", med: "Paracetamol 500mg", dosage: "Twice daily", duration: "5 days" },
//     { id: 2, patient: "Lina Ahmad", med: "Amoxicillin 250mg", dosage: "Three times daily", duration: "7 days" },
//   ];

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Navbar title="Prescriptions" />
//       {/* <DoctorSidebar /> */} 

//       <main className=" pt-20 p-6">
//         <h2 className="text-2xl font-bold mb-4">💊 Prescriptions</h2>

//         <div className="bg-white rounded-xl shadow overflow-x-auto">
//           <table className="table-fixed w-full text-sm text-left divide-y divide-gray-200">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="w-1/4 px-4 py-3">Patient</th>
//                 <th className="w-1/4 px-4 py-3">Medication</th>
//                 <th className="w-1/4 px-4 py-3">Dosage</th>
//                 <th className="w-1/4 px-4 py-3">Duration</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {prescriptions.map((p) => (
//                 <tr key={p.id} className="hover:bg-gray-50">
//                   <td className="px-4 py-3 font-medium">{p.patient}</td>
//                   <td className="px-4 py-3">{p.med}</td>
//                   <td className="px-4 py-3">{p.dosage}</td>
//                   <td className="px-4 py-3">{p.duration}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }






// ******************************************************


// src/pages/doctor/Prescriptions.jsx
import React, { useState } from "react";
import Navbar from "../../components-admin/Navbar.jsx";
import DoctorSidebar from "../../components-admin/DoctorSidebar.jsx";

export default function Prescriptions() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const prescriptions = [
    { id: 1, patient: "Omar Khaled", med: "Paracetamol 500mg", dosage: "Twice daily", duration: "5 days" },
    { id: 2, patient: "Lina Ahmad", med: "Amoxicillin 250mg", dosage: "Three times daily", duration: "7 days" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar title="Prescriptions" toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <DoctorSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <main className="pt-16 md:pl-64 p-4 md:p-6 transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4">💊 Prescriptions</h2>

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="table-auto w-full text-sm text-left divide-y divide-gray-200 min-w-[600px]">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Medication</th>
                <th className="px-4 py-3">Dosage</th>
                <th className="px-4 py-3">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {prescriptions.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{p.patient}</td>
                  <td className="px-4 py-3">{p.med}</td>
                  <td className="px-4 py-3">{p.dosage}</td>
                  <td className="px-4 py-3">{p.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}