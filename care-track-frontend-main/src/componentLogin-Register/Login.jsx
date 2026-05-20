/* eslint-disable no-unused-vars */
// import { useState } from "react";
// import API from "../api";
// import {
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   User,
//   Moon,
//   Sun,
//   HeartPulse,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const roleContent = {
//   Patient: {
//     title: "Patient Portal",
//     desc: "Track your health data, appointments, and medical reports easily.",
//   },
//   Doctor: {
//     title: "Doctor Dashboard",
//     desc: "Monitor patients, review reports, and manage care efficiently.",
//   },
//   Admin: {
//     title: "Admin Access",
//     desc: "Manage users, system settings, and analytics securely.",
//   },
//   Caregiver: {
//     title: "Caregiver Access",
//     desc: "Support and monitor your loved one’s health in real time.",
//   },
// };

// export default function Login() {
//   const [role, setRole] = useState("Patient");
//   const [showPassword, setShowPassword] = useState(false);
//   const [dark, setDark] = useState(false);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   // ================= LOGIN =================
//   const handleSignIn = async () => {
//     try {
//       // ✅ LOGIN REQUEST
//       const res = await API.post("/login", {
//         email,
//         password,
//       });

//       const { token, user } = res.data;

//       console.log("USER ROLE FROM BACKEND:", user.role);

//       // ✅ STORE DATA
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("role", user.role);

//       // ================= ROLE LOGIC =================

//       // ===== PATIENT =====
//       if (user.role === "patient") {
//         try {
//           const res = await API.get("/my-patient");

//           const patient = Array.isArray(res.data.data)
//             ? res.data.data[0]
//             : res.data.data;

//           if (patient?.id) {
//             localStorage.setItem("patientId", patient.id);
//           }
//         } catch (e) {
//           console.warn("Patient fetch failed:", e.response?.data);
//         }

//         navigate("/patient");
//       }

//       // ===== DOCTOR =====
//       else if (user.role === "doctor") {
//         try {
//           const res = await API.get("/my-doctor");

//           const doctor = Array.isArray(res.data.data)
//             ? res.data.data[0]
//             : res.data.data;

//           if (doctor?.id) {
//             localStorage.setItem("doctorId", doctor.id);
//           }
//         } catch (e) {
//           console.warn("Doctor fetch failed:", e.response?.data);
//         }

//         navigate("/doctor");
//       }

//       // ===== RELATIVE / CAREGIVER =====
//       else if (user.role === "relative" || user.role === "caregiver") {
//         try {
//           const res = await API.get(`/relative/${user.id}/patients`);

//           const relative = Array.isArray(res.data.data)
//             ? res.data.data[0]
//             : res.data.data;

//           if (relative?.id) {
//             localStorage.setItem("relativeId", relative.id);
//           }
//         } catch (e) {
//           console.warn("Relative fetch failed:", e.response?.data);
//         }

//         navigate("/caregiver");
//       }

//       // ===== ADMIN =====
//       else if (user.role === "admin") {
//         try {
//           const res = await API.get(`/admin/users/${user.id}`);

//           const admin = res.data.data || res.data;

//           if (admin?.id) {
//             localStorage.setItem("adminId", admin.id);
//           }
//         } catch (e) {
//           console.warn("Admin fetch failed:", e.response?.data);
//         }

//         navigate("/admin");
//       }

//       // ===== UNKNOWN =====
//       else {
//         alert("Unknown role");
//       }
//     } catch (err) {
//       console.error("LOGIN ERROR:", err.response?.data || err.message);

//       if (err.response?.status === 401) {
//         alert("Invalid email or password ❌");
//       } else {
//         alert("Server error ❌");
//       }
//     }
//   };

//   // ================= UI =================
//   return (
//     <div className={dark ? "dark" : ""}>
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
//         <div className="relative w-full max-w-md backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl p-8">
          
//           {/* DARK MODE */}
//           <div className="flex justify-end mb-4">
//             <button
//               onClick={() => setDark(!dark)}
//               className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
//             >
//               {dark ? <Sun size={18} /> : <Moon size={18} />}
//             </button>
//           </div>

//           {/* LOGO */}
//           <div className="flex items-center justify-center gap-3 mb-3">
//             <HeartPulse size={34} className="text-blue-600 animate-pulse" />
//             <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
//               Care<span className="text-blue-600">Track</span>
//             </h1>
//           </div>

//           {/* TITLE */}
//           <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">
//             {roleContent[role].title}
//           </h2>

//           <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-4">
//             {roleContent[role].desc}
//           </p>

//           {/* ROLE SWITCH */}
//           <div className="grid grid-cols-4 gap-2 mb-6">
//             {Object.keys(roleContent).map((r) => (
//               <button
//                 key={r}
//                 onClick={() => setRole(r)}
//                 className={`p-3 rounded-xl border text-xs font-medium transition
//                   ${
//                     role === r
//                       ? "bg-blue-600 text-white"
//                       : "bg-gray-50 dark:bg-gray-700"
//                   }`}
//               >
//                 <User size={16} className="mx-auto mb-1" />
//                 {r}
//               </button>
//             ))}
//           </div>

//           {/* EMAIL */}
//           <div className="relative mb-4">
//             <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
//             <input
//               type="email"
//               placeholder="Email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full pl-10 py-3 border rounded-lg dark:bg-gray-700 dark:text-white"
//             />
//           </div>

//           {/* PASSWORD */}
//           <div className="relative mb-3">
//             <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full pl-10 pr-10 py-3 border rounded-lg dark:bg-gray-700 dark:text-white"
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-3"
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           {/* BUTTON */}
//           <button
//             onClick={handleSignIn}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg mt-3 hover:bg-blue-700 transition"
//           >
//             Sign In
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }




// ______________________________________________________________________________________________________________
/* eslint-disable no-unused-vars */

// import { useState } from "react";
// import API from "../api";
// import {
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   HeartPulse,
//   ArrowLeft,
//   AlertCircle,
//   Loader2,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [shake, setShake] = useState(false);

//   const navigate = useNavigate();

//   // 🔊 soft error sound
//   const playErrorSound = () => {
//     const audio = new Audio(
//       "https://assets.mixkit.co/active_storage/sfx/951/951-preview.mp3"
//     );
//     audio.volume = 0.2;
//     audio.play();
//   };

//   const triggerErrorFX = (msg) => {
//     setError(msg);
//     setShake(true);
//     playErrorSound();

//     setTimeout(() => setShake(false), 600);
//   };

//   const handleSignIn = async () => {
//     try {
//       setError("");
//       setLoading(true);

//       const res = await API.post("/login", { email, password });

//       const { token, user } = res.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("role", user.role);

//       if (user.role === "patient") navigate("/patient");
//       else if (user.role === "doctor") navigate("/doctor");
//       else if (user.role === "relative" || user.role === "caregiver")
//         navigate("/caregiver");
//       else if (user.role === "admin") navigate("/admin");
//       else alert("Unknown role");
//     } catch (err) {
//       if (err?.response?.status === 401) {
//         triggerErrorFX("Invalid email or password ❌");
//       } else {
//         triggerErrorFX("Server error. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#66a2ff] via-white to-[#66a2ff] overflow-hidden">

//       {/* BACKGROUND */}
//       <div className="absolute top-[-80px] left-[-80px] w-96 h-96 bg-sky-200/40 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl animate-pulse" />

//       {/* BACK BUTTON */}
//       <button
//         onClick={() => navigate("/")}
//         className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/70 backdrop-blur-xl border border-sky-200 shadow-md flex items-center justify-center hover:scale-110 transition"
//       >
//         <ArrowLeft size={18} className="text-sky-600" />
//       </button>

//       {/* CARD */}
//       <div
//         className={`
//           relative w-full max-w-md
//           bg-white/80 backdrop-blur-2xl
//           border border-white shadow-2xl
//           rounded-[30px] p-8
//           transition-all duration-300
//           ${error ? "shadow-red-400/40 ring-2 ring-red-300" : ""}
//           ${shake ? "animate-shake" : ""}
//         `}
//       >

//         {/* HEADER */}
//         <div className="text-center mb-6">
//           <HeartPulse className="text-sky-600 animate-pulse mx-auto mb-3" size={40} />
//           <h1 className="text-3xl font-extrabold">
//             Care<span className="text-sky-600">Track</span>
//           </h1>
//           <p className="text-gray-500 mt-2">Welcome back</p>
//         </div>

//         {/* ERROR */}
//         {error && (
//           <div className="flex items-center gap-2 mb-4 text-sm text-red-500 bg-red-50 border border-red-100 p-3 rounded-xl">
//             <AlertCircle size={16} />
//             {error}
//           </div>
//         )}

//         {/* EMAIL */}
//         <div className="relative mb-5">
//           <Mail className="absolute left-4 top-3.5 text-sky-500" size={18} />
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full pl-11 pr-4 py-3 rounded-xl border bg-white/70 focus:ring-2 focus:ring-sky-400 outline-none"
//           />
//         </div>

//         {/* PASSWORD */}
//         <div className="relative mb-6">
//           <Lock className="absolute left-4 top-3.5 text-sky-500" size={18} />
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full pl-11 pr-11 py-3 rounded-xl border bg-white/70 focus:ring-2 focus:ring-sky-400 outline-none"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-4 top-3.5"
//           >
//             {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//           </button>
//         </div>

//         {/* BUTTON */}
//         <button
//           onClick={handleSignIn}
//           disabled={loading}
//           className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2"
//         >
//           {loading ? (
//             <>
//               <Loader2 className="animate-spin" size={18} />
//               Checking credentials...
//             </>
//           ) : (
//             "Sign In"
//           )}
//         </button>
//       </div>

//       {/* SHAKING ANIMATION */}
//       <style>{`
//         @keyframes shake {
//           0% { transform: translateX(0); }
//           20% { transform: translateX(-6px); }
//           40% { transform: translateX(6px); }
//           60% { transform: translateX(-4px); }
//           80% { transform: translateX(4px); }
//           100% { transform: translateX(0); }
//         }

//         .animate-shake {
//           animation: shake 0.4s ease-in-out;
//         }
//       `}</style>

//     </div>
//   );
// }


// 333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333

import { useState } from "react";
import API from "../api";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  HeartPulse,
  ArrowLeft,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const navigate = useNavigate();

  // 🔊 soft error sound
  const playErrorSound = () => {
    const audio = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/951/951-preview.mp3"
    );
    audio.volume = 0.2;
    audio.play();
  };

  const triggerErrorFX = (msg) => {
    setError(msg);
    setShake(true);
    playErrorSound();

    setTimeout(() => setShake(false), 600);
  };

  const handleSignIn = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await API.post("/login", { email, password });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      if (user.role === "patient") navigate("/patient");
      else if (user.role === "doctor") navigate("/doctor");
      else if (user.role === "relative" || user.role === "caregiver")
        navigate("/caregiver");
      else if (user.role === "admin") navigate("/admin");
      else alert("Unknown role");
    } catch (err) {
      if (err?.response?.status === 401) {
        triggerErrorFX("Invalid email or password ❌");
      } else {
        triggerErrorFX("Server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-blue-100 to-cyan-100 flex items-center justify-center px-4">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-cyan-300/40 rounded-full blur-[120px] animate-pulse"></div>

      <div className="absolute bottom-[-150px] right-[-150px] w-[450px] h-[450px] bg-blue-300/40 rounded-full blur-[140px] animate-pulse"></div>

      <div className="absolute top-[40%] left-[45%] w-[250px] h-[250px] bg-sky-200/30 rounded-full blur-[100px]"></div>

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="
          fixed top-5 left-5 z-50
          w-12 h-12 rounded-2xl
          bg-white/70 backdrop-blur-xl
          border border-white/40
          shadow-xl
          flex items-center justify-center
          hover:scale-110
          hover:bg-white
          transition-all duration-300
        "
      >
        <ArrowLeft size={18} className="text-sky-600" />
      </button>

      {/* LOGIN CARD */}
      <div
        className={`
          relative
          w-full max-w-md
          overflow-hidden
          rounded-[35px]
          p-[1px]
          bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-500
          shadow-[0_20px_80px_rgba(14,165,233,0.25)]
          transition-all duration-500
          ${shake ? "animate-shake" : ""}
        `}
      >

        {/* INNER CARD */}
        <div className="relative bg-white/75 backdrop-blur-2xl rounded-[35px] p-7 md:p-9">

          {/* TOP DECOR */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-200/30 rounded-full blur-3xl"></div>

          {/* HEADER */}
          <div className="relative z-10 text-center mb-8">

            <div className="
              w-20 h-20 mx-auto mb-5
              rounded-3xl
              bg-gradient-to-br from-sky-500 to-cyan-400
              flex items-center justify-center
              shadow-2xl
              animate-[float_3s_ease-in-out_infinite]
            ">
              <HeartPulse className="text-white" size={36} />
            </div>

            <h1 className="text-4xl font-black text-gray-800 tracking-tight">
              Care<span className="text-sky-500">Track</span>
            </h1>

            <p className="text-gray-500 mt-3 text-sm md:text-base">
              Smart Healthcare Monitoring Platform
            </p>

            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 text-sm font-semibold">
              <ShieldCheck size={16} />
              Secure Login System
            </div>

          </div>

          {/* ERROR */}
          {error && (
            <div className="
              flex items-center gap-2
              mb-5
              text-sm text-red-600
              bg-red-50
              border border-red-200
              p-4 rounded-2xl
              animate-[fadeIn_0.4s_ease]
            ">
              <AlertCircle size={17} />
              {error}
            </div>
          )}

          {/* EMAIL */}
          <div className="relative mb-5 group">

            <Mail
              className="
                absolute left-4 top-4
                text-sky-700
                group-focus-within:text-blue-500
                transition
              "
              size={18}
            />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                pl-12 pr-4 py-4
                rounded-2xl
                border border-white/40
                bg-white/70
                backdrop-blur-xl
                shadow-sm
                outline-none
                focus:ring-4 focus:ring-sky-100
                focus:border-sky-400
                hover:shadow-lg
                hover:-translate-y-1
                transition-all duration-300
              "
            />

          </div>

          {/* PASSWORD */}
          <div className="relative mb-6 group">

            <Lock
              className="
                absolute left-4 top-4
                text-sky-700
                group-focus-within:text-cyan-700
                transition
              "
              size={18}
            />
            
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                pl-12 pr-12 py-4
                rounded-2xl
                border border-white/40
                bg-white/70
                backdrop-blur-xl
                shadow-sm
                outline-none
                focus:ring-4 focus:ring-sky-100
                focus:border-sky-400
                hover:shadow-lg
                hover:-translate-y-1
                transition-all duration-300
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute right-4 top-4
                text-gray-500
                hover:text-sky-600
                transition
              "
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="
              relative overflow-hidden
              w-full py-4
              rounded-2xl
              bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500
              text-white
              font-bold
              shadow-xl
              hover:scale-[1.02]
              active:scale-95
              transition-all duration-300
              flex items-center justify-center gap-2
            "
          >

            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition"></div>

            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Checking credentials...
              </>
            ) : (
              <>
                Sign In Securely
              </>
            )}

          </button>

          {/* FOOTER */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Healthcare Management System © 2026
          </div>

        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          20% { transform: translateX(-7px); }
          40% { transform: translateX(7px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }

        .animate-shake {
          animation: shake 0.45s ease-in-out;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </div>
  );
}


