import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        borderRadius: "50%",
        padding: "0.6rem 0.7rem",
        border: "none",
        cursor: "pointer",
        background: "var(--bg-card)",
        color: "var(--text-main)",
        fontSize: "1rem"
      }}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
