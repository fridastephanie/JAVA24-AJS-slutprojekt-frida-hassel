import { TaskCardActions } from "./TaskCardActions";
import { useAssignedMember } from "../hooks/useAssignedMember";

export function TaskCard({ task, scrumboardId, userId, onAssignClick, onFinishClick, onDeleteClick }) {
  const assignedMember = useAssignedMember(scrumboardId, task, userId);

  return (
    <article className="scrumboard-task-card">
      <h4>{task.title}</h4>
      <p><strong>Category:</strong> {task.category}</p>
      <p><strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}</p>

      <TaskCardActions
        task={task}
        assignedMember={assignedMember}
        onAssignClick={onAssignClick}
        onFinishClick={onFinishClick}
        onDeleteClick={onDeleteClick}
      />
    </article>
  );
}