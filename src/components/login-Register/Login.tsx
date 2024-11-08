import { useState } from "react";
import handleLogin from "./HandleLogin"; // Importera handleLogin från HandleLogin.ts
import GuestLoginButton from "./GuestLogin.js";
import { useNavigate } from "react-router-dom";
import "../../styles/Loging.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const onLogin = async () => {
    setError("");
    setSuccess("");

    // Använd handleLogin för att hantera inloggning
    const result = await handleLogin(
      username,
      password,
      navigate,
      setError,
      setSuccess
    );

    // Visa framgångs- eller felmeddelande baserat på resultatet från handleLogin
    if (result.success) {
      setSuccess(result.message);
    } else {
      setError(result.message);
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
      <div className="main-login-btn"></div>
      <button
        onClick={onLogin}
        className="login-btn"
        disabled={!username || !password} // Avaktivera knappen om fälten är tomma
      >
        Login
      </button>
      <GuestLoginButton />
      <h2 className="reg-link" onClick={handleRegister}>
        Create account
      </h2>
      <div className="errorMain">
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default Login;
