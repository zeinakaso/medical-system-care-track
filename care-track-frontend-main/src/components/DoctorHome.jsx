import { useEffect, useState } from "react";

const API_BASE = "http://127.0.0.1:8000/api";

export default function DoctorPatients() {
  const [patients, setPatients] = useState([]);
  const [selected, setSelected] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const doctorName = user?.name || "Doctor";
  
  const [vitalsMap, setVitalsMap] = useState({});
  const [plans, setPlans] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editPlan, setEditPlan] = useState(null);

  const [criticalAlert, setCriticalAlert] = useState(null);

  const token = localStorage.getItem("token");
  const [showNotifications, setShowNotifications] = useState(false);
  const [search, setSearch] = useState("");

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  // ================= LOAD =================
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadPatients();
    // eslint-disable-next-line react-hooks/immutability
    loadNotifications();
  }, []);

  async function loadPatients() {
    const res = await fetch(`${API_BASE}/doctor/patients`, { headers });
    const json = await res.json();
    const data = json.data || [];
    setPatients(data);
console.log("📌 PATIENTS:", data);
    // تحميل vitals لكل مريض
    data.forEach((p) => {
      loadVitals(p);
    });
  }

  async function loadVitals(patient) {
    const name = patient.user_name || patient.patient_name;

    const res = await fetch(
      `${API_BASE}/vitalSign?patient_name=${encodeURIComponent(name)}`,
      { headers }
    );

    const json = await res.json();
    const vitals = json.data || [];

    setVitalsMap((prev) => ({
      ...prev,
      [patient.id]: vitals,
    }));
  }

 async function loadPlansByUserId(userId) {
  const res = await fetch(
    `${API_BASE}/treatment-plan/user/${userId}`,
    { headers }
  );

  const json = await res.json();

  console.log("📌 PLANS:", json);

  const data = json.data?.data || [];

  setPlans(data);
}

  async function loadNotifications() {
  const res = await fetch(`${API_BASE}/notifications?filter=all`, {
    headers,
  });

  const json = await res.json();
  const data = json.data?.data || [];

  setNotifications(data);

  // 🔥 فتح الجرس تلقائيًا إذا يوجد إشعارات غير مقروءة
  const hasUnread = data.some(n => !n.read_at);

  if (hasUnread) {
    setShowNotifications(true);
  }
}

  // ================= STATUS =================
  function getPatientStatus(vitals) {
    if (!vitals || !vitals.length) return "normal";

    const v = vitals[0];

    if (
      v.temperature > 39 ||
      v.heart_rate > 120 ||
      v.blood_pressure_systolic > 180
    ) {
      return "critical";
    }

    if (
      v.temperature > 37.5 ||
      v.heart_rate > 100
    ) {
      return "warning";
    }

    return "normal";
  }

  // ================= SELECT =================
  function selectPatient(p) {
    setSelected(p);
    loadPlansByUserId(p.user_id);

    const status = getPatientStatus(vitalsMap[p.id]);

    if (status === "critical") {
      setCriticalAlert(p);
    }
  }

  // ================= SAVE PLAN =================
  async function savePlan(e) {
    e.preventDefault();
    const f = new FormData(e.target);

    const body = {
      diagnosis: f.get("diagnosis"),
      medications: f.get("medications"),
      instructions: f.get("instructions"),
      start_date: f.get("start_date"),
      end_date: f.get("end_date"),
      patient_id: selected.id,
    };

    const url = editPlan
      ? `${API_BASE}/treatment-plan/${editPlan.id}`
      : `${API_BASE}/treatment-plan`;

    const method = editPlan ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers,
      body: JSON.stringify(body),
    });

    setModalOpen(false);
    setEditPlan(null);
    loadPlansByUserId(selected.user_id);
  }

  async function deletePlan(id) {
    await fetch(`${API_BASE}/treatment-plan/${id}`, {
      method: "DELETE",
      headers,
    });

    loadPlansByUserId(selected.user_id);
  }

  async function markAsRead(id) {
  await fetch(`${API_BASE}/notifications/${id}/read`, {
    method: "POST",
    headers,
  });

  loadNotifications();
}

async function deleteNotification(id) {
  await fetch(`${API_BASE}/notifications/${id}`, {
    method: "DELETE",
    headers,
  });

  loadNotifications();
}
const unreadCount = notifications.filter(
  (n) => !n.read_at
).length;
  // ================= UI =================
  return (
    <div className="mb-4">

  <div className=" p-3 bg-indigo-50 rounded-lg">
    <div className="text-lg font-semibold text-indigo-700">
      Hi Dr. {doctorName} 👋
    </div>

    <div className="text-sm text-gray-600 mt-1">
      Review your patients' conditions and monitor their vital signs.
    </div>
  </div>

    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-gray-50 to-sky-50 overflow-hidden">
      
      {/* SIDEBAR */}
      {/* <div className="w-1/3 bg-white border-r overflow-y-auto p-4">
        <h2 className="text-xl font-bold mb-4">🧑‍⚕️ Patients</h2>

        <input
  type="text"
  placeholder="Search patients..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
/>

        {patients
  .filter((p) => {
    const name =
      (p.user_name || p.patient_name || "").toLowerCase();

    return name.includes(search.toLowerCase());
  })
  .map((p) => {
          const vitals = vitalsMap[p.id];
          const status = getPatientStatus(vitals);

          return (
            <div
              key={p.id}
              onClick={() => selectPatient(p)}
              className={`p-3 mb-3 rounded-xl cursor-pointer shadow-sm transition
                ${
                  status === "critical"
                    ? "bg-red-100 border-l-4 border-red-600 animate-pulse"
                    : status === "warning"
                    ? "bg-yellow-100 border-l-4 border-yellow-500"
                    : "bg-gray-50 hover:bg-gray-100"
                }
              `}
            >
              <div className="flex justify-between">
                <div className="font-semibold">
                  {p.user_name || p.patient_name}
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded
                  ${
                    status === "critical"
                      ? "bg-red-600 text-white"
                      : status === "warning"
                      ? "bg-yellow-400"
                      : "bg-green-400"
                  }`}
                >
                  {status}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
  <div>
    {p.gender} • {p.birth_date}
  </div>

  <div className="text-xs text-indigo-600 font-semibold">
     Blood Group: {p.blood_clique || "Unknown"}
  </div>
</div>

              <div className="text-xs text-gray-400">
                {p.notes}
              </div>
            </div>
          );
        })}
      </div> */}


      <div className="w-full md:w-1/3 bg-gradient-to-b from-white to-slate-50 border-r border-sky-100 overflow-y-auto p-4 md:p-5">

  {/* HEADER */}
  <div className="mb-4">
    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
      🧑‍⚕️ Patients
    </h2>
    <p className="text-xs text-gray-500 mt-1">
      Select a patient to view medical details
    </p>
  </div>

  {/* SEARCH */}
  <div className="relative mb-4">
    <input
      type="text"
      placeholder="Search patients..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-3 pl-10 rounded-xl border border-gray-200 bg-white shadow-sm
      focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
    />
    <span className="absolute left-3 top-3 text-gray-400">🔍</span>
  </div>

  {/* LIST */}
  <div className="space-y-3">
    {patients
      .filter((p) => {
        const name =
          (p.user_name || p.patient_name || "").toLowerCase();
        return name.includes(search.toLowerCase());
      })
      .map((p) => {
        const vitals = vitalsMap[p.id];
        const status = getPatientStatus(vitals);

        return (
          <div
            key={p.id}
            onClick={() => selectPatient(p)}
            className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300
              border shadow-sm hover:shadow-lg hover:-translate-y-1

              ${
                status === "critical"
                  ? "bg-gradient-to-r from-red-50 to-red-100 border-red-200"
                  : status === "warning"
                  ? "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200"
                  : "bg-white border-gray-100"
              }
            `}
          >

            {/* top row */}
            <div className="flex items-start justify-between">

              <div>
                <div className="font-semibold text-gray-800 group-hover:text-sky-600 transition">
                  {p.user_name || p.patient_name}
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  {p.gender} • {p.birth_date}
                </div>
              </div>

              {/* STATUS BADGE */}
              <span
                className={`text-[10px] px-2 py-1 rounded-full font-semibold uppercase tracking-wide
                ${
                  status === "critical"
                    ? "bg-red-500 text-white"
                    : status === "warning"
                    ? "bg-yellow-400 text-black"
                    : "bg-emerald-500 text-white"
                }`}
              >
                {status}
              </span>
            </div>

            {/* blood */}
            <div className="mt-2 text-xs text-indigo-600 font-medium">
              🩸 Blood: {p.blood_clique || "Unknown"}
            </div>

            {/* notes */}
            {p.notes && (
              <div className="mt-2 text-[11px] text-gray-400 line-clamp-2">
                {p.notes}
              </div>
            )}

            {/* hover glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition
              bg-gradient-to-r from-sky-100/30 to-cyan-100/20 pointer-events-none" />
          </div>
        );
      })}
  </div>
</div>









      {/* CONTENT */}
    <div className="flex-1 p-6 overflow-y-auto min-w-0">

  {/* ================= EMPTY STATE ================= */}
  {!selected && (
    <div className="h-full flex items-start justify-center pt-24">
      <div className="text-center max-w-md bg-white/60 backdrop-blur-xl border border-sky-100 rounded-3xl p-10 shadow-xl">

        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-300 flex items-center justify-center shadow-lg animate-pulse">
          🧑‍⚕️
        </div>

        <h2 className="mt-6 text-xl font-bold text-gray-800">
          No Patient Selected
        </h2>

        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          Select a patient from the left panel to view
          <br />
          vitals, treatment plans, and medical insights.
        </p>

      </div>
    </div>
  )}

  {/* ================= CONTENT ================= */}
  {selected && (
    <div className="space-y-6">

      {/* ================= VITALS ================= */}
      <div className="bg-white rounded-2xl shadow border border-sky-100 overflow-hidden">

        <div className="px-5 py-4 bg-gradient-to-r from-sky-50 to-cyan-50 border-b">
          <h2 className="text-lg font-bold text-gray-800">
            📊 Vital Signs
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">

            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3 text-left whitespace-nowrap">Time</th>
                <th className="p-3 text-left whitespace-nowrap">Temp</th>
                <th className="p-3 text-left whitespace-nowrap">Heart</th>
                <th className="p-3 text-left whitespace-nowrap">BP</th>
                <th className="p-3 text-left whitespace-nowrap">Resp</th>
              </tr>
            </thead>

            <tbody>
              {(vitalsMap[selected.id] || []).map((v) => {

                const rowStatus = getPatientStatus(v);

                return (
                  <tr
                    key={v.id}
                    className={`border-t transition hover:bg-sky-50 ${
                      rowStatus === "critical"
                        ? "bg-red-50"
                        : rowStatus === "warning"
                        ? "bg-yellow-50"
                        : ""
                    }`}
                  >
                    <td className="p-3 whitespace-nowrap">{v.measured_at}</td>

                    <td className={`p-3 whitespace-nowrap ${
                      v.temperature > 39 ? "text-red-600 font-bold" :
                      v.temperature > 37.5 ? "text-yellow-600 font-semibold" : ""
                    }`}>
                      {v.temperature}
                    </td>

                    <td className={`p-3 whitespace-nowrap ${
                      v.heart_rate > 120 ? "text-red-600 font-bold" :
                      v.heart_rate > 100 ? "text-yellow-600 font-semibold" : ""
                    }`}>
                      {v.heart_rate}
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      {v.blood_pressure_systolic}/{v.blood_pressure_diastolic}
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      {v.respiratory_rate}
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>

      {/* ================= PLANS ================= */}
      <div className="bg-white rounded-2xl shadow border border-sky-100 overflow-hidden">

        <div className="flex justify-between items-center px-5 py-4 bg-gradient-to-r from-emerald-50 to-sky-50 border-b">

          <h2 className="text-lg font-bold text-gray-800">
            💊 Treatment Plans
          </h2>

          <button
            onClick={() => {
              setEditPlan(null);
              setModalOpen(true);
            }}
            className="px-4 py-2 text-sm rounded-xl bg-sky-600 text-white hover:bg-sky-700 transition"
          >
            + Add Plan
          </button>

        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">

            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3 text-left whitespace-nowrap">Diagnosis</th>
                <th className="p-3 text-left whitespace-nowrap">Medications</th>
                <th className="p-3 text-left whitespace-nowrap">Instructions</th>
                <th className="p-3 text-left whitespace-nowrap">Period</th>
                <th className="p-3 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {plans.map((p) => {
                const isExpired =
                  p.end_date && new Date(p.end_date) < new Date();

                return (
                  <tr
                    key={p.id}
                    className={`border-t hover:bg-sky-50 transition ${
                      isExpired ? "bg-red-50" : ""
                    }`}
                  >
                    <td className="p-3 whitespace-nowrap font-medium">
                      {p.diagnosis}
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      {p.medications}
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      {p.instructions}
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      {p.start_date} → {p.end_date}

                      {isExpired && (
                        <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded">
                          Expired
                        </span>
                      )}
                    </td>

                    <td className="p-3 whitespace-nowrap flex gap-3">
                      <button
                        onClick={() => {
                          setEditPlan(p);
                          setModalOpen(true);
                        }}
                      >
                        ✏️
                      </button>

                      <button onClick={() => deletePlan(p.id)}>
                        🗑️
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  )}
</div>















     {/* NOTIFICATION BELL */}
<div className="fixed top-18 right-5 z-50">

  {/* BELL */}
  <button
    onClick={() => setShowNotifications(!showNotifications)}
className={`relative bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-2xl hover:bg-gray-100 transition
${unreadCount > 0 ? "animate-pulse ring-2 ring-red-500" : ""}
`}  >
    🔔

    {unreadCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
        {unreadCount}
      </span>
    )}
  </button>

  {/* DROPDOWN */}
  {showNotifications && (
    <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border">

      <div className="p-3 font-bold border-b bg-gray-50">
        Notifications
      </div>

      <div className="max-h-[400px] overflow-y-auto">

        {notifications.length === 0 && (
          <div className="p-4 text-sm text-gray-500 text-center">
            No notifications
          </div>
        )}

        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-3 border-b text-sm
              ${
                !n.read_at
                  ? "bg-indigo-50"
                  : "bg-white"
              }
            `}
          >
            {/* CONTENT */}
            <div
              onClick={() => {
                const p = patients.find(
                  (x) => x.id == n.patient_id
                );

                if (p) selectPatient(p);
              }}
              className="cursor-pointer"
            >
              <div className="font-semibold">
                {n.patient_name}
              </div>

              <div className="text-gray-700">
                {n.message}
              </div>

              <div className="text-xs text-gray-400 mt-1">
                {n.created_at}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 mt-3">

              {!n.read_at && (
                <button
                  onClick={() => markAsRead(n.id)}
                  className="text-xs bg-green-500 text-white px-2 py-1 rounded"
                >
                  Read
                </button>
              )}

              <button
                onClick={() => deleteNotification(n.id)}
                className="text-xs bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>


      {/* CRITICAL ALERT */}
      {criticalAlert && (
        <div className="fixed bottom-5 right-5 bg-red-600 text-white px-4 py-3 rounded-xl shadow-lg animate-bounce">
          🚨 {criticalAlert.user_name || criticalAlert.patient_name} needs immediate attention!
        </div>
      )}

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <form
            onSubmit={savePlan}
            className="bg-white p-6 rounded-xl w-[400px] space-y-3"
          >
            <h3 className="text-lg font-bold">
              {editPlan ? "Edit Plan" : "Add Plan"}
            </h3>

            <input name="diagnosis" placeholder="Diagnosis"
              defaultValue={editPlan?.diagnosis}
              className="w-full border p-2 rounded" />

            <input name="medications" placeholder="Medications"
              defaultValue={editPlan?.medications}
              className="w-full border p-2 rounded" />

            <input name="instructions" placeholder="Instructions"
              defaultValue={editPlan?.instructions}
              className="w-full border p-2 rounded" />

            <div className="flex gap-2">
              <input type="date" name="start_date"
                className="w-full border p-2 rounded" />
              <input type="date" name="end_date"
                className="w-full border p-2 rounded" />
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={() => setModalOpen(false)}>
                Cancel
              </button>

              <button className="bg-indigo-600 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>




    </div>
  );
}



// 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
