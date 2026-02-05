// pages/Home.jsx
import { useEffect, useState } from "react";
import { api } from "../services/api";
import ThemeToggle from "../components/ThemeToggle";
import CrisisBanner from "../components/CrisisBanner";
import StoryForm from "../components/StoryForm";
import StoryCard from "../components/StoryCard";

export default function Home() {
  const [stories, setStories] = useState([]);
  const [query, setQuery] = useState("");

  const isAdmin =
    new URLSearchParams(window.location.search).get("admin") === "true";

  const fetchStories = async () => {
    const res = await api.get("/stories");
    setStories(res.data.reverse());
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const filtered = stories.filter(s =>
    s.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <ThemeToggle />
      <header className="hero">
        <h1>Open Chest</h1>
        <p>Anonymous stories. Real healing. You’re not alone.</p>
      </header>

      <CrisisBanner />

      <StoryForm onStorySubmitted={fetchStories} />

      <input
        placeholder="Search stories…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ display: "block", margin: "1rem auto", padding: "0.6rem" }}
      />

      <section className="stories-feed">
        {filtered.map(story => (
          <StoryCard
            key={story.id}
            story={story}
            refresh={fetchStories}
            isAdmin={isAdmin}
          />
        ))}
      </section>
    </>
  );
}
