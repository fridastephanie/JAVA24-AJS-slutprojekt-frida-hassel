import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function PrivateRoute({ children }) {
  const { currentUser, authLoading } = useAuth();

  if (authLoading) {
    return <div className="fullscreen-loader">Loading users...</div>;
  }

  return currentUser ? children : <Navigate to="/" />;
}