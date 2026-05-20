

// // ******************************************************
// import React, { useEffect, useState } from "react";
// import API from "../../api";
// import { Pencil, Search } from "lucide-react";

// export default function AdminDoctors() {
//   // ================= STATE =================
//   const [doctors, setDoctors] = useState([]);
//   const [search, setSearch] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [toast, setToast] = useState("");
//   const [error, setError] = useState("");
  

//   const [showModal, setShowModal] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const [phoneError, setPhoneError] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     specialization: "",
//   });

//   // ================= FETCH =================
//   const loadDoctors = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/admin/doctors");
//       setDoctors(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadDoctors();
//   }, []);

//   // ================= SEARCH =================
//   const filteredDoctors = doctors.filter((d) =>
//     (d.doctor_name || d.name || "")
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   // ================= VALIDATION =================
//   const validateForm = () => {
//     const phoneRegex = /^[0-9]+$/;

//     if (!formData.phone.trim()) {
//       return "Phone number is required";
//     }

//     if (!phoneRegex.test(formData.phone)) {
//       return "Phone number must contain digits only (no letters allowed)";
//     }

//     return null;
//   };

//   // ================= EDIT =================
//   const handleEdit = (doctor) => {
//     setEditingId(doctor.id);

//     setFormData({
//       name: doctor.doctor_name || doctor.name || "",
//       phone: String(doctor.phone_number || doctor.phone || ""),
//       specialization: doctor.Specialization || doctor.specialization || "",
//     });

//     setError("");
//     setShowModal(true);
//   };

//   // ================= SAVE =================
//   const handleSave = async () => {
//     const validationError = validateForm();
//     if (phoneError) {
//   setError("Please fix phone number first");
//   return;
// }

//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       await API.put(`/admin/doctors/${editingId}`, {
//         doctor_name: formData.name,
//         phone_number: formData.phone,
//         Specialization: formData.specialization,
//       });

//       await loadDoctors();

//       setShowModal(false);
//       setError("");
//       showToast("Doctor updated successfully");

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
//     <div className="bg-blue-50 min-h-screen p-4 sm:p-6 space-y-6">

//       {/* TITLE */}
//       <div>
//         <h2 className="text-2xl sm:text-3xl font-bold text-blue-700">
//           Doctors Management
//         </h2>
//         <p className="text-gray-500">
//           Manage all doctors in the system
//         </p>
//       </div>

//       {/* SEARCH */}
//       <div className="relative max-w-md">
//         <Search className="absolute left-3 top-3 text-gray-400" size={18} />
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search doctors..."
//           className="w-full border p-2 pl-9 rounded-lg bg-white"
//         />
//       </div>

//       {/* TABLE */}
//       <div className="bg-white shadow-md rounded-xl overflow-x-auto">

//         {loading ? (
//           <p className="p-4">Loading...</p>
//         ) : (
//           <table className="w-full min-w-[600px] text-sm">

//             <thead className="bg-blue-100 text-blue-700">
//               <tr>
//                 <th className="p-3 text-left">ID</th>
//                 <th className="p-3 text-left">Name</th>
//                 <th className="p-3 text-left">Phone</th>
//                 <th className="p-3 text-left">Specialization</th>
//                 <th className="p-3 text-left">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredDoctors.map((d) => (
//                 <tr key={d.id} className="border-t hover:bg-blue-50">

//                   <td className="p-3">{d.id}</td>

//                   <td className="p-3 font-medium">
//                     {d.doctor_name || d.name}
//                   </td>

//                   <td className="p-3">
//                     {d.phone_number || d.phone}
//                   </td>

//                   <td className="p-3">
//                     <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
//                       {d.Specialization || d.specialization}
//                     </span>
//                   </td>

//                   <td className="p-3">
//                     <button
//                       onClick={() => handleEdit(d)}
//                       className="text-blue-600 flex items-center gap-1"
//                     >
//                       <Pencil size={16} />
//                       Edit
//                     </button>
//                   </td>

//                 </tr>
//               ))}
//             </tbody>

//           </table>
//         )}

//       </div>

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

//           <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-5 space-y-4">

//             <h3 className="text-lg font-bold text-blue-700">
//               Edit Doctor {formData.name}
//             </h3>

//             {/* ERROR MESSAGE */}
//             {error && (
//               <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
//                 {error}
//               </div>
//             )}

//             <input
//   value={formData.phone}
//   onChange={(e) => {
//     const value = e.target.value.replace(/[^0-9]/g, "");

//     if (value.length > 9) {
//       setPhoneError("Phone number must be exactly 9 digits");
//     } else {
//       setPhoneError("");
//     }

//     setFormData({
//       ...formData,
//       phone: value
//     });
//   }}
//   placeholder="Phone Number"
//   className={`border p-2 w-full rounded ${
//     phoneError ? "border-red-500" : ""
//   }`}
//   maxLength={9}
// />
// {phoneError && (
//   <p className="text-red-600 text-sm">
//     {phoneError}
//   </p>
// )}

//             <input
//               value={formData.specialization}
//               onChange={(e) =>
//                 setFormData({ ...formData, specialization: e.target.value })
//               }
//               placeholder="Specialization"
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



// 222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
  
import React, { useEffect, useState } from "react";
import API from "../../api";
import { Pencil, Search } from "lucide-react";

export default function AdminDoctors() {
  // ================= STATE =================
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [phoneError, setPhoneError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    specialization: "",
  });

  // ================= FETCH =================
  const loadDoctors = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/doctors");
      setDoctors(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  // ================= SEARCH =================
  const filteredDoctors = doctors.filter((d) =>
    (d.doctor_name || d.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= VALIDATION =================
  const validateForm = () => {
    const phoneRegex = /^[0-9]+$/;

    if (!formData.phone.trim()) {
      return "Phone number is required";
    }

    if (!phoneRegex.test(formData.phone)) {
      return "Phone number must contain digits only (no letters allowed)";
    }

    return null;
  };

  // ================= EDIT =================
  const handleEdit = (doctor) => {
    setEditingId(doctor.id);

    setFormData({
      name: doctor.doctor_name || doctor.name || "",
      phone: String(doctor.phone_number || doctor.phone || ""),
      specialization: doctor.Specialization || doctor.specialization || "",
    });

    setError("");
    setShowModal(true);
  };

  // ================= SAVE =================
  const handleSave = async () => {
    const validationError = validateForm();
    if (phoneError) {
  setError("Please fix phone number first");
  return;
}

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await API.put(`/admin/doctors/${editingId}`, {
        doctor_name: formData.name,
        phone_number: formData.phone,
        Specialization: formData.specialization,
      });

      await loadDoctors();

      setShowModal(false);
      setError("");
      showToast("Doctor updated successfully");

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
  <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-4 sm:p-6 md:p-10 space-y-8">

    {/* 🌈 Animated soft background */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      <div className="absolute top-[-150px] left-[-150px] w-[450px] h-[450px] bg-sky-300/30 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[450px] h-[450px] bg-indigo-300/30 blur-[140px] rounded-full animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-pink-200/30 blur-[140px] rounded-full animate-pulse" />

    </div>

    {/* HEADER */}
    <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

      <div className="animate-fade-in">

        <h2 className="text-3xl sm:text-5xl font-black text-sky-800 flex items-center gap-3 tracking-tight">

          Doctors Management

          <span className="animate-bounce text-pink-500">👨‍⚕️</span>

        </h2>

        <p className="text-gray-500 text-sm mt-3 max-w-md leading-relaxed">
          Elegant medical dashboard — manage doctors, specialties, and hospital workflow in a clean modern system.
        </p>

      </div>

      <div className="px-5 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white shadow-md text-sm font-semibold text-indigo-600 shadow-indigo-100">

        ✨ Smart Clinic System

      </div>

    </div>

    {/* SEARCH */}
    <div className="relative max-w-md group">

      <Search className="absolute left-3 top-3 text-gray-400 group-focus-within:text-indigo-500 transition" size={18} />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search doctors..."
        className="w-full pl-10 pr-4 py-3 rounded-2xl
        bg-white/80 backdrop-blur-xl
        border border-gray-200
        text-gray-700 placeholder-gray-400
        shadow-sm focus:ring-2 focus:ring-indigo-200
        outline-none transition"
      />

    </div>

    {/* TABLE CARD */}
    <div className="rounded-3xl overflow-hidden bg-white/70 backdrop-blur-2xl border border-gray-100 shadow-xl">

      {/* top glow line */}
      <div className="h-[3px] bg-gradient-to-r from-sky-400 via-indigo-400 to-pink-400 animate-pulse"></div>

      {loading ? (
        <div className="p-16 text-center text-gray-500">
          <div className="text-3xl animate-bounce mb-3">🧬</div>
          Loading doctors...
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px] text-sm">

            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-5 text-left">ID</th>
                <th className="p-5 text-left">Name</th>
                <th className="p-5 text-left">Phone</th>
                <th className="p-5 text-left">Specialization</th>
                <th className="p-5 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredDoctors.map((d) => (
                <tr
                  key={d.id}
                  className="border-t border-gray-100 hover:bg-indigo-50/40 transition"
                >

                  <td className="p-5 text-gray-500">{d.id}</td>

                  <td className="p-5 font-semibold text-gray-800">
                    {d.doctor_name || d.name}
                  </td>

                  <td className="p-5 text-gray-600">
                    {d.phone_number || d.phone}
                  </td>

                  <td className="p-5">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-600">
                      {d.Specialization || d.specialization}
                    </span>
                  </td>

                  <td className="p-5">
                    <button
                      onClick={() => handleEdit(d)}
                      className="px-3 py-1 rounded-xl text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition flex items-center gap-1"
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

    {/* MODAL */}
    {showModal && (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-6">

          <h3 className="text-xl font-bold mb-5 text-gray-800 flex items-center gap-2">

            Edit Doctor

            <span className="animate-bounce">🩺</span>

          </h3>

          {/* ERROR */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm mb-3">
              {error}
            </div>
          )}

          <input
            value={formData.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");

              if (value.length > 9) {
                setPhoneError("Must be 9 digits");
              } else {
                setPhoneError("");
              }

              setFormData({ ...formData, phone: value });
            }}
            placeholder="Phone Number"
            maxLength={9}
            className="w-full p-3 mb-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-200 outline-none"
          />

          {phoneError && (
            <p className="text-red-500 text-xs mb-3">{phoneError}</p>
          )}

          <input
            value={formData.specialization}
            onChange={(e) =>
              setFormData({ ...formData, specialization: e.target.value })
            }
            placeholder="Specialization"
            className="w-full p-3 rounded-xl mb-5 border border-gray-200 focus:ring-2 focus:ring-indigo-200 outline-none"
          />

          <div className="flex gap-3">

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-400 via-indigo-400 to-pink-400 text-white font-bold hover:scale-[1.02] transition"
            >
              Save ✨
            </button>

          </div>

        </div>

      </div>
    )}

    {/* TOAST */}
    {toast && (
      <div className="fixed bottom-6 right-6 bg-white border border-gray-200 shadow-xl text-gray-700 px-4 py-2 rounded-2xl animate-bounce">
        ✓ {toast}
      </div>
    )}

  </div>
);



}
