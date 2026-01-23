const categories = [
  "All",
  "Mental Health",
  "Relationships",
  "Family",
  "Addiction",
  "Life"
];

export default function CategoryFilter({ selected, setSelected }) {
  return (
    <div className="filter">
      {categories.map(cat => (
        <button
          key={cat}
          className={selected === cat ? "active" : ""}
          onClick={() => setSelected(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
