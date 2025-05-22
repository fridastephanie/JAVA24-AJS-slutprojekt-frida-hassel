import { useState } from 'react';
import { auth } from '../../../database/firebaseConfig';
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { addUser } from '../../../database/services/userService';
import { useError } from '../../../context/ErrorContext';  

export function useCreateUser(onSuccess) {
  const [loading, setLoading] = useState(false);
  const { showError } = useError();  

  const registerWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await addUser({
        userId: user.uid,
        name: user.displayName || 'Unknown',
        email: user.email,
      });
      onSuccess();
    } catch (error) {
      showError(error.message || "Failed to register with Google");
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmail = async (name, email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
        await addUser({
          userId: user.uid,
          name,
          email: user.email,
        });
      }
      onSuccess();
    } catch (error) {
      showError(error.message || "Failed to register with email");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    registerWithGoogle,
    registerWithEmail,
  };
}