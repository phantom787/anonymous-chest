export default function FloatingDock({ onShare }) {
  return (
    <div style={{
      position: "fixed",
      bottom: "1.2rem",
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(255,255,255,0.12)",
      backdropFilter: "blur(12px)",
      padding: "0.6rem 1.2rem",
      borderRadius: "2rem",
      display: "flex",
      gap: "1.4rem",
      zIndex: 1000
    }}>
      <button>🏠</button>
      <button onClick={onShare}>✍️</button>
      <button>🔍</button>
    </div>
  );
}
