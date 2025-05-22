import { useAuth } from '../context/AuthContext';
import { LogoutButton } from './LogoutButton';
import { useEffect, useState } from 'react';
import { get } from 'firebase/database';
import { userRef } from '../database/firebaseRefs';
import { useLocation } from 'react-router-dom';
import { useError } from '../context/ErrorContext';

export function Header() {
  const { currentUser } = useAuth();
  const [userName, setUserName] = useState('');
  const location = useLocation();
  const { showError } = useError();
  const logo = new URL('../assets/logo.gif', import.meta.url).href;

  // Fetch the current users name from the database when the component mounts or currentUser changes
  useEffect(() => {
    const fetchUserName = async () => {
      if (!currentUser) return;
      try {
        const snapshot = await get(userRef(currentUser.uid));
        if (snapshot.exists()) {
          setUserName(snapshot.val().name);
        }
      } catch (error) {
        showError('Failed to fetch user name: ' + error.message);
      }
    };
    fetchUserName();
  }, [currentUser, showError]);

  // Only show user info on specific routes: home or individual scrumboard pages
  const showUserInfo = () => {
    const path = location.pathname;
    return (
      path === '/home' ||
      path === '/scrumboard' ||
      /^\/scrumboard\/[^/]+$/.test(path)
    );    
  };

  return (
    <header className="header-container">
      <div className="header-title-wrapper">
        <h1 className="header-title">SCRUM BOARD</h1>
        <img src={logo} alt="Traffic light" className="header-logo" />
      </div>
      <hr className="header-divider"/>
      {currentUser && showUserInfo() && (
        <div className="header-user-info">
          <p>Scrum Master: {userName} </p>
          <LogoutButton />
        </div>
      )}
    </header>
  );
}