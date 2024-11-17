import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, setUser, setIsGuest } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem("user"); // Clear stored user data
    localStorage.removeItem("isGuest"); // Clear guest state
    navigate("/login");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Chappy</h1>
      {user ? (
        <div className="user-dropdown">
          <span className="username" onClick={toggleDropdown} title="Open menu">
            {user.username} ▼
          </span>
          {showDropdown && (
            <ul className="dropdown-menu">
              <li onClick={() => navigate("/update-user")}>Update User</li>
              <li onClick={() => navigate("/delete-user")}>Delete User</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          )}
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Navbar;
