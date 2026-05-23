

// // // // **************************************
// import React, { useEffect, useState } from "react";
// import API from "../../api";
// import { Pencil, Search } from "lucide-react";

// export default function Relatives() {

//   // ================= STATE =================
//   const [relatives, setRelatives] = useState([]);
//   const [search, setSearch] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [toast, setToast] = useState("");
//   const [error, setError] = useState("");

//   const [showModal, setShowModal] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const [formData, setFormData] = useState({
//     relation: "",
//     phone: ""
//   });

//   // ================= FETCH =================
//   const loadRelatives = async () => {
//     try {
//       setLoading(true);

//       const res = await API.get("/admin/relatives");
//       setRelatives(res.data.data || []);

//     } catch (err) {
//       console.error(err);
//       setError("Failed to load relatives");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadRelatives();
//   }, []);

//   // ================= SEARCH =================
//   const filteredRelatives = relatives.filter(r =>
//     (r.user?.name || "").toLowerCase().includes(search.toLowerCase())
//   );

//   // ================= VALIDATION =================
//   const validateForm = () => {
//     const phoneRegex = /^[0-9]+$/;

//     if (!formData.relation.trim()) return "Relation is required";
//     if (!formData.phone.trim()) return "Phone is required";

//     if (!phoneRegex.test(formData.phone)) {
//       return "Phone must contain digits only";
//     }

//     return null;
//   };

//   // ================= EDIT =================
//   const handleEdit = (relative) => {
//     setEditingId(relative.id);

//     setFormData({
//       relation: relative.relation || "",
//       phone: relative.phone || ""
//     });

//     setError("");
//     setShowModal(true);
//   };

//   // ================= SAVE =================
//   const handleSave = async () => {

//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       await API.put(`/admin/relatives/${editingId}`, {
//         relation: formData.relation,
//         phone: formData.phone
//       });

//       await loadRelatives();

//       setShowModal(false);
//       setError("");
//       showToast("Relative updated successfully");

//     } catch (err) {
//       console.error(err);
//       showToast("Update failed ❌");
//     }
//   };

//   // ================= TOAST =================
//   const showToast = (msg) => {
//     setToast(msg);
//     setTimeout(() => setToast(""), 2500);
//   };

//   // ================= UI =================
//   return (
//     <div className="bg-blue-50 min-h-screen">

//       <main className="pt-20 p-4 sm:p-6 space-y-6">

//         {/* TITLE */}
//         <div>
//           <h2 className="text-2xl sm:text-3xl font-bold text-blue-700">
//             Relatives Management
//           </h2>
//           <p className="text-gray-500">
//             Manage all patient relatives
//           </p>
//         </div>

//         {/* SEARCH */}
//         <div className="relative max-w-md">
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search relatives..."
//             className="w-full border p-2 pl-9 rounded-lg bg-white"
//           />
//         </div>

//         {/* TABLE */}
//         <div className="bg-white shadow-sm rounded-xl overflow-x-auto">

//           {loading ? (
//             <p className="p-4">Loading...</p>
//           ) : (
//             <table className="w-full min-w-[700px] text-sm">

//               <thead className="bg-blue-100 text-blue-700">
//                 <tr>
//                   <th className="p-3 text-left">ID</th>
//                   <th className="p-3 text-left">Name</th>
//                   <th className="p-3 text-left">Email</th>
//                   <th className="p-3 text-left">Patients Name</th>
//                   <th className="p-3 text-left">Patients Email</th>
//                   <th className="p-3 text-left">Relation</th>
//                   <th className="p-3 text-left">Phone</th>
//                   <th className="p-3 text-left">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredRelatives.map((r) => (
//                   <tr key={r.id} className="border-t hover:bg-blue-50">

//                     <td className="p-3">{r.id}</td>

//                     {/* FROM USERS TABLE */}
//                     <td className="p-3 font-medium">
//                       {r.user?.name || "-"}
//                     </td>

//                     <td className="p-3">
//                       {r.user?.email || "-"}
//                     </td>

//                     <td className="p-3 font-medium">
//   {r.patients?.length > 0
//     ? r.patients.map(p => p.name).join(", ")
//     : "-"}
// </td>
// <td className="p-3">
//   {r.patients?.length > 0
//     ? r.patients.map(p => p.email).join(", ")
//     : "-"}
// </td>

//                     <td className="p-3">{r.relation}</td>
//                     <td className="p-3">{r.phone}</td>

//                     <td className="p-3">
//                       <button
//                         onClick={() => handleEdit(r)}
//                         className="text-blue-600 flex items-center gap-1"
//                       >
//                         <Pencil size={16} />
//                         Edit
//                       </button>
//                     </td>

//                   </tr>
//                 ))}
//               </tbody>

//             </table>
//           )}

//         </div>

//       </main>

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

//           <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-5 space-y-4">

//             <h3 className="text-lg font-bold text-blue-700">
//               Edit Relative
//             </h3>

//             {/* ERROR */}
//             {error && (
//               <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
//                 {error}
//               </div>
//             )}

//             {/* ONLY RELATION */}
//             <input
//               value={formData.relation}
//               onChange={(e) =>
//                 setFormData({ ...formData, relation: e.target.value })
//               }
//               placeholder="Relation"
//               className="border p-2 w-full rounded"
//             />

//             <input
//               value={formData.phone}
//               onChange={(e) =>
//                 setFormData({ ...formData, phone: e.target.value })
//               }
//               placeholder="Phone"
//               className="border p-2 w-full rounded"
//             />

//             <div className="flex justify-end gap-2">

//               <button
//                 onClick={() => {
//                   setShowModal(false);
//                   setError("");
//                 }}
//                 className="bg-gray-200 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleSave}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 Save
//               </button>

//             </div>

//           </div>

//         </div>
//       )}

//       {/* TOAST */}
//       {toast && (
//         <div className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded shadow">
//           ✓ {toast}
//         </div>
//       )}

//     </div>
//   );
// }


// 222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222





// // // **************************************

import React, { useEffect, useState } from "react";
import API from "../../api";
import { Pencil, Search } from "lucide-react";

export default function Relatives() {

  // ================= STATE =================
  const [relatives, setRelatives] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    relation: "",
    phone: ""
  });

  // ================= FETCH =================
  const loadRelatives = async () => {
    try {
      setLoading(true);

      const res = await API.get("/admin/relatives");
      setRelatives(res.data.data || []);

    } catch (err) {
      console.error(err);
      setError("Failed to load relatives");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRelatives();
  }, []);

  // ================= SEARCH =================
  const filteredRelatives = relatives.filter(r =>
    (r.user?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  // ================= VALIDATION =================
  const validateForm = () => {
    const phoneRegex = /^[0-9]+$/;

    if (!formData.relation.trim()) return "Relation is required";
    if (!formData.phone.trim()) return "Phone is required";

    if (!phoneRegex.test(formData.phone)) {
      return "Phone must contain digits only";
    }

    return null;
  };

  // ================= EDIT =================
  const handleEdit = (relative) => {
    setEditingId(relative.id);

    setFormData({
      relation: relative.relation || "",
      phone: relative.phone || ""
    });

    setError("");
    setShowModal(true);
  };

  // ================= SAVE =================
const handleSave = async () => {

  const validationError = validateForm();

  if (validationError) {
    setError(validationError);
    return;
  }

  try {

    // سكر الموديل فوراً
    setShowModal(false);

    // الاشعار يطلع مباشرة
    showToast("Relative updated successfully ✨");

    // تحميل وهمي ليبين تحديث الصفحة
    setLoading(true);

    await API.put(`/admin/relatives/${editingId}`, {
      relation: formData.relation,
      phone: formData.phone
    });

    // تحديث البيانات
    await loadRelatives();

    setError("");

  } catch (err) {

    console.error(err);

    setShowModal(true);

    showToast("Update failed ❌");

  } finally {

    setLoading(false);

  }
};
  // ================= TOAST =================
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  // ================= UI =================
  return (
  <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">

    {/* 🌈 Background Glow (Light Premium) */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">

      <div className="absolute top-[-180px] left-[-180px] w-[500px] h-[500px] bg-blue-200/40 blur-[130px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-180px] right-[-180px] w-[500px] h-[500px] bg-indigo-200/40 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-[450px] h-[450px] bg-cyan-100/40 blur-[140px] rounded-full animate-pulse" />

    </div>

    <main className="relative p-4 sm:p-6 md:p-10 space-y-8">

      {/* ✨ HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 animate-fade-in">

        <div>

          <h2 className="text-3xl sm:text-3xl font-black text-gray-800 flex items-center gap-3 tracking-tight">

            Relatives Management

            <span className="animate-bounce text-blue-500">👨‍👩‍👧</span>

          </h2>

          <p className="text-gray-500 mt-3 text-sm max-w-md leading-relaxed">
            Manage family connections, patient relationships and communication network in a clean medical system.
          </p>

        </div>

        <div className="px-5 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-white shadow-md text-sm font-semibold text-blue-600">

          🏥 Care Network System

        </div>

      </div>

      {/* 🔎 SEARCH */}
      <div className="relative max-w-md group">

        <Search className="absolute left-3 top-3 text-gray-400 group-focus-within:text-blue-500 transition" size={18} />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search relatives..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl
          bg-white/80 backdrop-blur-xl
          border border-gray-200
          shadow-sm
          text-gray-700 placeholder-gray-400
          focus:ring-2 focus:ring-blue-200 outline-none transition"
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
  <div className="h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-400"></div>

  {/* HEADER */}
  <div className="relative px-6 md:px-8 py-5 border-b border-gray-100/80 flex items-center justify-between">

    <div>

      <div className="flex items-center gap-2 mb-1">

        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>

        <span className="text-[11px] uppercase tracking-[0.25em] text-sky-600 font-bold">
          Family Access
        </span>

      </div>

      <h2 className="text-2xl font-black text-gray-800 tracking-tight">
        Relatives Management 👨‍👩‍👧
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Manage relatives, linked patients and communication access
      </p>

    </div>

    {/* STATS */}
    <div
      className="
        hidden md:flex
        items-center gap-3
        px-4 py-2
        rounded-2xl
        bg-gradient-to-r
        from-sky-50
        to-cyan-50
        border border-sky-100
      "
    >

      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
        👥
      </div>

      <div>
        <p className="text-xs text-gray-500">Total Relatives</p>
        <h4 className="font-black text-sky-700 text-lg">
          {filteredRelatives.length}
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
        Loading Relatives...
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        Fetching family members data
      </p>

    </div>
  ) : (
    <div className="overflow-x-auto">

      <table className="w-full min-w-[1100px] text-sm">

        {/* HEADER */}
        <thead>
          <tr className="bg-gradient-to-r from-sky-50 via-white to-cyan-50 text-gray-500 uppercase text-[11px] tracking-[0.18em]">

            <th className="px-6 py-5 text-left font-bold">#</th>
            <th className="px-6 py-5 text-left font-bold">Relative</th>
            <th className="px-6 py-5 text-left font-bold">Email</th>
            <th className="px-6 py-5 text-left font-bold">Patients</th>
            <th className="px-6 py-5 text-left font-bold">Patient Emails</th>
            <th className="px-6 py-5 text-left font-bold">Relation</th>
            <th className="px-6 py-5 text-left font-bold">Phone</th>
            <th className="px-6 py-5 text-left font-bold">Actions</th>

          </tr>
        </thead>

        {/* BODY */}
        <tbody>

          {filteredRelatives.map((r, index) => (
            <tr
              key={r.id}
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

              {/* RELATIVE */}
              <td className="px-6 py-5">

                <div className="flex items-center gap-3">

                  <div
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
                    👤
                  </div>

                  <div>

                    <h4 className="font-bold text-gray-800">
                      {r.user?.name || "-"}
                    </h4>

                    {/* <p className="text-xs text-gray-400">
                      Family Member
                    </p> */}

                  </div>

                </div>

              </td>

              {/* EMAIL */}
              <td className="px-6 py-5 text-gray-600 font-medium">
                {r.user?.email || "-"}
              </td>

              {/* PATIENTS */}
              <td className="px-6 py-5">

                <div className="flex flex-wrap gap-2">

                  {r.patients?.length > 0 ? (
                    r.patients.map((p, i) => (
                      <span
                        key={i}
                        className="
                          px-3 py-1
                          rounded-full
                          text-xs
                          font-semibold
                          bg-sky-100
                          text-sky-700
                        "
                      >
                        {p.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}

                </div>

              </td>

              {/* PATIENT EMAILS */}
              <td className="px-6 py-5 text-gray-600 max-w-[220px]">

                <div className="space-y-1">

                  {r.patients?.length > 0 ? (
                    r.patients.map((p, i) => (
                      <p
                        key={i}
                        className="truncate text-sm"
                      >
                        {p.email}
                      </p>
                    ))
                  ) : (
                    "-"
                  )}

                </div>

              </td>

              {/* RELATION */}
              <td className="px-6 py-5">

                <span
                  className="
                    inline-flex
                    items-center
                    px-4 py-2
                    rounded-full
                    text-xs
                    font-bold
                    bg-gradient-to-r
                    from-blue-100
                    to-cyan-100
                    text-blue-700
                    shadow-sm
                  "
                >
                  💙 {r.relation}
                </span>

              </td>

              {/* PHONE */}
              <td className="px-6 py-5">

                <div
                  className="
                    inline-flex
                    items-center gap-2
                    px-3 py-2
                    rounded-xl
                    bg-gray-50
                    border border-gray-100
                    text-gray-600
                    font-medium
                  "
                >
                  📞 {r.phone}
                </div>

              </td>

              {/* ACTION */}
              <td className="px-6 py-5">

                <button
                  onClick={() => handleEdit(r)}
                  className="
                    flex items-center gap-2
                    px-4 py-2
                    rounded-xl
                    bg-gradient-to-r
                    from-sky-500
                    to-cyan-500
                    text-white
                    text-sm
                    font-semibold
                    shadow-md
                    hover:scale-105
                    hover:shadow-xl
                    transition-all
                  "
                >
                  <Pencil size={15} />
                  Edit
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )}

</div>




    </main>

    {/* 🪟 MODAL */}
    {showModal && (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-6">

          <h3 className="text-xl font-bold mb-5 text-gray-800 flex items-center gap-2">

            Edit Relative

            <span className="animate-bounce">👨‍👩‍👧</span>

          </h3>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm mb-3">
              {error}
            </div>
          )}

          <input
            value={formData.relation}
            onChange={(e) =>
              setFormData({ ...formData, relation: e.target.value })
            }
            placeholder="Relation"
            className="w-full p-3 rounded-xl mb-3 border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none"
          />

          <input
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Phone"
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none"
          />

          <div className="flex gap-3 mt-5">

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 text-white font-bold hover:scale-[1.02] transition"
            >
              Save ✨
            </button>

          </div>

        </div>

      </div>
    )}

    {/* 🍞 TOAST */}
    {toast && (
       <div
  className="
    fixed
    bottom-6
    right-6
    z-50
    overflow-hidden
    rounded-2xl
    border border-white/30
    bg-white/80
    backdrop-blur-2xl
    shadow-[0_15px_50px_rgba(14,165,233,0.25)]
    px-5
    py-4
    animate-[fadeIn_.35s_ease]
  "
>

  {/* glow */}
  <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-300/30 rounded-full blur-3xl"></div>

  <div className="relative flex items-center gap-4">

    {/* icon */}
    <div
      className="
        w-11 h-11
        rounded-2xl
        bg-gradient-to-br
        from-emerald-400
        to-cyan-500
        flex items-center justify-center
        shadow-lg
      "
    >
      <span className="text-white text-lg">✓</span>
    </div>

    {/* text */}
    <div>

      <p className="text-sm font-bold text-slate-800">
        Success
      </p>

      <p className="text-sm text-slate-500">
        {toast}
      </p>

    </div>

  </div>

</div>
    )}

  </div>
);
}