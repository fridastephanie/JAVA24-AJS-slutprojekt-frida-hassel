import { useEffect, useState } from "react";
import { onValue } from "firebase/database";
import { scrumboardsRef, tasksRef } from "../../../database/firebaseRefs";

export function useScrumboardStats(userId) {
  const [stats, setStats] = useState({
    totalScrumboards: 0,
    totalNew: 0,
    totalInProgress: 0,
    totalFinished: 0,
  });

  // Fetch task status counts for all scrumboards whenever the userId changes
  useEffect(() => {
    if (!userId) return;

    const sbRef = scrumboardsRef(userId);

    onValue(sbRef, (snapshot) => {
      const boards = snapshot.val();
      if (!boards) {
        setStats({
          totalScrumboards: 0,
          totalNew: 0,
          totalInProgress: 0,
          totalFinished: 0,
        });
        return;
      }

      const boardEntries = Object.entries(boards);

      // Initialize counters here, to reset for each snapshot
      let totalNew = 0;
      let totalInProgress = 0;
      let totalFinished = 0;
      let processed = 0;

      // Loop through each scrumboard to fetch and count the statuses of its tasks
      boardEntries.forEach(([boardId]) => {
        const tRef = tasksRef(userId, boardId);
        onValue(tRef, (taskSnap) => {
          const tasks = taskSnap.val() || {};
          // Count task statuses for this board
          Object.values(tasks).forEach((task) => {
            if (task.status === "new") totalNew++;
            else if (task.status === "inProgress") totalInProgress++;
            else if (task.status === "finished") totalFinished++;
          });

          processed++;

          // Once all boards processed, update state once
          if (processed === boardEntries.length) {
            setStats({
              totalScrumboards: boardEntries.length,
              totalNew,
              totalInProgress,
              totalFinished,
            });
          }
        }, { onlyOnce: true });
      });
    });
  }, [userId]);

  return stats;
}