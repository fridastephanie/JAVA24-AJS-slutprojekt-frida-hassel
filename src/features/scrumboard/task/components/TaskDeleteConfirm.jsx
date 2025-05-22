export function TaskDeleteConfirm({ onCancel, onConfirm }) {
  return (
    <div>
      <h2>Delete Task</h2>
      <p>Are you sure you want to delete this task?</p>
      <div className="modal-delete">        
        <button className="modal-btn" onClick={onConfirm}>Yes</button>
        <button className="modal-btn" onClick={onCancel}>No</button>
      </div>
    </div>
  );
}