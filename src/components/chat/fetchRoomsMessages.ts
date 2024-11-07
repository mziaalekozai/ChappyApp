import { RoomMessage } from "../../models/RoomMessage.js"; // Anpassa sökvägen för din modell

export async function fetchRoomMessages(): Promise<RoomMessage[] | null> {
  try {
    const response = await fetch(`/api/message/getMessages`, {
      method: "GET",
    });
    if (!response.ok) {
      console.error("Failed to fetch messages, status:", response.status);
      return null;
    }
    const messages: RoomMessage[] = await response.json();
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return null;
  }
}
