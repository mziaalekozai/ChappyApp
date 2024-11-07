import axios from "axios";
import { Room } from "../models/Room";
import { Message } from "../models/MessageRom.js";

const BASE_URL = "http://localhost:3000";

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
