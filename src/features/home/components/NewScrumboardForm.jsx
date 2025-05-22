import { useState } from "react";
import { useCreateScrumboard } from "../hooks/useCreateScrumboard.js";

export function NewScrumboardForm({ onSuccess, onClose }) {
  const [newTitle, setNewTitle] = useState("");  
  const { createScrumboard, loading } = useCreateScrumboard(onSuccess, onClose);

  // Handle form submission: prevent empty titles and call creation logic
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createScrumboard(newTitle);
    setNewTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Scrum Board</h2>
      <label>
        Title:
        <input
          type="text"
          placeholder="Scrum Board Title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          required
        />
      </label>
      <button className="modal-btn" type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}