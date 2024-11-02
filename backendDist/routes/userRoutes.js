import express from "express";
import { fetchAllUsers } from "../mongoDB-src/users/getAllUser.js";
import { ObjectId } from "mongodb";
import { fetchUserById } from "../mongoDB-src/users/getUserById.js";
import { isValidUser } from "../data/validationUser.js";
import { addUser } from "../mongoDB-src/users/addUser.js";
import { updateUser } from "../mongoDB-src/users/updateUsers.js";
import { deleteUser } from "../mongoDB-src/users/deleteUser.js";
import { loginUser } from "../mongoDB-src/users/loginUser.js";
export const router = express.Router();
router.get("/", async (_req, res) => {
    try {
        const users = await fetchAllUsers();
        if (users.length === 0) {
            res.status(404).send("No users found");
        }
        else {
            res.status(200).json(users);
        }
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const mongoObjectId = new ObjectId(id);
        const user = await fetchUserById(mongoObjectId);
        // if (user.length === 0) {
        if (!ObjectId.isValid(id)) {
            res.status(404).send("No users found");
        }
        else {
            res.status(200).json(user);
        }
    }
    catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.post("/addUser", async (req, res) => {
    try {
        const newUser = req.body;
        const userId = await addUser(newUser);
        if (!isValidUser(newUser)) {
            // console.log("Invalid user data:", newUser);
            res.status(400).json({ message: "Failed to create user. Invalid data." });
        }
        else if (!userId) {
            res.status(409).json({ message: "User already exists." }); // 409 Conflict
        }
        else {
            res.status(201).json({ ...newUser, _id: userId });
        }
    }
    catch (error) {
        console.error("Error adding user:", error);
        if (!res.headersSent) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
});
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
        if (!ObjectId.isValid(id)) {
            res.status(404).send("No users found");
        }
        const objectId = new ObjectId(id);
        const result = await updateUser(objectId, body);
        if (!result) {
            res.status(404).json({
                message: "No user found with the given ID or no changes made.",
            });
        }
        else if (result.matchedCount === 0) {
            res.status(404).json({ message: "No user found with the given ID." });
        }
        else {
            res.status(200).json({ message: "User updated successfully" });
        }
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        if (!ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid user ID format." });
        }
        const objectId = new ObjectId(id);
        const result = await deleteUser(objectId);
        if (!result) {
            res.status(404).json({
                message: "No user found with the given ID or deletion failed.",
            });
        }
        else if (result.deletedCount === 0) {
            res.status(404).json({ message: "No user found with the given ID." });
        }
        else {
            res.status(200).json({ message: "User deleted successfully" });
        }
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    if (result.success) {
        res.status(200).json({ message: result.message, user: result.user });
    }
    else {
        res.status(401).json({ message: result.message });
    }
});
export default router;
