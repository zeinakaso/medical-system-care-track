// import React, { useState, useEffect } from "react";

// export default function AdminSettings() {
//   // ===== State =====
//   const [theme, setTheme] = useState("light");
//   const [notifications, setNotifications] = useState(true);
//   const [language, setLanguage] = useState("en");
//   const [fontSize, setFontSize] = useState("medium");
//   const [autoRefresh, setAutoRefresh] = useState(false);

//   // ===== تطبيق الثيم والحجم واللغة على الصفحة =====
//   useEffect(() => {
//     const root = document.documentElement;

//     // الثيم
//     root.classList.remove("light", "dark");
//     root.classList.add(theme);

//     // حجم الخط
//     root.style.fontSize =
//       fontSize === "small" ? "14px" : fontSize === "medium" ? "16px" : "18px";

//     // اتجاه الصفحة بناء على اللغة
//     root.dir = language === "ar" ? "rtl" : "ltr";
//   }, [theme, fontSize, language]);

//   // ===== حفظ الإعدادات في LocalStorage =====
//   useEffect(() => {
//     const settings = { theme, notifications, language, fontSize, autoRefresh };
//     localStorage.setItem("adminSettings", JSON.stringify(settings));
//   }, [theme, notifications, language, fontSize, autoRefresh]);

//   // ===== إعادة ضبط الإعدادات =====
//   const resetSettings = () => {
//     setTheme("light");
//     setNotifications(true);
//     setLanguage("en");
//     setFontSize("medium");
//     setAutoRefresh(false);
//   };

//   return (
//     <div className="space-y-6 p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-all duration-300">
//       <h2 className="text-2xl font-bold mb-2">⚙️ System Settings</h2>
//       <p className="text-gray-500 dark:text-gray-400 mb-4">
//         Manage system configurations and preferences
//       </p>

//       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-6">

//         {/* ===== Theme ===== */}
//         <div>
//           <label className="block mb-1 font-semibold">Theme</label>
//           <select
//             className="border rounded px-3 py-2 w-full dark:bg-gray-700 dark:text-white"
//             value={theme}
//             onChange={(e) => setTheme(e.target.value)}
//           >
//             <option value="light">Light</option>
//             <option value="dark">Dark</option>
//           </select>
//         </div>

//         {/* ===== Notifications ===== */}
//         <div className="flex items-center gap-3">
//           <input
//             type="checkbox"
//             id="notif"
//             checked={notifications}
//             onChange={(e) => setNotifications(e.target.checked)}
//           />
//           <label htmlFor="notif">Enable notifications</label>
//         </div>

//         {/* ===== Language ===== */}
//         <div>
//           <label className="block mb-1 font-semibold">Language</label>
//           <select
//             className="border rounded px-3 py-2 w-full dark:bg-gray-700 dark:text-white"
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//           >
//             <option value="en">English</option>
//             <option value="ar">Arabic</option>
//             <option value="fr">French</option>
//           </select>
//         </div>

//         {/* ===== Font Size / UI Scale ===== */}
//         <div>
//           <label className="block mb-1 font-semibold">Font Size</label>
//           <select
//             className="border rounded px-3 py-2 w-full dark:bg-gray-700 dark:text-white"
//             value={fontSize}
//             onChange={(e) => setFontSize(e.target.value)}
//           >
//             <option value="small">Small</option>
//             <option value="medium">Medium</option>
//             <option value="large">Large</option>
//           </select>
//         </div>

//         {/* ===== Auto Refresh ===== */}
//         <div className="flex items-center gap-3">
//           <input
//             type="checkbox"
//             id="auto-refresh"
//             checked={autoRefresh}
//             onChange={(e) => setAutoRefresh(e.target.checked)}
//           />
//           <label htmlFor="auto-refresh">Enable Auto Refresh Dashboard</label>
//         </div>

//         {/* ===== Buttons ===== */}
//         <div className="flex gap-3">
//           <button
//             onClick={resetSettings}
//             className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
//           >
//             Reset to Default
//           </button>

//           <button
//             onClick={() => alert("Settings saved successfully!")}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//           >
//             Save Settings
//           </button>
//         </div>
//       </div>

//       {/* ===== Preview Box ===== */}
//       <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow">
//         <h4 className="font-semibold mb-2">Preview</h4>
//         <p>
//           Theme: <span className="font-bold">{theme}</span> | Language:{" "}
//           <span className="font-bold">{language}</span> | Font Size:{" "}
//           <span className="font-bold">{fontSize}</span>
//         </p>
//         <p className="mt-2">
//           Notifications: {notifications ? "Enabled" : "Disabled"} | Auto Refresh:{" "}
//           {autoRefresh ? "Enabled" : "Disabled"}
//         </p>
//         <div className="mt-2 p-2 border rounded text-center">
//           This is how your dashboard will look.
//         </div>
//       </div>
//     </div>
//   );
// }



// 2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222

// import React, { useState, useEffect } from "react";
// import { getSettings, saveSettings } from "../settings";

// export default function AdminSettings() {
//   const [theme, setTheme] = useState("light");
//   const [notifications, setNotifications] = useState(true);
//   const [language, setLanguage] = useState("en");
//   const [fontSize, setFontSize] = useState("medium");
//   const [autoRefresh, setAutoRefresh] = useState(false);

//   // 🔥 تحميل الإعدادات عند فتح الصفحة
//   useEffect(() => {
//     const s = getSettings();
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setTheme(s.theme);
//     setNotifications(s.notifications);
//     setLanguage(s.language);
//     setFontSize(s.fontSize);
//     setAutoRefresh(s.autoRefresh);
//   }, []);

//   // 🔥 تطبيق مباشر على HTML (Global effect)
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
//   }, [theme, language, fontSize]);

//   // 🔥 حفظ كل شيء بشكل موحد
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

//   const resetSettings = () => {
//     setTheme("light");
//     setNotifications(true);
//     setLanguage("en");
//     setFontSize("medium");
//     setAutoRefresh(false);
//   };

//   return (
//     <div className="p-6 min-h-screen bg-gray-50 space-y-6">
//       <h2 className="text-2xl font-bold">⚙️ System Settings</h2>

//       <div className="bg-white p-6 rounded-xl shadow space-y-4">

//         {/* THEME */}
//         <select value={theme} onChange={(e) => setTheme(e.target.value)} className="border p-2 w-full">
//           <option value="light">Light</option>
//           <option value="dark">Dark</option>
//         </select>

//         {/* LANGUAGE */}
//         <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border p-2 w-full">
//           <option value="en">English</option>
//           <option value="ar">Arabic</option>
//           <option value="fr">French</option>
//         </select>

//         {/* FONT */}
//         <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="border p-2 w-full">
//           <option value="small">Small</option>
//           <option value="medium">Medium</option>
//           <option value="large">Large</option>
//         </select>

//         {/* CHECKBOX */}
//         <label className="flex gap-2 items-center">
//           <input
//             type="checkbox"
//             checked={notifications}
//             onChange={(e) => setNotifications(e.target.checked)}
//           />
//           Notifications
//         </label>

//         <label className="flex gap-2 items-center">
//           <input
//             type="checkbox"
//             checked={autoRefresh}
//             onChange={(e) => setAutoRefresh(e.target.checked)}
//           />
//           Auto Refresh
//         </label>

//         {/* BUTTONS */}
//         <div className="flex gap-3">
//           <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
//             Save Global Settings
//           </button>

//           <button onClick={resetSettings} className="bg-gray-500 text-white px-4 py-2 rounded">
//             Reset
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }


// 3333333333333333333333333333333333333333333333333333333333333333333333333333333333333
import React, { useState, useEffect } from "react";

import {
  Moon,
  Sun,
  Bell,
  Globe,
  Type,
  RefreshCcw,
  Settings2,
  Save,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import { getSettings, saveSettings } from "../settings";

export default function AdminSettings() {

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

  /* ================= APPLY GLOBAL ================= */

  useEffect(() => {

    const root = document.documentElement;

    // THEME
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // LANGUAGE
    root.dir = language === "ar" ? "rtl" : "ltr";

    // FONT SIZE
    root.style.fontSize =
      fontSize === "small"
        ? "14px"
        : fontSize === "medium"
        ? "16px"
        : "18px";

    // DARK MODE GLOBAL COLORS
    if (theme === "dark") {

      document.body.style.background =
        "#0f172a";

      document.body.style.color =
        "#ffffff";

    } else {

      document.body.style.background =
        "#f8fafc";

      document.body.style.color =
        "#0f172a";

    }

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

    alert("Settings applied globally ✅");
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
      min-h-screen p-4 md:p-8 transition-all duration-500
      ${theme === "dark"
        ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white"
        : "bg-gradient-to-br from-sky-50 via-slate-50 to-indigo-100 text-slate-800"
      }
    `}>

      {/* BG GLOW */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-400/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-400/20 blur-[120px] rounded-full"></div>

      {/* HEADER */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

        <div className="flex items-center gap-4">

          <div className={`
            w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl
            ${theme === "dark"
              ? "bg-slate-800"
              : "bg-white"
            }
          `}>

            <Settings2
              className="text-cyan-500"
              size={30}
            />

          </div>

          <div>

            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-500 to-indigo-500 bg-clip-text text-transparent">
              System Settings
            </h1>

            <p className={`
              mt-2
              ${theme === "dark"
                ? "text-slate-300"
                : "text-slate-500"
              }
            `}>
              Customize your healthcare dashboard experience
            </p>

          </div>

        </div>

        <div className={`
          px-6 py-4 rounded-[28px] border shadow-xl backdrop-blur-xl
          ${theme === "dark"
            ? "bg-slate-800/70 border-slate-700"
            : "bg-white/70 border-white"
          }
        `}>

          <p className="text-sm opacity-70 mb-1">
            Current Theme
          </p>

          <h2 className="text-3xl font-black">
            {theme === "dark"
              ? "Dark"
              : "Light"}
          </h2>

        </div>

      </div>

      {/* SETTINGS */}
      <div className={`
        relative z-10 rounded-[35px] p-6 md:p-8 shadow-2xl backdrop-blur-2xl border
        ${theme === "dark"
          ? "bg-slate-900/70 border-slate-700"
          : "bg-white/70 border-white"
        }
      `}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* THEME */}
          <SettingCard
            icon={
              theme === "dark"
                ? <Moon />
                : <Sun />
            }
            title="Theme Mode"
            theme={theme}
          >

            <select
              value={theme}
              onChange={(e) =>
                setTheme(e.target.value)
              }
              className={selectStyle(theme)}
            >
              <option value="light">
                Light
              </option>

              <option value="dark">
                Dark
              </option>

            </select>

          </SettingCard>

          {/* LANGUAGE */}
          <SettingCard
            icon={<Globe />}
            title="Language"
            theme={theme}
          >

            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
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

          </SettingCard>

          {/* FONT */}
          <SettingCard
            icon={<Type />}
            title="Font Size"
            theme={theme}
          >

            <select
              value={fontSize}
              onChange={(e) =>
                setFontSize(e.target.value)
              }
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

          </SettingCard>

          {/* AUTO REFRESH */}
          <SettingCard
            icon={<RefreshCcw />}
            title="Auto Refresh"
            theme={theme}
          >

            <ToggleSwitch
              enabled={autoRefresh}
              setEnabled={setAutoRefresh}
            />

          </SettingCard>

          {/* NOTIFICATIONS */}
          <SettingCard
            icon={<Bell />}
            title="Notifications"
            theme={theme}
          >

            <ToggleSwitch
              enabled={notifications}
              setEnabled={setNotifications}
            />

          </SettingCard>

          {/* SECURITY */}
          <SettingCard
            icon={<ShieldCheck />}
            title="System Security"
            theme={theme}
          >

            <div className={`
              px-4 py-3 rounded-2xl text-sm font-semibold
              ${theme === "dark"
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-emerald-50 text-emerald-600"
              }
            `}>
              System Protected
            </div>

          </SettingCard>

        </div>

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-4 mt-10">

          <button
            onClick={handleSave}
            className="
              flex items-center gap-3
              px-7 py-4 rounded-2xl
              bg-gradient-to-r from-cyan-500 to-indigo-500
              text-white font-bold shadow-xl
              transition-all duration-300
              hover:scale-[1.03]
            "
          >

            <Save size={20} />

            Save Settings

          </button>

          <button
            onClick={resetSettings}
            className={`
              flex items-center gap-3
              px-7 py-4 rounded-2xl font-bold shadow-lg transition-all duration-300 hover:scale-[1.03]
              ${theme === "dark"
                ? "bg-slate-800 text-white"
                : "bg-slate-200 text-slate-700"
              }
            `}
          >

            <RotateCcw size={20} />

            Reset

          </button>

        </div>

      </div>

    </div>
  );
}

/* ================= CARD ================= */

function SettingCard({
  icon,
  title,
  children,
  theme,
}) {

  return (
    <div className={`
      rounded-[28px] p-5 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
      ${theme === "dark"
        ? "bg-slate-800/70 border-slate-700"
        : "bg-white/80 border-white"
      }
    `}>

      <div className="flex items-center gap-3 mb-5">

        <div className={`
          w-12 h-12 rounded-2xl flex items-center justify-center
          ${theme === "dark"
            ? "bg-slate-700 text-cyan-400"
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

function ToggleSwitch({
  enabled,
  setEnabled,
}) {

  return (
    <button
      onClick={() =>
        setEnabled(!enabled)
      }
      className={`
        relative w-16 h-9 rounded-full transition-all duration-300
        ${enabled
          ? "bg-cyan-500"
          : "bg-slate-300"
        }
      `}
    >

      <div className={`
        absolute top-1 left-1 w-7 h-7 rounded-full bg-white shadow-md transition-all duration-300
        ${enabled
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
    w-full p-4 rounded-2xl border outline-none transition-all duration-300

    ${
      theme === "dark"
        ? "bg-slate-900 border-slate-700 text-white"
        : "bg-white border-slate-200 text-slate-700"
    }
  `;
}