export default function PatientNotifications() {
  return (
    <div className="pt-24 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold text-blue-700 mb-4">
        🔔 Notifications
      </h1>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <p>⚠️ High blood pressure detected</p>
        <p>📅 Upcoming appointment tomorrow</p>
      </div>
    </div>
  );
}