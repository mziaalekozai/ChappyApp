import ChannelList from "../rooms/Channel";

const GuestView = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div>
      <h1>Welcome, Guest!</h1>
      <ChannelList />
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default GuestView;
