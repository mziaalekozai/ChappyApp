import { connectToDatabase } from "../users/userCon.js";
let client;
async function fetchAllUsers() {
    try {
        const [userCollection, dbClient] = await connectToDatabase();
        client = dbClient; // Assign to outer scope for finally block
        // const cursor: FindCursor<WithId<User>> = userCollection.find({});
        // const users: WithId<User>[] = await cursor.toArray();
        const users = await userCollection.find({}).toArray();
        console.log("Fetched all users from the database.", users);
        if (!users.length) {
            console.log("No users found in the database.");
        }
        return users;
    }
    catch (error) {
        console.error("Failed to fetch users:", error);
        throw error; // Rethrow after logging
    }
    finally {
        if (client) {
            await client.close();
        }
    }
}
export { fetchAllUsers };
