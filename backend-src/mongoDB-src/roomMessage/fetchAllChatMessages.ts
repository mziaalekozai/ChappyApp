import { connectToChatDB } from "./roomMessageCon.js";
import { ChatMessage } from "../../models/RoomMessage.js";
import { MongoClient, Collection, WithId } from "mongodb";

async function fetchAllChatMessages(): Promise<WithId<ChatMessage>[]> {
  const [col, client]: [Collection<ChatMessage>, MongoClient] =
    await connectToChatDB();
  const result: WithId<ChatMessage>[] = await col.find({}).toArray();
  await client.close();
  return result;
}
export { fetchAllChatMessages };
