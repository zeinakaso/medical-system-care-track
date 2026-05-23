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

          <h2 className="text-3xl sm:text-3xl font-black text-gray-800 flex items-center gap-3 tracking-tight">

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
      <div
  className="
    relative
    overflow-hidden
    rounded-[32px]
    border border-white/50
    bg-white/75
    backdrop-blur-2xl
    shadow-[0_20px_60px_rgba(15,23,42,0.08)]
  "
>

  {/* BACKGROUND GLOW */}
  <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-300/20 blur-[120px] rounded-full"></div>
  <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-300/20 blur-[120px] rounded-full"></div>

  {/* TOP LINE */}
  <div className="h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500"></div>

  {/* HEADER */}
  <div className="relative px-6 md:px-8 py-5 border-b border-gray-100/80 flex items-center justify-between">

    <div>

      <div className="flex items-center gap-2 mb-1">

        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>

        <span className="text-[11px] uppercase tracking-[0.25em] text-sky-600 font-bold">
          Live Monitoring
        </span>

      </div>

      <h2 className="text-2xl font-black text-gray-800 tracking-tight">
        Vital Signals Dashboard 🫀
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Real-time monitoring of patient health indicators
      </p>

    </div>

    {/* LIVE STATUS */}
    <div
      className="
        hidden md:flex
        items-center gap-3
        px-4 py-2
        rounded-2xl
        bg-gradient-to-r
        from-red-50
        to-sky-50
        border border-red-100
      "
    >

      <div className="relative flex items-center justify-center">

        <div className="absolute w-3 h-3 rounded-full bg-red-400 animate-ping"></div>

        <div className="relative w-3 h-3 rounded-full bg-red-500"></div>

      </div>

      <div>
        <p className="text-xs text-gray-500">System Status</p>
        <h4 className="font-black text-red-500 text-sm">
          LIVE
        </h4>
      </div>

    </div>

  </div>

  {/* LOADING */}
  {loading ? (
    <div className="p-16 flex flex-col items-center justify-center">

      <div className="relative mb-5">

        <div className="w-16 h-16 rounded-full border-4 border-sky-100"></div>

        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-sky-500 border-t-transparent animate-spin"></div>

      </div>

      <h3 className="text-lg font-bold text-gray-700">
        Loading Vital Signals...
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        Syncing live patient measurements
      </p>

    </div>
  ) : (
    <div className="overflow-x-auto">

      <table className="w-full min-w-[950px] text-sm">

        {/* HEADER */}
        <thead>
          <tr className="bg-gradient-to-r from-sky-50 via-white to-cyan-50 text-gray-500 uppercase text-[11px] tracking-[0.18em]">

            <th className="px-6 py-5 text-left font-bold">#</th>
            <th className="px-6 py-5 text-left font-bold">Patient</th>
            <th className="px-6 py-5 text-left font-bold">Temperature</th>
            <th className="px-6 py-5 text-left font-bold">Heart Rate</th>
            <th className="px-6 py-5 text-left font-bold">Blood Pressure</th>
            <th className="px-6 py-5 text-left font-bold">Respiratory</th>

          </tr>
        </thead>

        {/* BODY */}
        <tbody>

          {filteredVitals.map((v, index) => (
            <tr
              key={v.id}
              className="
                border-t border-gray-100
                hover:bg-sky-50/40
                transition-all duration-300
              "
            >

              {/* INDEX */}
              <td className="px-6 py-5">

                {/* <div
                  className="
                    w-8 h-8
                    rounded-full
                    bg-gradient-to-br
                    from-sky-500
                    to-cyan-500
                    text-white
                    text-xs
                    font-bold
                    flex items-center justify-center
                    shadow-md
                  "
                > */}
                  {index + 1}
                {/* </div> */}

              </td>

              {/* PATIENT */}
              <td className="px-6 py-5">

                <div className="flex items-center gap-3">

                  {/* <div
                    className="
                      w-6 h-6
                      rounded-2xl
                      bg-gradient-to-br
                      from-sky-100
                      to-cyan-100
                      flex items-center justify-center
                      text-lg
                      shadow-sm
                    "
                  >
                    ⚕️
                  </div> */}

                  <div>

                    <h4 className="font-bold text-gray-800">
                      {v.patient_name}
                    </h4>

                    {/* <p className="text-xs text-gray-400">
                      Active Monitoring
                    </p> */}

                  </div>

                </div>

              </td>

              {/* TEMP */}
              <td className="px-6 py-5">

                <div
                  className="
                    inline-flex
                    items-center gap-2
                    px-4 py-2
                    rounded-xl
                    bg-orange-50
                    border border-orange-100
                    text-orange-600
                    font-bold
                  "
                >
                  🌡️ {v.temperature}°C
                </div>

              </td>

              {/* HEART */}
              <td className="px-6 py-5">

                <div
                  className="
                    inline-flex
                    items-center gap-2
                    px-4 py-2
                    rounded-xl
                    bg-red-50
                    border border-red-100
                    text-red-500
                    font-bold
                  "
                >
                  ❤️ {v.heart_rate} BPM
                </div>

              </td>

              {/* PRESSURE */}
              <td className="px-6 py-5">

                <div
                  className="
                    inline-flex
                    items-center gap-2
                    px-4 py-2
                    rounded-xl
                    bg-sky-50
                    border border-sky-100
                    text-sky-700
                    font-semibold
                  "
                >
                  🩸 {v.blood_pressure_systolic}/{v.blood_pressure_diastolic}
                </div>

              </td>

              {/* RESP */}
              <td className="px-6 py-5">

                <div
                  className="
                    inline-flex
                    items-center gap-2
                    px-4 py-2
                    rounded-xl
                    bg-cyan-50
                    border border-cyan-100
                    text-cyan-700
                    font-semibold
                  "
                >
                  🌬️ {v.respiratory_rate}
                </div>

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