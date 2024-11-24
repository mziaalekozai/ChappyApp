import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const DMList = () => {
  const [dmList, setDmList] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser(); // Hämta den inloggade användaren
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDMList = async () => {
      try {
        const response = await fetch(
          `/api/dm/dm-list?username=${user?.username}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch DM list");
        }
        const data = await response.json();
        setDmList(data);
      } catch (err) {
        setError("Error fetching DM list");
        console.error(err);
      }
    };

    if (user?.username) {
      fetchDMList();
    }
  }, [user]);

  const openChat = (recipientName: string) => {
    navigate(`/dm/${recipientName}`);
  };

  return (
    <div className="room-list-container">
      <h2>Your Conversations</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="room-list">
        {dmList.map((name) => (
          <li key={name} className="room-item">
            <span className="room-link open" onClick={() => openChat(name)}>
              Chat with {name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DMList;
