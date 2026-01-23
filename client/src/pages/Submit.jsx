import StoryForm from "../components/StoryForm";

export default function Submit() {
  return (
    <div className="container">
      <h2>Share your story anonymously</h2>
      <p className="muted">
        No names. No judgment. Just honesty.
      </p>
      <StoryForm />
    </div>
  );
}
