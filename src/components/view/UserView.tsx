import ChannelList from "../rooms/Channel";
import DMList from "../dm/DMList.js"; // Assuming DMList is created to show DMs

const UserView = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div>
      <h1>Welcome, User!</h1>
      <ChannelList />
      <DMList />
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserView;
