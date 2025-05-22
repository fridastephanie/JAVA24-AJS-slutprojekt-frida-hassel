import { Modal } from './Modal';

export function ErrorModal({ visible, message, onClose }) {
  if (!visible) return null;  
  return (
    <Modal visible={visible} onClose={onClose}>
      <div className="error-modal-content">
        <h2 className="error-modal-title">ERROR</h2>
        <p className="error-modal-message">{message}</p>
        <button className="error-modal-close-btn" onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
}