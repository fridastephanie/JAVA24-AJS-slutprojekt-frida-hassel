import { useEffect, useState } from "react";
import { fetchAllMembers } from "../../../../database/services/memberService";
import { useError } from "../../../../context/ErrorContext.jsx";

export function MemberList({
  scrumboardId,
  userId,
  filterCategory,
  onMemberClick,
  withHover = false, 
}) {
  const [members, setMembers] = useState([]);
  const { showError } = useError();

  // Fetch the list of team members for the given scrumboard and user, applying category filter if provided,
  // whenever scrumboardId, userId or filterCategory changes
  useEffect(() => {
    if (!scrumboardId || !userId) return;
    async function loadMembers() {
      try {
        const data = await fetchAllMembers(scrumboardId, userId);
        const membersArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        if (filterCategory) {
          setMembers(membersArray.filter((m) => m.category === filterCategory));
        } else {
          setMembers(membersArray);
        }
      } catch (error) {
        const message = error.message || "Failed to load members";
        showError(message);
        setMembers([]);
      }
    }
    loadMembers();
  }, [scrumboardId, filterCategory, userId, showError]);

  if (members.length === 0) return <><h2 className="modal-list-title">Team Members</h2><p>No team members found</p></>;

  return (
    <>
      <h2 className="modal-list-title">Team Members</h2>
      <ul className="modal-list">
        {members.map((member) => (
          <li
            key={member.id}
            className={`modal-list-item ${withHover ? "modal-list-hover" : ""}`}
            onClick={() => onMemberClick && onMemberClick(member.id)}
          >
            <strong>{member.name}</strong> — {member.category}
          </li>
        ))}
      </ul>
    </>
  );
}