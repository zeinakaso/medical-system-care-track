
// // ***********************************************8
// import React, { useEffect, useState } from "react";
// import API from "../../api";
// import { Search, Stethoscope } from "lucide-react";

// export default function AdminPatients() {
//   // ================= STATE =================
//   const [patients, setPatients] = useState([]);
//   const [doctorsList, setDoctorsList] = useState([]);
//   const [relativesList, setRelativesList] = useState([]);

//   const [search, setSearch] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [toast, setToast] = useState("");

//   // edit modal
//   const [showModal, setShowModal] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   // assign doctors
//   const [selectedPatient, setSelectedPatient] = useState("");
//   const [selectedDoctors, setSelectedDoctors] = useState([]);

//   const [formData, setFormData] = useState({
//     name: "",
//     gender: "",
//     birth: "",
//     blood: "",
//     relative: "",
//     notes: "",
//   });

//   // ================= BLOOD MAP =================
//   const bloodMap = {
//     "A+": "1",
//     "A-": "2",
//     "B+": "3",
//     "B-": "4",
//     "AB+": "5",
//     "AB-": "6",
//     "O+": "7",
//     "O-": "8",
//   };

//   // ================= FETCH =================
//   const loadData = async () => {
//     try {
//       setLoading(true);

//       const [patientsRes, doctorsRes, relativesRes] = await Promise.all([
//         API.get("/admin/patients"),
//         API.get("/admin/doctors"),
//         API.get("/admin/relatives"),
//       ]);

//       setPatients(patientsRes.data.data || []);
//       setDoctorsList(doctorsRes.data.data || []);
//       setRelativesList(relativesRes.data.data || []);

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   // ================= SEARCH =================
//   const filteredPatients = patients.filter((p) =>
//     (p.patient_name || "").toLowerCase().includes(search.toLowerCase())
//   );

//   // ================= EDIT =================
//   const handleEdit = (p) => {
//     setEditingId(p.id);

//     setFormData({
//       name: p.patient_name || "",
//       gender: p.gender || "",
//       birth: p.birth_date || "",
//       blood: bloodMap[p.blood_clique] || "",
//       relative: p.relative?.id || "",
//       notes: p.notes || "",
//     });

//     setShowModal(true);
//   };

//   // ================= SAVE =================
//  const handleSave = async () => {
//   try {

//     const payload = {
//       patient_name: formData.name,
//       gender: formData.gender,
//       birth_date: formData.birth,
//       blood_clique_id: Number(formData.blood),
//       relative_id: formData.relative
//         ? Number(formData.relative)
//         : null,
//       notes: formData.notes,
//     };

//     console.log(payload);

//     await API.put(
//       `/admin/patients/${editingId}`,
//       payload
//     );

//     await loadData();

//     setShowModal(false);

//     showToast("Patient updated successfully");

//   } catch (err) {
//   console.log("FULL ERROR:", err);

//   console.log("DATA:", err.response?.data);

//   console.log("ERRORS:", err.response?.data?.errors);

//   alert(JSON.stringify(err.response?.data?.errors, null, 2));
// }
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this patient?")) return;

//     try {
//       await API.delete(`/admin/patients/${id}`);
//       setPatients(patients.filter((p) => p.id !== id));
//       showToast("Patient deleted successfully");

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ================= DOCTORS =================
//   const toggleDoctor = (id) => {
//     setSelectedDoctors((prev) =>
//       prev.includes(id)
//         ? prev.filter((d) => d !== id)
//         : [...prev, id]
//     );
//   };

//   const handleAssignSave = async () => {
//     try {
//       if (!selectedPatient) return alert("Select patient");

//       await API.post(
//         `/admin/patients/${selectedPatient}/assign-doctors`,
//         { doctor_ids: selectedDoctors }
//       );

//       await loadData();

//       setSelectedDoctors([]);
//       setSelectedPatient("");

//       showToast("Doctors assigned successfully");

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ================= TOAST =================
//   const showToast = (msg) => {
//     setToast(msg);
//     setTimeout(() => setToast(""), 2500);
//   };

//   // ================= UI =================
//   return (
//     <div className="bg-blue-50 min-h-screen p-6 space-y-6">

//       {/* TITLE */}
//       <div>
//         <h2 className="text-2xl font-bold text-blue-700">
//           Patients Management
//         </h2>
//         <p className="text-gray-500">Manage all patients data</p>
//       </div>

//       {/* SEARCH */}
//       <div className="relative max-w-md">
//         <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search patients..."
//           className="w-full border p-2 pl-9 rounded-lg"
//         />
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-xl shadow overflow-x-auto">
//         {loading ? (
//           <p className="p-4">Loading...</p>
//         ) : (
//           <table className="w-full min-w-[900px] text-sm">

//             <thead className="bg-blue-100 text-blue-700">
//               <tr>
//                 <th className="p-3">ID</th>
//                 <th>Name</th>
//                 <th>Gender</th>
//                 <th>Birth</th>
//                 <th>Blood</th>
//                 <th>Relative</th>
//                 <th>Doctors</th>
//                 <th>Notes</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredPatients.map((p) => (
//                 <tr key={p.id} className="border-t hover:bg-blue-50">

//                   <td className="p-3">{p.id}</td>
//                   <td>{p.patient_name}</td>
//                   <td>{p.gender}</td>
//                   <td>{p.birth_date}</td>
//                   <td>{p.blood_clique}</td>

//                   {/* ✅ FIX: relative from user */}
//                   <td>
//                     {p.relative?.user?.name || "-"}
//                   </td>

//                   <td>
//                     {p.doctors?.map(d => d.doctor_name).join(", ")}
//                   </td>

//                   <td>{p.notes}</td>

//                   <td className="space-x-2">
//                     <button
//                       onClick={() => handleEdit(p)}
//                       className="text-blue-600"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => handleDelete(p.id)}
//                       className="text-red-600"
//                     >
//                       Delete
//                     </button>
//                   </td>

//                 </tr>
//               ))}
//             </tbody>

//           </table>
//         )}
//       </div>

//       {/* ASSIGN DOCTORS */}
//       <div className="bg-white p-4 rounded-xl shadow max-w-md">

//         <h3 className="font-bold text-blue-700 mb-2">
//           Assign Doctors
//         </h3>

//         <select
//           value={selectedPatient}
//           onChange={(e) => setSelectedPatient(e.target.value)}
//           className="w-full border p-2 rounded mb-3"
//         >
//           <option value="">Select Patient</option>
//           {patients.map((p) => (
//             <option key={p.id} value={p.id}>
//               {p.patient_name}
//             </option>
//           ))}
//         </select>

//         {doctorsList.map((doc) => (
//           <label key={doc.id} className="block text-sm">
//             <input
//               type="checkbox"
//               checked={selectedDoctors.includes(doc.id)}
//               onChange={() => toggleDoctor(doc.id)}
//             />
//             {" "}{doc.doctor_name}
//           </label>
//         ))}

//         <button
//           onClick={handleAssignSave}
//           className="mt-3 bg-blue-600 text-white px-4 py-1 rounded"
//         >
//           Save
//         </button>

//       </div>

//       {/* EDIT MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

//           <div className="bg-white p-5 rounded-xl w-[420px] space-y-3">

//             <div className="flex items-center gap-2">
//               <Stethoscope className="text-blue-600" />
//               <h3 className="font-bold text-blue-700">
//                 Edit Patient
//               </h3>
//             </div>

//             <select
//               value={formData.gender}
//               onChange={(e) =>
//                 setFormData({ ...formData, gender: e.target.value })
//               }
//               className="border p-2 w-full"
//             >
//               <option>Male</option>
//               <option>Female</option>
//             </select>

//             <input
//               type="date"
//               value={formData.birth}
//               onChange={(e) =>
//                 setFormData({ ...formData, birth: e.target.value })
//               }
//               className="border p-2 w-full"
//             />

//             <select
//               value={formData.blood}
//               onChange={(e) =>
//                 setFormData({ ...formData, blood: e.target.value })
//               }
//               className="border p-2 w-full"
//             >
//               <option value="">Select Blood Type</option>
//               <option value="1">A+</option>
//               <option value="2">A-</option>
//               <option value="3">B+</option>
//               <option value="4">B-</option>
//               <option value="5">AB+</option>
//               <option value="6">AB-</option>
//               <option value="7">O+</option>
//               <option value="8">O-</option>
//             </select>

//             {/* ✅ FIX: relative user */}
//             <select
//               value={formData.relative}
//               onChange={(e) =>
//                 setFormData({ ...formData, relative: e.target.value })
//               }
//               className="border p-2 w-full"
//             >
//               <option value="">Select Relative</option>
//               {relativesList.map(r => (
//                 <option key={r.id} value={r.id}>
//                   {r.user?.name} ({r.user?.email})
//                 </option>
//               ))}
//             </select>

//             <textarea
//               value={formData.notes}
//               onChange={(e) =>
//                 setFormData({ ...formData, notes: e.target.value })
//               }
//               className="border p-2 w-full"
//             />

//             <div className="flex justify-end gap-2">
//               <button onClick={() => setShowModal(false)}>
//                 Cancel
//               </button>

//               <button
//                 onClick={handleSave}
//                 className="bg-blue-600 text-white px-3 py-1 rounded"
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



// 222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222




import React, { useEffect, useState } from "react";
import API from "../../api";
import { Search, Stethoscope } from "lucide-react";

export default function AdminPatients() {
  // ================= STATE =================
  const [patients, setPatients] = useState([]);
  const [doctorsList, setDoctorsList] = useState([]);
  const [relativesList, setRelativesList] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  // edit modal
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // assign doctors
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedDoctors, setSelectedDoctors] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birth: "",
    blood: "",
    relative: "",
    notes: "",
  });

  // ================= BLOOD MAP =================
  const bloodMap = {
    "A+": "1",
    "A-": "2",
    "B+": "3",
    "B-": "4",
    "AB+": "5",
    "AB-": "6",
    "O+": "7",
    "O-": "8",
  };

  // ================= FETCH =================
  const loadData = async () => {
    try {
      setLoading(true);

      const [patientsRes, doctorsRes, relativesRes] = await Promise.all([
        API.get("/admin/patients"),
        API.get("/admin/doctors"),
        API.get("/admin/relatives"),
      ]);

      setPatients(patientsRes.data.data || []);
      setDoctorsList(doctorsRes.data.data || []);
      setRelativesList(relativesRes.data.data || []);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ================= SEARCH =================
  const filteredPatients = patients.filter((p) =>
    (p.patient_name || "").toLowerCase().includes(search.toLowerCase())
  );

  // ================= EDIT =================
  const handleEdit = (p) => {
    setEditingId(p.id);

    setFormData({
      name: p.patient_name || "",
      gender: p.gender || "",
      birth: p.birth_date || "",
      blood: bloodMap[p.blood_clique] || "",
      relative: p.relative?.id || "",
      notes: p.notes || "",
    });

    setShowModal(true);
  };

  // ================= SAVE =================
 const handleSave = async () => {
  try {

    const payload = {
      patient_name: formData.name,
      gender: formData.gender,
      birth_date: formData.birth,
      blood_clique_id: Number(formData.blood),
      relative_id: formData.relative
        ? Number(formData.relative)
        : null,
      notes: formData.notes,
    };

    console.log(payload);

    // save
    await API.put(
      `/admin/patients/${editingId}`,
      payload
    );

    // CLOSE MODAL IMMEDIATELY
    setShowModal(false);

    // toast
    showToast("Patient updated successfully");

    // reload silently
    loadData();

  } catch (err) {

    console.log("FULL ERROR:", err);

    console.log("DATA:", err.response?.data);

    console.log("ERRORS:", err.response?.data?.errors);

    alert(JSON.stringify(err.response?.data?.errors, null, 2));
  }
};
  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this patient?")) return;

    try {
      await API.delete(`/admin/patients/${id}`);
      setPatients(patients.filter((p) => p.id !== id));
      showToast("Patient deleted successfully");

    } catch (err) {
      console.error(err);
    }
  };

  // ================= DOCTORS =================
  const toggleDoctor = (id) => {
    setSelectedDoctors((prev) =>
      prev.includes(id)
        ? prev.filter((d) => d !== id)
        : [...prev, id]
    );
  };

  const handleAssignSave = async () => {
    try {
      if (!selectedPatient) return alert("Select patient");

      await API.post(
        `/admin/patients/${selectedPatient}/assign-doctors`,
        { doctor_ids: selectedDoctors }
      );

      await loadData();

      setSelectedDoctors([]);
      setSelectedPatient("");

      showToast("Doctors assigned successfully");

    } catch (err) {
      console.error(err);
    }
  };

  // ================= TOAST =================
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  // ================= UI =================
return (
  <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-100 via-white to-cyan-100 p-4 sm:p-6 md:p-10 space-y-8">

    {/* BACKGROUND GLOW ORBS */}
    <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-sky-300/30 blur-[120px] rounded-full animate-pulse"></div>
    <div className="absolute top-1/2 -right-40 w-[450px] h-[450px] bg-cyan-300/30 blur-[140px] rounded-full animate-pulse"></div>

    {/* HEADER */}
    <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

      <div>
        <h2 className="text-3xl sm:text-3xl font-black text-gray-800 flex items-center gap-3">
          Patients Management
          <span className="text-3xl animate-bounce">🩺</span>
        </h2>

        <p className="text-gray-500 text-sm mt-2 max-w-md">
          Smart overview of patients, assignments and medical records in real-time system
        </p>
      </div>

      {/* floating badge */}
      <div className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg text-sm font-semibold text-sky-700 animate-pulse">
        Live System ✨
      </div>
    </div>

    {/* SEARCH */}
    <div className="relative max-w-md group">
      <Search className="absolute left-3 top-3 text-gray-400 group-focus-within:text-sky-500 transition" size={18} />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search patients..."
        className="w-full pl-10 pr-4 py-3 rounded-2xl
        bg-white/60 backdrop-blur-xl
        border border-white/40
        shadow-md
        focus:ring-4 focus:ring-sky-200
        outline-none
        transition-all"
      />
    </div>

    {/* TABLE CARD */}
    <div className="relative bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl overflow-hidden">

      {/* glow top bar */}
      <div className="h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-400 animate-pulse"></div>

      {loading ? (
        <div className="p-14 text-center text-gray-500">
          <div className="animate-spin mb-3 inline-block">⚕️</div>
          Loading patients...
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px] text-sm">

            <thead className="bg-gradient-to-r from-sky-50 to-cyan-50 text-gray-600 uppercase text-xs tracking-widest">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Patient</th>
                <th className="p-4 text-left">Gender</th>
                <th className="p-4 text-left">Birth</th>
                <th className="p-4 text-left">Blood</th>
                <th className="p-4 text-left">Relative</th>
                <th className="p-4 text-left">Doctors</th>
                <th className="p-4 text-left">Notes</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPatients.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-gray-100 hover:bg-sky-50/60 transition-all duration-300 hover:scale-[1.01]"
                >

                  <td className="p-4 text-gray-500">{p.id}</td>

                  <td className="p-4 font-semibold text-gray-800">
                    {p.patient_name}
                  </td>

                  <td className="p-4 text-gray-600">{p.gender}</td>
                  <td className="p-4 text-gray-600">{p.birth_date}</td>

                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-700 shadow-sm">
                      {p.blood_clique}
                    </span>
                  </td>

                  <td className="p-4 text-gray-600">
                    {p.relative?.user?.name || "-"}
                  </td>

                  <td className="p-4 text-gray-600">
                    {p.doctors?.map(d => d.doctor_name).join(", ")}
                  </td>

                  <td className="p-4 text-gray-400 max-w-[200px] truncate">
                    {p.notes}
                  </td>

                  <td className="p-4 flex gap-3">

                    <button
                      onClick={() => handleEdit(p)}
                      className="px-3 py-1 rounded-xl bg-sky-100 text-sky-700 hover:bg-sky-200 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}
    </div>



    {/* ASSIGN DOCTORS */}
   <div
  className="
    relative
    overflow-hidden
    max-w-md
    rounded-[32px]
    border border-white/40
    bg-white/60
    backdrop-blur-2xl
    shadow-[0_20px_80px_rgba(15,23,42,0.10)]
    p-6
  "
>

  {/* TOP BAR */}
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500"></div>

  {/* GLOW */}
  <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-300/20 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 left-0 w-40 h-40 bg-sky-300/20 rounded-full blur-3xl"></div>

  <div className="relative z-10">

    {/* HEADER */}
    <div className="flex items-center justify-between mb-6">

      <div>

        <div className="flex items-center gap-2 mb-2">

          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>

          <span className="text-[11px] uppercase tracking-[0.2em] text-sky-600 font-bold">
            Medical Control
          </span>

        </div>

        <h3 className="text-xl font-black text-gray-800">
          Assign Doctors
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          Connect doctors with patients securely
        </p>

      </div>

      {/* ICON */}
      <div
        className="
          w-14 h-14
          rounded-2xl
          bg-gradient-to-br
          from-sky-500
          to-cyan-400
          flex items-center justify-center
          text-2xl
          shadow-lg
        "
      >
        👨‍⚕️
      </div>

    </div>

    {/* SELECT PATIENT */}
    <div className="mb-4">

      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
        Select Patient
      </label>

      <select
        value={selectedPatient}
        onChange={(e) => setSelectedPatient(e.target.value)}
        className="
          w-full
          p-3.5
          rounded-2xl
          bg-white/70
          border border-white/40
          shadow-sm
          text-gray-700
          outline-none
          focus:ring-4
          focus:ring-sky-100
          transition-all
        "
      >
        <option value="">Choose patient...</option>

        {patients.map((p) => (
          <option key={p.id} value={p.id}>
            {p.patient_name}
          </option>
        ))}

      </select>

    </div>

    {/* DOCTORS */}
    <div>

      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 block">
        Available Doctors
      </label>

      <div
        className="
          max-h-52
          overflow-y-auto
          pr-2
          space-y-2
        "
      >

        {doctorsList.map((doc) => (

          <label
            key={doc.id}
            className="
              flex items-center justify-between
              rounded-2xl
              border border-white/40
              bg-white/50
              px-4 py-3
              hover:bg-sky-50
              transition-all
              cursor-pointer
              group
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-10 h-10
                  rounded-xl
                  bg-gradient-to-br
                  from-sky-400
                  to-cyan-400
                  text-white
                  flex items-center justify-center
                  font-bold
                  shadow-sm
                "
              >
                {doc.doctor_name?.charAt(0)}
              </div>

              <div>

                <p className="font-semibold text-gray-700 text-sm">
                  {doc.doctor_name}
                </p>

                <p className="text-xs text-gray-400">
                  Medical Specialist
                </p>

              </div>

            </div>

            <input
              type="checkbox"
              checked={selectedDoctors.includes(doc.id)}
              onChange={() => toggleDoctor(doc.id)}
              className="
                w-4 h-4
                accent-sky-500
                cursor-pointer
              "
            />

          </label>

        ))}

      </div>

    </div>

    {/* BUTTON */}
    <button
      onClick={handleAssignSave}
      className="
        relative
        overflow-hidden
        mt-6
        w-full
        py-3.5
        rounded-2xl
        bg-gradient-to-r
        from-sky-500
        via-cyan-500
        to-blue-500
        text-white
        font-bold
        shadow-lg
        hover:scale-[1.02]
        active:scale-[0.98]
        transition-all
      "
    >

      <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-all"></div>

      <span className="relative">
        Save Assignment ✨
      </span>

    </button>

  </div>

</div>






    {/* MODAL */}
    {showModal && (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-50">

        <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-6">

          <div className="flex items-center gap-2 mb-5">
            <Stethoscope className="text-sky-600 animate-pulse" />
            <h3 className="font-bold text-gray-800 text-lg">
              Edit Patient
            </h3>
          </div>

          <div className="space-y-3">

            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="w-full p-3 rounded-xl bg-white/60 border border-white/40"
            >
              <option>Male</option>
              <option>Female</option>
            </select>

            <input
              type="date"
              value={formData.birth}
              onChange={(e) =>
                setFormData({ ...formData, birth: e.target.value })
              }
              className="w-full p-3 rounded-xl bg-white/60 border border-white/40"
            />

            <select
              value={formData.blood}
              onChange={(e) =>
                setFormData({ ...formData, blood: e.target.value })
              }
              className="w-full p-3 rounded-xl bg-white/60 border border-white/40"
            >
              <option value="">Select Blood Type</option>
              <option value="1">A+</option>
              <option value="2">A-</option>
              <option value="3">B+</option>
              <option value="4">B-</option>
              <option value="5">AB+</option>
              <option value="6">AB-</option>
              <option value="7">O+</option>
              <option value="8">O-</option>
            </select>

            <select
              value={formData.relative}
              onChange={(e) =>
                setFormData({ ...formData, relative: e.target.value })
              }
              className="w-full p-3 rounded-xl bg-white/60 border border-white/40"
            >
              <option value="">Select Relative</option>
              {relativesList.map(r => (
                <option key={r.id} value={r.id}>
                  {r.user?.name}
                </option>
              ))}
            </select>

            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full p-3 rounded-xl bg-white/60 border border-white/40"
            />

          </div>

          <div className="flex gap-3 mt-5">

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold hover:scale-[1.03] transition"
            >
              Save ✨
            </button>

          </div>

        </div>

      </div>
    )}

    {/* TOAST */}
    {toast && (
      <div className="fixed bottom-6 right-6 bg-sky-600 text-white px-4 py-2 rounded-2xl shadow-2xl animate-bounce">
        ✓ {toast}
      </div>
    )}

  </div>
);
}






