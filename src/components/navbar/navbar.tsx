import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import handleLogout from "../login-Register/HandleLogOut";
import { useUser } from "../../context/UserContext"; // Import UserContext
import "./Navbar.css";

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user exists after login
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const onLogout = async () => {
    const success = await handleLogout();
    if (success) {
      setUser(null); // Clear user state
      navigate("/login"); // Redirect to login page
    } else {
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="navbar">
      <div className="Nav-Left">
        <h1 onClick={() => navigate("/")}>Chappy</h1>
      </div>
      <div className="Nav-Center">Welcome {user?.username}</div>
      <div className="Nav-Right">
        {user ? (
          <div>
            <span>Welcome, {user.username}</span>
            <button onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// // import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import handleLogout from "../login-Register/HandleLogOut";
// import "./Navbar.css";

// interface User {
//   username: string;
// }

// interface NavbarProps {
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

// const Navbar: React.FC<NavbarProps> = ({ user, setUser }) => {
//   const navigate = useNavigate();

//   const onLogout = async () => {
//     try {
//       const success = await handleLogout(setUser);
//       if (success) {
//         setUser(null); // Clear user state on successful logout
//         navigate("/login"); // Redirect to login page
//       } else {
//         alert("Logout failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//       alert("An error occurred while logging out. Please try again.");
//     }
//   };

//   // const onLogout = async () => {
//   //   try {
//   //     const success = await handleLogout();
//   //     if (success) {
//   //       setUser(null); // Clear user state on successful logout
//   //       navigate("/login"); // Redirect to login page
//   //     } else {
//   //       alert("Logout failed. Please try again.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error during logout:", error);
//   //     alert("An error occurred while logging out. Please try again.");
//   //   }
//   // };

//   return (
//     <nav className="navbar">
//       <div className="Nav-Left">
//         <h1 onClick={() => navigate("/")}>Chappy</h1>
//       </div>
//       <div className="Nav-Center">Welcome {user?.username}</div>
//       <div className="Nav-Right">
//         {user ? (
//           <div className="navbar-user-info">
//             <span>Welcome, {user.username}</span>
//             <button onClick={onLogout}>Logout</button>
//           </div>
//         ) : (
//           <button onClick={() => navigate("/login")}>Login</button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// // import React, { useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { getActiveUser } from "../users/getActiveUser";
// // import { searchUsers } from "../users/searchUsers";
// // import handleLogout from "../login-Register/HandleLogOut";
// // import "./Navbar.css";

// // interface User {
// //   username: string;
// // }

// // interface NavbarProps {
// //   user: User | null;
// //   setUser: (user: User | null) => void;
// // }

// // const Navbar: React.FC<NavbarProps> = ({ user, setUser }) => {
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const activeUsername = await getActiveUser();
// //         if (activeUsername) {
// //           const userData = await searchUsers(activeUsername);
// //           if (userData) {
// //             setUser(userData); // Set the user data directly
// //           }
// //         }
// //       } catch (error) {
// //         console.error("Error fetching active user:", error);
// //       }
// //     };

// //     fetchUser();
// //   }, [setUser]);

// //   const onLogout = async () => {
// //     try {
// //       const success = await handleLogout();
// //       if (success) {
// //         setUser(null); // Clear user state on successful logout
// //         navigate("/login"); // Redirect to login page
// //       } else {
// //         alert("Logout failed. Please try again.");
// //       }
// //     } catch (error) {
// //       console.error("Error during logout:", error);
// //       alert("An error occurred while logging out. Please try again.");
// //     }
// //   };

// //   // const onLogout = async () => {
// //   //   try {
// //   //     const success = await handleLogout();
// //   //     if (success) {
// //   //       setUser(null); // Clear user state on successful logout
// //   //       navigate("/login"); // Redirect to login page
// //   //     } else {
// //   //       alert("Logout failed. Please try again.");
// //   //     }
// //   //   } catch (error) {
// //   //     console.error("Error during logout:", error);
// //   //     alert("An error occurred while logging out. Please try again.");
// //   //   }
// //   // };

// //   return (
// //     <nav className="navbar">
// //       <div className="Nav-Left">
// //         <h1 onClick={() => navigate("/")}>Chappy</h1>
// //       </div>
// //       <div className="Nav-Center">Wellcome {user?.username}</div>
// //       <div className="Nav-Right">
// //         {user ? (
// //           <div className="navbar-user-info">
// //             <span>Welcome, {user.username}</span>
// //             <button onClick={onLogout}>Logout</button>
// //           </div>
// //         ) : (
// //           <button onClick={() => navigate("/login")}>Login</button>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// // // import React, { useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { getActiveUser } from "../users/getActiveUser";
// // // import { searchUsers } from "../users/searchUsers";
// // // import handleLogout from "../login-Register/HandleLogOut";
// // // import "./Navbar.css";

// // // // Define the User interface
// // // interface User {
// // //   username: string;
// // //   // Add other user properties as needed
// // // }

// // // interface NavbarProps {
// // //   user: User | null;
// // //   setUser: (user: User | null) => void;
// // // }

// // // const Navbar: React.FC<NavbarProps> = ({ user, setUser }) => {
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const fetchUser = async () => {
// // //       try {
// // //         const activeUsername = await getActiveUser();
// // //         if (activeUsername) {
// // //           const userData = await searchUsers(activeUsername);
// // //           if (userData) {
// // //             setUser(userData); // Set the user data directly
// // //           }
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching active user:", error);
// // //       }
// // //     };

// // //     fetchUser();
// // //   }, [setUser]);

// // //   const onLogout = async () => {
// // //     try {
// // //       const success = await handleLogout();
// // //       if (success) {
// // //         setUser(null); // Update user state to null after logout
// // //         navigate("/login"); // Redirect to login page
// // //       } else {
// // //         console.error("Failed to logout");
// // //         alert("Logout failed. Please try again.");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error during logout:", error);
// // //       alert("An error occurred while logging out. Please try again.");
// // //     }
// // //   };

// // //   return (
// // //     <nav className="navbar">
// // //       <div className="Nav-Left">
// // //         <h1>Chappy</h1>
// // //       </div>
// // //       <div className="Nav-Right">
// // //         {user ? (
// // //           <div className="navbar-user-info">
// // //             <span>Welcome, {user.username}</span>
// // //             <button onClick={onLogout}>Logout</button>
// // //           </div>
// // //         ) : (
// // //           <button onClick={() => navigate("/login")}>Login</button>
// // //         )}
// // //       </div>
// // //     </nav>
// // //   );
// // // };

// // // export default Navbar;

// // // // import React, { useEffect } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import { getActiveUser } from "../users/getActiveUser";
// // // // import { searchUsers } from "../users/searchUsers";
// // // // import handleLogout from "../login-Register/HandleLogOut";
// // // // import "./Navbar.css";

// // // // // Define the User interface
// // // // interface User {
// // // //   username: string;
// // // //   // Add other user properties as needed
// // // // }

// // // // interface NavbarProps {
// // // //   user: User | null;
// // // //   setUser: (user: User | null) => void;
// // // // }

// // // // const Navbar: React.FC<NavbarProps> = ({ user, setUser }) => {
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     const fetchUser = async () => {
// // // //       const activeUsername = await getActiveUser();
// // // //       if (activeUsername) {
// // // //         const userData = await searchUsers(activeUsername);
// // // //         if (userData) {
// // // //           setUser(userData); // Set the user data directly
// // // //         }
// // // //       }
// // // //     };

// // // //     fetchUser();
// // // //   }, [setUser]);

// // // //   const onLogout = async () => {
// // // //     const success = await handleLogout();
// // // //     if (success) {
// // // //       setUser(null); // Update user state to null after logout
// // // //       navigate("/login"); // Redirect to login page
// // // //     } else {
// // // //       console.error("Failed to logout");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <nav className="navbar">
// // // //       <div className="Nav-Left">
// // // //         <h1>Chappy</h1>
// // // //       </div>
// // // //       <div className="Nav-Right">
// // // //         {user ? (
// // // //           <div className="navbar-user-info">
// // // //             <span>Welcome, {user.username}</span>
// // // //             <button onClick={onLogout}>Logout</button>
// // // //           </div>
// // // //         ) : (
// // // //           <button onClick={() => navigate("/login")}>Login</button>
// // // //         )}
// // // //       </div>
// // // //     </nav>
// // // //   );
// // // // };

// // // // export default Navbar;

// // // // import React, { useEffect, useState } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import { getActiveUser } from "../users/getActiveUser.js";
// // // // import { searchUsers } from "../users/searchUsers.js";
// // // // import handleLogout from "../login-Register/HandleLogOut.js";
// // // // import "./Navbar.css";

// // // // // Define the User interface
// // // // interface User {
// // // //   username: string;
// // // //   // Add other user properties as needed
// // // // }

// // // // interface NavbarProps {
// // // //   user: User | null;
// // // //   setUser: (user: User | null) => void;
// // // // }

// // // // const Navbar: React.FC<NavbarProps> = ({ user, setUser }) => {
// // // //   const navigate = useNavigate();
// // // //   const [isGuest, setIsGuest] = useState(false);

// // // //   useEffect(() => {
// // // //     const fetchUser = async () => {
// // // //       const activeUsername = await getActiveUser();
// // // //       if (activeUsername) {
// // // //         const userData = await searchUsers(activeUsername);
// // // //         if (userData && userData.length > 0) {
// // // //           setUser(userData[0]); // Set the first user from the search results
// // // //           setIsGuest(false);
// // // //         }
// // // //       } else {
// // // //         setIsGuest(true);
// // // //       }
// // // //     };

// // // //     fetchUser();
// // // //   }, [setUser]);

// // // //   const onLogout = async () => {
// // // //     const success = await handleLogout();
// // // //     if (success) {
// // // //       setUser(null); // Update user state to null after logout
// // // //       setIsGuest(true);
// // // //       navigate("/login"); // Redirect to login page
// // // //     } else {
// // // //       console.error("Failed to logout");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <nav className="navbar">
// // // //       <div className="Nav-Left">
// // // //         <h1>Chappy</h1>
// // // //       </div>
// // // //       <div className="Nav-Right">
// // // //         {isGuest ? (
// // // //           <button onClick={() => navigate("/login")}>Login</button>
// // // //         ) : (
// // // //           user && (
// // // //             <div className="navbar-user-info">
// // // //               <span>Welcome, {user.username}</span>
// // // //               <button onClick={onLogout}>Logout</button>
// // // //             </div>
// // // //           )
// // // //         )}
// // // //       </div>
// // // //     </nav>
// // // //   );
// // // // };

// // // // export default Navbar;

// // // // // import React from "react";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import handleLogout from "../login-Register/HandleLogOut"; // Ensure path is correct
// // // // // import "./Navbar.css";

// // // // // interface NavbarProps {
// // // // //   user: { username: string } | null;
// // // // //   setUser: (user: null) => void;
// // // // // }

// // // // // const Navbar: React.FC<NavbarProps> = ({ user, setUser }) => {
// // // // //   const navigate = useNavigate();

// // // // //   const onLogout = async () => {
// // // // //     const success = await handleLogout();
// // // // //     if (success) {
// // // // //       setUser(null); // Update user state to null after logout
// // // // //       navigate("/login"); // Redirect to login page
// // // // //     } else {
// // // // //       console.error("Failed to logout");
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <nav className="navbar">
// // // // //       <div className="Nav-Left">
// // // // //         <h1>Chappy</h1>
// // // // //       </div>
// // // // //       <div className="Nav-Right">
// // // // //         {user ? (
// // // // //           <div className="navbar-user-info">
// // // // //             <span>Welcome, {user.username}</span>
// // // // //             <button onClick={onLogout}>Logout</button>
// // // // //           </div>
// // // // //         ) : (
// // // // //           <button onClick={() => navigate("/login")}>Login</button>
// // // // //         )}
// // // // //       </div>
// // // // //     </nav>
// // // // //   );
// // // // // };

// // // // // export default Navbar;

// // // // // // import React from "react";
// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import handleLogout from "..//login-Register/HandleLogOut.js";
// // // // // // import "./Navbar.css";

// // // // // // interface NavbarProps {
// // // // // //   user: { username: string } | null;
// // // // // //   setUser: (user: null) => void;
// // // // // // }

// // // // // // const Navbar: React.FC<NavbarProps> = ({ user, setUser }) => {
// // // // // //   const navigate = useNavigate();

// // // // // //   const onLogout = async () => {
// // // // // //     const success = await handleLogout();
// // // // // //     if (success) {
// // // // // //       setUser(null); // Update user state to null after logout
// // // // // //       navigate("/login"); // Redirect to login page
// // // // // //     } else {
// // // // // //       console.error("Failed to logout");
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <nav className="navbar">
// // // // // //       <div className="Nav-Left">
// // // // // //         <h1>Chappy</h1>
// // // // // //       </div>
// // // // // //       <div className="Nav-Right">
// // // // // //         {user ? (
// // // // // //           <div className="navbar-user-info">
// // // // // //             <span>Welcome, {user.username}</span>
// // // // // //             <button onClick={onLogout}>Logout</button>
// // // // // //           </div>
// // // // // //         ) : (
// // // // // //           <button onClick={() => navigate("/login")}>Login</button>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </nav>
// // // // // //   );
// // // // // // };

// // // // // // export default Navbar;
