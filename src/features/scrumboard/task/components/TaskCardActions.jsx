export function TaskCardActions({ task, assignedMember, onAssignClick, onFinishClick, onDeleteClick }) {
  return (
    <>
      {(task.status === "inProgress" || task.status === "finished") && assignedMember && (
        <p><strong>Assigned to:</strong> {assignedMember.name}</p>
      )}

      {task.status === "inProgress" && (
        <button onClick={() => onFinishClick(task.id)}>Finished</button>
      )}

      {task.status === "finished" && (
        <button onClick={() => onDeleteClick(task.id)}>Delete</button>
      )}

      {!["inProgress", "finished"].includes(task.status) && (
        <button onClick={onAssignClick}>Assign</button>
      )}
    </>
  );
}