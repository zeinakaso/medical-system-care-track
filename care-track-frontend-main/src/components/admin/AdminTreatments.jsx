/* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import API from "../../api";
// import { Search, Pencil, Trash2 } from "lucide-react";

// export default function AdminTreatments() {

//   const [search, setSearch] = useState("");
//   const [treatments, setTreatments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [showModal, setShowModal] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [toast, setToast] = useState("");

//   const [formData, setFormData] = useState({
//     diagnosis: "",
//     medications: "",
//     instructions: "",
//     start_date: "",
//     end_date: ""
//   });

//   // ================= FETCH =================
//   const loadTreatments = async () => {
//     try {
//       setLoading(true);

//       const res = await API.get("/treatment-plan");
//       console.log("Treatments:", res.data);

//       setTreatments(res.data.data || []);

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadTreatments();
//   }, []);

//   // ================= SEARCH =================
//   const filteredTreatments = treatments.filter(t =>
//     (t.diagnosis || "")
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   // ================= FORM =================
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleEdit = (t) => {
//     setEditingId(t.id);

//     setFormData({
//       diagnosis: t.diagnosis || "",
//       medications: t.medications || "",
//       instructions: t.instructions || "",
//       start_date: t.start_date || "",
//       end_date: t.end_date || ""
//     });

//     setShowModal(true);
//   };

//   const handleSave = async () => {
//     try {
//       if (editingId) {
//         // UPDATE
//         await API.put(`/treatment-plan/${editingId}`, formData);
//         showToast("Updated successfully");
//       } else {
//         // CREATE
//         await API.post(`/treatment-plan`, formData);
//         showToast("Created successfully");
//       }

//       await loadTreatments();

//       setShowModal(false);
//       setEditingId(null);
//       setFormData({
//         diagnosis: "",
//         medications: "",
//         instructions: "",
//         start_date: "",
//         end_date: ""
//       });

//     } catch (err) {
//       console.error(err);
//       showToast("Operation failed ❌");
//     }
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this treatment?")) return;

//     try {
//       await API.delete(`/treatment-plan/${id}`);

//       setTreatments(treatments.filter(t => t.id !== id));
//       showToast("Deleted successfully");

//     } catch (err) {
//       console.error(err);
//       showToast("Delete failed ❌");
//     }
//   };

//   // ================= TOAST =================
//   const showToast = (msg) => {
//     setToast(msg);
//     setTimeout(() => setToast(""), 2500);
//   };

//   // ================= UI =================
//   return (
//     <div className="bg-gray-50 min-h-screen space-y-8">

//       <main className="pt-20 p-6">

//       {/* HEADER TITLE */}
// <div className="space-y-1 mb-6">
//   <h2 className="text-2xl font-bold text-blue-700">
//     Treatment Plans
//   </h2>
//   <p className="text-gray-500">
//     View all treatment plans
//   </p>
// </div>

//         {/* SEARCH */}
//         <div className="relative mb-6 w-80">
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search diagnosis..."
//             className="w-full border p-2 pl-9 rounded-lg"
//           />
//         </div>

//         {/* TABLE */}
//         <div className="bg-white rounded-xl shadow-md overflow-x-auto">

//           {loading ? (
//             <p className="p-4">Loading...</p>
//           ) : (
//             <table className="w-full text-sm">

//               <thead className="bg-blue-50 text-gray-700 uppercase text-xs">
//                 <tr>
//                   <th className="p-3">#</th>
//                   <th>Diagnosis</th>
//                   <th>Medications</th>
//                   <th>Instructions</th>
//                   <th>Start</th>
//                   <th>End</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredTreatments.map((t) => (
//                   <tr key={t.id} className="border-t hover:bg-blue-50">

//                     <td className="p-3">{t.id}</td>
//                     <td>{t.diagnosis}</td>
//                     <td>{t.medications}</td>
//                     <td>{t.instructions}</td>
//                     <td>{t.start_date}</td>
//                     <td>{t.end_date}</td>


//                   </tr>
//                 ))}
//               </tbody>

//             </table>
//           )}

//         </div>

//         {/* MODAL */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

//             <div className="bg-white w-[420px] p-5 rounded-xl space-y-3">

//               <h3 className="font-bold text-blue-700">
//                 {editingId ? "Edit Treatment" : "Add Treatment"}
//               </h3>

//               <input
//                 name="diagnosis"
//                 value={formData.diagnosis}
//                 onChange={handleChange}
//                 placeholder="Diagnosis"
//                 className="border p-2 w-full"
//               />

//               <input
//                 name="medications"
//                 value={formData.medications}
//                 onChange={handleChange}
//                 placeholder="Medications"
//                 className="border p-2 w-full"
//               />

//               <input
//                 name="instructions"
//                 value={formData.instructions}
//                 onChange={handleChange}
//                 placeholder="Instructions"
//                 className="border p-2 w-full"
//               />

//               <input
//                 type="date"
//                 name="start_date"
//                 value={formData.start_date}
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//               />

//               <input
//                 type="date"
//                 name="end_date"
//                 value={formData.end_date}
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//               />

//               <div className="flex justify-end gap-2">
//                 <button onClick={() => setShowModal(false)}>
//                   Cancel
//                 </button>

//                 <button
//                   onClick={handleSave}
//                   className="bg-blue-600 text-white px-3 py-1 rounded"
//                 >
//                   Save
//                 </button>
//               </div>

//             </div>
//           </div>
//         )}

//         {/* TOAST */}
//         {toast && (
//           <div className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded shadow">
//             ✓ {toast}
//           </div>
//         )}

//       </main>

//     </div>
//   );
// }


// 2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222


import React, { useEffect, useState } from "react";
import API from "../../api";
import { Search, Pencil, Trash2, Plus } from "lucide-react";

export default function AdminTreatments() {
  const [search, setSearch] = useState("");
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [animId, setAnimId] = useState(null); // ✨ animation trigger

  const [formData, setFormData] = useState({
    diagnosis: "",
    medications: "",
    instructions: "",
    start_date: "",
    end_date: ""
  });

  // ================= FETCH =================
  const loadTreatments = async () => {
    try {
      setLoading(true);
      const res = await API.get("/treatment-plan");
      setTreatments(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTreatments();
  }, []);

  // ================= SEARCH =================
  const filteredTreatments = treatments.filter((t) =>
    (t.diagnosis || "").toLowerCase().includes(search.toLowerCase())
  );

  // ================= CHANGE =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= EDIT =================
  const handleEdit = (t) => {
    setEditingId(t.id);

    setFormData({
      diagnosis: t.diagnosis || "",
      medications: t.medications || "",
      instructions: t.instructions || "",
      start_date: t.start_date || "",
      end_date: t.end_date || ""
    });

    setShowModal(true);
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      if (editingId) {
        await API.put(`/treatment-plan/${editingId}`, formData);
        showToast("Updated successfully");
      } else {
        const res = await API.post(`/treatment-plan`, formData);

        // ✨ animation add row
        setAnimId(res.data?.data?.id);
        setTimeout(() => setAnimId(null), 1200);

        showToast("Created successfully");
      }

      await loadTreatments();

      setShowModal(false);
      setEditingId(null);

      setFormData({
        diagnosis: "",
        medications: "",
        instructions: "",
        start_date: "",
        end_date: ""
      });

    } catch (err) {
  console.log("FULL ERROR:", err);
  console.log("RESPONSE:", err.response?.data);
  showToast(err.response?.data?.message || "Operation failed ❌");
}
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this treatment?")) return;

    try {
      await API.delete(`/treatment-plan/${id}`);

      // ✨ animation delete
      setAnimId(id);
      setTimeout(() => {
        setTreatments((prev) => prev.filter((t) => t.id !== id));
        setAnimId(null);
      }, 300);

      showToast("Deleted successfully");

    } catch (err) {
  console.log("FULL ERROR:", err);
  console.log("RESPONSE:", err.response?.data);
  showToast(err.response?.data?.message || "Operation failed ❌");
}
  };

  // ================= TOAST =================
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  // ================= UI =================
 return (
  <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-4 sm:p-6 md:p-10 space-y-8">

    {/* 🌈 BACKGROUND GLOW EFFECTS */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-sky-300/30 blur-[140px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-indigo-300/30 blur-[160px] rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-emerald-200/30 blur-[140px] rounded-full animate-pulse"></div>
    </div>

    {/* HEADER */}
    <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

      <div className="space-y-1">
        <h2 className="text-3xl sm:text-4xl font-black text-indigo-700 flex items-center gap-2">
          Treatment Plans
          <span className="text-2xl animate-bounce">💊</span>
        </h2>

        <p className="text-gray-500 text-sm">
          Smart medical system — manage treatments with clarity & precision
        </p>
      </div>

      <div className="px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white shadow-md text-indigo-600 text-sm font-semibold animate-pulse">
        Hospital Control Panel ✨
      </div>

    </div>

    {/* SEARCH */}
    <div className="relative max-w-md group">
      <Search className="absolute left-3 top-3 text-gray-400 group-focus-within:text-indigo-500 transition" size={18} />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search diagnosis..."
        className="w-full pl-10 pr-4 py-3 rounded-2xl
        bg-white/70 backdrop-blur-xl
        border border-gray-200
        shadow-sm
        focus:ring-2 focus:ring-indigo-200
        outline-none transition"
      />
    </div>




    {/* TABLE */}
    <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white overflow-hidden">

  {/* top glow line */}
  <div className="h-[3px] bg-gradient-to-r from-sky-400 via-indigo-500 to-emerald-400 animate-pulse"></div>

  {loading ? (
    <p className="p-6 text-gray-500">Loading treatments...</p>
  ) : (
    <div className="overflow-x-auto">

      <table className="w-full min-w-[900px] text-sm">

        {/* HEADER */}
        <thead className="sticky top-0 z-10">
          <tr className="bg-gradient-to-r from-indigo-50 via-sky-50 to-emerald-50 text-indigo-700 uppercase text-xs tracking-wider">

            <th className="p-4 text-left">#</th>
            <th className="text-left">Diagnosis</th>
            <th className="text-left">Medications</th>
            <th className="text-left">Instructions</th>
            <th className="text-left">Start</th>
            <th className="text-left">End</th>
            <th className="text-left">Status</th>
            {/* <th className="text-left">Actions</th> */}

          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-gray-100">

          {filteredTreatments.map((t, index) => {

            const isActive =
              new Date(t.end_date) > new Date();

            return (
              <tr
                key={t.id}
                className="
                  group transition-all duration-300
                  hover:bg-gradient-to-r hover:from-sky-50 hover:to-indigo-50
                  hover:shadow-md hover:scale-[1.005]
                "
              >

                {/* ID */}
                <td className="p-4 text-gray-400 font-medium">
                  #{t.id}
                </td>

                {/* DIAGNOSIS */}
                <td className="p-4 font-semibold text-gray-800 group-hover:text-indigo-700 transition">
                  {t.diagnosis}
                </td>

                {/* MEDICATIONS */}
                <td className="p-4 text-gray-600">
                  <span className="px-2 py-1 rounded-lg bg-white/60 border text-xs">
                    {t.medications}
                  </span>
                </td>

                {/* INSTRUCTIONS */}
                <td className="p-4 text-gray-600 max-w-[220px] truncate">
                  {t.instructions}
                </td>

                {/* START */}
                <td className="p-4 text-gray-500">
                  {t.start_date}
                </td>

                {/* END */}
                <td className="p-4 text-gray-500">
                  {t.end_date}
                </td>

                {/* STATUS */}
                <td className="p-4">
                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs font-semibold
                      ${isActive
                        ? "bg-emerald-100 text-emerald-600 border border-emerald-200"
                        : "bg-red-100 text-red-500 border border-red-200"
                      }
                    `}
                  >
                    {isActive ? "Active" : "Expired"}
                  </span>
                </td>

                {/* ACTIONS */}
                {/* <td className="p-4 flex gap-3">

                  <button
                    onClick={() => handleEdit(t)}
                    className="
                      flex items-center gap-1 px-3 py-1 rounded-xl
                      text-indigo-600 hover:bg-indigo-100
                      transition-all duration-200
                    "
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(t.id)}
                    className="
                      flex items-center gap-1 px-3 py-1 rounded-xl
                      text-red-500 hover:bg-red-100
                      transition-all duration-200
                    "
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                </td> */}

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
  )}
</div>





    {/* MODAL */}
{showModal && (
  <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-md">

    {/* CARD ONLY (no overlay) */}
    <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white p-6 space-y-4 animate-fadeIn">

      <h3 className="text-xl font-bold text-indigo-700 flex items-center gap-2">
        {editingId ? "Edit Treatment" : "Add Treatment"}
        <span className="animate-bounce">🧬</span>
      </h3>

      {/* INPUTS */}
      {Object.keys(formData).map((key) => (
        <input
          key={key}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          placeholder={key}
          type={key.includes("date") ? "date" : "text"}
          className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 focus:ring-2 focus:ring-indigo-200 outline-none transition"
        />
      ))}

      {/* BUTTONS */}
      <div className="flex justify-end gap-2 pt-2">

        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 text-white font-semibold shadow-md hover:scale-105 transition"
        >
          Save ✨
        </button>

      </div>

    </div>

  </div>
)}


    {/* TOAST */}
    {toast && (
      <div className="fixed bottom-6 right-6 px-4 py-2 rounded-2xl
        bg-white/80 backdrop-blur-xl border border-indigo-200
        text-indigo-700 shadow-lg animate-bounce">
        ✓ {toast}
      </div>
    )}

  </div>
);
}



// 33333333333333333333333333333333333333333333333333333333333333333333333333333

