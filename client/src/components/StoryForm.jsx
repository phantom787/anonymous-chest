import { useState } from "react";
import { api } from "../services/api";

export default function StoryForm({ onStorySubmitted }) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await api.post("/stories", { content, category });
      setMessage("Thank you for sharing!");
      setContent("");
      setCategory("");
      onStorySubmitted();
      setTimeout(() => setMessage(""), 3000); // hide message after 3s
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit story.");
    }
  };

  return (
    <section className="story-form">
      <h2>Share Your Story</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your chest?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
        />
        <button type="submit">Thank You for Sharing</button>
      </form>
      {message && <p style={{ marginTop: "0.5rem", textAlign: "center", color: "#28a745", fontWeight: "600" }}>{message}</p>}
    </section>
  );
}
