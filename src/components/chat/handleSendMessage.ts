// Import the Message interface
import { Message } from "../../models/RoomMessage.js";

interface SendMessageProps {
  message: Message;
  apiUrl: string;
}

/**
 * Sends a message to the server and returns the response.
 */
export async function sendMessage({
  message,
  apiUrl,
}: SendMessageProps): Promise<Message | null> {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Failed to send message, status: ${response.status}`);
    }

    const text = await response.text(); // Read the response as text first to check for empty responses

    if (!text) {
      console.error("No response body.");
      return null;
    }

    try {
      const data = JSON.parse(text); // Try to parse text as JSON
      return data as Message;
    } catch (error) {
      console.error("Failed to parse JSON:", text); // Logs the error and the actual text
      return null;
    }
  } catch (error) {
    console.error("Error sending message:", error);
    return null;
  }
}
