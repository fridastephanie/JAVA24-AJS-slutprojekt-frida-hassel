import { useState } from 'react';
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';
import { RegisterForm } from '../features/start/components/RegisterForm';  
import { LoginForm } from '../features/start/components/LoginForm';

export function Start() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); 
  const scrumboardExample = new URL('../assets/scrumboard-example.jpg', import.meta.url).href;

  return (
    <>
      <Header />
      <main className="start-main">
        <div className="start-btn-group">
          <button
            className="start-btn"
            onClick={() => setShowLoginModal(true)} 
          >
            Log in
          </button>
          <button
            className="start-btn"
            onClick={() => setShowRegisterModal(true)}
          >
            Register
          </button>
        </div>
        <section className="start-info">
          <div className="start-info-container">
            <h2>Welcome!</h2>
            <p>Become the Scrum Master of your own projects.</p>
            <p>Manage your workflow with tools like:</p>
            <ul className="start-info-list">
              <li>• Create multiple Scrum Boards</li>
              <li>• Add team members: UX, Frontend, Backend</li>
              <li>• Assign tasks based on team member category</li>
              <li>• Follow each task from: 
                <span className="task-flow">
                  <span className="task-status">🟥New</span> → 
                  <span className="task-status">🟨In Progress</span> → 
                  <span className="task-status">🟩Finished</span>
                </span>
              </li>
              <li>• Visual traffic-light style for easy tracking🚦</li>
            </ul>
            <img src={scrumboardExample} alt="Scrum Board example" className="start-example-img"/>
          </div>
        </section>
      </main>

      <Modal visible={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <LoginForm onSuccess={() => setShowLoginModal(false)} />
      </Modal>

      <Modal visible={showRegisterModal} onClose={() => setShowRegisterModal(false)}>
        <RegisterForm onSuccess={() => setShowRegisterModal(false)} />
      </Modal>
    </>
  );
}