// import {user} from '../../models/User'

// const createDM = async (otherUser: string) => {
//   try {
//     const response = await fetch("/api/dm", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ user1: username, user2: otherUser }),
//     });

//     if (response.ok) {
//       setSuccessMessage(`DM created with ${otherUser}!`);
//     } else {
//       throw new Error("Failed to create DM");
//     }
//   } catch (err) {
//     console.error("Error creating DM:", err);
//     setError("Failed to create DM");
//   }
// };

// import { useState } from "react";

// const UserSearch = ({ username }: { username: string }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState<string[]>([]);

//   const handleSearch = async () => {
//     const response = await fetch(`/api/user/search?query=${searchTerm}`);
//     const data = await response.json();
//     setResults(data);
//   };

//   const createDM = async (otherUser: string) => {
//     const response = await fetch("/api/dm", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ user1: username, user2: otherUser }),
//     });

//     if (response.ok) {
//       alert("DM created!");
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search users..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>
//       <ul>
//         {results.map((user) => (
//           <li key={user} onClick={() => createDM(user)}>
//             {user}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserSearch;
