import express, { Request, Response } from "express";
import { fetchAllRooms } from "../mongoDB-src/rooms/fetchAllRoom.js";
import { addRoom } from "../mongoDB-src/rooms/addRoom.js";
import { validateRoom } from "../data/validationRoom.js";
import { Room } from "../models/Room.js";
import { deleteRoom } from "../mongoDB-src/rooms/deleteRoom.js";
import { getMessagesByRoomId } from "../mongoDB-src/roomMessage/getMessagesByRoomId.js";
import { addMessageToRoom } from "../mongoDB-src/roomMessage/addMessageToRoom.js";
const router = express.Router();

// Route för att hämta alla rum (med eller utan filter baserat på användartyp)
router.get("/", async (req: Request, res: Response) => {
  try {
    const userType = req.query.userType as string;
    let rooms;
    if (userType === "guest") {
      rooms = await fetchAllRooms({ isActive: true });
    } else {
      rooms = await fetchAllRooms();
    }
    res.json(rooms);
  } catch (error: unknown) {
    res.status(500).json({
      message: "Failed to retrieve rooms",
      error: error instanceof Error ? error.message : undefined,
    });
  }
});

// Route för att hämta meddelanden för ett specifikt rum
router.get("/:roomId/message", async (req: Request, res: Response) => {
  const roomId = req.params.roomId;
  try {
    const messages = await getMessagesByRoomId(roomId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve messages", error });
  }
});

// Route för att lägga till ett nytt meddelande i ett specifikt rum
router.post("/:roomId/message", async (req: Request, res: Response) => {
  const roomId = req.params.roomId;
  const { content, sender } = req.body;
  try {
    const newMessage = await addMessageToRoom(roomId, content, sender);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Failed to add message", error });
  }
});

// Route för att lägga till ett nytt rum
router.post("/addRoom", async (req: Request, res: Response) => {
  const room: Room = req.body;
  if (!validateRoom(room)) {
    res.status(400).json({ message: "Invalid room data provided" });
  }
  try {
    const roomId = await addRoom(room);
    res.status(201).json({ message: "Room added successfully", roomId });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Failed to add room",
      error: error instanceof Error ? error.message : undefined,
    });
  }
});

// Route för att ta bort ett rum
router.delete("/:id", async (req: Request, res: Response) => {
  const roomId = req.params.id;
  try {
    const wasDeleted = await deleteRoom(roomId);
    res.status(wasDeleted ? 200 : 404).json({
      message: wasDeleted ? "Room deleted successfully" : "Room not found",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete room", error });
  }
});

export default router;

// // roomRoutes.ts
// import express, { Request, Response } from "express";
// import { fetchAllRooms } from "../mongoDB-src/rooms/fetchAllRoom.js";
// import { addRoom } from "../mongoDB-src/rooms/addRoom.js";
// import { validateRoom } from "../data/validationRoom.js";
// import { Room } from "../models/Room.js";
// import { deleteRoom } from "../mongoDB-src/rooms/deleteRoom.js";

// const router = express.Router();

// router.get("/", async (req: Request, res: Response) => {
//   try {
//     const userType = req.query.userType as string;

//     let rooms;
//     if (userType === "guest") {
//       // Endast hämta rum med isActive: true för gäster
//       rooms = await fetchAllRooms({ isActive: true });
//     } else {
//       // Hämta alla rum för inloggade användare
//       rooms = await fetchAllRooms();
//     }

//     res.json(rooms);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res
//         .status(500)
//         .json({ message: "Failed to retrieve rooms", error: error.message });
//     } else {
//       res.status(500).json({ message: "Failed to retrieve rooms" });
//     }
//   }
// });

// router.post("/addRoom", async (req: Request, res: Response) => {
//   const room: Room = req.body;

//   if (!validateRoom(room)) {
//     res.status(400).json({ message: "Invalid room data provided" });
//     return;
//   }

//   try {
//     const roomId = await addRoom(room);
//     res.status(201).json({ message: "Room added successfully", roomId });
//   } catch (error: unknown) {
//     if (
//       error instanceof Error &&
//       error.message === "Room with the same name already exists."
//     ) {
//       res.status(400).json({ message: error.message });
//     } else if (error instanceof Error) {
//       res
//         .status(500)
//         .json({ message: "Failed to add room", error: error.message });
//     } else {
//       res.status(500).json({ message: "Failed to add room" });
//     }
//   }
// });

// router.delete("/:id", async (req: Request, res: Response) => {
//   const roomId = req.params.id;

//   try {
//     const wasDeleted = await deleteRoom(roomId);
//     if (wasDeleted) {
//       res.status(200).json({ message: "Room deleted successfully" });
//     } else {
//       res.status(404).json({ message: "Room not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete room", error });
//   }
// });

// export default router;

// // import express, { Request, Response } from "express";
// // import { fetchAllRooms } from "../mongoDB-src/rooms/fetchAllRoom.js";
// // import { addRoom } from "../mongoDB-src/rooms/addRoom.js";
// // import { validateRoom } from "../data/validationRoom.js";
// // import { Room } from "../models/Room.js";
// // import { deleteRoom } from "../mongoDB-src/rooms/deleteRoom.js";
// // // import { isValidUser } from "../data/validationUser.js";

// // const router = express.Router();
// // router.get("/", async (req: Request, res: Response) => {
// //   try {
// //     const userType = req.query.userType as string; // Ex. user eller guest

// //     let rooms;
// //     if (userType === "guest") {
// //       // Endast hämta rum med isActive: true för gäster
// //       rooms = await fetchAllRooms({ isActive: true });
// //     } else {
// //       // Hämta alla rum för inloggade användare
// //       rooms = await fetchAllRooms();
// //     }

// //     res.json(rooms);
// //   } catch (error: unknown) {
// //     if (error instanceof Error) {
// //       res
// //         .status(500)
// //         .json({ message: "Failed to retrieve rooms", error: error.message });
// //     } else {
// //       res.status(500).json({ message: "Failed to retrieve rooms" });
// //     }
// //   }
// // });

// // // router.get("/", async (_req, res) => {
// // //   try {
// // //     const rooms = await fetchAllRooms();
// // //     res.json(rooms);
// // //   } catch (error: unknown) {
// // //     if (error instanceof Error) {
// // //       res
// // //         .status(500)
// // //         .json({ message: "Failed to retrieve rooms", error: error.message });
// // //     } else {
// // //       res.status(500).json({ message: "Failed to retrieve rooms" });
// // //     }
// // //   }
// // // });

// // router.post("/addRoom", async (req: Request, res: Response) => {
// //   const room: Room = req.body;

// //   // Validate room data
// //   if (!validateRoom(room)) {
// //     res.status(400).json({ message: "Invalid room data provided" });
// //   }

// //   try {
// //     const roomId = await addRoom(room);
// //     res.status(201).json({ message: "Room added successfully", roomId });
// //   } catch (error: unknown) {
// //     if (
// //       error instanceof Error &&
// //       error.message === "Room with the same name already exists."
// //     ) {
// //       res.status(400).json({ message: error.message });
// //     } else if (error instanceof Error) {
// //       res
// //         .status(500)
// //         .json({ message: "Failed to add room", error: error.message });
// //     } else {
// //       res.status(500).json({ message: "Failed to add room" });
// //     }
// //   }
// // });
// // router.delete("/:id", async (req: Request, res: Response) => {
// //   const roomId = req.params.id;

// //   try {
// //     const wasDeleted = await deleteRoom(roomId);
// //     if (wasDeleted) {
// //       res.status(200).json({ message: "Room deleted successfully" });
// //     } else {
// //       res.status(404).json({ message: "Room not found" });
// //     }
// //   } catch (error) {
// //     res.status(500).json({ message: "Failed to delete room", error });
// //   }
// // });

// // export default router;