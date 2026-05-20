// import React, { useState, useEffect } from "react";

// import {
//   Moon,
//   Sun,
//   Bell,
//   Globe,
//   Type,
//   RefreshCcw,
//   Settings2,
//   Save,
//   RotateCcw,
//   ShieldCheck,
// } from "lucide-react";

// import { getSettings, saveSettings } from "../settings";

// export default function Setting() {

//   const [theme, setTheme] = useState("light");
//   const [notifications, setNotifications] = useState(true);
//   const [language, setLanguage] = useState("en");
//   const [fontSize, setFontSize] = useState("medium");
//   const [autoRefresh, setAutoRefresh] = useState(false);

//   /* ================= LOAD ================= */

//   useEffect(() => {

//     const s = getSettings();

//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setTheme(s.theme || "light");
//     setNotifications(s.notifications ?? true);
//     setLanguage(s.language || "en");
//     setFontSize(s.fontSize || "medium");
//     setAutoRefresh(s.autoRefresh ?? false);

//   }, []);

//   /* ================= APPLY GLOBAL ================= */

//   useEffect(() => {

//     const root = document.documentElement;

//     // THEME
//     root.classList.remove("light", "dark");
//     root.classList.add(theme);

//     // LANGUAGE
//     root.dir = language === "ar" ? "rtl" : "ltr";

//     // FONT SIZE
//     root.style.fontSize =
//       fontSize === "small"
//         ? "14px"
//         : fontSize === "medium"
//         ? "16px"
//         : "18px";

//     // DARK MODE GLOBAL COLORS
//     if (theme === "dark") {

//       document.body.style.background =
//         "#0f172a";

//       document.body.style.color =
//         "#ffffff";

//     } else {

//       document.body.style.background =
//         "#f8fafc";

//       document.body.style.color =
//         "#0f172a";

//     }

//   }, [theme, language, fontSize]);

//   /* ================= SAVE ================= */

//   const handleSave = () => {

//     saveSettings({
//       theme,
//       notifications,
//       language,
//       fontSize,
//       autoRefresh,
//     });

//     alert("Settings applied globally ✅");
//   };

//   /* ================= RESET ================= */

//   const resetSettings = () => {

//     setTheme("light");
//     setNotifications(true);
//     setLanguage("en");
//     setFontSize("medium");
//     setAutoRefresh(false);
//   };

//   return (
//     <div className={`
//       min-h-screen p-4 md:p-8 transition-all duration-500
//       ${theme === "dark"
//         ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white"
//         : "bg-gradient-to-br from-sky-50 via-slate-50 to-indigo-100 text-slate-800"
//       }
//     `}>

//       {/* BG GLOW */}
//       <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-400/20 blur-[120px] rounded-full"></div>

//       <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-400/20 blur-[120px] rounded-full"></div>

//       {/* HEADER */}
//       <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

//         <div className="flex items-center gap-4">

//           <div className={`
//             w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl
//             ${theme === "dark"
//               ? "bg-slate-800"
//               : "bg-white"
//             }
//           `}>

//             <Settings2
//               className="text-cyan-500"
//               size={30}
//             />

//           </div>

//           <div>

//             <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-500 to-indigo-500 bg-clip-text text-transparent">
//               System Settings
//             </h1>

//             <p className={`
//               mt-2
//               ${theme === "dark"
//                 ? "text-slate-300"
//                 : "text-slate-500"
//               }
//             `}>
//               Customize your healthcare dashboard experience
//             </p>

//           </div>

//         </div>

//         <div className={`
//           px-6 py-4 rounded-[28px] border shadow-xl backdrop-blur-xl
//           ${theme === "dark"
//             ? "bg-slate-800/70 border-slate-700"
//             : "bg-white/70 border-white"
//           }
//         `}>

//           <p className="text-sm opacity-70 mb-1">
//             Current Theme
//           </p>

//           <h2 className="text-3xl font-black">
//             {theme === "dark"
//               ? "Dark"
//               : "Light"}
//           </h2>

//         </div>

//       </div>

//       {/* SETTINGS */}
//       <div className={`
//         relative z-10 rounded-[35px] p-6 md:p-8 shadow-2xl backdrop-blur-2xl border
//         ${theme === "dark"
//           ? "bg-slate-900/70 border-slate-700"
//           : "bg-white/70 border-white"
//         }
//       `}>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           {/* THEME */}
//           <SettingCard
//             icon={
//               theme === "dark"
//                 ? <Moon />
//                 : <Sun />
//             }
//             title="Theme Mode"
//             theme={theme}
//           >

//             <select
//               value={theme}
//               onChange={(e) =>
//                 setTheme(e.target.value)
//               }
//               className={selectStyle(theme)}
//             >
//               <option value="light">
//                 Light
//               </option>

//               <option value="dark">
//                 Dark
//               </option>

//             </select>

//           </SettingCard>

//           {/* LANGUAGE */}
//           <SettingCard
//             icon={<Globe />}
//             title="Language"
//             theme={theme}
//           >

//             <select
//               value={language}
//               onChange={(e) =>
//                 setLanguage(e.target.value)
//               }
//               className={selectStyle(theme)}
//             >

//               <option value="en">
//                 English
//               </option>

//               <option value="ar">
//                 Arabic
//               </option>

//               <option value="fr">
//                 French
//               </option>

//             </select>

//           </SettingCard>

//           {/* FONT */}
//           <SettingCard
//             icon={<Type />}
//             title="Font Size"
//             theme={theme}
//           >

//             <select
//               value={fontSize}
//               onChange={(e) =>
//                 setFontSize(e.target.value)
//               }
//               className={selectStyle(theme)}
//             >

//               <option value="small">
//                 Small
//               </option>

//               <option value="medium">
//                 Medium
//               </option>

//               <option value="large">
//                 Large
//               </option>

//             </select>

//           </SettingCard>

//           {/* AUTO REFRESH */}
//           <SettingCard
//             icon={<RefreshCcw />}
//             title="Auto Refresh"
//             theme={theme}
//           >

//             <ToggleSwitch
//               enabled={autoRefresh}
//               setEnabled={setAutoRefresh}
//             />

//           </SettingCard>

//           {/* NOTIFICATIONS */}
//           <SettingCard
//             icon={<Bell />}
//             title="Notifications"
//             theme={theme}
//           >

//             <ToggleSwitch
//               enabled={notifications}
//               setEnabled={setNotifications}
//             />

//           </SettingCard>

//           {/* SECURITY */}
//           <SettingCard
//             icon={<ShieldCheck />}
//             title="System Security"
//             theme={theme}
//           >

//             <div className={`
//               px-4 py-3 rounded-2xl text-sm font-semibold
//               ${theme === "dark"
//                 ? "bg-emerald-500/10 text-emerald-400"
//                 : "bg-emerald-50 text-emerald-600"
//               }
//             `}>
//               System Protected
//             </div>

//           </SettingCard>

//         </div>

//         {/* BUTTONS */}
//         <div className="flex flex-wrap gap-4 mt-10">

//           <button
//             onClick={handleSave}
//             className="
//               flex items-center gap-3
//               px-7 py-4 rounded-2xl
//               bg-gradient-to-r from-cyan-500 to-indigo-500
//               text-white font-bold shadow-xl
//               transition-all duration-300
//               hover:scale-[1.03]
//             "
//           >

//             <Save size={20} />

//             Save Settings

//           </button>

//           <button
//             onClick={resetSettings}
//             className={`
//               flex items-center gap-3
//               px-7 py-4 rounded-2xl font-bold shadow-lg transition-all duration-300 hover:scale-[1.03]
//               ${theme === "dark"
//                 ? "bg-slate-800 text-white"
//                 : "bg-slate-200 text-slate-700"
//               }
//             `}
//           >

//             <RotateCcw size={20} />

//             Reset

//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }

// /* ================= CARD ================= */

// function SettingCard({
//   icon,
//   title,
//   children,
//   theme,
// }) {

//   return (
//     <div className={`
//       rounded-[28px] p-5 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
//       ${theme === "dark"
//         ? "bg-slate-800/70 border-slate-700"
//         : "bg-white/80 border-white"
//       }
//     `}>

//       <div className="flex items-center gap-3 mb-5">

//         <div className={`
//           w-12 h-12 rounded-2xl flex items-center justify-center
//           ${theme === "dark"
//             ? "bg-slate-700 text-cyan-400"
//             : "bg-cyan-50 text-cyan-500"
//           }
//         `}>
//           {icon}
//         </div>

//         <h2 className="text-lg font-black">
//           {title}
//         </h2>

//       </div>

//       {children}

//     </div>
//   );
// }

// /* ================= TOGGLE ================= */

// function ToggleSwitch({
//   enabled,
//   setEnabled,
// }) {

//   return (
//     <button
//       onClick={() =>
//         setEnabled(!enabled)
//       }
//       className={`
//         relative w-16 h-9 rounded-full transition-all duration-300
//         ${enabled
//           ? "bg-cyan-500"
//           : "bg-slate-300"
//         }
//       `}
//     >

//       <div className={`
//         absolute top-1 left-1 w-7 h-7 rounded-full bg-white shadow-md transition-all duration-300
//         ${enabled
//           ? "translate-x-7"
//           : ""
//         }
//       `}></div>

//     </button>
//   );
// }

// /* ================= SELECT ================= */

// function selectStyle(theme) {

//   return `
//     w-full p-4 rounded-2xl border outline-none transition-all duration-300

//     ${
//       theme === "dark"
//         ? "bg-slate-900 border-slate-700 text-white"
//         : "bg-white border-slate-200 text-slate-700"
//     }
//   `;
// }


// 2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
// import React, { useState, useEffect } from "react";

// import {
//   Moon,
//   Sun,
//   Bell,
//   Globe,
//   Type,
//   RefreshCcw,
//   Settings2,
//   Save,
//   RotateCcw,
//   ShieldCheck,
//   ArrowLeft,
// } from "lucide-react";

// import { useNavigate } from "react-router-dom";
// import { getSettings, saveSettings } from "../settings";

// export default function Setting() {
//   const navigate = useNavigate();

//   const [theme, setTheme] = useState("light");
//   const [notifications, setNotifications] = useState(true);
//   const [language, setLanguage] = useState("en");
//   const [fontSize, setFontSize] = useState("medium");
//   const [autoRefresh, setAutoRefresh] = useState(false);

//   /* ================= LOAD ================= */
//   useEffect(() => {
//     const s = getSettings();

//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setTheme(s.theme || "light");
//     setNotifications(s.notifications ?? true);
//     setLanguage(s.language || "en");
//     setFontSize(s.fontSize || "medium");
//     setAutoRefresh(s.autoRefresh ?? false);
//   }, []);

//   /* ================= APPLY GLOBAL ================= */
//   useEffect(() => {
//     const root = document.documentElement;

//     root.classList.remove("light", "dark");
//     root.classList.add(theme);

//     root.dir = language === "ar" ? "rtl" : "ltr";

//     root.style.fontSize =
//       fontSize === "small"
//         ? "14px"
//         : fontSize === "medium"
//         ? "16px"
//         : "18px";

//     document.body.style.background =
//       theme === "dark" ? "#0b1220" : "#f6f7fb";

//     document.body.style.color =
//       theme === "dark" ? "#fff" : "#0f172a";
//   }, [theme, language, fontSize]);

//   /* ================= SAVE ================= */
//   const handleSave = () => {
//     saveSettings({
//       theme,
//       notifications,
//       language,
//       fontSize,
//       autoRefresh,
//     });

//     alert("Settings saved ✅");
//   };

//   const resetSettings = () => {
//     setTheme("light");
//     setNotifications(true);
//     setLanguage("en");
//     setFontSize("medium");
//     setAutoRefresh(false);
//   };

//   return (
//     <div
//       className={`
//       min-h-screen px-4 md:px-10 py-8 transition-all duration-300
//       ${theme === "dark" ? "bg-[#0b1220]" : "bg-slate-50"}
//     `}
//     >
//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-8">

//         {/* BACK BUTTON */}
//         <button
//           onClick={() => navigate(-1)}
//           className="
//             flex items-center gap-2
//             px-4 py-2 rounded-full
//             bg-sky-500 dark:bg-slate-800
//             shadow-md hover:shadow-lg
//             transition hover:scale-105
//           "
//         >
//           <ArrowLeft size={18} />
//           {/* <span className="text-sm font-medium">Back</span> */}
//         </button>

//         {/* TITLE */}
//         <div className="text-center">
//           <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 justify-center">
//             <Settings2 className="text-cyan-500" />
//             Settings
//           </h1>
//           <p className="text-sm opacity-60 mt-1">
//             Customize your experience
//           </p>
//         </div>

//         <div className="w-[80px]" />
//       </div>

//       {/* GRID */}
//       <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">

//         {/* THEME */}
//         <Card icon={<Sun />} title="Theme">
//           <select
//             value={theme}
//             onChange={(e) => setTheme(e.target.value)}
//             className={inputStyle(theme)}
//           >
//             <option value="light">Light</option>
//             <option value="dark">Dark</option>
//           </select>
//         </Card>

//         {/* LANGUAGE */}
//         <Card icon={<Globe />} title="Language">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className={inputStyle(theme)}
//           >
//             <option value="en">English</option>
//             <option value="ar">Arabic</option>
//             <option value="fr">French</option>
//           </select>
//         </Card>

//         {/* FONT */}
//         <Card icon={<Type />} title="Font Size">
//           <select
//             value={fontSize}
//             onChange={(e) => setFontSize(e.target.value)}
//             className={inputStyle(theme)}
//           >
//             <option value="small">Small</option>
//             <option value="medium">Medium</option>
//             <option value="large">Large</option>
//           </select>
//         </Card>

//         {/* NOTIFICATIONS */}
//         <Card icon={<Bell />} title="Notifications">
//           <Toggle
//             value={notifications}
//             setValue={setNotifications}
//           />
//         </Card>

//         {/* AUTO REFRESH */}
//         <Card icon={<RefreshCcw />} title="Auto Refresh">
//           <Toggle
//             value={autoRefresh}
//             setValue={setAutoRefresh}
//           />
//         </Card>

//         {/* SECURITY */}
//         <Card icon={<ShieldCheck />} title="Security">
//           <div className="text-sm text-emerald-500 font-semibold">
//             System Protected
//           </div>
//         </Card>
//       </div>

//       {/* ACTIONS */}
//       <div className="flex gap-4 justify-center mt-10 flex-wrap">

//         <button
//           onClick={handleSave}
//           className="
//             px-6 py-3 rounded-full
//             bg-cyan-500 text-white
//             shadow-md hover:shadow-xl
//             transition hover:scale-105
//             flex items-center gap-2
//           "
//         >
//           <Save size={18} />
//           Save
//         </button>

//         <button
//           onClick={resetSettings}
//           className="
//             px-6 py-3 rounded-full
//             bg-slate-200 dark:bg-slate-800
//             transition hover:scale-105
//             flex items-center gap-2
//           "
//         >
//           <RotateCcw size={18} />
//           Reset
//         </button>

//       </div>
//     </div>
//   );
// }

// /* ================= CARD ================= */
// function Card({ icon, title, children }) {
//   return (
//     <div className="
//       bg-white dark:bg-slate-900
//       p-5 rounded-2xl
//       shadow-sm hover:shadow-md
//       transition
//     ">
//       <div className="flex items-center gap-2 mb-4 font-semibold">
//         {icon}
//         <span>{title}</span>
//       </div>
//       {children}
//     </div>
//   );
// }

// /* ================= TOGGLE ================= */
// function Toggle({ value, setValue }) {
//   return (
//     <button
//       onClick={() => setValue(!value)}
//       className={`
//         w-14 h-8 rounded-full transition
//         ${value ? "bg-cyan-500" : "bg-gray-300"}
//         relative
//       `}
//     >
//       <div
//         className={`
//           w-6 h-6 bg-white rounded-full absolute top-1
//           transition
//           ${value ? "left-7" : "left-1"}
//         `}
//       />
//     </button>
//   );
// }

// /* ================= INPUT STYLE ================= */
// function inputStyle(theme) {
//   return `
//     w-full p-3 rounded-xl border outline-none
//     ${theme === "dark"
//       ? "bg-slate-800 border-slate-700 text-white"
//       : "bg-white border-slate-200 text-slate-700"
//     }
//   `;
// }



// 333333333333333333333333333333333333333333333333333333333333333333333333333333333333333




import React, { useState, useEffect } from "react";

import {
  Bell,
  Globe,
  Type,
  RefreshCcw,
  Settings2,
  Save,
  RotateCcw,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  MoonStar,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { getSettings, saveSettings } from "../settings";

export default function Setting() {

  const navigate = useNavigate();

  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const [fontSize, setFontSize] = useState("medium");
  const [autoRefresh, setAutoRefresh] = useState(false);

  /* ================= LOAD ================= */

  useEffect(() => {

    const s = getSettings();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(s.theme || "light");
    setNotifications(s.notifications ?? true);
    setLanguage(s.language || "en");
    setFontSize(s.fontSize || "medium");
    setAutoRefresh(s.autoRefresh ?? false);

  }, []);

  /* ================= APPLY ================= */

  useEffect(() => {

    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);

    root.dir = language === "ar" ? "rtl" : "ltr";

    root.style.fontSize =
      fontSize === "small"
        ? "14px"
        : fontSize === "medium"
        ? "16px"
        : "18px";

    document.body.style.background =
      theme === "dark"
        ? "#020617"
        : "#f8fafc";

  }, [theme, language, fontSize]);

  /* ================= SAVE ================= */

  const handleSave = () => {

    saveSettings({
      theme,
      notifications,
      language,
      fontSize,
      autoRefresh,
    });

    alert("Settings Saved ✅");

  };

  /* ================= RESET ================= */

  const resetSettings = () => {

    setTheme("light");
    setNotifications(true);
    setLanguage("en");
    setFontSize("medium");
    setAutoRefresh(false);

  };

  return (

    <div className={`
      min-h-screen overflow-hidden relative
      px-5 md:px-12 py-10 transition-all duration-500
      ${
        theme === "dark"
          ? "bg-[#020617] text-white"
          : "bg-gradient-to-br from-slate-50 via-cyan-50 to-indigo-100 text-slate-800"
      }
    `}>

      {/* PREMIUM BACKGROUND */}

      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] rounded-full bg-cyan-400/20 blur-[120px]"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] rounded-full bg-indigo-500/20 blur-[120px]"></div>

      {/* HEADER */}

      <div className="relative z-10 flex items-center justify-between mb-12">

        {/* BACK BUTTON */}

        <button
          onClick={() => navigate(-1)}
          className="
            group
            w-14 h-14 rounded-2xl
            bg-white/10 backdrop-blur-2xl
            border border-white/20
            shadow-2xl
            flex items-center justify-center
            hover:scale-110 hover:-translate-x-1
            transition-all duration-300
          "
        >

          <ArrowLeft
            size={22}
            className="text-sky-500 group-hover:text-white transition"
          />

        </button>

        {/* TITLE */}

        <div className="text-center">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg mb-5">

            <Sparkles size={16} className="text-cyan-400" />

            <span className="text-sm font-medium opacity-80">
              Personalized Experience
            </span>

          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent">

            Settings Center

          </h1>

          <p className={`
            text-sm md:text-base
            ${
              theme === "dark"
                ? "text-slate-400"
                : "text-slate-500"
            }
          `}>

            Customize your dashboard appearance and preferences

          </p>

        </div>

        {/* STATUS */}

        <div className="
          hidden md:flex
          items-center gap-3
          px-5 py-3 rounded-2xl
          bg-white/10 backdrop-blur-2xl
          border border-white/20
          shadow-xl
        ">

          <MoonStar className="text-cyan-400" />

          <div>

            <p className="text-xs opacity-60">
              Active Theme
            </p>

            <h2 className="font-bold">
              {theme === "dark" ? "Dark" : "Light"}
            </h2>

          </div>

        </div>

      </div>

      {/* SETTINGS GRID */}

      <div className="
        relative z-10
        grid grid-cols-1 md:grid-cols-2 gap-6
        max-w-5xl mx-auto
      ">

        <Card
          title="Theme Mode"
          icon={<MoonStar />}
          theme={theme}
        >

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className={selectStyle(theme)}
          >

            <option value="light">
              Light
            </option>

            <option value="dark">
              Dark
            </option>

          </select>

        </Card>

        <Card
          title="Language"
          icon={<Globe />}
          theme={theme}
        >

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={selectStyle(theme)}
          >

            <option value="en">
              English
            </option>

            <option value="ar">
              Arabic
            </option>

            <option value="fr">
              French
            </option>

          </select>

        </Card>

        <Card
          title="Font Size"
          icon={<Type />}
          theme={theme}
        >

          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className={selectStyle(theme)}
          >

            <option value="small">
              Small
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="large">
              Large
            </option>

          </select>

        </Card>

        <Card
          title="Notifications"
          icon={<Bell />}
          theme={theme}
        >

          <Toggle
            enabled={notifications}
            setEnabled={setNotifications}
          />

        </Card>

        <Card
          title="Auto Refresh"
          icon={<RefreshCcw />}
          theme={theme}
        >

          <Toggle
            enabled={autoRefresh}
            setEnabled={setAutoRefresh}
          />

        </Card>

        <Card
          title="Security Status"
          icon={<ShieldCheck />}
          theme={theme}
        >

          <div className="
            px-4 py-3 rounded-2xl
            bg-emerald-500/10
            border border-emerald-500/20
            text-emerald-400
            font-semibold text-sm
          ">

            System Protected

          </div>

        </Card>

      </div>

      {/* ACTIONS */}

      <div className="
        relative z-10
        flex flex-wrap justify-center gap-5
        mt-12
      ">

        <button
          onClick={handleSave}
          className="
            px-8 py-4 rounded-2xl
            bg-gradient-to-r from-cyan-500 to-indigo-500
            text-white font-bold
            shadow-[0_10px_40px_rgba(6,182,212,0.35)]
            hover:scale-105 hover:shadow-[0_10px_50px_rgba(99,102,241,0.45)]
            transition-all duration-300
            flex items-center gap-3
          "
        >

          <Save size={20} />

          Save Settings

        </button>

        <button
          onClick={resetSettings}
          className={`
            px-8 py-4 rounded-2xl
            font-bold
            transition-all duration-300
            hover:scale-105
            flex items-center gap-3
            ${
              theme === "dark"
                ? "bg-slate-800 border border-slate-700 hover:bg-slate-700"
                : "bg-white border border-slate-200 hover:bg-slate-50"
            }
          `}
        >

          <RotateCcw size={20} />

          Reset

        </button>

      </div>

    </div>
  );
}

/* ================= CARD ================= */

function Card({
  title,
  icon,
  children,
  theme,
}) {

  return (

    <div className={`
      p-6 rounded-[30px]
      backdrop-blur-2xl
      border shadow-2xl
      transition-all duration-300
      hover:-translate-y-1 hover:shadow-cyan-500/10
      ${
        theme === "dark"
          ? "bg-white/5 border-white/10"
          : "bg-white/60 border-white"
      }
    `}>

      <div className="flex items-center gap-3 mb-5">

        <div className={`
          w-12 h-12 rounded-2xl
          flex items-center justify-center
          ${
            theme === "dark"
              ? "bg-cyan-500/10 text-cyan-400"
              : "bg-cyan-50 text-cyan-500"
          }
        `}>

          {icon}

        </div>

        <h2 className="text-lg font-black">
          {title}
        </h2>

      </div>

      {children}

    </div>
  );
}

/* ================= TOGGLE ================= */

function Toggle({
  enabled,
  setEnabled,
}) {

  return (

    <button
      onClick={() => setEnabled(!enabled)}
      className={`
        relative w-16 h-9 rounded-full transition-all duration-300
        ${
          enabled
            ? "bg-gradient-to-r from-cyan-500 to-indigo-500"
            : "bg-slate-300"
        }
      `}
    >

      <div className={`
        absolute top-1 left-1
        w-7 h-7 rounded-full bg-white
        shadow-md transition-all duration-300
        ${
          enabled
            ? "translate-x-7"
            : ""
        }
      `}></div>

    </button>

  );
}

/* ================= SELECT ================= */

function selectStyle(theme) {

  return `
    w-full p-4 rounded-2xl outline-none border transition-all duration-300

    ${
      theme === "dark"
        ? "bg-slate-900 border-slate-700 text-white"
        : "bg-white border-slate-200 text-slate-700"
    }

    focus:ring-2 focus:ring-cyan-400
  `;
}