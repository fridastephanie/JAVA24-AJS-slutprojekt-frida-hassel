import { signOut } from 'firebase/auth';
import { auth } from '../database/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useError } from '../context/ErrorContext';

export function LogoutButton() {
  const navigate = useNavigate();
  const { showError } = useError();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      showError('Something went wrong when logging out'); 
    }
  };

  return (
    <button onClick={handleLogout} className="header-btn">
      Log out
    </button>
  );
}