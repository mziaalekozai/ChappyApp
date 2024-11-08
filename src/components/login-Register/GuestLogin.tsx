import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Register.css";

const GuestLogin = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    try {
      const response = await fetch("/api/user/guestLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to log in as guest.");
      }

      const data = await response.json();
      console.log("Logged in as guest:", data.user);

      setError(""); // Clear any previous error messages on successful login
      navigate("/channel"); // Navigate to channel view
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Network or server error";
      setError(errorMessage);
      console.error("Error during guest login:", errorMessage);
    }
  };

  // Render the JSX outside of the `handleGuestLogin` function
  return (
    <div className="main-form">
      <div className="form-container">
        <button className="login-button" onClick={handleGuestLogin}>
          Login as Guest
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default GuestLogin;
