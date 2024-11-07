import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMessages, sendMessage } from "../../data/API";
import { Message } from "../../models/MessageRom.js";

const Chat = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    const loadMessages = async () => {
      if (channelId) {
        try {
          const fetchedMessages = await fetchMessages(channelId);
          setMessages(fetchedMessages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };
    loadMessages();
  }, [channelId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await sendMessage({
        textMessage: newMessage,
        roomName: channelId!,
        senderName: "User", // Replace with actual user name
        date: new Date(),
      });
      setNewMessage("");
      const updatedMessages = await fetchMessages(channelId!);
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <strong>{message.senderName}:</strong> {message.textMessage}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
