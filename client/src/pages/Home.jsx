import { useEffect, useState } from "react";
import { api } from "../services/api";
import StoryForm from "../components/StoryForm";
import "../index.css";

export default function Home() {
  const [stories, setStories] = useState([]);

  const fetchStories = async () => {
    try {
      const res = await api.get("/stories");
      setStories(res.data.reverse()); // newest first
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <header className="hero">
        <h1>Open Chest</h1>
        <p>A safe, anonymous place to share your story and heal from others. You are never alone.</p>
      </header>

      {/* Story Form */}
      <StoryForm onStorySubmitted={fetchStories} />

      {/* Stories Feed */}
      <section className="stories-feed">
        {stories.length === 0 && (
          <p style={{ textAlign: "center", color: "#c4f0b0" }}>No stories yet!</p>
        )}
        {stories.map((story) => (
          <div key={story.id} className="story-card">
            <p>{story.content}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
