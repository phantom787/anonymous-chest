export default function CategoryFilter({ categories, selectedCategory, onChange }) {
  return (
    <div className="flex gap-3 justify-center mb-6 flex-wrap">
      <button
        className={`px-4 py-2 rounded-full ${
          selectedCategory === "" ? "bg-purple-700 text-white" : "bg-white text-gray-800"
        }`}
        onClick={() => onChange("")}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === cat ? "bg-purple-700 text-white" : "bg-white text-gray-800"
          }`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
