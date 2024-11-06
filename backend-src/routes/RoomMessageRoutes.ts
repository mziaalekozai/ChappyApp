// routes/chatMessages.ts
import express, { Request, Response, Router } from "express";
import { ChatMessage } from "../models/RoomMessage.js";
import { fetchAllChatMessages } from "../mongoDB-src/roomMessage/fetchAllChatMessages.js";
import { createChatMessage } from "../mongoDB-src/roomMessage/createChatMessage.js";
import { isValidRoomMessage } from "../data/validationRoomMessage.js";

export const router: Router = express.Router();

router.get("/", async (_, res: Response) => {
  console.log("Get Message route hit");
  try {
    const messages = await fetchAllChatMessages();
    if (messages.length === 0) res.status(404).send("No messages found.");
    res.json(messages);
  } catch (error) {
    console.error("Failed to retrieve messages:", error);
    res.status(500).send("Server error");
  }
});
router.post("/addMessage", async (req: Request, res: Response) => {
  const newDmRoom: ChatMessage = req.body;

  if (!isValidRoomMessage(newDmRoom)) {
    res.status(400).json({
      message: "Invalid message data provided. Please check the fields.",
    });
  }

  try {
    const messageId = await createChatMessage(newDmRoom);
    if (!messageId) {
      res
        .status(400)
        .json({ message: "Failed to create the message in the database." });
    }
    res
      .status(201)
      .json({ message: "Message created successfully", id: messageId });
  } catch (error) {
    console.error("Error inserting Message Rooms:", error);
    res
      .status(500)
      .json({ message: "Internal server error while inserting message." });
  }
});

// router.post("/addMessage", async (req: Request, res: Response) => {
//   const { text, sender, timestamp } = req.body;

//   // Basic validation example
//   if (!text || !sender || !timestamp) {
//     res.status(400).json({ message: "Missing required message fields." });
//   }

//   try {
//     const message: ChatMessage = {
//       sender, timestamp,
//       message: "",
//       channel: ""
//     }; // Assuming these fields are part of your model
//     const messageId = await createChatMessage(message);
//     if (!messageId) {
//       res.status(400).send("Message creation failed.");
//     }
//     res.status(201).json({ message: 'Message created successfully', messageId });
//   } catch (error) {
//     console.error("Message creation failed:", error);
//     res.status(500).send("Server error");
//   }
// });

// router.post("/addMessage", async (req: Request, res: Response) => {
//   const message: ChatMessage = req.body;
//   try {
//     const messageId = await createChatMessage(message);
//     if (!messageId) res.status(400).send("Message creation failed.");
//     res.status(201).send({ messageId });
//   } catch (error) {
//     console.error("Message creation failed:", error);
//     res.status(500).send("Server error");
//   }
// });

export default router;
