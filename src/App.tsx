import LoginPage from "./components/pages/Login.js";
import "./App.css";

function App() {
  return (
    <div>
      <LoginPage />
    </div>
  );
}

export default App;

// import { Routes, Route, Navigate } from "react-router-dom";
// import Chat from "./components/pages/Chat.js";
// import Login from "./components/pages/Login.js";
// import Register from "./components/pages/Register.js";
// import Channel from "./components/pages/Channel.js";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Container } from "react-bootstrap";
// import Navbar from "./components/navbar/Navbar.js";
// import { AuthContextProvider } from "./context/AuthContext";
// import GuestView from "./components/view/GuestView.js";

// function App() {
//   return (
//     <AuthContextProvider>
//       <Navbar />
//       <Container>
//         <Routes>
//           <Route path="/" element={<Chat />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/channel" element={<Channel />} />
//           <Route path="/guest-view" element={<GuestView />} />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </Container>
//     </AuthContextProvider>
//   );
// }

// export default App;

// // import { Routes, Route, Navigate } from "react-router-dom";
// // import Chat from "./pages/Chat.js";
// // import Login from "./pages/Login.js";
// // import Register from "./pages/Register.js";
// // import Channel from "./pages/Channel.js";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import { Container } from "react-bootstrap";
// // import Navbar from "./components/navbar/Navbar.js";
// // import { AuthContextProvider } from "./context/AuthContext";
// // import GuestView from "./components/view/GuestView.js";

// // function App() {
// //   return (
// //     <>
// //       <AuthContextProvider>
// //         <Navbar />
// //         <Container>
// //           <Routes>
// //             <Route path="/" element={<Chat />} />
// //             <Route path="/login" element={<Login />} />
// //             <Route path="/register" element={<Register />} />
// //             <Route path="/channel" element={<Channel />} />
// //             <Route path="/guest-view" element={<GuestView />} />
// //             <Route path="*" element={<Navigate to="/" />} />
// //           </Routes>
// //         </Container>
// //       </AuthContextProvider>
// //     </>
// //   );
// // }

// // export default App;
