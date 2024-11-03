// HandleLogin.ts
import axios from "axios";

const handleLogin = async (
  username: string,
  password: string,
  setError: (message: string) => void
) => {
  try {
    const { data } = await axios.post("http://localhost:3000/user/login", {
      username,
      password,
    });
    console.log("Login successful.", data.user);
    // Additional logic to handle login success
    return data; // Optionally return data if needed
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      setError(error.response.data.message || "An unknown error occurred");
    } else {
      setError("Network or server error");
    }
  }
};

export default handleLogin;
