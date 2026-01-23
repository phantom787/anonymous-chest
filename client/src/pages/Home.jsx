import { useEffect, useState } from "react";
import { api } from "../services/api";
import StoryForm from "../components/StoryForm";
import CategoryFilter from "../components/CategoryFilter";

export default function Home() {
  const [stories, setStories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch stories from backend
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

  const categories = Array.from(new Set(stories.map((s) => s.category).filter(Boolean)));
  const filteredStories = selectedCategory
    ? stories.filter((s) => s.category === selectedCategory)
    : stories;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 via-pink-400 to-indigo-500 font-sans">
      
      {/* Hero Section */}
      <header className="text-center py-20 relative">
        <h1 className="text-6xl font-extrabold mb-4 text-white drop-shadow-lg animate-pulse">
          💜 Open Chest 💜
        </h1>
        <p className="text-xl max-w-2xl mx-auto text-white/90">
          Share what’s on your chest anonymously and read stories from others. You are never alone.
        </p>
        <div className="mt-6 flex justify-center">
          <span className="text-6xl animate-bounce">📝</span>
        </div>
      </header>

      {/* Story Submission */}
      <div className="relative -mt-12 z-10">
        <StoryForm onStorySubmitted={fetchStories} />
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
        />
      )}

      {/* Stories Feed */}
      <section className="max-w-4xl mx-auto mb-12 px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-md animate-fade-in">
          Stories Shared By Others
        </h2>
        {filteredStories.length === 0 && (
          <p className="text-center text-white/80 mb-6">No stories yet. Be the first to share!</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white/90 backdrop-blur-md text-gray-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <p className="mb-3 text-lg leading-relaxed">{story.content}</p>
              {story.category && (
                <span className="text-sm text-purple-600 font-semibold">
                  Category: {story.category}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
