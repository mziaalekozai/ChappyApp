import { useEffect, useState } from "react";
import { getAllRooms } from "../../allFunctions/getAllRooms.js"; // Ange den korrekta sökvägen till din getAllRooms.ts fil
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

//   const enterRoom = (someRoomId: string) => {
//     // navigate(`/room/${roomId}`);
//     navigate(`/room/${someRoomId}`);
//   };

//   return (
//     <div>
//       <h2>Channels</h2>
//       {error && <p>{error}</p>}
//       <ul>
//         {rooms.map((channel) => (
//           <li
//             key={channel._id}
//             onClick={() => enterRoom(rooms._id)} // Lägg till onClick på kanalens namn
//             style={{
//               cursor: "pointer",
//               color: "blue",
//               textDecoration: "underline",
//             }} // Gör det tydligt att det är klickbart
//           >
//             {channel.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
//   return (
//     <div>
//       {error ? (
//         <p>{error}</p>
//       ) : (
//         rooms.map((room) => <div key={room._id}>{room.name}</div>) // Antag att varje rum har en 'id' och 'name'
//       )}
//     </div>
//   );
// };

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Room } from "../../models/Room.js"; // Kontrollera att sökvägen är korrekt
// import { useNavigate } from "react-router-dom"; // För navigering

// const Channels = () => {
//   const [channels, setChannels] = useState<Room[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchChannels = async () => {
//       try {
//         const response = await axios.get<Room[]>("http://localhost:2000/room");
//         console.log("Fetched channels data:", response.data);
//         setChannels(response.data);
//       } catch (error) {
//         console.error("Error fetching channels:", error);
//         setError("Failed to load channels");
//       }
//     };
//     fetchChannels();
//   }, []);

//   // Navigera till ett specifikt rum baserat på roomId
//   const enterRoom = (roomId: string) => {
//     navigate(`/room/${roomId}`);
//   };

//   return (
//     <div>
//       <h2>Channels</h2>
//       {error && <p>{error}</p>}
//       <ul>
//         {channels.map((channel) => (
//           <li
//             key={channel._id}
//             onClick={() => enterRoom(channel._id)} // Lägg till onClick på kanalens namn
//             style={{
//               cursor: "pointer",
//               color: "blue",
//               textDecoration: "underline",
//             }} // Gör det tydligt att det är klickbart
//           >
//             {channel.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Channels;
