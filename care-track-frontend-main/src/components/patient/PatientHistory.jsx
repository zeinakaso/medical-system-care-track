export default function PatientHistory() {
  return (
    <div className="pt-24 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold text-blue-700 mb-4">
        📜 Health History
      </h1>

      <div className="bg-white p-4 rounded shadow">
        <ul className="space-y-2">
          <li>✔ Fever - Jan 2025</li>
          <li>✔ Blood Test - Feb 2025</li>
        </ul>
      </div>
    </div>
  );
}