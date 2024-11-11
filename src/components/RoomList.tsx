import { useEffect, useState } from "react";
import { getAllRooms } from "../data/rooms/getAllRooms"; // Ensure the correct path
import { Room } from "../models/Room"; // Ensure the correct path
import { useNavigate } from "react-router-dom";

const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const fetchedRooms = await getAllRooms();
        if (fetchedRooms) {
          setRooms(fetchedRooms);
        } else {
          setError("Failed to fetch rooms");
        }
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("An error occurred while fetching rooms.");
      }
    };

    fetchRooms();
  }, []);

  const enterRoom = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  return (
    <div>
      <h2>Channels</h2>
      {error && <p>{error}</p>}
      <ul>
        {rooms.map((channel) => (
          <li
            key={channel._id}
            onClick={() => enterRoom(channel._id)} // Use channel._id for unique identifier
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }}
          >
            {channel.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default RoomList;
