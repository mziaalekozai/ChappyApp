import bcrypt from "bcrypt";
import { connectToDatabase } from "./userCon.js";
async function loginUser(email, password) {
    const [userCollection] = await connectToDatabase();
    try {
        const user = await userCollection.findOne({ email: email });
        if (!user) {
            return { success: false, message: "User not found" };
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            return { success: true, message: "Login successful", user };
        }
        else {
            return { success: false, message: "Invalid password" };
        }
    }
    catch (error) {
        console.error("Login error:", error);
        return { success: false, message: "An error occurred during login" };
    }
}
export { loginUser };
