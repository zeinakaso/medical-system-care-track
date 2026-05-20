// settingsStore.js
export const getSettings = () => {
  const data = localStorage.getItem("adminSettings");
  return data
    ? JSON.parse(data)
    : {
        theme: "light",
        language: "en",
        fontSize: "medium",
        notifications: true,
        autoRefresh: false,
      };
};

export const saveSettings = (settings) => {
  localStorage.setItem("adminSettings", JSON.stringify(settings));
};