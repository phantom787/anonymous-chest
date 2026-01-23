import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Home() {
  const [stories, setStories] = useState([]);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  // Fetch stories from backend
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await api.get("/stories");
        setStories(res.data.reverse()); // show newest first
      } catch (err) {
        console.error(err);
      }
    };
    fetchStories();
  }, []);

  // Handle story submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return alert("Please write something!");
    try {
      await api.post("/stories", { content, category });
      setMessage("Story shared successfully!");
      setContent("");
      setCategory("");

      // Refresh stories
      const res = await api.get("/stories");
      setStories(res.data.reverse());
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit story.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600 text-white p-6">
      
      {/* Hero / Dashboard */}
      <header className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to the Open Chest</h1>
        <p className="text-xl max-w-xl mx-auto">
          A safe space to share what’s in your chest and read stories from others. You are never alone.
        </p>
      </header>

      {/* Story Submission Box */}
      <section className="max-w-2xl mx-auto mb-12 bg-white text-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Share Your Story</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="Write whatever is on your chest..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Category (optional)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 transition-all px-6 py-3 rounded-lg font-semibold text-white"
          >
            Share
          </button>
        </form>
        {message && <p className="mt-2 text-green-600 font-medium">{message}</p>}
      </section>

      {/* Stories Feed */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center">Stories From Others</h2>
        {stories.length === 0 && (
          <p className="text-center text-gray-200">No stories yet. Be the first to share!</p>
        )}
        <div className="space-y-6">
          {stories.map((story) => (
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
