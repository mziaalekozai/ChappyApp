import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { FaArrowLeft } from "react-icons/fa"; // Importera back-ikon

const DMChat = () => {
  const { recipientName } = useParams<{ recipientName: string }>();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useUser(); // Hämta inloggad användare
  const navigate = useNavigate();
  const messageDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `/api/dm/between?user1=${user?.username}&user2=${recipientName}`
        );
        const data = await response.json();
        setMessages(data.messages || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (user?.username && recipientName) {
      fetchMessages();
    }
  }, [user, recipientName]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user?.username || !recipientName) return;

    const newMessageData = {
      senderName: user.username,
      receiverName: recipientName,
      textMessage: newMessage,
    };

    try {
      const response = await fetch("/api/dm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessageData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { ...newMessageData, date: new Date(), _id: data.id },
        ]);
        setNewMessage("");
        messageDivRef.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigera tillbaka till föregående sida
  };

  return (
    <div className="chat-room-container">
      <div className="back-button" onClick={handleBack}>
        <FaArrowLeft /> Back {/* Back-knapp med ikon */}
      </div>
      <h2>Chat with {recipientName}</h2>
      <div className="messages-container" ref={messageDivRef}>
        {messages.map((msg) => (
          <div key={msg._id} className="message-item">
            <strong>{msg.senderName}</strong>{" "}
            <em>({new Date(msg.date).toLocaleString()}):</em> {msg.textMessage}
          </div>
        ))}
      </div>
      <div className="message-input-container">
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

export default DMChat;
