export default function StoryCard({ story, isAdmin, onDelete }) {
  return (
    <div className="card">
      <p>{story.content}</p>

      <small className="muted">
        {story.category} •{" "}
        {new Date(story.created_at).toLocaleDateString()}
      </small>

      {isAdmin && (
        <button
  onClick={() => api.post(`/stories/${story.id}/helped`)
    .then(fetchStories)}
  style={{
    marginTop: "1rem",
    background: "transparent",
    border: "none",
    color: "var(--accent)",
    cursor: "pointer",
    fontWeight: "600"
  }}
>
  ❤️ This helped me ({story.helpedCount || 0})
</button>

      )}
    </div>
  );
}
