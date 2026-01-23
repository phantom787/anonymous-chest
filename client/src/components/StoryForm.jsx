import { useState } from "react";
import { api } from "../services/api";

export default function StoryForm() {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Mental Health");

  const submit = async () => {
    if (!content.trim()) return;

    await api.post("/stories", { content, category });
    setContent("");
    alert("Your story has been shared 🤍");
  };

  return (
    <>
      <select onChange={e => setCategory(e.target.value)}>
        <option>Mental Health</option>
        <option>Relationships</option>
        <option>Family</option>
        <option>Addiction</option>
        <option>Life</option>
      </select>

      <textarea
        rows="6"
        placeholder="This is a safe space. Say what you need to say..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button onClick={submit}>Share Anonymously</button>
    </>
  );
}
