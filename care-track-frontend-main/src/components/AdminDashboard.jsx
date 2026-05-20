import React, { useState } from "react";
import Navbar from "../components-admin/Navbar.jsx";
import Sidebar from "../components-admin/Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* 🔥 مررنا التوغل */}
      <Navbar 
        title="Admin Panel 🌐" 
        toggleSidebar={toggleSidebar} 
      />

      {/* 🔥 مررنا الحالة */}
      <Sidebar 
        isOpen={isOpen} 
        toggleSidebar={toggleSidebar} 
      />

      {/* 🔥 أهم تعديل */}
      <main className="pt-24 md:pt-28 p-4 md:ml-64">
        <Outlet />
      </main>

    </div>
  );
}