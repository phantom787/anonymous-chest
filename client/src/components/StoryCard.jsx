export default function StoryCard({ story, isAdmin, onDelete }) {
  return (
    <div className="card">
      <p>{story.content}</p>

      <small className="muted">
        {story.category} •{" "}
        {new Date(story.created_at).toLocaleDateString()}
      </small>

      {isAdmin && (
        <button className="danger" onClick={() => onDelete(story.id)}>
          Delete
        </button>
      )}
    </div>
  );
}
