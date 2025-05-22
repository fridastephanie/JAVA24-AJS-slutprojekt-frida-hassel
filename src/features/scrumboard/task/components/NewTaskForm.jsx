import { useState } from "react";
import { useCreateTask } from "../hooks/useCreateTask";

export function NewTaskForm({ userId, scrumboardId, onSuccess, onClose }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("UX");
  const { createTask, loading } = useCreateTask(userId, scrumboardId, onSuccess, onClose);

  // Handle form submission: validate input and trigger task creation logic
  function handleSubmit(e) {
    e.preventDefault();
    createTask(title, category);
    setTitle("");
    setCategory("UX");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <label>
        Title:
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Category:
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="UX">UX</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
        </select>
      </label>
      <button className="modal-btn" type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add"}
      </button>
    </form>
  );
}