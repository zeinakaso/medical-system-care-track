// import React, { useEffect, useState } from "react";
// import API from "../../api";
// import { Search } from "lucide-react";

// export default function AdminVitals() {

//   const [search, setSearch] = useState("");
//   const [vitals, setVitals] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ================= FETCH =================
//   const loadVitals = async () => {
//     try {
//       setLoading(true);

//       const res = await API.get("/vitalSign");
//       console.log("Vitals API:", res.data);

//       setVitals(res.data.data || []);

//     } catch (err) {
//       console.error("Failed to load vitals:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadVitals();
//   }, []);

//   // ================= SEARCH =================
//   const filteredVitals = vitals.filter(v =>
//     (v.patient_name || "")
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   // ================= UI =================
//   return (
//     <div className="bg-gray-50 min-h-screen space-y-8">

//       <main className="pt-20 p-6">

//         <h2 className="text-2xl font-bold mb-6">
//           ❤️ Vital Signs Monitoring
//         </h2>

//         {/* SEARCH */}
//         <div className="relative mb-6 w-80">
//           <Search
//             size={18}
//             className="absolute left-3 top-2.5 text-gray-400"
//           />

//           <input
//             type="text"
//             placeholder="Search patient..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
//           />
//         </div>

//         {/* TABLE */}
//         <div className="bg-white rounded-xl shadow-md overflow-x-auto">

//           {loading ? (
//             <p className="p-4">Loading...</p>
//           ) : (
//             <table className="w-full text-sm text-left">

//               <thead className="bg-blue-50 text-gray-700 uppercase text-xs">
//                 <tr>
//                   <th className="px-4 py-3">#</th>
//                   <th className="px-4 py-3">Patient Name</th>
//                   <th className="px-4 py-3">Temperature</th>
//                   <th className="px-4 py-3">Heart Rate</th>
//                   <th className="px-4 py-3">Blood Pressure</th>
//                   <th className="px-4 py-3">Resp Rate</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y">

//                 {filteredVitals.map((v) => (

//                   <tr key={v.id} className="hover:bg-blue-50 transition">

//                     <td className="px-4 py-3 font-medium text-gray-600">
//                       {v.id}
//                     </td>

//                     <td className="px-4 py-3 font-semibold text-gray-800">
//                       {v.patient_name}
//                     </td>

//                     <td className="px-4 py-3 text-blue-600 font-medium">
//                       {v.temperature}
//                     </td>

//                     <td className="px-4 py-3">
//                       {v.heart_rate}
//                     </td>

//                     <td className="px-4 py-3">
//                       {v.blood_pressure_systolic} / {v.blood_pressure_diastolic}
//                     </td>

//                     <td className="px-4 py-3">
//                       {v.respiratory_rate}
//                     </td>

//                   </tr>

//                 ))}

//               </tbody>

//             </table>
//           )}

//         </div>

//       </main>

//     </div>
//   );
// }



// 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222




import React, { useEffect, useState } from "react";
import API from "../../api";
import { Search } from "lucide-react";

export default function AdminVitals() {

  const [search, setSearch] = useState("");
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  const loadVitals = async () => {
    try {
      setLoading(true);

      const res = await API.get("/vitalSign");
      console.log("Vitals API:", res.data);

      setVitals(res.data.data || []);

    } catch (err) {
      console.error("Failed to load vitals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVitals();
  }, []);

  // ================= SEARCH =================
  const filteredVitals = vitals.filter(v =>
    (v.patient_name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= UI =================
 return (
  <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50">

    {/* 🌈 Soft Animated Background */}
    <div className="absolute inset-0 pointer-events-none">

      <div className="absolute top-[-180px] left-[-180px] w-[500px] h-[500px] bg-sky-200/40 blur-[140px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-200/40 blur-[160px] rounded-full animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-100/40 blur-[140px] rounded-full animate-pulse" />

    </div>

    <main className="relative p-4 sm:p-6 md:p-10 space-y-8">

      {/* ✨ HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 animate-fade-in">

        <div>

          <h2 className="text-3xl sm:text-5xl font-black text-gray-800 flex items-center gap-3 tracking-tight">

            Vital Signs Monitoring

            <span className="text-red-500 animate-bounce">❤️</span>

          </h2>

          <p className="text-gray-500 mt-3 text-sm max-w-md leading-relaxed">
            Real-time patient monitoring dashboard — track vitals, detect anomalies and improve care instantly.
          </p>

        </div>

        <div className="px-5 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-gray-100 shadow-md text-sm font-semibold text-sky-600">

          🏥 Live Medical System

        </div>

      </div>

      {/* 🔎 SEARCH */}
      <div className="relative max-w-md group">

        <Search className="absolute left-3 top-3 text-gray-400 group-focus-within:text-sky-500 transition" size={18} />

        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-2xl
          bg-white/80 backdrop-blur-xl
          border border-gray-200
          shadow-sm
          text-gray-700 placeholder-gray-400
          focus:ring-2 focus:ring-sky-200 outline-none transition"
        />

      </div>

      {/* 📊 TABLE CARD */}
      <div className="rounded-3xl overflow-hidden bg-white/70 backdrop-blur-2xl border border-gray-100 shadow-xl">

        {/* top glow line */}
        <div className="h-[3px] bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-400 animate-pulse"></div>

        {loading ? (
          <div className="p-16 text-center text-gray-500">
            <div className="text-3xl animate-spin mb-3">🫀</div>
            Loading vital signals...
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full min-w-[800px] text-sm">

              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-5 text-left">#</th>
                  <th className="p-5 text-left">Patient</th>
                  <th className="p-5 text-left">Temp</th>
                  <th className="p-5 text-left">Heart</th>
                  <th className="p-5 text-left">Pressure</th>
                  <th className="p-5 text-left">Resp</th>
                </tr>
              </thead>

              <tbody>

                {filteredVitals.map((v) => (
                  <tr
                    key={v.id}
                    className="border-t border-gray-100 hover:bg-sky-50/50 transition"
                  >

                    <td className="p-5 text-gray-500">{v.id}</td>

                    <td className="p-5 font-semibold text-gray-800">
                      {v.patient_name}
                    </td>

                    <td className="p-5 text-sky-600 font-medium">
                      {v.temperature}
                    </td>

                    <td className="p-5 text-gray-700">
                      {v.heart_rate}
                    </td>

                    <td className="p-5 text-gray-700">
                      {v.blood_pressure_systolic} / {v.blood_pressure_diastolic}
                    </td>

                    <td className="p-5 text-gray-700">
                      {v.respiratory_rate}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </main>
  </div>
);
}