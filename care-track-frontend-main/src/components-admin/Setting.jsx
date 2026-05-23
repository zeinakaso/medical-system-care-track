

// import React, { useState, useEffect } from "react";

// import {
//   Bell,
//   Globe,
//   Type,
//   RefreshCcw,
//   Settings2,
//   Save,
//   RotateCcw,
//   ShieldCheck,
//   ArrowLeft,
//   Sparkles,
//   MoonStar,
//   Settings
// } from "lucide-react";

// import { useNavigate } from "react-router-dom";
// import { getSettings, saveSettings } from "./settings";

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

//   /* ================= APPLY ================= */

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
//       theme === "dark"
//         ? "#020617"
//         : "#f8fafc";

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

//     alert("Settings Saved ✅");

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
//       min-h-screen overflow-hidden relative
//       px-5 md:px-12 py-10 transition-all duration-500
//       ${
//         theme === "dark"
//           ? "bg-[#020617] text-white"
//           : "bg-gradient-to-br from-slate-50 via-cyan-50 to-indigo-100 text-slate-800"
//       }
//     `}>

//       {/* PREMIUM BACKGROUND */}

//       <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] rounded-full bg-cyan-400/20 blur-[120px]"></div>

//       <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] rounded-full bg-indigo-500/20 blur-[120px]"></div>

//       {/* HEADER */}

//       <div className="relative z-10 flex items-center justify-between mb-12">

//         {/* BACK BUTTON */}

//         <button
//           onClick={() => navigate(-1)}
//           className="
//             group
//             w-14 h-14 rounded-2xl
//             bg-white/10 backdrop-blur-2xl
//             border border-white/20
//             shadow-2xl
//             flex items-center justify-center
//             hover:scale-110 hover:-translate-x-1
//             transition-all duration-300
//           "
//         >

//           <ArrowLeft
//             size={22}
//             className="text-sky-500 group-hover:text-white transition"
//           />

//         </button>

//         {/* TITLE */}

//         <div className="text-center">

//           <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg mb-5">

//             <Sparkles size={16} className="text-cyan-400" />

//             <span className="text-sm font-medium opacity-80">
//               Personalized Experience
//             </span>

//           </div>

//           <h1 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent">

//             Settings Center

//           </h1>

//           <p className={`
//             text-sm md:text-base
//             ${
//               theme === "dark"
//                 ? "text-slate-400"
//                 : "text-slate-500"
//             }
//           `}>

//             Customize your dashboard appearance and preferences

//           </p>

//         </div>

//         {/* STATUS */}

//         <div className="
//           hidden md:flex
//           items-center gap-3
//           px-5 py-3 rounded-2xl
//           bg-white/10 backdrop-blur-2xl
//           border border-white/20
//           shadow-xl
//         ">

//           <MoonStar className="text-cyan-400" />

//           <div>

//             <p className="text-xs opacity-60">
//               Active Theme
//             </p>

//             <h2 className="font-bold">
//               {theme === "dark" ? "Dark" : "Light"}
//             </h2>

//           </div>

//         </div>

//       </div>

//       {/* SETTINGS GRID */}

//       <div className="
//         relative z-10
//         grid grid-cols-1 md:grid-cols-2 gap-6
//         max-w-5xl mx-auto
//       ">

//         <Card
//           title="Theme Mode"
//           icon={<MoonStar />}
//           theme={theme}
//         >

//           <select
//             value={theme}
//             onChange={(e) => setTheme(e.target.value)}
//             className={selectStyle(theme)}
//           >

//             <option value="light">
//               Light
//             </option>

//             <option value="dark">
//               Dark
//             </option>

//           </select>

//         </Card>

//         <Card
//           title="Language"
//           icon={<Globe />}
//           theme={theme}
//         >

//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className={selectStyle(theme)}
//           >

//             <option value="en">
//               English
//             </option>

//             <option value="ar">
//               Arabic
//             </option>

//             <option value="fr">
//               French
//             </option>

//           </select>

//         </Card>

//         <Card
//           title="Font Size"
//           icon={<Type />}
//           theme={theme}
//         >

//           <select
//             value={fontSize}
//             onChange={(e) => setFontSize(e.target.value)}
//             className={selectStyle(theme)}
//           >

//             <option value="small">
//               Small
//             </option>

//             <option value="medium">
//               Medium
//             </option>

//             <option value="large">
//               Large
//             </option>

//           </select>

//         </Card>

//         <Card
//           title="Notifications"
//           icon={<Bell />}
//           theme={theme}
//         >

//           <Toggle
//             enabled={notifications}
//             setEnabled={setNotifications}
//           />

//         </Card>

//         <Card
//           title="Auto Refresh"
//           icon={<RefreshCcw />}
//           theme={theme}
//         >

//           <Toggle
//             enabled={autoRefresh}
//             setEnabled={setAutoRefresh}
//           />

//         </Card>

//         <Card
//           title="Security Status"
//           icon={<ShieldCheck />}
//           theme={theme}
//         >

//           <div className="
//             px-4 py-3 rounded-2xl
//             bg-emerald-500/10
//             border border-emerald-500/20
//             text-emerald-400
//             font-semibold text-sm
//           ">

//             System Protected

//           </div>

//         </Card>

//       </div>

//       {/* ACTIONS */}

//       <div className="
//         relative z-10
//         flex flex-wrap justify-center gap-5
//         mt-12
//       ">

//         <button
//           onClick={handleSave}
//           className="
//             px-8 py-4 rounded-2xl
//             bg-gradient-to-r from-cyan-500 to-indigo-500
//             text-white font-bold
//             shadow-[0_10px_40px_rgba(6,182,212,0.35)]
//             hover:scale-105 hover:shadow-[0_10px_50px_rgba(99,102,241,0.45)]
//             transition-all duration-300
//             flex items-center gap-3
//           "
//         >

//           <Save size={20} />

//           Save Settings

//         </button>

//         <button
//           onClick={resetSettings}
//           className={`
//             px-8 py-4 rounded-2xl
//             font-bold
//             transition-all duration-300
//             hover:scale-105
//             flex items-center gap-3
//             ${
//               theme === "dark"
//                 ? "bg-slate-800 border border-slate-700 hover:bg-slate-700"
//                 : "bg-white border border-slate-200 hover:bg-slate-50"
//             }
//           `}
//         >

//           <RotateCcw size={20} />

//           Reset

//         </button>

//       </div>

//     </div>
//   );
// }

// /* ================= CARD ================= */

// function Card({
//   title,
//   icon,
//   children,
//   theme,
// }) {

//   return (

//     <div className={`
//       p-6 rounded-[30px]
//       backdrop-blur-2xl
//       border shadow-2xl
//       transition-all duration-300
//       hover:-translate-y-1 hover:shadow-cyan-500/10
//       ${
//         theme === "dark"
//           ? "bg-white/5 border-white/10"
//           : "bg-white/60 border-white"
//       }
//     `}>

//       <div className="flex items-center gap-3 mb-5">

//         <div className={`
//           w-12 h-12 rounded-2xl
//           flex items-center justify-center
//           ${
//             theme === "dark"
//               ? "bg-cyan-500/10 text-cyan-400"
//               : "bg-cyan-50 text-cyan-500"
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

// function Toggle({
//   enabled,
//   setEnabled,
// }) {

//   return (

//     <button
//       onClick={() => setEnabled(!enabled)}
//       className={`
//         relative w-16 h-9 rounded-full transition-all duration-300
//         ${
//           enabled
//             ? "bg-gradient-to-r from-cyan-500 to-indigo-500"
//             : "bg-slate-300"
//         }
//       `}
//     >

//       <div className={`
//         absolute top-1 left-1
//         w-7 h-7 rounded-full bg-white
//         shadow-md transition-all duration-300
//         ${
//           enabled
//             ? "translate-x-7"
//             : ""
//         }
//       `}></div>

//     </button>

//   );
// }

// /* ================= SELECT ================= */

// function selectStyle(theme) {

//   return `
//     w-full p-4 rounded-2xl outline-none border transition-all duration-300

//     ${
//       theme === "dark"
//         ? "bg-slate-900 border-slate-700 text-white"
//         : "bg-white border-slate-200 text-slate-700"
//     }

//     focus:ring-2 focus:ring-cyan-400
//   `;
// }







// 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
import React, { useEffect } from "react";

import {
  Bell,
  Globe,
  Type,
  RefreshCcw,
  Save,
  RotateCcw,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  MoonStar,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";

export default function Setting() {

  const navigate = useNavigate();

  /* ================= CONTEXT ================= */

  const { settings, setSettings } = useSettings();

  const {
    theme,
    notifications,
    language,
    fontSize,
    autoRefresh,
  } = settings;

  /* ================= TRANSLATIONS ================= */

  const texts = {
    en: {
      experience: "Personalized Experience",
      title: "Settings Center",
      subtitle: "Customize your dashboard appearance and preferences",

      theme: "Theme Mode",
      language: "Language",
      font: "Font Size",
      notifications: "Notifications",
      autoRefresh: "Auto Refresh",
      security: "Security Status",

      protected: "System Protected",

      save: "Save Settings",
      reset: "Reset",

      light: "Light",
      dark: "Dark",

      english: "English",
      arabic: "Arabic",
      french: "French",

      small: "Small",
      medium: "Medium",
      large: "Large",

      activeTheme: "Active Theme",
    },

    ar: {
      experience: "تجربة مخصصة",
      title: "مركز الإعدادات",
      subtitle: "قم بتخصيص مظهر النظام والإعدادات",

      theme: "وضع المظهر",
      language: "اللغة",
      font: "حجم الخط",
      notifications: "الإشعارات",
      autoRefresh: "التحديث التلقائي",
      security: "الحماية",

      protected: "النظام محمي",

      save: "حفظ الإعدادات",
      reset: "إعادة تعيين",

      light: "فاتح",
      dark: "داكن",

      english: "الإنجليزية",
      arabic: "العربية",
      french: "الفرنسية",

      small: "صغير",
      medium: "متوسط",
      large: "كبير",

      activeTheme: "المظهر الحالي",
    },

    fr: {
      experience: "Expérience Personnalisée",
      title: "Centre des Paramètres",
      subtitle: "Personnalisez l'apparence et les préférences",

      theme: "Mode Thème",
      language: "Langue",
      font: "Taille de Police",
      notifications: "Notifications",
      autoRefresh: "Rafraîchissement Auto",
      security: "Sécurité",

      protected: "Système Protégé",

      save: "Enregistrer",
      reset: "Réinitialiser",

      light: "Clair",
      dark: "Sombre",

      english: "Anglais",
      arabic: "Arabe",
      french: "Français",

      small: "Petit",
      medium: "Moyen",
      large: "Grand",

      activeTheme: "Thème Actif",
    },
  };

  const t = texts[language];

  /* ================= APPLY TO WHOLE WEBSITE ================= */

  useEffect(() => {

    const root = document.documentElement;

    /* THEME */

    root.classList.remove("light", "dark");
    root.classList.add(theme);

    /* LANGUAGE DIRECTION */

    root.dir = language === "ar" ? "rtl" : "ltr";

    /* FONT SIZE */

    root.style.fontSize =
      fontSize === "small"
        ? "14px"
        : fontSize === "medium"
        ? "16px"
        : "18px";

    /* BODY */

    document.body.style.background =
      theme === "dark"
        ? "#020617"
        : "#f8fafc";

    document.body.style.transition = "0.3s";

    /* SAVE */

    localStorage.setItem(
      "adminSettings",
      JSON.stringify(settings)
    );

  }, [settings]);



  
  /* ================= SAVE ================= */

  const handleSave = () => {

    localStorage.setItem(
      "adminSettings",
      JSON.stringify(settings)
    );

    alert("Settings Saved ✅");

  };

  /* ================= RESET ================= */

  const resetSettings = () => {

    setSettings({
      theme: "light",
      notifications: true,
      language: "en",
      fontSize: "medium",
      autoRefresh: false,
    });

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

      {/* BACKGROUND */}

      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] rounded-full bg-cyan-400/20 blur-[120px]" />

      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] rounded-full bg-indigo-500/20 blur-[120px]" />

      {/* HEADER */}

      <div className="relative z-10 flex items-center justify-between mb-12">

        {/* BACK */}

        <button
          onClick={() => navigate(-1)}
          className="
            group
            w-14 h-14 rounded-2xl
            bg-white/10 backdrop-blur-2xl
            border border-white/20
            shadow-2xl
            flex items-center justify-center
            hover:scale-110
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

          <div className="
            inline-flex items-center gap-2
            px-5 py-2 rounded-full
            bg-white/10 border border-white/20
            backdrop-blur-xl shadow-lg mb-5
          ">

            <Sparkles size={16} className="text-cyan-400" />

            <span className="text-sm font-medium opacity-80">
              {t.experience}
            </span>

          </div>

          <h1 className="
            text-4xl md:text-5xl font-black mb-3
            bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500
            bg-clip-text text-transparent
          ">

            {t.title}

          </h1>

          <p className={`
            text-sm md:text-base
            ${
              theme === "dark"
                ? "text-slate-400"
                : "text-slate-500"
            }
          `}>

            {t.subtitle}

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
              {t.activeTheme}
            </p>

            <h2 className="font-bold">
              {theme === "dark" ? t.dark : t.light}
            </h2>

          </div>

        </div>

      </div>

      {/* GRID */}

      <div className="
        relative z-10
        grid grid-cols-1 md:grid-cols-2 gap-6
        max-w-5xl mx-auto
      ">

        {/* THEME */}

        <Card
          title={t.theme}
          icon={<MoonStar />}
          theme={theme}
        >

          <select
            value={theme}
            onChange={(e) =>
              setSettings({
                ...settings,
                theme: e.target.value,
              })
            }
            className={selectStyle(theme)}
          >

            <option value="light">
              {t.light}
            </option>

            <option value="dark">
              {t.dark}
            </option>

          </select>

        </Card>

        {/* LANGUAGE */}

        <Card
          title={t.language}
          icon={<Globe />}
          theme={theme}
        >

          <select
            value={language}
            onChange={(e) =>
              setSettings({
                ...settings,
                language: e.target.value,
              })
            }
            className={selectStyle(theme)}
          >

            <option value="en">
              {t.english}
            </option>

            <option value="ar">
              {t.arabic}
            </option>

            <option value="fr">
              {t.french}
            </option>

          </select>

        </Card>

        {/* FONT */}

        <Card
          title={t.font}
          icon={<Type />}
          theme={theme}
        >

          <select
            value={fontSize}
            onChange={(e) =>
              setSettings({
                ...settings,
                fontSize: e.target.value,
              })
            }
            className={selectStyle(theme)}
          >

            <option value="small">
              {t.small}
            </option>

            <option value="medium">
              {t.medium}
            </option>

            <option value="large">
              {t.large}
            </option>

          </select>

        </Card>

        {/* NOTIFICATIONS */}

        <Card
          title={t.notifications}
          icon={<Bell />}
          theme={theme}
        >

          <Toggle
            enabled={notifications}
            setEnabled={() =>
              setSettings({
                ...settings,
                notifications: !notifications,
              })
            }
          />

        </Card>

        {/* AUTO REFRESH */}

        <Card
          title={t.autoRefresh}
          icon={<RefreshCcw />}
          theme={theme}
        >

          <Toggle
            enabled={autoRefresh}
            setEnabled={() =>
              setSettings({
                ...settings,
                autoRefresh: !autoRefresh,
              })
            }
          />

        </Card>

        {/* SECURITY */}

        <Card
          title={t.security}
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

            {t.protected}

          </div>

        </Card>

      </div>

      {/* BUTTONS */}

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
            hover:scale-105
            transition-all duration-300
            flex items-center gap-3
          "
        >

          <Save size={20} />

          {t.save}

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

          {t.reset}

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
      hover:-translate-y-1
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
      onClick={setEnabled}
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
      `} />

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