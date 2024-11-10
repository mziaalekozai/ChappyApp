import { useContext } from "react";
import { UserContext } from "./UserContext"; // Justera sökvägen om det behövs

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
