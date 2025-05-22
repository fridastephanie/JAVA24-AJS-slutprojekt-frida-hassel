import { updateTask } from "../../../../database/services/taskService.js";
import { useState } from "react";
import { useError } from "../../../../context/ErrorContext.jsx";

export function useTaskActions(userId, scrumboardId, onUpdateTask, onDeleteTask) {
  const [loading, setLoading] = useState(false);
  const { showError } = useError();

  async function assignMember(taskId, updates) {
    if (!updates) return;
    setLoading(true);
    try {
      const updatedTask = await updateTask(userId, scrumboardId, taskId, updates);
      onUpdateTask(taskId, updatedTask);
    } catch (err) {
      showError(err.message || "Failed to assign member to task");
    } finally {
      setLoading(false);
    }
  }

  async function markFinished(taskId) {
    setLoading(true);
    try {
      const updatedTask = await updateTask(userId, scrumboardId, taskId, { status: "finished" });
      onUpdateTask(taskId, updatedTask);
    } catch (err) {
      showError(err.message || "Failed to mark task as finished");
    } finally {
      setLoading(false);
    }
  }
  
  async function deleteTaskById(taskId) {
    setLoading(true);
    try {
      await onDeleteTask(taskId);
    } catch (err) {
      showError(err.message || "Failed to delete task");
    } finally {
      setLoading(false);
    }
  }
  return { assignMember, markFinished, deleteTaskById, loading };
}