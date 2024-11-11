import { RoomList } from "./RoomList.js";
import { DMList } from "../components/DMList.js"; // Assuming DMList is created to show DMs

const UserView = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div>
      <h1>Welcome, User!</h1>
      <RoomList />
      <DMList username={""} />
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserView;
