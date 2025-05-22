import { useState } from "react";
import { Modal } from "../../../../components/Modal.jsx";
import { AssignMemberList } from "./AssignMemberList.jsx";
import { TaskDeleteConfirm } from "./TaskDeleteConfirm.jsx";
import { useTaskActions } from "../hooks/useTaskActions.js";
import { TaskList } from "./TaskList.jsx";
import { useError } from "../../../../context/ErrorContext.jsx"; 

export function TaskColumn({ className = "", userId, columnTitle, scrumboardId, tasks = [], onUpdateTask, onDeleteTask }) {
  const [taskToAssign, setTaskToAssign] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const { showError } = useError();
  const { assignMember, markFinished, deleteTaskById } = useTaskActions(userId, scrumboardId, onUpdateTask, onDeleteTask);

  const openAssignModal = (task) => setTaskToAssign(task);

  const handleAssignMember = async (taskId, assignedToId) => {
    if (!assignedToId) return;
    try {
      const updates = { assignedTo: assignedToId, status: "inProgress" };
      await assignMember(taskId, updates);
      setTaskToAssign(null);
    } catch (error) {
      showError(error.message || "Failed to assign member");
    }
  };

  const handleMarkFinished = async (taskId) => {
    try {
      await markFinished(taskId);
    } catch (error) {
      showError(error.message || "Failed to mark task as finished");
    }
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    try {
      await deleteTaskById(taskToDelete);
      setTaskToDelete(null);
    } catch (error) {
      showError(error.message || "Failed to delete task");
    }
  };

  const closeAssignMember = () => setTaskToAssign(null);
  const closeDeleteConfirm = () => setTaskToDelete(null);

  return (
    <div className={`scrumboard-task-column ${className}`}>
      <div className="scrumboard-column-header">
        <h3>{columnTitle}</h3>
      </div>
      {tasks.length === 0 ? (
        <p className="scrumboard-task-list-empty">No {columnTitle.toLowerCase()} tasks</p>
      ) : (
        <TaskList
          tasks={tasks}
          scrumboardId={scrumboardId}
          userId={userId}
          onAssignClick={openAssignModal}
          onFinishClick={handleMarkFinished}
          onDeleteClick={(taskId) => setTaskToDelete(taskId)}
        />
      )}
      <Modal visible={!!taskToAssign} onClose={closeAssignMember}>
        {taskToAssign && (
          <AssignMemberList
            scrumboardId={scrumboardId}
            userId={userId}
            task={taskToAssign}
            onMemberClick={handleAssignMember}
          />
        )}
      </Modal>
      <Modal visible={!!taskToDelete} onClose={closeDeleteConfirm}>
        <TaskDeleteConfirm
          onCancel={closeDeleteConfirm}
          onConfirm={handleDeleteTask}
        />
      </Modal>
    </div>
  );
}