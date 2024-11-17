// import { createHashRouter } from "react-router-dom";
// import Root from "./Root";
// import App from "../App";
// import Login from "../components/login-Register/Login";
// import Register from "../components/login-Register/Register";
// import GuestChatPage from "../components/GuestChatRoom"; // Adjust the path if needed
// import Channel from "../components/RoomList"; // Room list including public rooms and DMs
// import UserChatRoom from "../components/userChatRoom";
// import DMChatRoom from "../components/DMList"; // Add this for specific DM chats if needed

// const router = createHashRouter([
//   {
//     path: "/",
//     element: <Root />,
//     children: [
//       { path: "/", element: <App /> },
//       { path: "/login", element: <Login /> },
//       { path: "/register", element: <Register /> },
//       { path: "/channel", element: <Channel /> }, // Includes both public rooms and DMs
//       { path: "/room/:roomId", element: <UserChatRoom /> }, // Public chat room
//       { path: "/dm", element: <DMChatRoom username={""} /> }, // DM-specific route
//       { path: "/guestchatPage", element: <GuestChatPage /> },
//     ],
//   },
// ]);

// export { router };

import { createHashRouter } from "react-router-dom";
import Root from "./Root";
import App from "../App";
import Login from "../components/login-Register/Login";
import Register from "../components/login-Register/Register";
import GuestChatPage from "../components/GuestChatRoom"; // Adjust the path if needed
import Channel from "../components/RoomList";
import UserChatRoom from "../components/userChatRoom";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <App /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/channel", element: <Channel /> },
      { path: "/room/:roomId", element: <UserChatRoom /> },
      { path: "/guestchatPage", element: <GuestChatPage /> },
    ],
  },
]);

export { router };
