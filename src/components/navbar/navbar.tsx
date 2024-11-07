import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import "./navbar.css";

const Navbar = () => {
  const { user, setUser } = useAuth(); // Use the useAuth hook to access user and setUser
  const navigate = useNavigate(); // For redirecting the user on logout

  const handleLogout = () => {
    setUser(null); // Clear the user from the context
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div>
      <nav>
        <div className="nav-Left">
          <NavLink to="/login">Chat</NavLink>
          Chapp
        </div>
        <div className="nav-Center">
          {/* <NavLink to="/channel">Channel</NavLink> */}
        </div>
        <div className="nav-Right">
          {user ? (
            <div className="logOut-btn">
              <span>{user?.username || "Guest"}</span>
              <button onClick={handleLogout}>Log Out</button>
              <span>{user.username || "Guest"}</span>
              <button onClick={handleLogout}>Log Out</button>
            </div>
          ) : (
            <div className="login-btn">
              <NavLink to="/login">Login</NavLink>
              {/* <NavLink to="/register">Register</NavLink> */}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

// import { useAuth } from "../../context/AuthContext.js"; // Importera din useAuth hook
// import { useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import HandleLogout from "../users/HandleLogOut.js";
// const Navbar = () => {
//   const { user, setUser } = useAuth();
//   const navigate = useNavigate();

//   // Lägg till useEffect för att kontrollera användarstatus
//   useEffect(() => {
//     console.log("Användaren har uppdaterats:", user);
//   }, [user]); // Dependency array med user så att det triggas när user ändras

//   const handleLogout = () => {
//     setUser(null); // Nollställ användarinformationen vid utloggning
//     navigate("/login"); // Navigera till inloggningssidan efter utloggning
//   };

//   return (
//     <div>
//       <nav>
//         <div className="nav-Left">
//           <NavLink to="/">Chat</NavLink>
//         </div>
//         <div className="nav-Center">
//           <NavLink to="/channel">Channel</NavLink>
//         </div>
//         <div className="nav-Right">
//           {user ? (
//             <>
//               <span>{user.username || "Guest"}</span>
//               <button onClick={handleLogout}>Log Out</button>
//             </>
//           ) : (
//             <>
//               <NavLink to="/login">Login</NavLink>
//               <NavLink to="/register">Register</NavLink>
//             </>
//           )}
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

// import { NavLink } from "react-router-dom";
// import "./navbar.css";
// const Navbar = () => {
//   return (
//     <div>
//       <nav>
//         <div className="nav-Left">
//           {/* <NavLink to="/">
//             <img className="logo" src={Logo} alt="logo" />
//           </NavLink> */}
//           <NavLink to="/">Chat</NavLink>
//         </div>
//         <div className="nav-Center">
//           <NavLink to="/channel">Channel</NavLink>
//         </div>
//         <div className="nav-Right">
//           <NavLink to="/login">Login</NavLink>
//           <NavLink to="/register">Register</NavLink>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;
