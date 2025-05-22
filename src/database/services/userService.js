import { userRef } from '../firebaseRefs.js';
import { set, get } from 'firebase/database';

export async function addUser(user) {
  if (!user?.userId) throw new Error('User ID is missing');

  const ref = userRef(user.userId);
  const snapshot = await get(ref);

  if (snapshot.exists()) {
    throw new Error('Email is already in use');
  }
  
  await set(ref, {
    name: user.name,
    email: user.email,
    createdAt: new Date().toISOString(),
  });
}