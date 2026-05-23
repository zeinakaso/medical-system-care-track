/* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import API from "../../api";
// import { Search, User, Eye, EyeOff } from "lucide-react";

// export default function AdminUsers() {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const [showModal, setShowModal] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [saving, setSaving] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "patient",
//   });

//   // ================= FETCH =================
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/admin/users");
//       setUsers(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // ================= SEARCH =================
//   const filteredUsers = users.filter(
//     (u) =>
//       u.name?.toLowerCase().includes(search.toLowerCase()) ||
//       u.email?.toLowerCase().includes(search.toLowerCase())
//   );

//   // ================= VALIDATION =================
//   const validateForm = () => {
//     if (!formData.name.trim()) return "Name is required";
//     if (!formData.email.trim()) return "Email is required";

//     if (!editingId && !formData.password.trim()) {
//       return "Password is required";
//     }

//     if (formData.password && formData.password.length < 6) {
//       return "Password must be at least 6 characters";
//     }

//     return null;
//   };

//   // ================= OPEN MODAL =================
//   const openEdit = (user) => {
//     setError("");
//     setSuccess("");

//     setEditingId(user.id);
//     setFormData({
//       name: user.name,
//       email: user.email,
//       password: "",
//       role: user.role,
//     });
//     setShowModal(true);
//   };

//   const openAdd = () => {
//     setError("");
//     setSuccess("");

//     setEditingId(null);
//     setFormData({
//       name: "",
//       email: "",
//       password: "",
//       role: "patient",
//     });
//     setShowModal(true);
//   };

//   // ================= SAVE =================
//   const handleSave = async () => {
//     setError("");
//     setSuccess("");

//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       setSaving(true);

//       if (editingId) {
//         await API.put(`/admin/users/${editingId}`, formData);
//         setSuccess("User updated successfully");

// setTimeout(() => {
//   setShowModal(false);
//   setSuccess("");
// }, 1200);
//       } else {
//         const data = new FormData();
//         data.append("name", formData.name);
//         data.append("email", formData.email);
//         data.append("password", formData.password);
//         data.append("role", formData.role);

//         await API.post("/admin/users", data, {
//           headers: { Accept: "application/json" },
//         });

//         setSuccess("User created successfully");

// setTimeout(() => {
//   setShowModal(false);
//   setSuccess("");
// }, 1200);
//       }

//       fetchUsers();

//     } catch (err) {
//       console.error(err);

//       const msg =
//         err?.response?.data?.message ||
//         err?.response?.data?.error ||
//         "Something went wrong";

//       setError(msg);

//     } finally {
//       setSaving(false);
//     }
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this user?")) return;

//     try {
//       await API.delete(`/admin/users/${id}`);
//       setSuccess("User deleted successfully");
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       setError("Failed to delete user");
//     }
//   };

//   // ================= UI =================
//   return (
//     <div className="bg-blue-50 min-h-screen p-4 sm:p-6 space-y-6">

//       {/* TITLE */}
//       <div>
//         <h2 className="text-2xl sm:text-3xl font-bold text-blue-700">
//           Users Management
//         </h2>
//         <p className="text-gray-500">Overview of all system users</p>
//       </div>

//       {/* SEARCH + ADD */}
//       <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">

//         <div className="relative max-w-md w-full">
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search users..."
//             className="w-full border border-blue-100 rounded-lg p-2 pl-9 focus:ring-2 focus:ring-blue-300 outline-none"
//           />
//         </div>

//         <button
//           onClick={openAdd}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           + Add User
//         </button>

//       </div>

//       {/* TABLE */}
//       <div className="bg-white shadow-sm rounded-xl overflow-x-auto">

//         {loading ? (
//           <p className="p-4">Loading...</p>
//         ) : (
//           <table className="w-full min-w-[700px] text-sm">

//             <thead className="bg-blue-100 text-blue-700">
//               <tr>
//                 <th className="p-3 text-left">ID</th>
//                 <th className="p-3 text-left">Name</th>
//                 <th className="p-3 text-left">Email</th>
//                 <th className="p-3 text-left">Role</th>
//                 <th className="p-3 text-left">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredUsers.map((u) => (
//                 <tr key={u.id} className="border-t hover:bg-blue-50">

//                   <td className="p-3">{u.id}</td>
//                   <td className="p-3 font-medium">{u.name}</td>
//                   <td className="p-3">{u.email}</td>

//                   <td className="p-3">
//                     <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
//                       {u.role}
//                     </span>
//                   </td>

//                   <td className="p-3 space-x-3">
//                     <button
//                       onClick={() => openEdit(u)}
//                       className="text-blue-600 hover:underline text-sm"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => handleDelete(u.id)}
//                       className="text-red-600 hover:underline text-sm"
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

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

//           <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-5">

//             {/* HEADER */}
//             <div className="flex items-center gap-2 mb-3">
//               <User className="text-blue-600" />
//               <h3 className="text-lg font-bold text-blue-700">
//                 {editingId ? "Edit User" : "Add User"}
//               </h3>
//             </div>

//             {/* ALERT INSIDE MODAL */}
//             {error && (
//               <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
//                 {error}
//               </div>
//             )}

//             {success && (
//               <div className="bg-green-100 text-green-700 p-2 rounded mb-3 text-sm">
//                 {success}
//               </div>
//             )}

//             {/* FORM */}
//             <div className="space-y-3">

//               <input
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 placeholder="Name"
//                 className="border p-2 rounded w-full"
//               />

//               <input
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 placeholder="Email"
//                 className="border p-2 rounded w-full"
//               />

//               <div className="relative">

//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={formData.password}
//                   onChange={(e) =>
//                     setFormData({ ...formData, password: e.target.value })
//                   }
//                   placeholder="Password"
//                   className="w-full border p-2 rounded pr-10"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>

//               </div>

//               <select
//                 value={formData.role}
//                 onChange={(e) =>
//                   setFormData({ ...formData, role: e.target.value })
//                 }
//                 className="border p-2 rounded w-full"
//               >
//                 <option value="admin">Admin</option>
//                 <option value="doctor">Doctor</option>
//                 <option value="patient">Patient</option>
//                 <option value="relative">Relative</option>
//               </select>

//             </div>

//             {/* BUTTONS */}
//             <div className="flex flex-col sm:flex-row justify-end gap-2 mt-5">

//               <button
//                 onClick={() => setShowModal(false)}
//                 className="bg-gray-200 px-4 py-2 rounded w-full sm:w-auto"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleSave}
//                 disabled={saving}
//                 className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-700 disabled:opacity-50"
//               >
//                 {saving ? "Saving..." : "Save"}
//               </button>

//             </div>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }


// 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222

import React, { useEffect, useState } from "react";
import API from "../../api";
import { Search, User, Eye, EyeOff } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });

  // ================= FETCH =================
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/users");
      setUsers(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= SEARCH =================
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  // ================= VALIDATION =================
  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";

    if (!editingId && !formData.password.trim()) {
      return "Password is required";
    }

    if (formData.password && formData.password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return null;
  };

  // ================= OPEN MODAL =================
  const openEdit = (user) => {
    setError("");
    setSuccess("");

    setEditingId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setShowModal(true);
  };

  const openAdd = () => {
    setError("");
    setSuccess("");

    setEditingId(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "patient",
    });
    setShowModal(true);
  };

  // ================= SAVE =================
  const handleSave = async () => {
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        await API.put(`/admin/users/${editingId}`, formData);
        setSuccess("User updated successfully");

setTimeout(() => {
  setShowModal(false);
  setSuccess("");
}, 1200);
      } else {
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("role", formData.role);

        await API.post("/admin/users", data, {
          headers: { Accept: "application/json" },
        });

        setSuccess("User created successfully");

setTimeout(() => {
  setShowModal(false);
  setSuccess("");
}, 1200);
      }

      fetchUsers();

    } catch (err) {
      console.error(err);

      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Something went wrong";

      setError(msg);

    } finally {
      setSaving(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await API.delete(`/admin/users/${id}`);
      setSuccess("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError("Failed to delete user");
    }
  };

  // ================= UI =================
 return (
  <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-4 sm:p-6 md:p-8 space-y-6">

    {/* HEADER */}
   <div className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-50 via-white to-cyan-50 border border-white/40 shadow-sm p-6 sm:p-8">

  {/* background glow */}
  <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-300/20 rounded-full blur-3xl"></div>
  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-300/20 rounded-full blur-3xl"></div>

  <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

    {/* LEFT TEXT */}
    <div>

      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>
        <span className="text-xs font-semibold text-sky-600 tracking-wider uppercase">
          Admin Panel
        </span>
      </div>

      <h2 className="text-3xl sm:text-3xl font-black text-sky-700 tracking-tight">
        Users Management 💙
      </h2>

      <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-md leading-relaxed">
        Manage all system users, roles, permissions and access control in one place.
      </p>

    </div>

    {/* RIGHT BADGE */}
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm w-fit">

      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>

      <span className="text-xs font-semibold text-gray-600">
        System Active
      </span>

    </div>

  </div>

</div>

    {/* SEARCH + ACTION */}
    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">

      {/* SEARCH */}
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-sm focus:ring-2 focus:ring-sky-200 outline-none transition"
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={openAdd}
        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 transition"
      >
        + Add User
      </button>

    </div>

    {/* TABLE CARD */}
   <div
  className="
    relative
    overflow-hidden
    rounded-[32px]
    border border-white/40
    bg-white/60
    backdrop-blur-2xl
    shadow-[0_20px_80px_rgba(15,23,42,0.08)]
  "
>

  {/* TOP GLOW */}
  <div className="h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500"></div>

  {/* BACKGROUND ORBS */}
  <div className="absolute -top-20 right-0 w-72 h-72 bg-sky-300/10 blur-[120px] rounded-full"></div>
  <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-300/10 blur-[120px] rounded-full"></div>

  {loading ? (

    <div className="relative p-16 text-center">

      <div className="inline-flex flex-col items-center gap-4">

        <div className="w-14 h-14 rounded-2xl border-4 border-sky-200 border-t-sky-500 animate-spin"></div>

        <p className="text-gray-500 font-medium">
          Loading users...
        </p>

      </div>

    </div>

  ) : (

    <div className="overflow-x-auto relative">

      <table className="w-full min-w-[850px]">

        {/* HEADER */}
        <thead>

          <tr className="border-b border-white/30 bg-white/30 backdrop-blur-xl">

            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              ID
            </th>

            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              User
            </th>

            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Email
            </th>

            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Role
            </th>

            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Actions
            </th>

          </tr>

        </thead>

        {/* BODY */}
        <tbody>

       
          {filteredUsers.map((u, index) => (

            <tr
              key={u.id}
              className="
                border-b border-white/20
                hover:bg-sky-50/50
                transition-all
                duration-300
                group
              "
            >

              {/* ID */}
             <td className="px-6 py-5">

  <div
    className="
      inline-flex
      items-center
      justify-center
      min-w-[34px]
      h-9
      px-3
      rounded-full
      bg-sky-50
      border border-sky-100
      text-sky-700
      text-xs
      font-bold
      shadow-sm
    "
  >
    {u.id}
  </div>

</td>

              {/* USER */}
              <td className="px-6 py-5">

                <div className="flex items-center gap-4">

                  {/* AVATAR */}
                  {/* <div
                    className="
                      w-12 h-12 rounded-2xl
                      bg-gradient-to-br
                      from-sky-500
                      to-cyan-400
                      text-white
                      flex items-center justify-center
                      font-bold
                      shadow-lg
                    "
                  >
                    {u.name?.charAt(0).toUpperCase()}
                  </div> */}

                  <div>

                    <h3 className="font-bold text-gray-800 text-[15px]">
                      {u.name}
                    </h3>

                    {/* <p className="text-xs text-gray-400">
                      System User
                    </p> */}

                  </div>

                </div>

              </td>

              {/* EMAIL */}
              <td className="px-6 py-5">

                <span className="text-gray-600 font-medium">
                  {u.email}
                </span>

              </td>

              {/* ROLE */}
              <td className="px-6 py-5">

                <span
                  className="
                    inline-flex items-center gap-2
                    px-4 py-2
                    rounded-full
                    text-xs font-bold
                    bg-gradient-to-r
                    from-sky-100
                    to-cyan-100
                    text-sky-700
                    border border-sky-200
                  "
                >

                  <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>

                  {u.role}

                </span>

              </td>

              {/* ACTIONS */}
              <td className="px-6 py-5">

  <div className="flex items-center gap-2">

    <button
      onClick={() => openEdit(u)}
      className="
        px-3 py-1.5
        rounded-lg
        bg-sky-100
        text-sky-700
        text-xs
        font-semibold
        hover:bg-sky-200
        hover:scale-105
        transition-all
      "
    >
      Edit
    </button>

    <button
      onClick={() => handleDelete(u.id)}
      className="
        px-3 py-1.5
        rounded-lg
        bg-red-100
        text-red-600
        text-xs
        font-semibold
        hover:bg-red-200
        hover:scale-105
        transition-all
      "
    >
      Delete
    </button>

  </div>

</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )}

</div>

    {/* MODAL */}
    {/* MODAL */}
{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

    {/* LIGHT OVERLAY */}
    <div className="absolute inset-0 bg-sky-900/20 backdrop-blur-md"></div>

    {/* SOFT LIGHTS */}
    <div className="absolute top-10 left-10 w-60 h-60 bg-cyan-300/20 rounded-full blur-[120px]"></div>
    <div className="absolute bottom-0 right-0 w-72 h-72 bg-sky-300/20 rounded-full blur-[130px]"></div>

    {/* MODAL */}
    <div
      className="
        relative
        w-full
        max-w-lg
        overflow-hidden
        rounded-[32px]
        border border-white/60
        bg-white/80
        backdrop-blur-3xl
        shadow-[0_20px_80px_rgba(14,165,233,0.18)]
      "
    >

      {/* TOP LINE */}
      <div className="h-1.5 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500"></div>

      {/* GLOW */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-cyan-300/20 rounded-full blur-[120px]"></div>

      <div className="relative z-10 p-6 md:p-7">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-7">

          <div className="flex items-center gap-4">

            {/* ICON */}
            <div
              className="
                w-16 h-16
                rounded-2xl
                bg-gradient-to-br
                from-cyan-400
                to-sky-500
                flex items-center justify-center
                shadow-lg
              "
            >
              <User size={28} className="text-white" />
            </div>

            {/* TEXT */}
            <div>

              <div className="flex items-center gap-2 mb-1">

                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>

                <span className="text-[11px] uppercase tracking-[0.2em] text-sky-500 font-bold">
                  Admin Panel
                </span>

              </div>

              <h2 className="text-2xl font-black text-slate-800">
                {editingId ? "Edit User" : "Create User"}
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Manage system accounts securely
              </p>

            </div>

          </div>

          {/* CLOSE */}
          <button
            onClick={() => setShowModal(false)}
            className="
              w-10 h-10 rounded-xl
              bg-slate-100
              text-slate-500
              hover:bg-slate-200
              hover:text-slate-700
              transition-all
            "
          >
            ✕
          </button>

        </div>

        {/* ALERTS */}
        {error && (
          <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
            {success}
          </div>
        )}

        {/* FORM */}
        <div className="space-y-4">

          {/* NAME */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Full Name
            </label>

            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter full name"
              className="
                w-full
                rounded-2xl
                border border-slate-200
                bg-white/70
                px-4 py-3.5
                text-slate-700
                outline-none
                focus:ring-4
                focus:ring-sky-100
                focus:border-sky-300
                transition-all
              "
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>

            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="example@email.com"
              className="
                w-full
                rounded-2xl
                border border-slate-200
                bg-white/70
                px-4 py-3.5
                text-slate-700
                outline-none
                focus:ring-4
                focus:ring-sky-100
                focus:border-sky-300
                transition-all
              "
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                className="
                  w-full
                  rounded-2xl
                  border border-slate-200
                  bg-white/70
                  px-4 py-3.5 pr-12
                  text-slate-700
                  outline-none
                  focus:ring-4
                  focus:ring-sky-100
                  focus:border-sky-300
                  transition-all
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  hover:text-sky-600
                  transition
                "
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

            </div>
          </div>

          {/* ROLE */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              User Role
            </label>

            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="
                w-full
                rounded-2xl
                border border-slate-200
                bg-white/70
                px-4 py-3.5
                text-slate-700
                outline-none
                focus:ring-4
                focus:ring-sky-100
                focus:border-sky-300
                transition-all
              "
            >
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
              <option value="relative">Relative</option>
            </select>

          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-7">

          <button
            onClick={() => setShowModal(false)}
            className="
              w-full
              py-3.5
              rounded-2xl
              bg-slate-100
              text-slate-700
              font-semibold
              hover:bg-slate-200
              transition-all
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="
              w-full
              py-3.5
              rounded-2xl
              bg-gradient-to-r
              from-cyan-400
              to-sky-500
              text-white
              font-bold
              shadow-lg
              hover:scale-[1.02]
              transition-all
              disabled:opacity-50
            "
          >
            {saving ? "Saving..." : "Save User"}
          </button>

        </div>

      </div>

    </div>

  </div>
)}

  </div>
);
}




