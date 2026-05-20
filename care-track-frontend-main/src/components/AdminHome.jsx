import React, { useEffect, useState } from "react";
import StatCard from "../components-admin/StatCard.jsx";
import UsersTable from "../components-admin/UsersTable.jsx";
import { Users, HeartPulse, Stethoscope, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AdminHome() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    patients: 0,
    doctors: 0,
    relatives: 0,
  });

  const [loading, setLoading] = useState(true);

  // ================= FETCH STATS =================
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Error loading stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // ================= NAVIGATION HANDLER =================
  const goTo = (path) => {
    navigate(path);
  };

  // ================= UI =================
return (
  <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 p-4 md:p-8">

    {/* BACKGROUND GLOW */}
    <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-sky-300/30 blur-[120px] rounded-full"></div>
    <div className="absolute bottom-[-150px] right-[-150px] w-[450px] h-[450px] bg-cyan-300/20 blur-[140px] rounded-full"></div>

    {/* HEADER */}
    <div className="relative mb-10">
      <h2 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">
        Welcome, <span className="text-sky-600">Admin</span> 👋
      </h2>

      <p className="text-gray-500 mt-2">
        CareTrack Medical Intelligence Dashboard
      </p>

      {/* LIVE BADGE */}
      <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
        <span className="text-sm text-gray-600 font-medium">Live System Active</span>
      </div>
    </div>

    {/* STATS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

      {/* CARD WRAPPER STYLE */}
      {[
        {
          title: "Total Users",
          value: loading ? "..." : stats?.users || 0,
          icon: <Users size={26} />,
          color: "from-purple-500 to-indigo-500",
          action: "/admin/users",
        },
        {
          title: "Patients",
          value: loading ? "..." : stats?.patients || 0,
          icon: <HeartPulse size={26} />,
          color: "from-sky-500 to-cyan-500",
          action: "/admin/patients",
        },
        {
          title: "Doctors",
          value: loading ? "..." : stats?.doctors || 0,
          icon: <Stethoscope size={26} />,
          color: "from-emerald-500 to-teal-500",
          action: "/admin/doctors",
        },
        {
          title: "Relatives",
          value: loading ? "..." : stats?.relatives || 0,
          icon: <Activity size={26} />,
          color: "from-rose-500 to-pink-500",
          action: "/admin/relatives",
        },
      ].map((item, i) => (
        <div
          key={i}
          onClick={() => goTo(item.action)}
          className="cursor-pointer group"
        >
          <div className="relative bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">

            {/* TOP GRADIENT BAR */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color}`}></div>

            {/* ICON */}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-r ${item.color} shadow-md mb-4 group-hover:scale-110 transition`}>
              {item.icon}
            </div>

            {/* VALUE */}
            <div className="text-3xl font-black text-gray-800">
              {item.value}
            </div>

            {/* TITLE */}
            <div className="text-sm text-gray-500 mt-1">
              {item.title}
            </div>

          </div>
        </div>
      ))}

    </div>

    {/* INFO PANEL */}
    <div className="bg-white/50 backdrop-blur-2xl border border-white/40 rounded-3xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          System Overview
        </h3>

        <span className="px-3 py-1 text-xs rounded-full bg-sky-100 text-sky-600 font-semibold">
          AI Ready
        </span>
      </div>

      <p className="text-sm text-gray-500 leading-relaxed">
        Monitor patients, doctors, and real-time medical activity.
        The system is optimized for live healthcare intelligence and predictive alerts.
      </p>
    </div>

  </div>
);
}