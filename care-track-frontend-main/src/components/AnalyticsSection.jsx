import React from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsSection() {
  // بيانات نبض القلب (Line)
  const heartRateData = [
    { time: "10:00", bpm: 72 },
    { time: "10:05", bpm: 76 },
    { time: "10:10", bpm: 80 },
    { time: "10:15", bpm: 78 },
    { time: "10:20", bpm: 74 },
    { time: "10:25", bpm: 77 },
  ];

  // توزيع الحالات (Pie)
  const conditionsData = [
    { name: "Cardio", value: 40 },
    { name: "Diabetes", value: 25 },
    { name: "Respiratory", value: 20 },
    { name: "Other", value: 15 },
  ];

  const COLORS = ["#1e88e5", "#6f42c1", "#00b894", "#fdcb6e"];

  // مواعيد المرضى (Bar)
  const appointmentsData = [
    { month: "Jan", count: 30 },
    { month: "Feb", count: 22 },
    { month: "Mar", count: 40 },
    { month: "Apr", count: 28 },
    { month: "May", count: 35 },
  ];

  return (
    <div
      style={{
        padding: "50px 20px",
        background: "#f5f8ff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "40px", fontSize: "32px", color: "#0a3d62" }}>
        System Analytics Dashboard
      </h2>

      {/* المخططات */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "25px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        {/* Line Chart */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#1e88e5" }}>Heart Rate Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={heartRateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bpm" stroke="#1e88e5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#6f42c1" }}>Medical Conditions</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={conditionsData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {conditionsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#00b894" }}>Appointments Per Month</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={appointmentsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#00b894" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
