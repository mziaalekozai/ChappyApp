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

// import { User } from "../../models/User";

// async function searchUsers(id: string): Promise<User | undefined> {
//   try {
//     const response = await fetch(`/api/users/${id}`, {
//       method: "GET",
//     });

//     if (!response.ok) {
//       console.log("User not found!");
//       return undefined;
//     }

//     const user: User = await response.json();
//     return user;
//   } catch (error) {
//     console.error("Network error: ", error);
//     return undefined;
//   }
// }

// export { searchUsers };
