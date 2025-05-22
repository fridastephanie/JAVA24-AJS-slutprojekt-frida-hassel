import { useEffect, useState } from "react";
import { fetchScrumboardById } from "../../../database/services/scrumboardService";
import { fetchAllTasks, updateTask, deleteTask } from "../../../database/services/taskService";
import { useError } from "../../../context/ErrorContext.jsx";

export function useScrumboardData(userId, scrumboardId) {
  const [scrumboard, setScrumboard] = useState(null);
  const [loadingScrumboard, setLoadingScrumboard] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const { showError } = useError();

  // Fetch the details of a specific scrumboardId for the given user 
  // whenever userId or scrumboardId changes
  useEffect(() => {
    if (!userId || !scrumboardId) return;
    const loadScrumboard = async () => {
      setLoadingScrumboard(true);      
      try {
        const data = await fetchScrumboardById(userId, scrumboardId);
        setScrumboard(data);
      } catch (error) {
        showError(error.message || "Failed to load scrumboard");
      } finally {
        setLoadingScrumboard(false);
      }
    };
    loadScrumboard();
  }, [userId, scrumboardId, showError]);

  async function loadTasks() {
    if (!userId || !scrumboardId) return;
    setLoadingTasks(true);
    try {
      const allTasks = await fetchAllTasks(userId, scrumboardId);
      const all = Object.entries(allTasks || {}).map(([id, task]) => ({ id, ...task }));
      setTasks(all);
    } catch (error) {
      showError(error.message || "Failed to load tasks");
    } finally {
      setLoadingTasks(false);
    }
  }

  // Fetch all tasks when userId or scrumboardId changes
  useEffect(() => {
    loadTasks();
  }, [userId, scrumboardId]);

  async function updateTaskStatus(taskId, updates) {
    try {
      if (updates === null) {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
      } else if (typeof updates === "object") {
        setTasks((prev) =>
          prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
        );
      }
      await updateTask(userId, scrumboardId, taskId, updates);
    } catch (error) {
      showError(error.message || "Failed to update task");
    }
  }

  async function handleDeleteTask(taskId) {
    try {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      await deleteTask(userId, scrumboardId, taskId);
    } catch (error) {
      showError(error.message || "Failed to delete task");
    }
  }
  
  return {
    scrumboard,
    loadingScrumboard,
    tasks,
    loadingTasks,
    loadTasks,
    updateTaskStatus,
    handleDeleteTask,
  };
}