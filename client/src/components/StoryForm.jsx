import { useState } from "react";
import { api } from "../services/api";

export default function StoryForm({ onStorySubmitted }) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return alert("Please write something!");

    try {
      await api.post("/stories", { content, category });
      setMessage("Story shared successfully!");
      setContent("");
      setCategory("");
      onStorySubmitted(); // notify parent to refresh stories
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit story.");
    }
  };

  return (
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
  );
}
