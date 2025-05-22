import { MemberList } from "../../member/components/MemberList.jsx";

export function AssignMemberList({ task, scrumboardId, userId, onMemberClick }) {
  const handleClick = (memberId) => {
    if (task) {
      onMemberClick(task.id, memberId);
    }
  };

  return (
    <>
      {task && (
        <MemberList
          scrumboardId={scrumboardId}
          userId={userId}
          filterCategory={task.category}
          onMemberClick={handleClick}
          withHover={true} 
        />
      )}
    </>
  );
}
