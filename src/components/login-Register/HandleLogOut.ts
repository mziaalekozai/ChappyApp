// HandleLogOut.ts
export default async function handleLogout() {
  try {
    const response = await fetch("/api/user", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      console.log("Logout successful");
      return true;
    } else {
      console.error("Logout failed");
      return false;
    }
  } catch (error) {
    console.error("Error during logout:", error);
    return false;
  }
}
