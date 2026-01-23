import { useEffect, useState } from "react";
import { api } from "../services/api";
import StoryCard from "../components/StoryCard";
import CategoryFilter from "../components/CategoryFilter";

export default function Home() {
  const [stories, setStories] = useState([]);
  const [category, setCategory] = useState("All");

  const isAdmin = localStorage.getItem("token");

  useEffect(() => {
    api.get("/stories").then(res => setStories(res.data));
  }, []);

  const deleteStory = async (id) => {
    await api.delete(`/admin/story/${id}`, {
      headers: { Authorization: `Bearer ${isAdmin}` }
    });
    setStories(stories.filter(s => s.id !== id));
  };

  const filtered = category === "All"
    ? stories
    : stories.filter(s => s.category === category);

  return (
    <div className="container">
      <h1>You are not alone</h1>
      <p style={{ color: "var(--muted)" }}>
        Read stories shared anonymously by people who feel just like you.
      </p>

      <CategoryFilter selected={category} setSelected={setCategory} />

      {filtered.map(story => (
        <StoryCard
          key={story.id}
          story={story}
          isAdmin={!!isAdmin}
          onDelete={deleteStory}
        />
      ))}
    </div>
  );
}
