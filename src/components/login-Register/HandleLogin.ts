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
    const response = await fetch(`/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.message || "Login failed.");
      return { success: false, message: errorData.message || "Login failed" };
    }

    const data = await response.json();
    console.log("Login successful:", data.user);

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

// import { NavigateFunction } from "react-router-dom";

// interface LoginResult {
//   success: boolean;
//   message: string;
// }

// const handleLogin = async (
//   username: string,
//   password: string,
//   setUser: (user: { username: string } | null) => void,
//   navigate: NavigateFunction,
//   setError: (message: string) => void,
//   setSuccess: (message: string) => void
// ): Promise<LoginResult> => {
//   if (!username || !password) {
//     return {
//       success: false,
//       message: "Username and password cannot be empty.",
//     };
//   }

//   try {
//     const response = await fetch(`/api/user/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       setError(errorData.message || "Login failed.");
//       return { success: false, message: errorData.message || "Login failed" };
//     }

//     const data = await response.json();
//     setUser({ username: data.user.username }); // Sätt `user` i `UserContext`
//     setSuccess("Login successful!");
//     navigate("/channel");

//     return { success: true, message: "Login successful" };
//   } catch (error) {
//     console.error("Login error:", error);
//     setError("Network or server error");
//     return { success: false, message: "An error occurred during login." };
//   }
// };

// export default handleLogin;

// // import { NavigateFunction } from "react-router-dom";

// // interface LoginResult {
// //   success: boolean;
// //   message: string;
// // }

// // const handleLogin = async (
// //   username: string,
// //   password: string,
// //   navigate: NavigateFunction,
// //   setError: (message: string) => void,
// //   setSuccess: (message: string) => void
// // ): Promise<LoginResult> => {
// //   if (!username || !password) {
// //     return {
// //       success: false,
// //       message: "Username and password cannot be empty.",
// //     };
// //   }

// //   try {
// //     const response = await fetch(`/api/user/login`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ username, password }),
// //     });

// //     // Check if the response is not OK and try to handle potential JSON errors gracefully
// //     if (!response.ok) {
// //       let errorMessage = "Login failed.";
// //       try {
// //         const errorData = await response.json();
// //         errorMessage = errorData.message || errorMessage;
// //       } catch (jsonError) {
// //         console.error("Error parsing JSON from response:", jsonError);
// //       }
// //       setError(errorMessage);
// //       return { success: false, message: errorMessage };
// //     }

// //     // If the response is OK, parse it as JSON
// //     const data = await response.json();
// //     console.log("Login successful:", data.user);

// //     // Success actions
// //     setSuccess("Login successful!");
// //     navigate("/channel");

// //     return { success: true, message: "Login successful" };
// //   } catch (error) {
// //     console.error("Login error:", error);
// //     setError("Network or server error");
// //     return { success: false, message: "An error occurred during login." };
// //   }
// // };

// // export default handleLogin;

// // // import { NavigateFunction } from "react-router-dom";

// // // interface LoginResult {
// // //   success: boolean;
// // //   message: string;
// // // }

// // // const handleLogin = async (
// // //   username: string,
// // //   password: string,
// // //   navigate: NavigateFunction,
// // //   setError: (message: string) => void,
// // //   setSuccess: (message: string) => void
// // // ): Promise<LoginResult> => {
// // //   if (!username || !password) {
// // //     return {
// // //       success: false,
// // //       message: "Username and password cannot be empty.",
// // //     };
// // //   }

// // //   try {
// // //     // Anropa backend direkt för att försöka logga in
// // //     const response = await fetch(`/api/user/login`, {
// // //       method: "POST",
// // //       headers: {
// // //         "Content-Type": "application/json",
// // //       },
// // //       body: JSON.stringify({ username, password }),
// // //     });

// // //     // Hantera svaret från backend
// // //     if (!response.ok) {
// // //       const errorData = await response.json();
// // //       setError(errorData.message || "Login failed.");
// // //       return { success: false, message: errorData.message || "Login failed" };
// // //     }

// // //     const data = await response.json();
// // //     console.log("Login successful:", data.user);

// // //     // Om inloggningen är framgångsrik, sätt framgångsmeddelande och navigera
// // //     setSuccess("Login successful!");
// // //     navigate("/channel");

// // //     return { success: true, message: "Login successful" };
// // //   } catch (error) {
// // //     console.error("Login error:", error);
// // //     setError("Network or server error");
// // //     return { success: false, message: "An error occurred during login." };
// // //   }
// // // };

// // // export default handleLogin;
