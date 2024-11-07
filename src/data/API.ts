import axios from "axios";
import { Room } from "../models/Room";
import { Message } from "../models/MessageRom.js";

const BASE_URL = "http://localhost:2000";
// const BASE_URL = "";

export const fetchRooms = async (): Promise<Room[]> => {
  const response = await axios.get(`${BASE_URL}/room`);
  return response.data;
};

export const fetchMessages = async (roomId: string): Promise<Message[]> => {
  const response = await axios.get(`${BASE_URL}/message?roomId=${roomId}`);
  return response.data;
};

export const sendMessage = async (message: Partial<Message>): Promise<void> => {
  await axios.post(`${BASE_URL}/message`, message);
};

// export async function getAllRooms(): Promise<Room[] | null> {

//     try {
//         const response = await fetch("/api/rooms", { method: "GET" });
//         if (!response.ok) {
//             console.error("Failed to fetch rooms, status:", response.status);
//             return null;
//         }

//         const rooms: Room[] = await response.json();

//         return (rooms)

//     } catch (error) {
//         console.error("Error fetching rooms:", error);
//         return null
//     }

// }
