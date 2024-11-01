import { MongoClient, Collection, InsertOneResult, ObjectId } from "mongodb";
import { User } from "../../models/user.js";
import { connectToDatabase } from "./userCon.js";

async function addUser(user: User): Promise<ObjectId | null> {
  const [userCollection, client]: [Collection<User>, MongoClient] =
    await connectToDatabase();

  try {
    const result: InsertOneResult<User> = await userCollection.insertOne(user);
    if (!result.acknowledged) {
      console.error("Could not add a new user - insertion not acknowledged");
      return null;
    }
    return result.insertedId;
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Failed to add user due to database error");
  } finally {
    await client.close();
  }
}

export { addUser };
