import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../styles/DMList.css";

const DMList = () => {
  const [dmList, setDmList] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
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
    <div className="container">
      <h2 className="dm-title">Your Conversations</h2>
      <button className="new-chat-button" onClick={() => navigate("/new-chat")}>
        New Chat
      </button>
      {error && <p className="error-message">{error}</p>}
      <ul className="dm-list">
        {dmList.map((name) => (
          <li key={name} className="dm-item">
            <span className="dm-link" onClick={() => openChat(name)}>
              Chat with {name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DMList;
