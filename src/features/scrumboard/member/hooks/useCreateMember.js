import { useState } from "react";
import { addMember } from "../../../../database/services/memberService.js";
import { useError } from "../../../../context/ErrorContext.jsx";

export function useCreateMember(scrumboardId, userId, onSuccess, onClose) {
  const [loading, setLoading] = useState(false);
  const { showError } = useError();

  async function createMember(name, category) {
    if (!userId) {
      showError("User not authenticated");
      return;
    }
    if (!name.trim()) {
      showError("Name is required");
      return;
    }
    const validCategories = ["UX", "Frontend", "Backend"];
    if (!validCategories.includes(category)) {
      showError("Invalid role");
      return;
    }
    
    setLoading(true);
    try {
      await addMember(scrumboardId, { name: name.trim(), category }, userId);
      onSuccess?.();
      onClose?.();
    } catch (error) {
      showError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return { createMember, loading };
}