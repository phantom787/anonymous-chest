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

  // Extract unique categories
  const categories = Array.from(new Set(stories.map((s) => s.category).filter(Boolean)));

  // Filtered stories
  const filteredStories = selectedCategory
    ? stories.filter((s) => s.category === selectedCategory)
    : stories;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600 text-white p-6">
      
      {/* Hero / Dashboard */}
      <header className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to the Open Chest</h1>
        <p className="text-xl max-w-xl mx-auto">
          A safe space to share what’s in your chest and read stories from others. You are never alone.
        </p>
      </header>

      {/* Story Submission */}
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
      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center">Stories From Others</h2>
        {filteredStories.length === 0 && (
          <p className="text-center text-gray-200">No stories yet. Be the first to share!</p>
        )}
        <div className="space-y-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white text-gray-800 p-5 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
            >
              <p className="mb-2">{story.content}</p>
              {story.category && (
                <span className="text-sm text-purple-700 font-medium">Category: {story.category}</span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
