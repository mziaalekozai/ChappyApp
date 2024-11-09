import { MongoClient, Collection, WithId } from "mongodb";
import { Dm } from "../../models/DM.js";
import { dmConnect } from "./DMCon.js";

export async function getAllDms(): Promise<WithId<Dm>[]> {
  const [collection, client]: [Collection<Dm>, MongoClient] = await dmConnect();
  try {
    return await collection.find({}).toArray();
  } finally {
    await client.close();
  }
}
