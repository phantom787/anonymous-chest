import StoryForm from "../components/StoryForm";

export default function Submit() {
  return (
    <div className="container">
      <h2>What’s been sitting on your chest?</h2>
<p style={{ opacity: 0.7 }}>
  No names. No judgment. Just honesty.
</p>

      <StoryForm />
    </div>
  );
}
