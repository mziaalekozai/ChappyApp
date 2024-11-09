import { User } from "../../models/User";

async function searchUsers(id: string): Promise<User | undefined> {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      console.log("User not found!");
      return undefined;
    }

    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error("Network error: ", error);
    return undefined;
  }
}

export { searchUsers };
