import express, { Request, Response, Router } from "express";
import { ChatMessage } from "../models/ChatMessage.js";
import { fetchAllChatMessages } from "../mongoDB-src/roomMessage/fetchAllChatMessages.js";
import { createChatMessage } from "../mongoDB-src/roomMessage/createChatMessage.js";
import {
  isValidRoomMessage,
  RoomMessageSchema,
} from "../data/validationRoomMessage.js";

export const router: Router = express.Router();

router.get("/getMessages", async (_, res: Response) => {
  console.log("Get Message route hit");
  try {
    const messages = await fetchAllChatMessages();
    if (!messages || messages.length === 0) {
      console.error("No messages found");
      res.status(404).send("No messages found.");
    }
    console.log("Fetched messages:", messages);
    res.json(messages);
  } catch (error) {
    console.error("Failed to retrieve messages:", error);
    res.status(500).send("Server error");
  }
});

router.post("/addMessage", async (req: Request, res: Response) => {
  console.log("Request payload received:", req.body);

  const newDmRoom: ChatMessage = req.body;

  if (!isValidRoomMessage(newDmRoom)) {
    console.log(
      "Validation failed:",
      RoomMessageSchema.validate(newDmRoom).error?.details
    );
    res.status(400).json({
      message: "Invalid message data provided. Please check the fields.",
      error: RoomMessageSchema.validate(newDmRoom).error?.details, // Added error details for debugging
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
//   console.log("Request body:", req.body);
//   const newDmRoom: ChatMessage = req.body;

//   // Log payload data
//   console.log("Received payload:", newDmRoom);

//   if (!isValidRoomMessage(newDmRoom)) {
//     console.log("Validation failed:", newDmRoom);
//     res.status(400).json({
//       message: "Invalid message data provided. Please check the fields.",
//     });
//     return; // Add return here to prevent further execution
//   }

//   try {
//     const messageId = await createChatMessage(newDmRoom);
//     if (!messageId) {
//       res
//         .status(400)
//         .json({ message: "Failed to create the message in the database." });
//       return; // Add return here as well to prevent further execution
//     }
//     res
//       .status(201)
//       .json({ message: "Message created successfully", id: messageId });
//   } catch (error) {
//     console.error("Error inserting Message Rooms:", error);
//     res
//       .status(500)
//       .json({ message: "Internal server error while inserting message." });
//   }
// });

export default router;
