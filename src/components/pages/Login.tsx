import { useState } from "react";
import handleUser from "../users/HandleUser.js"; // Kontrollera att sökvägen är korrekt
import GuestLoginButton from "../users/GuestLogin.js";
import { useNavigate } from "react-router-dom"; // Importera useNavigate för navigering
import "../../styles/Loging.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // State för framgångsmeddelanden

  const navigate = useNavigate();

  const handleLogin = async () => {
    // Rensa tidigare felmeddelande
    setError("");
    setSuccess("");

    // Försök logga in användaren
    await handleUser("login", { username, password }, setError, setSuccess);

    // Om det inte finns något fel efter inloggningen, navigera till "/channel"
    if (!error) {
      navigate("/channel");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="main-form">
      <h2>Login</h2>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="form-control"
        />
      </div>
      <button onClick={handleLogin} className="btn">
        Login
      </button>
      <GuestLoginButton />
      <h2 className="reg-link" onClick={handleRegister}>
        Create account
      </h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default Login;
