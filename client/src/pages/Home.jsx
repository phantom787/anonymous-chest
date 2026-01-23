import { useEffect, useState } from "react";
import { api } from "../services/api";
import StoryForm from "../components/StoryForm";
import CategoryFilter from "../components/CategoryFilter";
import "../index.css";

export default function Home() {
  const [stories, setStories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchStories = async () => {
    try {
      const res = await api.get("/stories");
      setStories(res.data.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const categories = Array.from(new Set(stories.map((s) => s.category).filter(Boolean)));
  const filteredStories = selectedCategory
    ? stories.filter((s) => s.category === selectedCategory)
    : stories;

  return (
    <div>
      {/* Hero Section */}
      <header className="hero">
        <h1>Open Chest</h1>
        <p>A safe, anonymous place to share your story and read others. You are never alone.</p>
      </header>

      {/* Story Form */}
      <StoryForm onStorySubmitted={fetchStories} />

      {/* Category Filter */}
      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
        />
      )}

      {/* Stories Feed */}
      <section className="stories-feed">
        {filteredStories.length === 0 && <p style={{ textAlign: "center", color: "#c4f0b0" }}>No stories yet!</p>}
        {filteredStories.map((story) => (
          <div key={story.id} className="story-card">
            <p>{story.content}</p>
            {story.category && <span>{story.category}</span>}
          </div>
        ))}
      </section>
    </div>
  );
}
