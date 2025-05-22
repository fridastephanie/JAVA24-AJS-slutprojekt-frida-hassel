import { scrumboardsRef, scrumboardRef } from '../firebaseRefs.js';
import { push, set, get, remove } from 'firebase/database';

export async function addScrumboard(userId, title) {
  if (!userId) throw new Error("User ID is missing");
  if (!title) throw new Error("Title is missing");

  const newScrumBoardRef = push(scrumboardsRef(userId));

  await set(newScrumBoardRef, {
    title,
    members: {},
    tasks: {}
  });
}

export async function fetchAllScrumboards(userId) {
  if (!userId) throw new Error("User ID is missing");

  const snapshot = await get(scrumboardsRef(userId));

  return snapshot.val() || {};
}

export async function fetchScrumboardById(userId, scrumboardId) {
  if (!userId) throw new Error("User ID is missing");
  if (!scrumboardId) throw new Error("Scrumboard ID is missing");

  const boardRef = scrumboardRef(userId, scrumboardId);
  const snapshot = await get(boardRef);
  
  if (snapshot.exists()) {
    return { id: scrumboardId, ...snapshot.val() };
  } else {
    throw new Error("Scrumboard not found");
  }
}

export async function deleteScrumboard(userId, scrumboardId) {
  if (!userId) throw new Error("User ID is missing");
  if (!scrumboardId) throw new Error("Scrumboard ID is missing");

  const boardRef = scrumboardRef(userId, scrumboardId);
  
  await remove(boardRef);
}