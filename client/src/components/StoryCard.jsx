// components/StoryCard.jsx
import { api } from "../services/api";

export default function StoryCard({ story, refresh, isAdmin }) {
  // ✅ define your click handler here, outside the JSX
  const handleHelped = async () => {
    try {
      await api.post(`/stories/${story.id}/helped`);
      refresh(); // refetch stories after increment
    } catch (err) {
      console.error("Helped failed:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/stories/${story.id}`);
      refresh();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="story-card">
      <p>{story.content}</p>

      <button
        type="button"
        onClick={handleHelped}
        style={{
          background: "none",
          border: "none",
          color: "#1e6fd9",
          cursor: "pointer",
          fontWeight: "600",
          marginTop: "0.5rem"
        }}
      >
        ❤️ This helped me ({story.helpedCount || 0})
      </button>

      {isAdmin && (
        <button
          type="button"
          onClick={handleDelete}
          style={{
            color: "red",
            marginLeft: "1rem",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}
