import { useState } from "react";
import { api } from "../services/api";

export default function StoryCard({ story, refresh, isAdmin }) {
  const [helpedCount, setHelpedCount] = useState(story.helped_count || 0);
  const [clicked, setClicked] = useState(false);

  const handleHelped = async () => {
    if (clicked) return;
    setClicked(true);
    setHelpedCount(prev => prev + 1);

    try {
      await api.post(`/stories/${story.id}/helped`);
      refresh();
    } catch (err) {
      console.error("Helped failed:", err);
      setHelpedCount(prev => prev - 1);
    } finally {
      setClicked(false);
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
        onClick={handleHelped}
        className="helped"
        style={{
          transform: clicked ? "scale(1.3)" : "scale(1)",
          transition: "transform 0.2s",
        }}
      >
        ❤️ This helped me ({helpedCount})
      </button>

      {isAdmin && (
        <button onClick={handleDelete} className="delete">
          Delete
        </button>
      )}
    </div>
  );
}
