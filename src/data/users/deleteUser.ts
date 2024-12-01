// import { useNavigate } from "react-router-dom";

const deleteUser = async (userId: string | undefined) => {
  if (!userId) {
    console.error("No user ID provided for deletion.");
    return;
  }

  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete user.");
    }

    console.log("User deleted successfully.");
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};

export default deleteUser;
