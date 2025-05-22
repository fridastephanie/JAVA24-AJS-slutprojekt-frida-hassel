import { useState } from "react";
import { addTask } from "../../../../database/services/taskService.js";
import { useError } from "../../../../context/ErrorContext.jsx"; 

export function useCreateTask(userId, scrumboardId, onSuccess, onClose) {
  const [loading, setLoading] = useState(false);
  const { showError } = useError();
  
  async function createTask(title, category) {
    setLoading(true);
    try {
      const newTask = {
        title,
        category,
        status: "new",
        createdAt: Date.now(),
      };
      await addTask(userId, scrumboardId, newTask);
      onSuccess?.();
      onClose?.();
    } catch (error) {
      showError(error.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  }
  return { createTask, loading };
}
