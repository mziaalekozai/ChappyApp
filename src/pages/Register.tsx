// Register.tsx
import { useState } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import handleUser from "../components/users/HandleUser.js"; // Ensure this path is correct

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    // Assuming you have state hooks for name, email, password, setError, setSuccess
    await handleUser(
      "addUser",
      { email, password, username: name },
      setError,
      setSuccess
    );
  };
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
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Register;

// import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
// import "../styles/Register.css";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext.js";

// const Register = () => {
//   const { user } = useContext(AuthContext);
//   return (
//     <>
//       <Form className="main-form">
//         <Row className="row">
//           <Col xs={8}>
//             <Stack gap={3}>
//               <h2>Register</h2>
//               <h2>{user}</h2>

//               <Form.Control type="text" placeholder="Enter Name" />
//               <Form.Control type="email" placeholder="Enter email" />
//               <Form.Control type="password" placeholder="Enter password" />
//               <Button variant="primary" type="submit">
//                 Register
//               </Button>
//               <Alert variant="danger">
//                 <p>An error occured</p>
//               </Alert>
//             </Stack>
//           </Col>
//         </Row>
//       </Form>
//     </>
//   );
// };

// export default Register;
