// components/StoryCard.jsx
import { api } from "../services/api";

export default function StoryCard({ story, refresh, isAdmin }) {
  return (
    <div className="story-card">
      <p>{story.content}</p>

      const handleHelped = async () => {
  try {
    await api.post(`/stories/${story.id}/helped`);
    refresh();
  } catch (err) {
    console.error("Helped failed:", err);
  }
};

      <button
        onClick={() => api.post(`/stories/${story.id}/helped`).then(refresh)}
        style={{ background: "none", border: "none", color: "#1e6fd9" }}
      >
        ❤️ This helped me ({story.helpedCount || 0})
      </button>

      {isAdmin && (
        <button
          onClick={() => api.delete(`/stories/${story.id}`).then(refresh)}
          style={{ color: "red", marginLeft: "1rem" }}
        >
          Delete
        </button>
      )}
    </div>
  );
}
