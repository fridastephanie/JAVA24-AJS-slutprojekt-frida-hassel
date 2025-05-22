import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../database/firebaseConfig';
import { useError } from '../../../context/ErrorContext.jsx'; 

export function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const { showError } = useError();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess(); 
      navigate('/home'); 
    } catch (err) {
      showError(err.message || "Failed to login with email");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onSuccess();
      navigate('/home'); 
    } catch (err) {
      showError(err.message || "Failed to login with Google");
    }
  };
  
  return (
    <div>
      <h3>Log in</h3>    
      <form onSubmit={handleEmailLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="modal-btn-container">
        <button className="modal-btn" type="submit">Log in</button>
        <button className="modal-btn" onClick={handleGoogleLogin}>Log in with Google</button>
        </div>
      </form>
    </div>
  );
}