import { useState } from "react";
import { Header } from "../components/Header.jsx";
import { Modal } from "../components/Modal.jsx";
import { NewScrumboardForm } from "../features/home/components/NewScrumboardForm.jsx";
import { ScrumboardList } from "../features/home/components/ScrumboardList.jsx";
import { useAuth } from "../context/AuthContext";
import { useScrumboardStats } from "../features/home/hooks/useScrumboardStats";
import { ScrumboardStats } from "../features/home/components/ScrumboardStats";

export function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);  
  const { currentUser } = useAuth();
  const stats = useScrumboardStats(currentUser?.uid);

  const openScrumBoardListModal = () => {
    setModalContent(<ScrumboardList />);
    setModalVisible(true);
  };

  const openNewScrumBoardModal = () => {
    setModalContent(
      <NewScrumboardForm
        onSuccess={() => setModalVisible(false)}
        onClose={() => setModalVisible(false)}
      />
    );
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };
  
  return (
    <>
      <Header />
      <main className="home-main">
        <ScrumboardStats stats={stats} />
        <button className="home-btn" onClick={openScrumBoardListModal}>
          Display Scrum Boards
        </button>
        <button className="home-btn" onClick={openNewScrumBoardModal}>
          New Scrum Board
        </button>
        
      </main>
      <Modal visible={modalVisible} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
}