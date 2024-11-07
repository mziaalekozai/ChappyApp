import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRoomMessages } from "./fetchRoomsMessages";
import { postNewMessage } from "./postRoomsMessages";
import { RoomMessage } from "../../models/RoomMessage"; // Anpassa sökvägen för din modell
import "./ChatRoom.css"; // Anpassa din CSS-fil

const RoomChat = () => {
  const { roomId } = useParams<{ roomId: string }>(); // roomId från URL:en
  const [messages, setMessages] = useState<RoomMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const messageDivRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Hämta alla meddelanden för rummet
  const loadMessages = useCallback(async () => {
    const fetchedMessages = await fetchRoomMessages(roomId!);
    if (fetchedMessages) {
      setMessages(fetchedMessages);
      scrollToBottom();
    } else {
      setError("Failed to load messages");
    }
  }, [roomId]); // Lägg till `roomId` som beroende

  // Skicka ett nytt meddelande
  const handleSendMessage = async () => {
    if (messageInput.trim() === "") return;

    const newMessage: Partial<RoomMessage> = {
      senderName: "User", // Använd den inloggade användarens namn här om det finns
      messageText: messageInput,
      roomName: roomId,
      date: new Date(), // Använd Date-objekt direkt
    };

    const responseMessage = await postNewMessage(newMessage);
    if (responseMessage) {
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
      setMessageInput("");
      scrollToBottom();
    } else {
      setError("Failed to send message");
    }
  };

  // Scrolla till botten för att visa senaste meddelandet
  const scrollToBottom = () => {
    if (messageDivRef.current) {
      messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const handleBack = () => {
    navigate("/channel"); // Anpassa vägen för att gå tillbaka
  };

  return (
    <div className="chat-room-container">
      <button onClick={handleBack} className="back-button">
        Go Back
      </button>
      <h2>Room: {roomId}</h2>

      <div className="messages-container" ref={messageDivRef}>
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message._id} className="message-item">
              <strong>{message.senderName}:</strong> {message.messageText}
              <p className="timestamp">
                {new Date(message.date).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No messages in this room yet.</p>
        )}
      </div>

      <div className="message-input-container">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default RoomChat;
