import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DM } from "../models/Dm";

const DMList: React.FC<{ username: string }> = ({ username }) => {
  const [dms, setDms] = useState<DM[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDMs = async () => {
      try {
        const response = await fetch(`/api/dm/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch DMs");
        }
        const data = await response.json();
        setDms(data);
      } catch (err) {
        setError("Error fetching DMs");
        console.error(err);
      }
    };

    fetchDMs();
  }, [username]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ul>
      {dms.map((dm) => (
        <li
          key={dm._id}
          onClick={() => navigate(`/dm/${dm._id}`)} // Navigate to DM chat
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
        >
          {dm.senderName} ↔ {dm.receiverName}
        </li>
      ))}
    </ul>
  );
};
export default DMList;
