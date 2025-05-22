import { useState } from "react";
import { useCreateMember } from "../hooks/useCreateMember.js";

export function NewMemberForm({ scrumboardId, currentUserId, onSuccess, onClose }) {
  const [memberName, setMemberName] = useState("");
  const [category, setCategory] = useState("UX");
  const { createMember, loading } = useCreateMember(
    scrumboardId,
    currentUserId,    
    onSuccess,
    onClose
  );

  // Handle form submission: prevent empty names and call member creation logic
  function handleSubmit(e) {
    e.preventDefault();
    createMember(memberName, category);
    setMemberName("");
    setCategory("UX");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Team Member</h2>
      <label>
        Name:
        <input
          type="text"
          placeholder="Team Member Name"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
          required
        />
      </label>

      <label>
        Role:
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