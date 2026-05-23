
// 11111111111111111111111111111111111111111111111111111111111111111111111111111111

// import React, { useEffect, useState } from "react";

// const API_BASE = "http://localhost:8000/api";

// export default function PatientTreatment() {
//   const user = JSON.parse(localStorage.getItem("user") || "null");
//   const token = localStorage.getItem("token");

//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ================= HEADERS =================
//   const getHeaders = () => ({
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token || ""}`,
//   });

//   // ================= ERROR =================
//   const showError = (msg) => {
//     const el = document.createElement("div");
//     el.innerText = msg;

//     el.className =
//       "fixed top-5 right-5 z-[99999] bg-red-500 text-white px-4 py-3 rounded-xl shadow-xl";

//     document.body.appendChild(el);

//     setTimeout(() => el.remove(), 3000);
//   };

//   // ================= FETCH =================
//   const fetchPlans = async () => {
//     try {
//       if (!user?.id) return;

//       const res = await fetch(
//         `${API_BASE}/treatment-plan/user/${user.id}`,
//         {
//           headers: getHeaders(),
//         }
//       );

//       const json = await res.json();

//       const rows = json?.data?.data ?? [];

//       // الأحدث أولاً
//       const sorted = [...rows].sort(
//         (a, b) =>
//           new Date(b.created_at || b.updated_at) -
//           new Date(a.created_at || a.updated_at)
//       );

//       setPlans(sorted);

//     } catch (err) {
//       console.error(err);
//       showError("Failed to load treatment plans");
//     }
//   };

//   // ================= INIT =================
//   useEffect(() => {
//     if (!user || !token) {
//       window.location.href = "/login";
//       return;
//     }

//     (async () => {
//       setLoading(true);
//       await fetchPlans();
//       setLoading(false);
//     })();
//   }, []);

//   // ================= LOADING =================
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="pt-24 p-6 bg-gray-50 min-h-screen">

//       {/* HEADER */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-blue-700">
//           📄 Treatment Plans
//         </h1>

//         <p className="text-gray-500 mt-1">
//           All treatment plans assigned to you
//         </p>
//       </div>

//       {/* EMPTY */}
//       {plans.length === 0 && (
//         <div className="bg-white rounded-2xl p-6 shadow text-center text-gray-500">
//           No treatment plans available
//         </div>
//       )}

//       {/* CARDS */}
//       <div className="grid gap-5">

//         {plans.map((p) => {

//           const today = new Date().toISOString().split("T")[0];
//           const isExpired = today > p.end_date;

//           return (
//             <div
//               key={p.id}
//               className={`rounded-2xl p-6 shadow-sm border hover:shadow-md transition
//               ${
//                 isExpired
//                   ? "bg-red-50 border-red-200"
//                   : "bg-green-50 border-green-200"
//               }`}
//             >

//               {/* TOP */}
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">

//                 <div>
//                   <p className="text-sm text-gray-500 mt-1">
//                     Created:{" "}
//                     {p.created_at
//                       ? new Date(p.created_at).toLocaleString()
//                       : "N/A"}
//                   </p>
//                 </div>

//                 {/* STATUS */}
//                 <div
//                   className={`px-4 py-2 rounded-xl text-sm font-medium w-fit
//                   ${
//                     isExpired
//                       ? "bg-red-100 text-red-700"
//                       : "bg-green-100 text-green-700"
//                   }`}
//                 >
//                   {isExpired ? "Expired Plan" : "Active Plan"}
//                 </div>

//               </div>

//               {/* BODY */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//                 {/* Diagnosis */}
//                 <div className="bg-gray-50 rounded-xl p-4">
//                   <p className="text-sm text-gray-500 mb-1">
//                     Diagnosis
//                   </p>

//                   <p className="font-semibold text-gray-800">
//                     {p.diagnosis || "N/A"}
//                   </p>
//                 </div>

//                 {/* Medications */}
//                 <div className="bg-gray-50 rounded-xl p-4">
//                   <p className="text-sm text-gray-500 mb-1">
//                     Medications
//                   </p>

//                   <p className="font-semibold text-gray-800 whitespace-pre-line">
//                     {p.medications || "N/A"}
//                   </p>
//                 </div>

//                 {/* Instructions */}
//                 <div className="bg-gray-50 rounded-xl p-4 md:col-span-2">
//                   <p className="text-sm text-gray-500 mb-1">
//                     Instructions
//                   </p>

//                   <p className="font-semibold text-gray-800 whitespace-pre-line">
//                     {p.instructions || "N/A"}
//                   </p>
//                 </div>

//                 {/* START DATE */}
//                 <div className="bg-green-50 rounded-xl p-4 border border-green-100">
//                   <p className="text-sm text-green-700 mb-1">
//                     📅 Start Date
//                   </p>

//                   <p className="font-bold text-gray-800">
//                     {p.start_date || "N/A"}
//                   </p>
//                 </div>

//                 {/* END DATE */}
//                 <div className="bg-red-50 rounded-xl p-4 border border-red-100">
//                   <p className="text-sm text-red-700 mb-1">
//                     ⏳ End Date
//                   </p>

//                   <p className="font-bold text-gray-800">
//                     {p.end_date || "N/A"}
//                   </p>
//                 </div>

//                 {/* OPTIONAL FIELDS */}
//                 {p.notes && (
//                   <div className="bg-yellow-50 rounded-xl p-4 md:col-span-2 border border-yellow-100">
//                     <p className="text-sm text-yellow-700 mb-1">
//                       📝 Notes
//                     </p>

//                     <p className="font-medium text-gray-800 whitespace-pre-line">
//                       {p.notes}
//                     </p>
//                   </div>
//                 )}

//               </div>

//             </div>
//           );
//         })}

//       </div>

//     </div>
//   );
// }




// 222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222


// import React, { useEffect, useState } from "react";

// const API_BASE = "http://localhost:8000/api";

// export default function PatientTreatment() {
//   const user = JSON.parse(localStorage.getItem("user") || "null");
//   const token = localStorage.getItem("token");

//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ================= HEADERS =================
//   const getHeaders = () => ({
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token || ""}`,
//   });

//   // ================= ERROR =================
//   const showError = (msg) => {
//     const el = document.createElement("div");
//     el.innerText = msg;

//     el.className =
//       "fixed top-5 right-5 z-[99999] bg-red-500 text-white px-4 py-3 rounded-xl shadow-xl";

//     document.body.appendChild(el);

//     setTimeout(() => el.remove(), 3000);
//   };

//   // ================= FETCH =================
//   const fetchPlans = async () => {
//     try {
//       if (!user?.id) return;

//       const res = await fetch(
//         `${API_BASE}/treatment-plan/user/${user.id}`,
//         {
//           headers: getHeaders(),
//         }
//       );

//       const json = await res.json();

//       const rows = json?.data?.data ?? [];

//       // الأحدث أولاً
//       const sorted = [...rows].sort(
//         (a, b) =>
//           new Date(b.created_at || b.updated_at) -
//           new Date(a.created_at || a.updated_at)
//       );

//       setPlans(sorted);

//     } catch (err) {
//       console.error(err);
//       showError("Failed to load treatment plans");
//     }
//   };

//   // ================= INIT =================
//   useEffect(() => {
//     if (!user || !token) {
//       window.location.href = "/login";
//       return;
//     }

//     (async () => {
//       setLoading(true);
//       await fetchPlans();
//       setLoading(false);
//     })();
//   }, []);

//   // ================= LOADING =================
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//  return (
//   <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-slate-100 p-4 md:p-8">

//     {/* HEADER */}
//     <div className="mb-8">
//       <h1 className="text-3xl font-bold text-blue-500">
//         📄 Treatment Plans
//       </h1>
//       <p className="text-gray-500 mt-1">
//         All your medical treatment plans in one place
//       </p>
//     </div>

//     {/* EMPTY STATE */}
//     {plans.length === 0 && (
//       <div className="bg-white rounded-2xl p-8 shadow text-center text-gray-500 border">
//         No treatment plans available
//       </div>
//     )}

//     {/* CARDS */}
//     <div className="grid gap-6">

//       {plans.map((p) => {

//         const today = new Date().toISOString().split("T")[0];
//         const isExpired = today > p.end_date;

//         return (
//           <div
//             key={p.id}
//             className={`
//               rounded-3xl p-6 md:p-8
//               border shadow-sm
//               transition-all duration-300
//               hover:shadow-xl hover:scale-[1.01]
//               ${isExpired
//                 ? "bg-red-50/60 border-red-200"
//                 : "bg-green-50/60 border-green-400"
//               }
//             `}
//           >

//             {/* TOP */}
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">

//               <div>
//                 <p className="text-xs text-gray-500 uppercase tracking-wide">
//                   Created At
//                 </p>

//                 <p className="text-sm font-semibold text-gray-700 mt-1">
//                   {p.created_at
//                     ? new Date(p.created_at).toLocaleString()
//                     : "N/A"}
//                 </p>
//               </div>

//               {/* STATUS BADGE */}
//               <div
//                 className={`
//                   px-5 py-2 rounded-full text-sm font-semibold w-fit
//                   shadow-sm
//                   ${isExpired
//                     ? "bg-red-100 text-red-700 border border-red-200"
//                     : "bg-green-100 text-green-500 border border-green-200"
//                   }
//                 `}
//               >
//                 {isExpired ? "Expired Plan" : "Active Plan"}
//               </div>

//             </div>

//             {/* BODY GRID */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//               {/* DIAGNOSIS */}
//               <div className="bg-white rounded-2xl p-5 border shadow-sm">
//                 <p className="text-xs text-gray-400 mb-2">Diagnosis</p>
//                 <p className="font-semibold text-gray-800">
//                   {p.diagnosis || "N/A"}
//                 </p>
//               </div>

//               {/* MEDICATIONS */}
//               <div className="bg-white rounded-2xl p-5 border shadow-sm">
//                 <p className="text-xs text-gray-400 mb-2">Medications</p>
//                 <p className="font-semibold text-gray-800 whitespace-pre-line">
//                   {p.medications || "N/A"}
//                 </p>
//               </div>

//               {/* INSTRUCTIONS */}
//               <div className="md:col-span-2 bg-white rounded-2xl p-5 border shadow-sm">
//                 <p className="text-xs text-gray-400 mb-2">Instructions</p>
//                 <p className="font-semibold text-gray-800 whitespace-pre-line">
//                   {p.instructions || "N/A"}
//                 </p>
//               </div>

//               {/* START DATE */}
//               <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
//                 <p className="text-xs text-blue-600 mb-2">Start Date</p>
//                 <p className="font-bold text-gray-800">
//                   {p.start_date || "N/A"}
//                 </p>
//               </div>

//               {/* END DATE */}
//               <div className="bg-purple-50 rounded-2xl p-5 border border-purple-100">
//                 <p className="text-xs text-purple-600 mb-2">End Date</p>
//                 <p className="font-bold text-gray-800">
//                   {p.end_date || "N/A"}
//                 </p>
//               </div>

//               {/* NOTES */}
//               {p.notes && (
//                 <div className="md:col-span-2 bg-yellow-50 rounded-2xl p-5 border border-yellow-100">
//                   <p className="text-xs text-yellow-700 mb-2">Notes</p>
//                   <p className="font-medium text-gray-800 whitespace-pre-line">
//                     {p.notes}
//                   </p>
//                 </div>
//               )}

//             </div>

//           </div>
//         );
//       })}

//     </div>

//   </div>
// );
// }

// 333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
import React, { useEffect, useState } from "react";
import {
  Calendar,
  FileText,
  Pill,
  ClipboardList,
  StickyNote,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

const API_BASE = "http://localhost:8000/api";

export default function PatientTreatment() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= HEADERS =================
  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token || ""}`,
  });

  // ================= ERROR =================
  const showError = (msg) => {
    const el = document.createElement("div");
    el.innerText = msg;

    el.className =
      "fixed top-5 right-5 z-[99999] bg-red-500 text-white px-5 py-3 rounded-2xl shadow-xl animate-pulse";

    document.body.appendChild(el);

    setTimeout(() => el.remove(), 3000);
  };

  // ================= FETCH =================
  const fetchPlans = async () => {
    try {
      if (!user?.id) return;

      const res = await fetch(
        `${API_BASE}/treatment-plan/user/${user.id}`,
        {
          headers: getHeaders(),
        }
      );

      const json = await res.json();

      const rows = json?.data?.data ?? [];

      const sorted = [...rows].sort(
        (a, b) =>
          new Date(b.created_at || b.updated_at) -
          new Date(a.created_at || a.updated_at)
      );

      setPlans(sorted);
    } catch (err) {
      console.error(err);
      showError("Failed to load treatment plans");
    }
  };

  // ================= INIT =================
  useEffect(() => {
    if (!user || !token) {
      window.location.href = "/login";
      return;
    }

    (async () => {
      setLoading(true);
      await fetchPlans();
      setLoading(false);
    })();
  }, []);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-100">

        <div className="w-16 h-16 border-[5px] border-cyan-500 border-t-transparent rounded-full animate-spin mb-5"></div>

        <h1 className="text-2xl font-bold text-slate-700">
          Loading Treatment Plans...
        </h1>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-100 p-4 md:p-8">

      {/* HEADER */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>

          <div className="flex items-center gap-3 mb-2">

            <div className="bg-white p-3 rounded-2xl shadow-md">
              <Sparkles className="text-cyan-500" size={22} />
            </div>

            <h1 className="text-3xl md:text-3xl font-black text-slate-700">
              Treatment Plans
            </h1>

          </div>

          <p className="text-slate-500">
            Your medical treatment plans overview
          </p>

        </div>

        {/* TOTAL */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl px-6 py-4 shadow-lg border border-white">

          <p className="text-sm text-slate-500">
            Total Plans
          </p>

          <h2 className="text-2xl font-black text-cyan-500">
            {plans.length}
          </h2>

        </div>
      </div>

      {/* EMPTY */}
      {plans.length === 0 && (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-lg border border-white text-center">

          <div className="w-20 h-20 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-5">

            <FileText className="text-cyan-500" size={32} />

          </div>

          <h2 className="text-2xl font-bold text-slate-700 mb-2">
            No Treatment Plans Yet
          </h2>

          <p className="text-slate-500">
            Your doctor has not added any plans yet.
          </p>

        </div>
      )}

      {/* CARDS */}
      <div className="grid gap-6">

        {plans.map((p, index) => {

          const today = new Date().toISOString().split("T")[0];
          const isExpired = today > p.end_date;

          return (
            <div
              key={p.id}
              className={`
                relative
                overflow-hidden
                rounded-[32px]
                border
                p-6 md:p-7
                backdrop-blur-xl
                shadow-lg
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-2xl
                animate-[fadeIn_0.5s_ease]

                ${
                  isExpired
                    ? "bg-red-50/80 border-red-100"
                    : "bg-white/80 border-white"
                }
              `}
              style={{
                animationDelay: `${index * 0.08}s`,
              }}
            >

              {/* TOP */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                <div>

                  <p className="text-xs text-slate-400 uppercase tracking-[2px] mb-1">
                    Created At
                  </p>

                  <div className="flex items-center gap-2 text-slate-700 font-semibold">

                    <Calendar size={17} className="text-cyan-500" />

                    {p.created_at
                      ? new Date(p.created_at).toLocaleString()
                      : "N/A"}

                  </div>

                </div>

                {/* STATUS */}
                <div
                  className={`
                    flex items-center gap-2
                    px-5 py-2 rounded-full
                    text-sm font-semibold
                    border shadow-sm
                    transition-all duration-300
                    hover:scale-[1.03]

                    ${
                      isExpired
                        ? "bg-red-100 text-red-500 border-red-200"
                        : "bg-emerald-100 text-emerald-600 border-emerald-200"
                    }
                  `}
                >

                  {isExpired ? (
                    <AlertTriangle size={16} />
                  ) : (
                    <ShieldCheck size={16} />
                  )}

                  {isExpired ? "Expired Plan" : "Active Plan"}

                </div>

              </div>

              {/* GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Diagnosis */}
                <GlassCard
                  icon={<FileText className="text-cyan-500" />}
                  title="Diagnosis"
                  value={p.diagnosis || "N/A"}
                />

                {/* Medications */}
                <GlassCard
                  icon={<Pill className="text-pink-500" />}
                  title="Medications"
                  value={p.medications || "N/A"}
                />

                {/* Instructions */}
                <div className="md:col-span-2">
                  <GlassCard
                    icon={<ClipboardList className="text-yellow-500" />}
                    title="Instructions"
                    value={p.instructions || "N/A"}
                  />
                </div>

                {/* START */}
                <SmallCard
                  color="cyan"
                  title="Start Date"
                  value={p.start_date || "N/A"}
                />

                {/* END */}
                <SmallCard
                  color="purple"
                  title="End Date"
                  value={p.end_date || "N/A"}
                />

                {/* NOTES */}
                {p.notes && (
                  <div className="md:col-span-2 bg-yellow-50 border border-yellow-100 rounded-3xl p-5 shadow-sm transition-all duration-300 hover:shadow-md">

                    <div className="flex items-center gap-2 mb-3">

                      <StickyNote className="text-yellow-500" size={18} />

                      <h2 className="font-bold text-yellow-700">
                        Additional Notes
                      </h2>

                    </div>

                    <p className="text-slate-700 whitespace-pre-line leading-7">
                      {p.notes}
                    </p>

                  </div>
                )}

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================= GLASS CARD ================= */

function GlassCard({ icon, title, value }) {
  return (
    <div
      className="
        bg-white/70
        border border-white
        backdrop-blur-xl
        rounded-3xl
        p-5
        shadow-sm

        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-lg
        hover:bg-white
      "
    >

      <div className="flex items-center gap-3 mb-3">

        <div className="
          w-11 h-11
          rounded-2xl
          bg-slate-100
          flex items-center justify-center
        ">
          {icon}
        </div>

        <p className="text-slate-600 font-semibold">
          {title}
        </p>

      </div>

      <p className="text-slate-700 font-semibold whitespace-pre-line leading-7">
        {value}
      </p>

    </div>
  );
}

/* ================= SMALL CARD ================= */

function SmallCard({ title, value, color }) {

  const styles = {
    cyan: {
      bg: "bg-cyan-50",
      border: "border-cyan-100",
      text: "text-cyan-500",
    },

    purple: {
      bg: "bg-purple-50",
      border: "border-purple-100",
      text: "text-purple-500",
    },
  };

  return (
    <div
      className={`
        ${styles[color].bg}
        border
        ${styles[color].border}
        rounded-3xl
        p-5
        shadow-sm

        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-lg
      `}
    >

      <p className={`text-sm font-semibold mb-2 ${styles[color].text}`}>
        {title}
      </p>

      <h2 className="text-lg font-bold text-slate-700">
        {value}
      </h2>

    </div>
  );
}