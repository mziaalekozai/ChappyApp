// fetchAllRooms.ts
import { MongoClient, Collection, WithId } from "mongodb";
import { connectToRoomCollection } from "../rooms/roomCon.js";
import { Room } from "../../models/Room.js";

async function fetchAllRooms(
  filter: Partial<Room> = {}
): Promise<WithId<Room>[]> {
  const [collection, client]: [Collection<Room>, MongoClient] =
    await connectToRoomCollection();

  try {
    const result: WithId<Room>[] = await collection.find(filter).toArray();
    return result;
  } finally {
    await client.close();
  }
}

export { fetchAllRooms };

// import { MongoClient, Collection, WithId } from "mongodb";
// import { connectToRoomCollection } from "../rooms/roomCon.js";
// import { Room } from "../../models/Room.js";

// async function fetchAllRooms(): Promise<WithId<Room>[]> {
//   const [collection, client]: [Collection<Room>, MongoClient] =
//     await connectToRoomCollection();

//   try {
//     const result: WithId<Room>[] = await collection.find({}).toArray();
//     return result;
//   } finally {
//     await client.close();
//   }
// }

// export { fetchAllRooms };