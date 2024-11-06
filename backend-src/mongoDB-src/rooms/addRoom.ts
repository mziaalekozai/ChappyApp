import { connectToRoomCollection } from "./roomCon.js";
import { Room } from "../../models/Room.js";
import { Collection, InsertOneResult, MongoClient, ObjectId } from "mongodb";

export async function addRoom(room: Room): Promise<ObjectId | null> {
  const [collection, client]: [Collection<Room>, MongoClient] =
    await connectToRoomCollection();
  try {
    // Check if a room with the same name already exists
    const existingRoom = await collection.findOne({ name: room.name });
    if (existingRoom) {
      throw new Error("Room with the same name already exists.");
    }

    // If no existing room, proceed to create a new one
    const result: InsertOneResult<Room> = await collection.insertOne(room);
    return result.insertedId;
  } finally {
    await client.close();
  }
}
