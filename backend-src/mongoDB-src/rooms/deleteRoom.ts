import { ObjectId } from "mongodb";
import { connectToRoomCollection } from "../rooms/roomCon.js"; // Adjust the path as necessary

export async function deleteRoom(roomId: string): Promise<boolean> {
  const [collection, client] = await connectToRoomCollection();
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(roomId) });
    return result.deletedCount === 1; // Returns true if the room was deleted
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  } finally {
    await client.close();
  }
}
