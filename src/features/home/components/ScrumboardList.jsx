import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllScrumboards } from "../../../database/services/scrumboardService.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useError } from "../../../context/ErrorContext";

export function ScrumboardList() {
  const { currentUser } = useAuth();
  const [scrumboards, setScrumboards] = useState([]);
  const { showError } = useError();

  // Fetch the current users scrumboards from the database when 
  // the component mounts or currentUser changes, and convert them to an array
  useEffect(() => {
    async function loadScrumboards() {
      if (!currentUser) return;
      try {        
        const data = await fetchAllScrumboards(currentUser.uid);
        const boardsArray = Object.entries(data || {}).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setScrumboards(boardsArray);
      } catch (error) {
        setScrumboards([]);
        const message = error.message || "Failed to load Scrum boards";
        showError(message);
      }
    }
    loadScrumboards();
  }, [currentUser, showError]);

  if (!currentUser) return <p>Loading...</p>;
  if (scrumboards.length === 0) return <><h2 className="modal-list-title">Your Scrum Boards</h2><p>No Scrum Boards found</p></>;

  return (
    <>
      <h2 className="modal-list-title">Your Scrum Boards</h2>
      <ul className="modal-list">
        {scrumboards.map((board) => (
          <li key={board.id} className="modal-list-item modal-list-hover" tabIndex={0}>
            <Link to={`/scrumboard/${board.id}`}>
              {board.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}