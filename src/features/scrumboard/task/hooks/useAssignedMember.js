import { useEffect, useState } from "react";
import { fetchMemberById } from "../../../../database/services/memberService.js";
import { useError } from "../../../../context/ErrorContext.jsx"; 

export function useAssignedMember(scrumboardId, task, userId) {
  const [assignedMember, setAssignedMember] = useState(null);
  const { showError } = useError();

  // Load assigned member details when task status or assignee changes
  useEffect(() => {
    async function loadAssignedMember() {
      if ((task.status === "inProgress" || task.status === "finished") && task.assignedTo) {
        try {
          const member = await fetchMemberById(scrumboardId, task.assignedTo, userId);
          setAssignedMember(member);
        } catch (error) {
          showError(error.message || "Failed to fetch assigned member");
          setAssignedMember(null);
        }
      } else {
        setAssignedMember(null);
      }
    }
    loadAssignedMember();
  }, [task.status, task.assignedTo, scrumboardId, userId, showError]);

  return assignedMember;
}