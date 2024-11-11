// Navbar.tsx
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, setUser, isGuest, setIsGuest } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem("username"); // Clear guest data if stored
    navigate("/login");
  };

  return (
    <nav>
      <h1>Chappy</h1>
      {user ? (
        <>
          <span>Welcome, {user.username}</span>
          <button onClick={handleLogout}>
            {isGuest ? "Leave as Guest" : "Logout"}
          </button>
        </>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
    </nav>
  );
};

export default Navbar;
