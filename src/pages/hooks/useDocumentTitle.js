import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchScrumboardById } from '../../database/services/scrumboardService';
import { useAuth } from '../../context/AuthContext';

export function useDocumentTitle() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('Scrum Board');

  // Set the document title based on the current route and optionally fetch board title
  useEffect(() => {
    const updateTitle = async () => {
      if (pathname === '/') {
        document.title = 'Start | Scrum Board';
      } else if (pathname === '/home') {
        document.title = 'Home | Scrum Board';
      } else if (pathname === '/404' || pathname === '/notfound') {
        document.title = '404 Not Found | Scrum Board';
      } else if (pathname.startsWith('/scrumboard/') && currentUser && id) {
        try {
          const board = await fetchScrumboardById(currentUser.uid, id);
          document.title = `Project "${board.title}" | Scrum Board`;
        } catch {
          document.title = 'Project Not Found | Scrum Board';
        }
      } else {
        document.title = 'Scrum Board';
      }
    };

    updateTitle();
  }, [pathname, id, currentUser]);
}