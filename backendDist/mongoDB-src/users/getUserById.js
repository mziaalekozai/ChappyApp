import { connectToDatabase } from "./userCon.js";
async function fetchUserById(userId) {
    try {
        const [userCollection, databaseClient] = await connectToDatabase();
        const query = { _id: userId };
        const userCursor = userCollection.find(query);
        const userResult = await userCursor.toArray();
        if (userResult.length === 0) {
            console.log("No user available with the provided ID.");
        }
        await databaseClient.close();
        return userResult;
    }
    catch (error) {
        console.error("Error retrieving user by ID:", error);
        throw error;
    }
}
export { fetchUserById };
