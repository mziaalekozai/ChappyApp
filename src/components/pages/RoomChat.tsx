import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

const RoomChat = () => {
  const { roomId } = useParams<{ roomId: string }>(); // roomId från URL:en
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Hämta alla meddelanden för rummet
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get<Message[]>(
          `http://localhost:3000/room/${roomId}/message`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to load messages");
      }
    };
    if (roomId) {
      fetchMessages();
    }
  }, [roomId]);

  // Hantera nytt meddelande
  const sendMessage = async () => {
    if (newMessage.trim() === "") return; // Om meddelandet är tomt

    try {
      await axios.post(`http://localhost:3000/room/${roomId}/message`, {
        content: newMessage,
        sender: "User", // Här kan du ersätta "User" med det faktiska användarnamnet
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          sender: "User",
          content: newMessage,
          timestamp: new Date().toISOString(),
        },
      ]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message");
    }
  };

  return (
    <div>
      <h2>Room Chat</h2>
      {error && <p>{error}</p>}
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.sender}:</strong> {message.content}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default RoomChat;
