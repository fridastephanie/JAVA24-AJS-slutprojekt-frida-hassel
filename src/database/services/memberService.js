import { membersRef } from '../firebaseRefs.js';
import { get, push } from 'firebase/database';

export async function addMember(scrumboardId, member, userId) {
  if (!scrumboardId) throw new Error("Scrumboard ID is missing");
  if (!userId) throw new Error("User ID is missing");

  const ref = membersRef(userId, scrumboardId);
  const memberWithUser = { ...member, userId };

  await push(ref, memberWithUser);
}

export async function fetchAllMembers(scrumboardId, userId) {
  if (!scrumboardId) throw new Error("Scrumboard ID is missing");
  if (!userId) throw new Error("User ID is missing");

  const ref = membersRef(userId, scrumboardId);
  const snapshot = await get(ref);
  const allMembers = snapshot.val() || {};

  return Object.entries(allMembers)
    .filter(([_, member]) => member.userId === userId)
    .reduce((obj, [key, val]) => {
      obj[key] = val;
      return obj;
    }, {});
}

export async function fetchMemberById(scrumboardId, memberId, userId) {
  if (!scrumboardId) throw new Error("Scrumboard ID is missing");
  if (!memberId) throw new Error("Member ID is missing");
  if (!userId) throw new Error("User ID is missing");

  const allMembers = await fetchAllMembers(scrumboardId, userId);
  const member = allMembers[memberId];

  if (!member) {
    throw new Error(`No member found with ID: ${memberId}`);
  }
  
  return { id: memberId, ...member };
}