import { TaskCard } from "./TaskCard.jsx";

export function TaskList({ tasks, scrumboardId, userId, onAssignClick, onFinishClick, onDeleteClick }) {
  return (
    <div className="scrumboard-task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          scrumboardId={scrumboardId}
          userId={userId}
          onAssignClick={() => onAssignClick(task)}
          onFinishClick={onFinishClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
}
