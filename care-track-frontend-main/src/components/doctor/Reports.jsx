// import React from "react";
// import Navbar from "../../components-admin/Navbar.jsx";
// import DoctorSidebar from "../../components-admin/DoctorSidebar.jsx";

// export default function Reports() {
//   const reports = [
//     { id: 1, patient: "Omar Khaled", type: "Blood Test", date: "2026-01-20", status: "Normal" },
//     { id: 2, patient: "Lina Ahmad", type: "ECG", date: "2026-01-19", status: "Abnormal" },
//   ];

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Navbar title="Reports" />
//       {/* <DoctorSidebar /> */}

//       <main className=" pt-20 p-6">
//         <h2 className="text-2xl font-bold mb-4">📋 Reports</h2>

//         <div className="bg-white rounded-xl shadow overflow-x-auto">
//           <table className="table-fixed w-full text-sm text-left divide-y divide-gray-200">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="w-1/4 px-4 py-3">Patient</th>
//                 <th className="w-1/4 px-4 py-3">Report Type</th>
//                 <th className="w-1/4 px-4 py-3">Date</th>
//                 <th className="w-1/4 px-4 py-3">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {reports.map((r) => (
//                 <tr key={r.id} className="hover:bg-gray-50">
//                   <td className="px-4 py-3 font-medium">{r.patient}</td>
//                   <td className="px-4 py-3">{r.type}</td>
//                   <td className="px-4 py-3">{r.date}</td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`px-2 py-1 rounded text-xs font-semibold ${
//                         r.status === "Normal"
//                           ? "bg-green-100 text-green-600"
//                           : "bg-red-100 text-red-600"
//                       }`}
//                     >
//                       {r.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }




// *****************************************************

// src/pages/doctor/Reports.jsx
import React, { useState } from "react";
import Navbar from "../../components-admin/Navbar.jsx";
import DoctorSidebar from "../../components-admin/DoctorSidebar.jsx";

export default function Reports() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const reports = [
    { id: 1, patient: "Omar Khaled", type: "Blood Test", date: "2026-01-20", status: "Normal" },
    { id: 2, patient: "Lina Ahmad", type: "ECG", date: "2026-01-19", status: "Abnormal" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar title="Reports" toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <DoctorSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <main className="pt-16 md:pl-64 p-4 md:p-6 transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4">📋 Reports</h2>

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="table-auto w-full text-sm text-left divide-y divide-gray-200 min-w-[600px]">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Report Type</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{r.patient}</td>
                  <td className="px-4 py-3">{r.type}</td>
                  <td className="px-4 py-3">{r.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        r.status === "Normal"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}