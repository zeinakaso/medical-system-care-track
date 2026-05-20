import React, { useState, useEffect } from "react";
import { getSettings, saveSettings } from "./settings";

export default function AdminSettings() {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const [fontSize, setFontSize] = useState("medium");
  const [autoRefresh, setAutoRefresh] = useState(false);

  // 🔥 تحميل الإعدادات عند فتح الصفحة
  useEffect(() => {
    const s = getSettings();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(s.theme);
    setNotifications(s.notifications);
    setLanguage(s.language);
    setFontSize(s.fontSize);
    setAutoRefresh(s.autoRefresh);
  }, []);

  // 🔥 تطبيق مباشر على HTML (Global effect)
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
  }, [theme, language, fontSize]);

  // 🔥 حفظ كل شيء بشكل موحد
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

  const resetSettings = () => {
    setTheme("light");
    setNotifications(true);
    setLanguage("en");
    setFontSize("medium");
    setAutoRefresh(false);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 space-y-6">
      <h2 className="text-2xl font-bold">⚙️ System Settings</h2>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">

        {/* THEME */}
        <select value={theme} onChange={(e) => setTheme(e.target.value)} className="border p-2 w-full">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        {/* LANGUAGE */}
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border p-2 w-full">
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="fr">French</option>
        </select>

        {/* FONT */}
        <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="border p-2 w-full">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        {/* CHECKBOX */}
        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          Notifications
        </label>

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
          />
          Auto Refresh
        </label>

        {/* BUTTONS */}
        <div className="flex gap-3">
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
            Save Global Settings
          </button>

          <button onClick={resetSettings} className="bg-gray-500 text-white px-4 py-2 rounded">
            Reset
          </button>
        </div>

      </div>
    </div>
  );
}