import { NavigateFunction } from "react-router-dom";

interface LoginResult {
  success: boolean;
  message: string;
}

const handleLogin = async (
  username: string,
  password: string,
  navigate: NavigateFunction,
  setError: (message: string) => void,
  setSuccess: (message: string) => void
): Promise<LoginResult> => {
  if (!username || !password) {
    return {
      success: false,
      message: "Username and password cannot be empty.",
    };
  }

  try {
    // Anropa backend direkt för att försöka logga in
    const response = await fetch(`/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    // Hantera svaret från backend
    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.message || "Login failed.");
      return { success: false, message: errorData.message || "Login failed" };
    }

    const data = await response.json();
    console.log("Login successful:", data.user);

    // Om inloggningen är framgångsrik, sätt framgångsmeddelande och navigera
    setSuccess("Login successful!");
    navigate("/channel");

    return { success: true, message: "Login successful" };
  } catch (error) {
    console.error("Login error:", error);
    setError("Network or server error");
    return { success: false, message: "An error occurred during login." };
  }
};

export default handleLogin;
