

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
      await API.put(`/admin/relatives/${editingId}`, {
        relation: formData.relation,
        phone: formData.phone
      });

      await loadRelatives();

      setShowModal(false);
      setError("");
      showToast("Relative updated successfully");

    } catch (err) {
      console.error(err);
      showToast("Update failed ❌");
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

          <h2 className="text-3xl sm:text-5xl font-black text-gray-800 flex items-center gap-3 tracking-tight">

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
      <div className="rounded-3xl overflow-hidden bg-white/70 backdrop-blur-2xl border border-gray-100 shadow-xl">

        {/* top glow line */}
        <div className="h-[3px] bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 animate-pulse"></div>

        {loading ? (
          <div className="p-16 text-center text-gray-500">
            <div className="text-3xl animate-bounce mb-3">👥</div>
            Loading relatives...
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full min-w-[800px] text-sm">

              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-5 text-left">ID</th>
                  <th className="p-5 text-left">Name</th>
                  <th className="p-5 text-left">Email</th>
                  <th className="p-5 text-left">Patient Name</th>
                  <th className="p-5 text-left">Patient Email</th>
                  <th className="p-5 text-left">Relation</th>
                  <th className="p-5 text-left">Phone</th>
                  <th className="p-5 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredRelatives.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t border-gray-100 hover:bg-blue-50/40 transition"
                  >

                    <td className="p-5 text-gray-500">{r.id}</td>

                    <td className="p-5 font-semibold text-gray-800">
                      {r.user?.name || "-"}
                    </td>

                    <td className="p-5 text-gray-600">
                      {r.user?.email || "-"}
                    </td>

                    <td className="p-5 text-gray-600">
                      {r.patients?.length > 0
                        ? r.patients.map(p => p.name).join(", ")
                        : "-"}
                    </td>

                    <td className="p-5 text-gray-600">
                      {r.patients?.length > 0
                        ? r.patients.map(p => p.email).join(", ")
                        : "-"}
                    </td>

                    <td className="p-5">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600">
                        {r.relation}
                      </span>
                    </td>

                    <td className="p-5 text-gray-600">
                      {r.phone}
                    </td>

                    <td className="p-5">
                      <button
                        onClick={() => handleEdit(r)}
                        className="px-3 py-1 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition flex items-center gap-1"
                      >
                        <Pencil size={16} />
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
      <div className="fixed bottom-6 right-6 bg-white border border-gray-200 shadow-xl text-gray-700 px-4 py-2 rounded-2xl animate-bounce">
        ✓ {toast}
      </div>
    )}

  </div>
);
}