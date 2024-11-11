// GuestLoginButton.tsx
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const GuestLoginButton = () => {
  const { setUser, setIsGuest } = useUser();
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    setUser({ username: "Guest" });
    setIsGuest(true);
    localStorage.setItem("username", "Guest");
    navigate("/guestchatPage");
  };

  return (
    <button onClick={handleGuestLogin} className="guest-login-btn">
      Login as Guest
    </button>
  );
};

export default GuestLoginButton;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../../styles/Register.css";

// const GuestLogin = () => {
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleGuestLogin = async () => {
//     try {
//       const response = await fetch("/api/user/guestLogin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to log in as guest.");
//       }

//       const data = await response.json();
//       console.log("Logged in as guest:", data.user);

//       // Store the guest role in local storage
//       localStorage.setItem("userRole", "guest");

//       setError(""); // Clear any previous error messages on successful login
//       navigate("/channel"); // Navigate to channel view
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : "Network or server error";
//       setError(errorMessage);
//       console.error("Error during guest login:", errorMessage);
//     }
//   };

//   return (
//     <div className="main-form">
//       <div className="form-container">
//         <button className="login-button" onClick={handleGuestLogin}>
//           Login as Guest
//         </button>
//         {error && <p className="error-message">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default GuestLogin;
