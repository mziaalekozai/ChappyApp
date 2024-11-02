import { MongoClient } from "mongodb";
// Environment variable for MongoDB connection string
const dbConnection = process.env.CONNECTION_STRING;
export async function connectToDatabase() {
    if (!dbConnection) {
        console.error("Database connection string is missing in the environment settings.");
        throw new Error("Database connection string is undefined.");
    }
    const mongoClient = await MongoClient.connect(dbConnection);
    const database = mongoClient.db("Chappy");
    const userCollection = database.collection("user");
    return [userCollection, mongoClient];
}
// // models/user.js
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });
// const User = mongoose.model("User", userSchema);
// export default User;
