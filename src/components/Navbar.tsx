import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import deleteUser from "../data/users/deleteUser";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, setUser, setIsGuest } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isGuest");
    navigate("/login");
  };

  const confirmDeleteUser = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteUser = async () => {
    console.log(user); // This will show you what the user object contains at this point
    if (!user || !user.id) {
      console.error("User ID is missing.");
      return;
    }
    const success = await deleteUser(user.id);
    if (success) {
      handleLogout();
    } else {
      console.error("Failed to delete user.");
    }

    setShowDeleteConfirmation(false);
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Chappy</h1>
      {user ? (
        <div className="user-dropdown">
          <span
            className="username"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {user.username} ▼
          </span>
          {showDropdown && (
            <ul className="dropdown-menu">
              <li onClick={confirmDeleteUser}>Delete User</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          )}
        </div>
      ) : null}

      {showDeleteConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete your account?</p>
          <button onClick={handleDeleteUser} className="confirm-button">
            Yes
          </button>
          <button
            onClick={() => setShowDeleteConfirmation(false)}
            className="cancel-button"
          >
            No
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../context/UserContext";
// import deleteUser from "../data/users/deleteUser";
// import "../styles/Navbar.css";

// const Navbar = () => {
//   const { user, setUser, setIsGuest } = useUser();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setUser(null);
//     setIsGuest(false);
//     localStorage.removeItem("user"); // Clear stored user data
//     localStorage.removeItem("isGuest"); // Clear guest state
//     navigate("/login");
//   };

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const confirmDeleteUser = () => {
//     setShowDeleteConfirmation(true); // Show the confirmation dialog
//   };

//   const handleDeleteUser = async () => {
//     if (!user || !user.id) {
//       console.error("User ID is missing.");
//       return;
//     }

//     try {
//       const success = await deleteUser(user.id); // Call deleteUser with user ID
//       if (success) {
//         setShowDeleteConfirmation(false);
//         handleLogout(); // Log out after deletion
//       } else {
//         console.error("Failed to delete user.");
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   return (
//     <nav className="navbar">
//       <h1 className="navbar-logo">Chappy</h1>
//       {user ? (
//         <div className="user-dropdown">
//           <span className="username" onClick={toggleDropdown} title="Open menu">
//             {user.username} ▼
//           </span>
//           {showDropdown && (
//             <ul className="dropdown-menu">
//               <li onClick={confirmDeleteUser}>Delete User</li>
//               <li onClick={handleLogout}>Logout</li>
//             </ul>
//           )}
//         </div>
//       ) : null}

//       {/* Confirmation Dialog */}
//       {showDeleteConfirmation && (
//         <div className="confirmation-dialog">
//           <p>Are you sure you want to delete your account?</p>
//           <button onClick={handleDeleteUser} className="confirm-button">
//             Yes
//           </button>
//           <button
//             onClick={() => setShowDeleteConfirmation(false)}
//             className="cancel-button"
//           >
//             No
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useUser } from "../context/UserContext";
// // import "../styles/Navbar.css";

// // const Navbar = () => {
// //   const { user, setUser, setIsGuest } = useUser();
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     setUser(null);
// //     setIsGuest(false);
// //     localStorage.removeItem("user"); // Clear stored user data
// //     localStorage.removeItem("isGuest"); // Clear guest state
// //     navigate("/login");
// //   };

// //   const toggleDropdown = () => {
// //     setShowDropdown(!showDropdown);
// //   };

// //   function handleDeleteUser(
// //     event: MouseEvent<HTMLLIElement, MouseEvent>
// //   ): void {
// //     throw new Error("Function not implemented.");
// //   }

// //   return (
// //     <nav className="navbar">
// //       <h1 className="navbar-logo">Chappy</h1>
// //       {user ? (
// //         <div className="user-dropdown">
// //           <span className="username" onClick={toggleDropdown} title="Open menu">
// //             {user.username} ▼
// //           </span>
// //           {showDropdown && (
// //             <ul className="dropdown-menu">
// //               <li onClick={handleDeleteUser}>Delete User</li>
// //               <li onClick={handleLogout}>Logout</li>
// //             </ul>
// //           )}
// //         </div>
// //       ) : (
// //         <></>
// //       )}
// //     </nav>
// //   );
// // };

// // export default Navbar;
