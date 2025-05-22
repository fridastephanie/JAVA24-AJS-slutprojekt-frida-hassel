import { useState } from "react";
import { Modal } from "../../../components/Modal.jsx";
import { NewMemberForm } from "../member/components/NewMemberForm.jsx";
import { MemberList } from "../member/components/MemberList.jsx";
import { NewTaskForm } from "../task/components/NewTaskForm.jsx";
import { deleteScrumboard } from "../../../database/services/scrumboardService.js";
import { ScrumboardDeleteConfirm } from "./ScrumboardDeleteConfirm.jsx";
import { useNavigate } from "react-router-dom";
import { useError } from "../../../context/ErrorContext.jsx";

export function ScrumboardMenu({ title, scrumboardId, onTaskCreated, currentUserId }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();
  const { showError } = useError();

  function openMemberListModal() {
    setModalContent(<MemberList scrumboardId={scrumboardId} userId={currentUserId} />);
    setModalVisible(true);
  }

  function openAddMemberModal() {
    setModalContent(
      <NewMemberForm
        scrumboardId={scrumboardId}
        currentUserId={currentUserId}
        onClose={() => setModalVisible(false)}
      />
    );
    setModalVisible(true);
  }

  function openAddTaskModal() {
    setModalContent(
      <NewTaskForm
        userId={currentUserId}
        scrumboardId={scrumboardId}
        onSuccess={() => {
          onTaskCreated?.();
          setModalVisible(false);
        }}
        onClose={() => setModalVisible(false)}
      />
    );
    setModalVisible(true);
  }

  function openDeleteConfirmationModal() {
    setModalContent(
      <ScrumboardDeleteConfirm
        onCancel={() => setModalVisible(false)}
        onConfirm={async () => {
          try {
            await deleteScrumboard(currentUserId, scrumboardId);
            setModalVisible(false);
            navigate("/home");
          } catch (error) {
            showError("Failed to delete scrumboard: " + error.message);
            setModalVisible(false);
          }
        }}
      />
    );
    setModalVisible(true);
  }
  
  return (
    <>
      <h2 className="scrumboard-title">{title}</h2>
      <nav className="scrumboard-nav">
        <button onClick={openMemberListModal}>Display Team Members</button>
        <button onClick={openAddMemberModal}>Add New Team Member</button>
        <button onClick={openAddTaskModal}>Add New Task</button>
        <button onClick={openDeleteConfirmationModal}>Delete Scrum Board</button>
        <button onClick={() => navigate("/home")}>Back To Homepage</button>
      </nav>
      <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
        {modalContent}
      </Modal>
    </>
  );
}