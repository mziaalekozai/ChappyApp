// src/users/searchUsers.ts
import { User } from "../../models/User";

export const searchUsers = async (username: string): Promise<User | null> => {
  try {
    const response = await fetch(`/api/user/search?username=${username}`);
    if (!response.ok) throw new Error("User not found.");
    const data = await response.json();
    return data; // Ensure `data` matches `User` interface
  } catch (error) {
    console.error("Error searching user:", error);
    return null;
  }
};
