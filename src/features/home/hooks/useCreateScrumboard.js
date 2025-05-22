import { useState } from "react";
import { addScrumboard } from "../../../database/services/scrumboardService.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useError } from "../../../context/ErrorContext";

export function useCreateScrumboard(onSuccess, onClose) {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const { showError } = useError();

  async function createScrumboard(title) {
    setLoading(true);

    if (!title.trim()) {
      showError("Title is required");
      setLoading(false);
      return;
    }

    try {
      await addScrumboard(currentUser.uid, title.trim());
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (error) {
      showError(error.message || "Failed to create Scrum Board");
    } finally {
      setLoading(false);
    }
  }

  return { createScrumboard, loading };
}