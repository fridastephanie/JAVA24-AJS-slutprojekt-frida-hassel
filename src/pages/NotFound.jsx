import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../pages/hooks/useDocumentTitle";
import { Header } from "../components/Header";
import { useAuth } from "../context/AuthContext";

export function NotFound() {
  useDocumentTitle();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const buttonText = currentUser ? "To Home Page" : "To Start Page";
  const buttonTarget = currentUser ? "/home" : "/";

  return (
    <>
      <Header />
      <button className="notfound-btn" onClick={() => navigate(buttonTarget)}>
        {buttonText}
      </button>
      <div className="notfound-container">
        <h1 className="notfound-title">404 - Page Not Found</h1>
        <p className="notfound-text">The page you're looking for doesn't exist!</p>
      </div>
    </>
  );
}
