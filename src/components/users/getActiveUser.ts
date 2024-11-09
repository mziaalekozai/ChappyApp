// functions/getActiveUser.js
export const getActiveUser = async () => {
  try {
    const response = await fetch("/api/user", { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      return data.username; // Assuming your API returns the username of the active user
    }
  } catch (error) {
    console.error("Failed to fetch active user:", error);
  }
  return null; // Return null if no user is logged in
};

// functions/searchUsers.js
export const searchUsers = async (username) => {
  try {
    const response = await fetch(`/api/users?username=${username}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Failed to search users:", error);
  }
  return null;
};
