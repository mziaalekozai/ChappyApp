import { useState } from "react";
import handleRegisterUser from "./HandleRigisterUsers.js"; // Kontrollera att sökvägen är korrekt
import "../../styles/Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Hook för att navigera

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Förhindra sida från att uppdateras
    setError("");
    setSuccess("");

    const result = await handleRegisterUser(
      "addUser",
      { email, password, username: name },
      setError,
      setSuccess
    );

    // Om registreringen lyckas, navigera till chattrummet
    if (result) {
      setSuccess("Congratulations! You are registered.");
    }
  };

  return (
    <div className="main-form">
      <h2>Register</h2>
      {success ? (
        <>
          <p>Congratulations! You are now registered.</p>
          <button onClick={() => navigate("/channel")}>Go to Chat Room</button>
        </>
      ) : (
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit">Register</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Register;
