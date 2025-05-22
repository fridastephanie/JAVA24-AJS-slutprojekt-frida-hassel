import { taskRef, tasksRef } from '../firebaseRefs.js';
import { get, push, set, update, remove } from 'firebase/database';

export async function addTask(userId, scrumboardId, task) {
  if (!userId) throw new Error('User ID is missing');
  if (!scrumboardId) throw new Error('Scrumboard ID is missing');
  if (!task) throw new Error('Task data is missing');

  const taskListRef = tasksRef(userId, scrumboardId);
  const newTaskRef = push(taskListRef);

  await set(newTaskRef, task);

  return { id: newTaskRef.key, ...task };
}

export async function fetchAllTasks(userId, scrumboardId) {
  if (!userId) throw new Error('User ID is missing');
  if (!scrumboardId) throw new Error('Scrumboard ID is missing');

  const snapshot = await get(tasksRef(userId, scrumboardId));

  return snapshot.val() || {};
}

export async function updateTask(userId, scrumboardId, taskId, updates) {
  if (!userId) throw new Error('User ID is missing');
  if (!scrumboardId) throw new Error('Scrumboard ID is missing');
  if (!taskId) throw new Error('Task ID is missing');
  if (!updates || typeof updates !== 'object') throw new Error('Update data is invalid');

  const refToTask = taskRef(userId, scrumboardId, taskId);

  await update(refToTask, updates);
  const snapshot = await get(refToTask);

  if (snapshot.exists()) {
    return { id: taskId, ...snapshot.val() };
  }
  throw new Error('Task not found after update');
}

export async function deleteTask(userId, scrumboardId, taskId) {
  if (!userId) throw new Error('User ID is missing');
  if (!scrumboardId) throw new Error('Scrumboard ID is missing');
  if (!taskId) throw new Error('Task ID is missing');

  const refToTask = taskRef(userId, scrumboardId, taskId);

  await remove(refToTask);
}