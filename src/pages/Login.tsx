import { useState } from "react";
import { Form, Button, Alert, Row, Col, Stack } from "react-bootstrap";
import handleUser from "../components/users/HandleUser.js"; // Make sure the path is correct

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // State for success messages

  const handleLogin = async () => {
    await handleUser("login", { username, password }, setError, setSuccess);
  };

  return (
    <Form className="main-form" onSubmit={handleLogin}>
      <Row className="row">
        <Col xs={12} md={8}>
          <Stack gap={3}>
            <h2>Login</h2>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </Form.Group>
            <Button onClick={handleLogin}>Login</Button>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Login;

// // Login.tsx
// import { useState } from "react";
// import { Form, Button, Alert, Row, Col, Stack } from "react-bootstrap";
// // import handleLogin from "../components/users/HandleUser.js";
// import handleUser from "../components/users/HandleUser.js";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     // handleLogin(username, password, setError);
//     await handleUser("login", { username, password }, setError, setSuccess);
//   };

//   return (
//     <Form className="main-form">
//       <Row className="row">
//         <Col xs={8}>
//           <Stack gap={3}>
//             <h2>Login</h2>
//             <Form.Group>
//               <Form.Label>Username</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Username"
//               />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//               />
//             </Form.Group>
//             <Button onClick={handleLogin}>Login</Button>
//             {error && <Alert variant="danger">{error}</Alert>}
//           </Stack>
//         </Col>
//       </Row>
//     </Form>
//   );
// };

// export default Login;

// // // Login.tsx
// // import { useState } from "react";
// // import axios from "axios";
// // import { Form, Button, Alert } from "react-bootstrap";

// // const Login = () => {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");

// //   const handleLogin = async () => {
// //     try {
// //       const { data } = await axios.post("http://localhost:3000/user/login", {
// //         username,
// //         password,
// //       });
// //       console.log("Login successful.", data.user);
// //       // Additional logic to handle login success
// //     } catch (error) {
// //       if (axios.isAxiosError(error) && error.response) {
// //         setError(error.response.data.message || "An unknown error occurred");
// //       } else {
// //         setError("Network or server error");
// //       }
// //     }
// //   };

// //   return (
// //     <Form>
// //       <Form.Group>
// //         <Form.Label>Username</Form.Label>
// //         <Form.Control
// //           type="text"
// //           value={username}
// //           onChange={(e) => setUsername(e.target.value)}
// //           placeholder="Username"
// //         />
// //       </Form.Group>
// //       <Form.Group>
// //         <Form.Label>Password</Form.Label>
// //         <Form.Control
// //           type="password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           placeholder="Password"
// //         />
// //       </Form.Group>
// //       <Button onClick={handleLogin}>Login</Button>
// //       {error && <Alert variant="danger">{error}</Alert>}
// //     </Form>
// //   );
// // };

// // export default Login;

// // // import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
// // // import "../styles/Register.css";
// // // const Login = () => {
// // //   return (
// // //     <>
// // //       <Form className="main-form">
// // //         <Row className="row">
// // //           <Col xs={8}>
// // //             <Stack gap={3}>

// // //               <Form.Control type="text" placeholder="Enter Name" />
// // //               {/* <Form.Control type="email" placeholder="Enter email" /> */}
// // //               <Form.Control type="password" placeholder="Enter password" />
// // //               <Button variant="primary" type="submit">
// // //                 Loging
// // //               </Button>
// // //               <Alert variant="danger">
// // //                 <p>An error occured</p>
// // //               </Alert>
// // //             </Stack>
// // //           </Col>
// // //         </Row>
// // //       </Form>
// // //     </>
// // //   );
// // // };

// // // export default Login;
