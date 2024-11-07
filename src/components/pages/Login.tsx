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

// // import { useState } from "react";
// // import { Form, Button, Alert, Row, Col, Stack } from "react-bootstrap";
// // import handleUser from "../users/HandleUser.js"; // Make sure the path is correct
// // import GuestLoginButton from "../users/GuestLogin.js";
// // import { useNavigate } from "react-router-dom"; // Importera useNavigate för navigering
// // import "../../styles/Loging.css";

// // const Login = () => {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState(""); // State for success messages

// //   const navigate = useNavigate(); // Hook för att navigera

// //   const handleLogin = async () => {
// //     // Kontrollera om fälten är tomma
// //     if (!username || !password) {
// //       setError("Please fill in both username and password.");
// //       return; // Avbryt funktionen om något fält är tomt
// //     }

// //     // Rensa eventuellt tidigare felmeddelande
// //     setError("");

// //     // Försök logga in användaren
// //     await handleUser("login", { username, password }, setError, setSuccess);

// //     // Om det inte finns något fel efter inloggningen, navigera till "/channel"
// //     if (!error) {
// //       navigate("/channel"); // Navigera till sidan för kanaler
// //     }
// //   };

// //   const handleRegister = () => {
// //     navigate("/register");
// //   };

// //   return (
// //     <Form className="main-form">
// //       <Row className="row">
// //         <Col xs={12} md={2}>
// //           <Stack gap={1}>
// //             <h2>Login</h2>
// //             <Form.Group>
// //               <Form.Label>Username</Form.Label>
// //               <Form.Control
// //                 type="text"
// //                 value={username}
// //                 onChange={(e) => setUsername(e.target.value)}
// //                 placeholder="Username"
// //                 required
// //               />
// //             </Form.Group>
// //             <Form.Group>
// //               <Form.Label>Password</Form.Label>
// //               <Form.Control
// //                 type="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 placeholder="Password"
// //                 required
// //               />
// //             </Form.Group>
// //             <Button onClick={handleLogin}>Login</Button>
// //             <GuestLoginButton />
// //             <h2 className="reg-link" onClick={handleRegister}>
// //               Create account
// //             </h2>

// //             {error && <Alert variant="danger">{error}</Alert>}
// //             {success && <Alert variant="success">{success}</Alert>}
// //           </Stack>
// //         </Col>
// //       </Row>
// //     </Form>
// //   );
// // };

// // export default Login;

// import { useState } from "react";
// import { Form, Button, Alert } from "react-bootstrap";
// import handleUser from "../users/HandleUser.js"; // Make sure the path is correct
// import GuestLoginButton from "../users/GuestLogin.js";
// import { useNavigate } from "react-router-dom"; // Importera useNavigate för navigering
// import "../../styles/Loging.css";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(""); // State for success messages

//   const navigate = useNavigate(); // Hook för att navigera

//   const handleLogin = async () => {
//     await handleUser("login", { username, password }, setError, setSuccess);
//     if (!error) {
//       navigate("/channel"); // Navigera till huvudsidan
//     }
//   };
//   function handleRegister() {
//     navigate("/register");
//     // <Register />;
//   }
//   return (
//     <div className="main-form">
//       <h2>Login</h2>
//       <Form.Group>
//         <Form.Label>Username</Form.Label>
//         <Form.Control
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//           required
//         />
//       </Form.Group>
//       <Form.Group>
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//       </Form.Group>
//       <Button onClick={handleLogin}>Login</Button>
//       <GuestLoginButton />
//       <h2 className="reg-link" onClick={handleRegister}>
//         Creat acount
//       </h2>

//       {error && <Alert variant="danger">{error}</Alert>}
//       {success && <Alert variant="success">{success}</Alert>}
//     </div>
//   );
// };

// export default Login;
