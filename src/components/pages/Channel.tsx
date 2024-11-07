import { useEffect, useState } from "react";
import axios from "axios";
import { Room } from "../../models/Room.js"; // Kontrollera att sökvägen är korrekt
import { useNavigate } from "react-router-dom"; // För navigering

const Channels = () => {
  const [channels, setChannels] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get<Room[]>("http://localhost:2000/room");
        console.log("Fetched channels data:", response.data);
        setChannels(response.data);
      } catch (error) {
        console.error("Error fetching channels:", error);
        setError("Failed to load channels");
      }
    };
    fetchChannels();
  }, []);

  // Navigera till ett specifikt rum baserat på roomId
  const enterRoom = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  return (
    <div>
      <h2>Channels</h2>
      {error && <p>{error}</p>}
      <ul>
        {channels.map((channel) => (
          <li
            key={channel._id}
            onClick={() => enterRoom(channel._id)} // Lägg till onClick på kanalens namn
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }} // Gör det tydligt att det är klickbart
          >
            {channel.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;
