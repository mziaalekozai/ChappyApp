import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRoomMessages } from "../data/chat/fetchRoomsMessages";
import { postNewMessage } from "../data/chat/postRoomsMessages";
import { getAllRooms } from "../data/rooms/getAllRooms"; // Importera din getAllRooms-funktion
import { RoomMessage } from "../models/RoomMessage";
import "../styles/ChatRoom.css";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { useUser } from "../context/UserContext";

const RoomChat = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<RoomMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [roomName, setRoomName] = useState<string>("Loading...");
  const messageDivRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    // Hämtar alla rum och sätter det aktuella rummets namn
    const fetchRoomName = async () => {
      try {
        const rooms = await getAllRooms();
        if (rooms) {
          const currentRoom = rooms.find((room) => room._id === roomId); // Filtrera rummet
          if (currentRoom) {
            setRoomName(currentRoom.name || "Unknown Room");
          } else {
            setRoomName("Unknown Room");
          }
        } else {
          setRoomName("Unknown Room");
        }
      } catch (error) {
        console.error("Error fetching room name:", error);
        setRoomName("Unknown Room");
      }
    };

    if (roomId) {
      fetchRoomName();
    }
  }, [roomId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await fetchRoomMessages(roomId!);
        if (fetchedMessages) {
          setMessages(fetchedMessages);
          scrollToBottom();
        } else {
          setError("Failed to load messages");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to load messages");
      }
    };

    if (roomId) {
      fetchMessages();
    }
  }, [roomId]);

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !user?.username || !roomId) return;

    const newMessage = {
      senderName: user.username,
      messageText: messageInput,
      roomName: roomId,
      date: new Date(),
    };

    try {
      const responseMessage = await postNewMessage(newMessage);
      if (responseMessage) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...newMessage, _id: responseMessage._id },
        ]);
        setMessageInput("");
        messageDivRef.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    if (messageDivRef.current) {
      messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight;
    }
  };

  const handleBack = () => {
    navigate("/channel");
  };

  return (
    <div className="chat-room-container">
      <div className="back-button" onClick={handleBack}>
        <FaArrowLeft />
        Back
      </div>
      <h2>Room: {roomName}</h2> {/* Visa roomName här */}
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
