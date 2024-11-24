import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Room } from "../models/Room";
import { FaLock, FaLockOpen } from "react-icons/fa"; // Import lock icons
import DMList from "./DMList"; // Justera sökvägen efter var DMList finns

import "../styles/Room.css";
const Channels = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lockedRoomId, setLockedRoomId] = useState<string | null>(null); // Track locked room
  const { isGuest, user } = useUser(); // Lägg till användarinformation
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
      setLockedRoomId(roomId); // Show a message for locked rooms
    } else {
      navigate(`/room/${roomId}`); // Navigate to the room
    }
  };

  return (
    <div className="room-list-container">
      <h2>Channels</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="room-list">
        {rooms.map((room) => (
          <li key={room._id} className="room-item">
            <span
              onClick={() => enterRoom(room._id, room.isActive)} // Check if the room is locked
              className={`room-link ${
                room.isActive && isGuest ? "locked" : "open"
              }`}
            >
              {room.name}{" "}
              {room.isActive && isGuest ? (
                <FaLock className="lock-icon" /> // Locked icon
              ) : (
                <FaLockOpen className="lock-icon open-icon" /> // Open icon
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
      {/* Lägg till DMList under kanallistan */}
      {/* {user && <DMList username={user.username} />} */}
      {user && <DMList />}
    </div>
  );
};

export default Channels;
