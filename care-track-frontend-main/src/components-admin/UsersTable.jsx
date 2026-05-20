import React from "react";
import { Pencil, Trash } from "lucide-react";

export default function UsersTable() {
  const users = [
    { id: 1, name: "Ahmed Ali", email: "ahmed@mail.com", role: "Doctor", active: true },
    { id: 2, name: "Layla Mahmoud", email: "layla@mail.com", role: "Patient", active: false },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 mt-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
        <h3 className="text-base md:text-lg font-semibold">
          Users Management
        </h3>

        <button className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add User
        </button>
      </div>

      {/* 🔥 الحل: scroll */}
      <div className="overflow-x-auto">
        
        <table className="min-w-[600px] w-full text-sm">
          
          <thead className="border-b text-gray-500">
            <tr>
              <th className="text-left py-2">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Role</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                
                <td className="py-2 text-left whitespace-nowrap">
                  {u.name}
                </td>

                <td className="text-center whitespace-nowrap">
                  {u.email}
                </td>

                <td className="text-center">
                  {u.role}
                </td>

                <td className="text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      u.active
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {u.active ? "Active" : "Suspended"}
                  </span>
                </td>

                <td className="text-center py-2">
                  <div className="flex justify-center gap-2">
                    <Pencil className="text-blue-600 cursor-pointer" size={16} />
                    <Trash className="text-red-500 cursor-pointer" size={16} />
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}