import { createHashRouter } from "react-router-dom";
import Root from "./Root";
import App from "../App";
import Login from "../components/login-Register/Login";
import Register from "../components/login-Register/Register";
import GuestView from "../components/login-Register/GuestLogin";
import Channel from "../components/rooms/Channel";
import ChatRoom from "../components/chat/chatRoom";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />, // Root has Navbar
    children: [
      { path: "/", element: <App /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/guest-view", element: <GuestView /> },
      { path: "/channel", element: <Channel /> },
      { path: "/room/:roomId", element: <ChatRoom /> },
    ],
  },
]);

export { router };
