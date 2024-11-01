import express, { Router, Request, Response } from "express";
import { fetchAllUsers } from "../mongoDB-src/users/getAllUser.js";
import { ObjectId, WithId } from "mongodb";
import { User } from "../models/user.js";
import { fetchUserById } from "../mongoDB-src/users/getUserById.js";
import { isValidUser } from "../data/validationUser.js";
import { addUser } from "../mongoDB-src/users/addUser.js";

export const router: Router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const users: WithId<User>[] = await fetchAllUsers();
    if (users.length === 0) {
      res.status(404).send("No users found");
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const mongoObjectId: ObjectId = new ObjectId(id);
    const user = await fetchUserById(mongoObjectId);
    // if (user.length === 0) {
    if (!ObjectId.isValid(id)) {
      res.status(404).send("No users found");
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const newUser: User = req.body;

    if (!isValidUser(newUser)) {
      res.status(400).json({ message: "Failed to create user. Invalid data." });
    }

    const userId = await addUser(newUser);
    if (!userId) {
      res
        .status(500)
        .json({ message: "Failed to add the user to the database." });
    }

    res.status(201).json({ ...newUser, _id: userId });
  } catch (error) {
    console.error("Error adding user:", error);
    // Check if headers have already been sent
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

export default router;
