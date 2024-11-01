import { createHashRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Root from "./Root.js";
import Home from "../components/Home.js";
import Login from "../components/Login.js";
import Register from "../components/Register.js";
import Channel from "../components/Channel.js";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "channel",
        element: <Channel />,
        children: [
          { path: ":id", element: <Channel /> }, // Hantera ID som ett undernät
        ],
      },
    ],
  },
]);

// const router = createHashRouter(
//   <Router>
//     <Route path="/" element={<Root />}>
//       <Route index element={<Home />} />
//       <Route path="login" element={<Login />} />
//       <Route path="register" element={<Register />} />
//       <Route path="channel/:id" element={<Channel />} />
//     </Route>
//   </Router>
// );

export { router };
