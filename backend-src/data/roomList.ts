import { Room } from "../models/Room.js";

export const roomList: Room[] = [
  // Updated room objects with new property names
  {
    name: "Enchanted Grove",
    isLocked: true,
    imageUrl: "https://picsum.photos/200/200?random=10",
  },
  {
    name: "Whispering Pines",
    isLocked: false,
    imageUrl: "https://picsum.photos/200/200?random=9",
  },
  {
    name: "Room 1",
    isLocked: true,
    imageUrl: "https://picsum.photos/200/200?random=8",
  },
  {
    name: "Room 2",
    isLocked: false,
    imageUrl: "https://picsum.photos/200/200?random=7",
  },
  {
    name: "Room 3",
    isLocked: false,
    imageUrl: "https://picsum.photos/200/200?random=6",
  },
];
