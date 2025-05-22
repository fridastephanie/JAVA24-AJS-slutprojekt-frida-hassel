import { ref } from 'firebase/database';
import { database } from './firebaseConfig.js';

const ROOT = 'scrumboard';

export const usersRef = ref(database, `${ROOT}/users`);

export const userRef = (userId) =>
  ref(database, `${ROOT}/users/${userId}`);

export const scrumboardsRef = (userId) =>
  ref(database, `${ROOT}/users/${userId}/scrumboards`);

export const scrumboardRef = (userId, scrumboardId) =>
  ref(database, `${ROOT}/users/${userId}/scrumboards/${scrumboardId}`);

export const tasksRef = (userId, scrumboardId) =>
  ref(database, `${ROOT}/users/${userId}/scrumboards/${scrumboardId}/tasks`);

export const taskRef = (userId, scrumboardId, taskId) =>
  ref(database, `${ROOT}/users/${userId}/scrumboards/${scrumboardId}/tasks/${taskId}`);

export const membersRef = (userId, scrumboardId) =>
  ref(database, `${ROOT}/users/${userId}/scrumboards/${scrumboardId}/members`);