import { connectToDatabase } from "./userCon.js"; // Ensure this path is correct for your database connection utility
// Function to add a user to the database
async function addUser(user) {
    const [userCollection, client] = await connectToDatabase();
    try {
        const result = await userCollection.insertOne(user);
        if (!result.acknowledged) {
            console.error("Could not add a new user - insertion not acknowledged");
            return null;
        }
        return result.insertedId;
    }
    catch (error) {
        console.error("Error adding user:", error);
        throw new Error("Failed to add user due to database error");
    }
    finally {
        await client.close();
    }
}
export { addUser };
// // Import necessary modules and types
// import { MongoClient, Collection, InsertOneResult, ObjectId } from "mongodb";
// import { User } from "../../models/user.js"; // Ensure this path correctly points to your User model
// import { connectToDatabase } from "./userCon.js"; // Ensure this path is correct for your database connection utility
// // Function to add a user to the database
// async function addUser(user: User): Promise<ObjectId | null> {
//   const [userCollection, client]: [Collection<User>, MongoClient] =
//     await connectToDatabase();
//   try {
//     const result: InsertOneResult<User> = await userCollection.insertOne(user);
//     if (!result.acknowledged) {
//       console.log("Could not add a new user");
//       return null;
//     }
//     return result.insertedId;
//   } finally {
//     client.close();
//   }
// }
// export { addUser };
// import { Request, Response } from "express";
// // import { Users } from "../../data/mockUser.js";
// import {User} from "../../models/user.js";
// import bcrypt from "bcrypt";
// import validator from "validator";
// import jwt from "jsonwebtoken";
// // Register User
// const registerUser = async (req: Request, res: Response) => {
//   const { username, email, password } = req.body;
//   // let user = await Users.findOne({ email: email });
//   let user = await User.findOne({ email: email });
//   if (user) return res.status(400).json("Email already exists");
//   if (!username || !email || !password)
//     return res.status(400).json("All fields are required...");
//   if (!validator.isEmail(email))
//     return res.status(400).json("Email must be valid email...");
//   if (!validator.isStrongPassword(password))
//     return res.status(400).json("Password must be Storong password...");
//   user = new User({ username, email, password });
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(password, salt);
//   try {
//     await user.save();
//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET_KEY as string,
//       {
//         expiresIn: "10d",
//       }
//     );
//     res.status(201).json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json("Server Error");
//   }
// };
// export default registerUser;
