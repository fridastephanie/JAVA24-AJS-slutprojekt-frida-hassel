import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

export function NotFound() {
  const navigate = useNavigate(); 
  
  return (
    <>
    <Header />
    <button className="notfound-btn" onClick={() => navigate("/")}>To Start Page</button>
    <div className="notfound-container">
      <h1 className="notfound-title">404 - Page Not Found</h1>
      <p className="notfound-text">The page you're looking for doesn't exist!</p>      
    </div>
    </>
  );
}
