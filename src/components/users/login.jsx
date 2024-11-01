// // src/components/users/Login.js

// import React, { useState } from "react";
// import axios from "axios";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:3000/user/login", {
//         username,
//         password,
//       });
//       console.log("Login successful:", response.data);
//       // Redirect or save the authentication status
//     } catch (err) {
//       setError("Failed to login");
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleLogin}>
//         <label>
//           Username:
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </label>
//         <label>
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </label>
//         <button type="submit">Login</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default Login;
