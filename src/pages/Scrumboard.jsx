import { useState } from "react";
import { useDocumentTitle } from "../pages/hooks/useDocumentTitle";
import { useParams, useNavigate } from "react-router-dom";
import { useCreateTask } from "../features/scrumboard/task/hooks/useCreateTask.js";
import { Header } from "../components/Header.jsx";
import { ScrumboardMenu } from "../features/scrumboard/components/ScrumboardMenu.jsx";
import { TaskFilter } from "../features/scrumboard/task/components/TaskFilter.jsx";
import { TaskSort } from "../features/scrumboard/task/components/TaskSort.jsx";
import { TaskColumn } from "../features/scrumboard/task/components/TaskColumn.jsx";
import { useScrumboardData } from "../features/scrumboard/hooks/useScrumboardData.js";
import { Modal } from "../components/Modal.jsx";
import { MemberList } from "../features/scrumboard/member/components/MemberList.jsx";
import { useFilteredTasks } from "../features/scrumboard/task/hooks/useFilteredTasks.js";
import { useAuth } from "../context/AuthContext.jsx";

export function Scrumboard() {
  useDocumentTitle();
  const { id: scrumboardId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("timestamp-desc");
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const {
    scrumboard,
    tasks,
    loadTasks,
    updateTaskStatus,
    handleDeleteTask
  } = useScrumboardData(currentUser?.uid, scrumboardId);
  const { createTask, loading: creatingTask } = useCreateTask(currentUser?.uid, scrumboardId, loadTasks);
  const filteredTasks = useFilteredTasks(tasks, categoryFilter, selectedMember, sortOption);

  const getFilteredTasksByStatus = (status) =>
    filteredTasks.filter((task) => task.status === status);

  // Shows the member modal when the filter is set to "member" to select which member to filter by
  const handleFilterChange = (value) => {
    setCategoryFilter(value);
    if (value === "member") {
      setShowMemberModal(true);
    } else {
      setSelectedMember(null);
      setShowMemberModal(false);
    }
  };

  const handleMemberSelect = (memberId) => {
    setSelectedMember(memberId);
    setShowMemberModal(false);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  return (
    <>
      <Header />
      <main className="scrumboard-main">
        <ScrumboardMenu
          title={scrumboard?.title}
          onNavigateHome={() => navigate("/")}
          scrumboardId={scrumboardId}
          onTaskCreated={loadTasks}
          currentUserId={currentUser?.uid}
        />
        <section className="scrumboard-task-section">
          <div className="scrumboard-task-controls">
            <TaskFilter onFilterChange={handleFilterChange} />
            <TaskSort onSortChange={handleSortChange} />
          </div>
          <div className="scrumboard-task-columns">
            <TaskColumn
              className="column-new"
              userId={currentUser?.uid}
              columnTitle="New"
              scrumboardId={scrumboardId}
              tasks={getFilteredTasksByStatus("new")}
              onUpdateTask={updateTaskStatus}
              onCreateTask={createTask}
            />
            <TaskColumn
              className="column-in-progress"
              userId={currentUser?.uid}
              columnTitle="In Progress"
              scrumboardId={scrumboardId}
              tasks={getFilteredTasksByStatus("inProgress")}
              onUpdateTask={updateTaskStatus}
            />
            <TaskColumn
              className="column-finished"
              userId={currentUser?.uid}
              columnTitle="Finished"
              scrumboardId={scrumboardId}
              tasks={getFilteredTasksByStatus("finished")}
              onUpdateTask={updateTaskStatus}
              onDeleteTask={handleDeleteTask}
            />
          </div>
          {creatingTask && <p>Creating new task...</p>}
        </section>
        <Modal visible={showMemberModal} onClose={() => setShowMemberModal(false)}>
          <MemberList
            scrumboardId={scrumboardId}
            userId={currentUser?.uid}
            onMemberClick={handleMemberSelect}
            withHover={true} 
          />
        </Modal>
      </main>
    </>
  );
}