
// *******************************************************

import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Moon,
  Sun,
  HeartPulse,
} from "lucide-react";

const roleContent = {
  Patient: "Create a patient account to track your health records.",
  Doctor: "Register as a doctor to manage and monitor patients.",
  Admin: "Admin access for system and user management.",
  Caregiver: "Support and follow up on a loved one’s health.",
};

export default function Register() {
  const [role, setRole] = useState("Patient");
  const [dark, setDark] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const navigate = useNavigate();

  /* Dark mode for Tailwind v4 */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 overflow-hidden transition-colors duration-300">

      {/* Background subtle shapes */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />

      {/* Floating Card */}
      <div className="relative z-10 w-full max-w-lg mx-4 backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border border-white/20 rounded-3xl shadow-2xl p-8 transition-all duration-500 hover:scale-[1.02]">

        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <HeartPulse size={36} className="text-blue-600 animate-pulse" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Care<span className="text-blue-600">Track</span>
          </h1>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">
          Create Your Account
        </h2>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
          {roleContent[role]}
        </p>

        {/* Role Selector */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {Object.keys(roleContent).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`p-3 rounded-xl border text-xs font-medium transition transform hover:-translate-y-1
                ${
                  role === r
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white/70 dark:bg-gray-700 hover:bg-blue-50 dark:border-gray-600"
                }`}
            >
              <User size={16} className="mx-auto mb-1" />
              {r}
            </button>
          ))}
        </div>

        {/* Full Name */}
        <div className="relative mb-4">
          <User className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Full name"
            className="w-full pl-10 pr-3 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <Mail className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" size={18} />
          <input
            type="email"
            placeholder="Email address"
            className="w-full pl-10 pr-3 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <Lock className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-10 pr-10 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative mb-6">
          <Lock className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" size={18} />
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm password"
            className="w-full pl-10 pr-10 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 hover:text-gray-600"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Register Button */}
        <button
  onClick={() => {
    // هنا ممكن تضيف منطق تسجيل المستخدم في الـ backend
    // بعد تسجيل الحساب بنجاح نوجّه المستخدم حسب الدور
    switch(role) {
      case "Patient":
        navigate("/patient"); // صفحة Dashboard المريض
        break;
      case "Doctor":
        navigate("/doctor");  // صفحة Dashboard الطبيب
        break;
      case "Admin":
        navigate("/admin");   // صفحة Dashboard الادمن
        break;
      case "Caregiver":
        navigate("/caregiver"); // صفحة Dashboard الـ Caregiver
        break;
      default:
        navigate("/");        // fallback للصفحة الرئيسية
    }
  }}
  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition transform hover:-translate-y-1"
>
  Create Account
</button>


        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?
          <span className="text-blue-500 hover:underline ml-1 cursor-pointer">
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

