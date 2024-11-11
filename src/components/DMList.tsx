import React, { useEffect, useState } from "react";
import { DM } from "../models/Dm";
import "../../styles/DMList.css";

export const DMList: React.FC<{ username: string }> = ({ username }) => {
  const [dms, setDms] = useState<DM[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the DMs for the logged-in user
    const fetchDMs = async () => {
      try {
        const response = await fetch(`/api/dm/user/${username}`);
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
    <div>
      <h2>Your Direct Messages</h2>
      {dms.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <ul>
          {dms.map((dm) => (
            <li key={dm._id}>
              <p>
                <strong>{dm.senderName}</strong>: {dm.textMessage}
              </p>
              <p>
                <small>To: {dm.receiverName}</small>
              </p>
              <p>
                <small>Date: {new Date(dm.date).toLocaleString()}</small>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
