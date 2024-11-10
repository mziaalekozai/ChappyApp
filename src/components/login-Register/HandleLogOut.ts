const handleLogout = async (): Promise<boolean> => {
  try {
    const response = await fetch("/api/user/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      localStorage.removeItem("token"); // Adjust if using other storage for tokens
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
};

export default handleLogout;

// const handleLogout = async (
//   setUser: (user: null) => void
// ): Promise<boolean> => {
//   try {
//     const response = await fetch("/api/user/logout", {
//       method: "POST",
//       credentials: "include",
//     });
//     if (response.ok) {
//       // Radera token från localStorage eller vad du än använder för att lagra token
//       localStorage.removeItem("token");
//       setUser(null); // Anropa setUser här om det behövs
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.error("Logout error:", error);
//     return false;
//   }
// };

// export default handleLogout;

// // const handleLogout = async (): Promise<boolean> => {
// //   try {
// //     const response = await fetch("/api/user/logout", {
// //       method: "POST",
// //       credentials: "include", // Behåll credentials om du använder sessionshantering
// //     });

// //     if (response.ok) {
// //       // Rensa token från localStorage
// //       localStorage.removeItem("token");
// //       return true;
// //     } else {
// //       console.error("Logout failed:", response.statusText);
// //       return false;
// //     }
// //   } catch (error) {
// //     console.error("Logout error:", error);
// //     return false;
// //   }
// // };

// // export default handleLogout;

// // // // src/login-Register/HandleLogOut.ts
// // // const handleLogout = async (): Promise<boolean> => {
// // //   try {
// // //     const response = await fetch("/api/user/logout", {
// // //       method: "POST",
// // //       credentials: "include",
// // //     });
// // //     return response.ok;
// // //   } catch (error) {
// // //     console.error("Logout error:", error);
// // //     return false;
// // //   }
// // // };

// // // export default handleLogout;

// // // // // HandleLogOut.ts
// // // // export default async function handleLogout() {
// // // //   try {
// // // //     const response = await fetch("/api/user", {
// // // //       method: "POST",
// // // //       credentials: "include",
// // // //     });

// // // //     if (response.ok) {
// // // //       console.log("Logout successful");
// // // //       return true;
// // // //     } else {
// // // //       console.error("Logout failed");
// // // //       return false;
// // // //     }
// // // //   } catch (error) {
// // // //     console.error("Error during logout:", error);
// // // //     return false;
// // // //   }
// // // // }
