import { useEffect, useState } from "react";
import { getAllRooms } from "./getAllRooms.js"; // Ange den korrekta sökvägen till din getAllRooms.ts fil
import { Room } from "../../models/Room.js"; // Ange sökvägen till din Room-modell
import { useNavigate } from "react-router-dom";

const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      const fetchedRooms = await getAllRooms();
      if (fetchedRooms) {
        setRooms(fetchedRooms);
      } else {
        setError("Failed to fetch rooms");
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
            onClick={() => enterRoom(channel.name)} // Rätt referens till channel._id
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
