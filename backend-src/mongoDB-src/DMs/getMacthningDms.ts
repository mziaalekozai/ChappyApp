import { Collection, WithId, MongoClient } from "mongodb";
import { Dm } from "../../models/DM.js";
import { dmConnect } from "./DMCon.js";

export async function getMatchingDms(username: string): Promise<WithId<Dm>[]> {
  const [collection, client]: [Collection<Dm>, MongoClient] = await dmConnect();
  try {
    return await collection
      .find({
        $or: [{ receiverName: username }, { senderName: username }],
      })
      .toArray();
  } finally {
    await client.close();
  }
}
