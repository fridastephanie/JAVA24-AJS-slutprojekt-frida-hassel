import { useState, useEffect } from 'react';
import { useCreateUser } from '../hooks/useCreateUser';
import { useError } from '../../../context/ErrorContext.jsx'; 

export function RegisterForm({ onSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const { loading, registerWithGoogle, registerWithEmail } = useCreateUser(onSuccess);
  const { showError } = useError();

  useEffect(() => {
    setPasswordValid(password.length >= 6);
    setPasswordsMatch(password === confirmPassword && password.length > 0);
  }, [password, confirmPassword]);

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    if (!passwordValid) {
      showError("Password must be at least 6 characters long!");
      return;
    }
    if (!passwordsMatch) {
      showError("Passwords do not match!");
      return;
    }
    try {
      await registerWithEmail(name, email, password);
    } catch (err) {
      showError(err.message || "Registration failed");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await registerWithGoogle();
    } catch (err) {
      showError(err.message || "Google registration failed");
    }
  };

  return (
    <div>
      <h3>Register account</h3>
      <form onSubmit={handleEmailSignUp}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
        />

        <p className={`modal-password-feedback ${passwordValid ? 'valid' : 'invalid'}`}>
          {passwordValid ? '✅' : '❌'} Password must be at least 6 characters
        </p>
        <p className={`modal-password-feedback ${passwordsMatch ? 'valid' : 'invalid'}`}>
          {passwordsMatch ? '✅' : '❌'} {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
        </p>

        <div className="modal-btn-container">
          <button className="modal-btn" type="submit" disabled={loading}>Register</button>
          <button className="modal-btn" type="button" onClick={handleGoogleSignUp} disabled={loading}>
            Register with Google
          </button>
        </div>
      </form>
    </div>
  );
}