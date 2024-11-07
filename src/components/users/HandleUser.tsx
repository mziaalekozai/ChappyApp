const handleUser = async (
  url: string,
  credentials: { username?: string; email?: string; password: string },
  setError: (message: string) => void,
  setSuccess: (message: string) => void
) => {
  try {
    const response = await fetch(`/api/user/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.message || `Failed to ${url}.`);
      return;
    }

    const data = await response.json();
    console.log(`${url} successful.`, data.user);
    setSuccess(`${url} successful!`);
    return data;
  } catch (error) {
    console.error("Error:", error);
    setError("Network or server error");
  }
};

export default handleUser;

// import axios from "axios";

// const handleUser = async (
//   url: string,
//   credentials: { username?: string; email?: string; password: string },
//   setError: (message: string) => void,
//   setSuccess: (message: string) => void // Added to handle success messages
// ) => {
//   try {
//     const { data } = await axios.post(
//       `http://localhost:3000/user/${url}`,
//       credentials
//     );
//     console.log(`${url} successful.`, data.user);
//     setSuccess(`${url} successful!`); // Notify success state
//     return data; // Optionally return data if needed
//     console.log(data);
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error) && error.response) {
//       setError(error.response.data.message || `Failed to ${url}.`);
//     } else {
//       setError("Network or server error");
//     }
//   }
// };

// export default handleUser;

// // // HandleLogin.ts
// // import axios from "axios";

// // const handleLogin = async (
// //   username: string,
// //   password: string,
// //   setError: (message: string) => void
// // ) => {
// //   try {
// //     const { data } = await axios.post("http://localhost:3000/user/login", {
// //       username,
// //       password,
// //     });
// //     console.log("Login successful.", data.user);
// //     // Additional logic to handle login success
// //     return data; // Optionally return data if needed
// //   } catch (error: unknown) {
// //     if (axios.isAxiosError(error) && error.response) {
// //       setError(error.response.data.message || "An unknown error occurred");
// //     } else {
// //       setError("Network or server error");
// //     }
// //   }
// // };

// // export default handleLogin;
