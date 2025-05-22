import { useMemo } from "react";
import { useError } from "../../../../context/ErrorContext.jsx"; 

export function useFilteredTasks(tasks, categoryFilter, selectedMember, sortOption) {
  const { showError } = useError();

  // useMemo is used to memorize the filtered and sorted task list
  return useMemo(() => {
    try {
      let filtered = tasks.filter((task) => {
        if (selectedMember) {
          return task.assignedTo === selectedMember;
        } else if (
          categoryFilter !== "all" &&
          categoryFilter !== "member" &&
          task.category?.toLowerCase() !== categoryFilter
        ) {
          return false;
        }
        return true;
      });

      filtered.sort((a, b) => {
        switch (sortOption) {
          case "timestamp-asc":
            return new Date(a.createdAt) - new Date(b.createdAt);
          case "timestamp-desc":
            return new Date(b.createdAt) - new Date(a.createdAt);
          case "title-asc":
            return (a.title ?? "").localeCompare(b.title ?? "");
          case "title-desc":
            return (b.title ?? "").localeCompare(a.title ?? "");
          default:
            return 0;
        }
      });

      return filtered;
    } catch (err) {
      showError(err.message || "Something went wrong while filtering tasks");
      return tasks; 
    }
  }, [tasks, categoryFilter, selectedMember, sortOption, showError]);
}