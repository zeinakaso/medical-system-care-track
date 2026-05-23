import { useEffect, useState } from "react";

export default function DoctorNotifications() {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    load();
  }, []);

  async function load() {
    const res = await fetch(
      "http://127.0.0.1:8000/api/notifications?filter=all",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = await res.json();
    setNotifications(data.data?.data || []);
  }

  // MARK AS READ
  async function markAsRead(id) {
    await fetch(
      `http://127.0.0.1:8000/api/notifications/${id}/read`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    load();
  }

  // DELETE
  async function deleteNotification(id) {
    await fetch(
      `http://127.0.0.1:8000/api/notifications/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    load();
  }

  // ICON LOGIC SIMPLE
  function getIcon(message) {
    if (message.includes("temperature")) return "🌡️";
    if (message.includes("heart")) return "❤️";
    if (message.includes("pressure")) return "🩸";
    if (message.includes("critical")) return "🚨";
    return "📢";
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
        🔔 Doctor Notifications
      </h2>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-xl shadow bg-white border-l-4 flex justify-between items-start gap-4
              ${
                !n.read_at
                  ? "border-indigo-500"
                  : "border-gray-200 opacity-80"
              }
            `}
          >
            {/* LEFT CONTENT */}
            <div className="flex gap-3 flex-1">
              <div className="text-2xl">
                {getIcon(n.message)}
              </div>

              <div>
                <div className="font-bold text-gray-800 flex items-center gap-2">
                  🧑‍⚕️ {n.patient_name}
                </div>

                <div className="text-gray-700">
                  {n.message}
                </div>

                <div className="text-xs text-gray-400 mt-1">
                  ⏰ {n.created_at}
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-2">
              {!n.read_at && (
                <button
                  onClick={() => markAsRead(n.id)}
                  className="text-xs bg-green-500 text-white px-3 py-1 rounded"
                >
                  ✔ Read
                </button>
              )}

              <button
                onClick={() => deleteNotification(n.id)}
                className="text-xs bg-red-500 text-white px-3 py-1 rounded"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}