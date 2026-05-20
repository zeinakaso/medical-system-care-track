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

      <h2 className="text-2xl sm:text-4xl font-black text-sky-700 tracking-tight">
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
    <div className="bg-white/70 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-xl overflow-hidden">

      {loading ? (
        <div className="p-10 text-center text-gray-500">
          Loading users...
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px] text-sm">

            {/* HEADER */}
            <thead className="bg-gradient-to-r from-sky-50 to-cyan-50 text-gray-600 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">User</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>

              {filteredUsers.map((u) => (
                <tr
                  key={u.id}
                  className="border-t border-gray-100 hover:bg-sky-50/50 transition"
                >

                  <td className="p-4 text-gray-500">{u.id}</td>

                  <td className="p-4 font-semibold text-gray-800">
                    {u.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {u.email}
                  </td>

                  <td className="p-4">
                    <span className="
                      px-3 py-1 rounded-full text-xs font-semibold
                      bg-gradient-to-r from-sky-100 to-cyan-100
                      text-sky-700
                    ">
                      {u.role}
                    </span>
                  </td>

                  <td className="p-4 flex gap-3">

                    <button
                      onClick={() => openEdit(u)}
                      className="text-sky-600 hover:text-sky-800 font-medium transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(u.id)}
                      className="text-red-500 hover:text-red-700 font-medium transition"
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

    {/* MODAL */}
    {showModal && (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">

        <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-6 animate-[fadeIn_0.3s_ease]">

          {/* HEADER */}
          <div className="flex items-center gap-2 mb-4">
            <User className="text-sky-600" />
            <h3 className="text-lg font-bold text-gray-800">
              {editingId ? "Edit User" : "Add User"}
            </h3>
          </div>

          {/* ALERTS */}
          {error && (
            <div className="mb-3 text-sm p-3 rounded-xl bg-red-50 text-red-600 border border-red-100">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-3 text-sm p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              {success}
            </div>
          )}

          {/* FORM */}
          <div className="space-y-3">

            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Full Name"
              className="w-full p-3 rounded-xl border border-gray-100 bg-white/70 focus:ring-2 focus:ring-sky-200 outline-none"
            />

            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              className="w-full p-3 rounded-xl border border-gray-100 bg-white/70 focus:ring-2 focus:ring-sky-200 outline-none"
            />

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Password"
                className="w-full p-3 pr-10 rounded-xl border border-gray-100 bg-white/70 focus:ring-2 focus:ring-sky-200 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-sky-600 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

            </div>

            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full p-3 rounded-xl border border-gray-100 bg-white/70 focus:ring-2 focus:ring-sky-200 outline-none"
            >
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
              <option value="relative">Relative</option>
            </select>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-5">

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold shadow-md hover:scale-[1.02] active:scale-95 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>

          </div>

        </div>

      </div>
    )}

  </div>
);
}




