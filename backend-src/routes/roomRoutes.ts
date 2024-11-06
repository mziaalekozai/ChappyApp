import express, { Request, Response } from "express";
import { fetchAllRooms } from "../mongoDB-src/rooms/fetchAllRoom.js";
import { addRoom } from "../mongoDB-src/rooms/addRoom.js";
import { validateRoom } from "../data/validationRoom.js";
import { Room } from "../models/Room.js";
import { deleteRoom } from "../mongoDB-src/rooms/deleteRoom.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const rooms = await fetchAllRooms();
    res.json(rooms);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to retrieve rooms", error: error.message });
    } else {
      res.status(500).json({ message: "Failed to retrieve rooms" });
    }
  }
});

router.post("/addRoom", async (req: Request, res: Response) => {
  const room: Room = req.body;

  // Validate room data
  if (!validateRoom(room)) {
    res.status(400).json({ message: "Invalid room data provided" });
  }

  try {
    const roomId = await addRoom(room);
    res.status(201).json({ message: "Room added successfully", roomId });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message === "Room with the same name already exists."
    ) {
      res.status(400).json({ message: error.message });
    } else if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to add room", error: error.message });
    } else {
      res.status(500).json({ message: "Failed to add room" });
    }
  }
});
router.delete("/:id", async (req: Request, res: Response) => {
  const roomId = req.params.id;

  try {
    const wasDeleted = await deleteRoom(roomId);
    if (wasDeleted) {
      res.status(200).json({ message: "Room deleted successfully" });
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete room", error });
  }
});

export default router;
