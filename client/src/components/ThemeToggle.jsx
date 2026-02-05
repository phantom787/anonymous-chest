import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  ); // use lazy initializer to avoid re-renders

  // Apply theme to document and localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Optional: smooth transition for theme change
  useEffect(() => {
    document.documentElement.style.transition = "background 0.3s, color 0.3s";
  }, []);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{
        position: "fixed",
        top: 15,
        right: 15,
        padding: "0.5rem 0.75rem",
        borderRadius: "0.5rem",
        border: "none",
        cursor: "pointer",
        fontSize: "1.2rem",
        background: theme === "dark" ? "#333" : "#eee",
        color: theme === "dark" ? "#fff" : "#333",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        zIndex: 9999,
      }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
