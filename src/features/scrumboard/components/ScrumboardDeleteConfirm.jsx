export function ScrumboardDeleteConfirm({ onConfirm, onCancel }) {
  return (
    <div>
      <h2>Delete Scrum Board</h2>
      <p>Are you sure you want to delete this Scrumboard?</p>
      <div className="modal-delete">
        <button className="modal-btn" onClick={onConfirm}>
          Yes
        </button>
        <button className="modal-btn" onClick={onCancel}>
          No
        </button>        
      </div>
    </div>
  );
}