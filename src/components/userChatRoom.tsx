import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRoomMessages } from "../data/chat/fetchRoomsMessages";
import { postNewMessage } from "../data/chat/postRoomsMessages";
import { RoomMessage } from "../models/RoomMessage";
import "../styles/ChatRoom.css";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa"; // Importera ikoner

const RoomChat = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<RoomMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const messageDivRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadMessages = useCallback(async () => {
    const fetchedMessages = await fetchRoomMessages(roomId!);
    if (fetchedMessages) {
      setMessages(fetchedMessages);
      scrollToBottom();
    } else {
      setError("Failed to load messages");
    }
  }, [roomId]);

  const handleSendMessage = async () => {
    if (messageInput.trim() === "") return;

    const newMessage: Partial<RoomMessage> = {
      senderName: "username",
      messageText: messageInput,
      roomName: roomId,
      date: new Date(),
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

  const scrollToBottom = () => {
    if (messageDivRef.current) {
      messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const handleBack = () => {
    navigate("/channel");
  };

  return (
    <div className="chat-room-container">
      <div className="back-button" onClick={handleBack}>
        <FaArrowLeft /> {/* Back ikon */}
      </div>
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
        <div className="input-wrapper">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
          />
          <FaPaperPlane
            className="send-icon"
            onClick={handleSendMessage}
            title="Send"
          />
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default RoomChat;
