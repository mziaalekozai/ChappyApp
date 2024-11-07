// Register.tsx
import { useState } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import handleUser from "../users/HandleUser.js"; // Ensure this path is correct
import "../../styles/Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Hook för att navigera

  const handleRegister = async () => {
    // Assuming you have state hooks for name, email, password, setError, setSuccess
    await handleUser(
      "addUser",
      { email, password, username: name },
      setError,
      setSuccess
    );
  };

  function handleLogin() {
    navigate("/login");
    // <Register />;
  }
  // const onSubmit = (e) => {
  //   e.preventDefault(); // Prevent the form from refreshing the page
  //   handleRegister(name, email, password, setError, setSuccess);
  // };

  return (
    <Form className="main-form" onSubmit={handleRegister}>
      <Row className="row">
        <Col xs={12} md={8}>
          <Stack gap={3}>
            <h2>Register</h2>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              required
            />
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <Button onClick={handleRegister}>Register</Button>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Button onClick={handleLogin}>Login</Button>
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Register;
