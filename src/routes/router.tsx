import { createHashRouter } from "react-router-dom";
import Root from "./Root.jsx";
import App from "../App.js";
import Login from "../components/pages/Login.js";
import Register from "../components/pages/Register.js";
import GuestView from "../components/users/GuestLogin.js";
import Channel from "../components/rooms/Channel.js";
import ChatRoom from "../components/chat/chatRoom.js"; // Lägg till RoomChat

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <App /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/guest-view", element: <GuestView /> },
      { path: "/channel", element: <Channel /> },
      { path: "/room/:roomId", element: <ChatRoom /> }, // Ny rutt för RoomChat
    ],
  },
]);

export { router };

// import { createHashRouter } from "react-router-dom";
// import Root from "./Root.jsx";
// import App from "../App.js";
// import Login from "../components/pages/Login.js";
// import Register from "../components/pages/Register.js";
// import GuestView from "../components/users/GuestLogin.js";
// import ChatRoom from "../components/pages/Chat.js";
// import Channel from "../components/pages/Channel.js";

// const router = createHashRouter([
//   {
//     path: "/",
//     element: <Root />,
//     children: [
//       {
//         path: "/",
//         element: <App />,
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },
//       {
//         path: "/register",
//         element: <Register />,
//       },
//       {
//         path: "/guest-view",
//         element: <GuestView />,
//       },
//       {
//         path: "/channel",
//         element: <Channel />,
//       },
//       {
//         path: "/chatRoom",
//         element: <ChatRoom />,
//       },
//       {
//         path: "/guest-view",
//         element: <GuestView />,
//       },
//     ],
//   },
// ]);

// export { router };
