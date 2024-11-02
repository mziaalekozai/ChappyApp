import bcrypt from "bcrypt";
import { connectToDatabase } from "./userCon.js";
async function loginUser(username, password) {
    const [userCollection] = await connectToDatabase();
    try {
        const user = await userCollection.findOne({
            username: username,
            password: password,
        });
        if (!user) {
            return { success: false, message: "Invalid username or password" };
            console.error("Invalid username or password");
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return { success: true, message: "Login successful", user };
            console.error("Login successful");
        }
        else {
            return { success: false, message: "Invalid password" };
            console.error("Login failed");
        }
    }
    catch (error) {
        console.error("Login error:", error);
        return { success: false, message: "An error occurred during login" };
    }
}
export { loginUser };
