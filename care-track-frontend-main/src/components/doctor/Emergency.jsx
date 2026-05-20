// import React, { useState, useEffect } from "react";
// import { Phone, FileText, AlertCircle } from "lucide-react";

// function randomVariation(value, variance = 1) {
//   return +(value + (Math.random() * variance * 2 - variance)).toFixed(1);
// }

// export default function Emergency() {
//   const initialPatients = [
//     { id: 1, name: "Ahmad Ali", temp: 39.2, heartRate: 132, lastUpdate: "5 min ago", phone: "0551234567", severity: 3 },
//     { id: 2, name: "Sara Mohammad", temp: 38.8, heartRate: 125, lastUpdate: "12 min ago", phone: "0557654321", severity: 2 },
//     { id: 3, name: "Omar Khaled", temp: 38.6, heartRate: 118, lastUpdate: "20 min ago", phone: "0559876543", severity: 1 },
//   ];

//   const [patients, setPatients] = useState(initialPatients);
//   const [modalPatient, setModalPatient] = useState(null);
//   const [notePatient, setNotePatient] = useState(null);
//   const [newNote, setNewNote] = useState("");
//   const [notes, setNotes] = useState(() => {
//     const saved = localStorage.getItem("emergencyNotes");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // 🔄 تحديث وهمي للبيانات
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPatients((prev) =>
//         prev.map((p) => ({
//           ...p,
//           temp: randomVariation(p.temp, 0.3),
//           heartRate: Math.max(50, randomVariation(p.heartRate, 5)),
//           lastUpdate: new Date().toLocaleTimeString(),
//         }))
//       );
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // 💾 حفظ Notes في LocalStorage
//   useEffect(() => {
//     localStorage.setItem("emergencyNotes", JSON.stringify(notes));
//   }, [notes]);

//   const handleSaveNote = () => {
//     if (!notePatient || newNote.trim() === "") return;

//     setNotes((prev) => [
//       {
//         patient: notePatient.name,
//         text: newNote,
//         time: new Date().toLocaleTimeString(),
//       },
//       ...prev,
//     ]);

//     setNotePatient(null);
//     setNewNote("");
//   };

//   const sortedPatients = [...patients].sort((a, b) => b.severity - a.severity);

//   return (
//     <div className="bg-gray-50 min-h-screen space-y-8">

//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-red-600 flex items-center gap-2">
//           <AlertCircle /> Emergency Cases
//         </h1>
//         <p className="text-gray-600">Patients requiring immediate medical attention</p>
//       </div>

//       {/* Emergency List */}
//       <div className="grid gap-4">
//         {sortedPatients.map((p) => {
//           const tempColor = p.temp >= 39 ? "text-red-700" : p.temp >= 38 ? "text-yellow-700" : "text-green-700";
//           const hrColor = p.heartRate >= 130 ? "text-red-700" : p.heartRate >= 120 ? "text-yellow-700" : "text-green-700";

//           return (
//             <div key={p.id} className="bg-red-50 border border-red-300 rounded-lg p-4 flex flex-col md:flex-row justify-between gap-4">
//               <div>
//                 <h3 className="font-semibold text-lg text-red-700">{p.name}</h3>
//                 <p className={`text-sm ${tempColor}`}>🌡 Temp: {p.temp}°C</p>
//                 <p className={`text-sm ${hrColor}`}>❤️ HR: {p.heartRate}</p>
//                 <p className="text-xs text-gray-500">⏱ Last update: {p.lastUpdate}</p>
//               </div>

//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setModalPatient(p)}
//                   className="flex items-center gap-1 px-2 py-0.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-md transition-colors"
//                 >
//                   <Phone size={14} /> Call
//                 </button>
//                 <button
//                   onClick={() => setNotePatient(p)}
//                   className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium rounded-md transition-colors"
//                 >
//                   <FileText size={14} /> Note
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Notes Log */}
//       <div className="bg-white rounded-lg p-4 shadow">
//         <h2 className="font-semibold text-lg mb-3">📝 Emergency Notes Log</h2>
//         <ul className="text-sm space-y-2">
//           {notes.length === 0 ? <li>No notes yet.</li> :
//             notes.map((n, i) => (
//               <li key={i}>• {n.patient} – {n.text} ({n.time})</li>
//             ))
//           }
//         </ul>
//       </div>

//       {/* Call Modal */}
//       {modalPatient && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow w-96">
//             <h2 className="font-bold text-lg mb-2">{modalPatient.name}</h2>
//             <p>Phone: {modalPatient.phone}</p>
//             <div className="mt-4 flex justify-end gap-2">
//               <button className="bg-green-500 text-white px-4 py-2 rounded">Call Now</button>
//               <button onClick={() => setModalPatient(null)} className="bg-gray-200 px-4 py-2 rounded">Close</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Note Modal */}
//       {notePatient && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow w-96">
//             <h2 className="font-bold text-lg mb-2">Add Note for {notePatient.name}</h2>
//             <textarea
//               className="w-full border p-2 rounded mb-3"
//               rows={4}
//               placeholder="Write your urgent note here..."
//               value={newNote}
//               onChange={(e) => setNewNote(e.target.value)}
//             />
//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={handleSaveNote}
//                 disabled={!newNote.trim()}
//                 className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white px-4 py-2 rounded"
//               >
//                 Save
//               </button>
//               <button onClick={() => setNotePatient(null)} className="bg-gray-200 px-4 py-2 rounded">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// ******************************************************


// src/pages/doctor/Emergency.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../../components-admin/Navbar.jsx";
import DoctorSidebar from "../../components-admin/DoctorSidebar.jsx";
import { Phone, FileText, AlertCircle } from "lucide-react";

function randomVariation(value, variance = 1) {
  return +(value + (Math.random() * variance * 2 - variance)).toFixed(1);
}

export default function Emergency() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const initialPatients = [
    { id: 1, name: "Ahmad Ali", temp: 39.2, heartRate: 132, lastUpdate: "5 min ago", phone: "0551234567", severity: 3 },
    { id: 2, name: "Sara Mohammad", temp: 38.8, heartRate: 125, lastUpdate: "12 min ago", phone: "0557654321", severity: 2 },
    { id: 3, name: "Omar Khaled", temp: 38.6, heartRate: 118, lastUpdate: "20 min ago", phone: "0559876543", severity: 1 },
  ];

  const [patients, setPatients] = useState(initialPatients);
  const [modalPatient, setModalPatient] = useState(null);
  const [notePatient, setNotePatient] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("emergencyNotes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPatients((prev) =>
        prev.map((p) => ({
          ...p,
          temp: randomVariation(p.temp, 0.3),
          heartRate: Math.max(50, randomVariation(p.heartRate, 5)),
          lastUpdate: new Date().toLocaleTimeString(),
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("emergencyNotes", JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = () => {
    if (!notePatient || newNote.trim() === "") return;
    setNotes((prev) => [
      { patient: notePatient.name, text: newNote, time: new Date().toLocaleTimeString() },
      ...prev,
    ]);
    setNotePatient(null);
    setNewNote("");
  };

  const sortedPatients = [...patients].sort((a, b) => b.severity - a.severity);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Navbar */}
      <Navbar title="Emergency" toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <DoctorSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <main className="pt-16 md:pl-64 p-4 md:p-6 transition-all duration-300 space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-red-600 flex items-center gap-2">
            <AlertCircle /> Emergency Cases
          </h1>
          <p className="text-gray-600">Patients requiring immediate medical attention</p>
        </div>

        {/* Emergency List */}
        <div className="grid gap-4">
          {sortedPatients.map((p) => {
            const tempColor = p.temp >= 39 ? "text-red-700" : p.temp >= 38 ? "text-yellow-700" : "text-green-700";
            const hrColor = p.heartRate >= 130 ? "text-red-700" : p.heartRate >= 120 ? "text-yellow-700" : "text-green-700";

            return (
              <div key={p.id} className="bg-red-50 border border-red-300 rounded-lg p-4 flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-red-700">{p.name}</h3>
                  <p className={`text-sm ${tempColor}`}>🌡 Temp: {p.temp}°C</p>
                  <p className={`text-sm ${hrColor}`}>❤️ HR: {p.heartRate}</p>
                  <p className="text-xs text-gray-500">⏱ Last update: {p.lastUpdate}</p>
                </div>

                <div className="flex gap-2 md:flex-col md:justify-center">
                  <button
                    onClick={() => setModalPatient(p)}
                    className="flex items-center gap-1 px-2 py-0.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-md transition-colors"
                  >
                    <Phone size={14} /> Call
                  </button>
                  <button
                    onClick={() => setNotePatient(p)}
                    className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium rounded-md transition-colors"
                  >
                    <FileText size={14} /> Note
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notes Log */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="font-semibold text-lg mb-3">📝 Emergency Notes Log</h2>
          <ul className="text-sm space-y-2">
            {notes.length === 0 ? <li>No notes yet.</li> :
              notes.map((n, i) => (
                <li key={i}>• {n.patient} – {n.text} ({n.time})</li>
              ))
            }
          </ul>
        </div>

        {/* Call Modal */}
        {modalPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-2">
            <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
              <h2 className="font-bold text-lg mb-2">{modalPatient.name}</h2>
              <p>Phone: {modalPatient.phone}</p>
              <div className="mt-4 flex justify-end gap-2 flex-wrap">
                <button className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-auto">Call Now</button>
                <button onClick={() => setModalPatient(null)} className="bg-gray-200 px-4 py-2 rounded w-full md:w-auto">Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Note Modal */}
        {notePatient && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-2">
            <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
              <h2 className="font-bold text-lg mb-2">Add Note for {notePatient.name}</h2>
              <textarea
                className="w-full border p-2 rounded mb-3"
                rows={4}
                placeholder="Write your urgent note here..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <div className="flex justify-end gap-2 flex-wrap">
                <button
                  onClick={handleSaveNote}
                  disabled={!newNote.trim()}
                  className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white px-4 py-2 rounded w-full md:w-auto"
                >
                  Save
                </button>
                <button onClick={() => setNotePatient(null)} className="bg-gray-200 px-4 py-2 rounded w-full md:w-auto">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
