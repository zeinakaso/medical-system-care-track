




import React, { useState } from "react";
import Navbar from "../components-admin/Navbar.jsx";
import DoctorSidebar from "../components-admin/DoctorSidebar.jsx";
import { Outlet } from "react-router-dom";

export default function DoctorDashboard() {
  // 🔥 state للتحكم بالسايد بار
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* 🔥 مررنا التوغل */}
      <Navbar 
        title="Doctor Dashboard 💉" 
        toggleSidebar={toggleSidebar} 
      />

      {/* 🔥 مررنا الحالة */}
      <DoctorSidebar 
        isOpen={isOpen} 
        toggleSidebar={toggleSidebar} 
      />

      <main className="pt-24 md:pt-28 p-4 md:ml-64">
        <Outlet />
      </main>

    </div>
  );
}


// 🩺 SmartCare Dashboard
// 💙 Patient Health Center
// 🏥 Clinical Monitoring Dashboard
// 📊 Health Analytics Dashboard
// ❤️ CareSync Dashboard
// 🌐 MedTrack Patient Portal
// 🧬 Advanced Patient Monitoring
// 💉