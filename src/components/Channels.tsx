import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Room } from "../models/Room";
import { FaLock, FaLockOpen } from "react-icons/fa"; // Import lock icons
import DMList from "./DMList"; // Adjust the path for DMList
import "../styles/DMList.css";

const Channels = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lockedRoomId, setLockedRoomId] = useState<string | null>(null); // Track locked room
  const { isGuest, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`/api/room/rooms`);
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data = await response.json();
        setRooms(data);
      } catch (err) {
        setError("Error fetching rooms");
        console.error(err);
      }
    };

    fetchRooms();
  }, []);

  const enterRoom = (roomId: string, isLocked: boolean) => {
    if (isGuest && isLocked) {
      setLockedRoomId(roomId);
    } else {
      navigate(`/room/${roomId}`);
    }
  };

  return (
    <div className="container">
      <h2 className="channels-title">Channels</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="channel-list">
        {rooms.map((room) => (
          <li key={room._id} className="channel-item">
            <span
              onClick={() => enterRoom(room._id, room.isActive)}
              className={`channel-link ${
                room.isActive && isGuest ? "locked" : "open"
              }`}
            >
              {room.name}{" "}
              {room.isActive && isGuest ? (
                <FaLock className="lock-icon" />
              ) : (
                <FaLockOpen className="lock-icon open-icon" />
              )}
            </span>
            {lockedRoomId === room._id && (
              <span className="locked-message">
                Log in to access this room.
              </span>
            )}
          </li>
        ))}
      </ul>
      {user && <DMList />}
    </div>
  );
};

export default Channels;
