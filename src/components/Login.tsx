const login = () => {
  return (
    <div>
      <h1>Loging</h1>
    </div>
  );
};

export default login;

// // components/Login.js
// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useUserStore from "../store/userStore";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const setUser = useUserStore((state) => state.setUser);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post("http://localhost:3000/api/login", {
//         username,
//         password,
//       });
//       setUser(response.data.user);
//       localStorage.setItem("token", response.data.token); // Spara token i localStorage
//       navigate("/");
//     } catch (error) {
//       console.error("Login failed:", error.response.data.message);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default Login;
