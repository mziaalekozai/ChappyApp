import { useState } from "react";

const UserSearch = ({ username }: { username: string }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/user/search?query=${searchTerm}`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Error searching users:", err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const createDM = async (otherUser: string) => {
    try {
      const response = await fetch("/api/dm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user1: username, user2: otherUser }),
      });

      if (response.ok) {
        alert(`DM created with ${otherUser}!`);
      } else {
        throw new Error("Failed to create DM");
      }
    } catch (err) {
      console.error("Error creating DM:", err);
      alert("Failed to create DM");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {results.length === 0 && !loading && searchTerm && (
          <p>No users found.</p>
        )}
        {results.map((user) => (
          <li key={user} onClick={() => createDM(user)}>
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;

// // src/users/searchUsers.ts
// import { User } from "../../models/User";

// export const searchUsers = async (username: string): Promise<User | null> => {
//   try {
//     const response = await fetch(`/api/user/search?username=${username}`);
//     if (!response.ok) throw new Error("User not found.");
//     const data = await response.json();
//     return data; // Ensure `data` matches `User` interface
//   } catch (error) {
//     console.error("Error searching user:", error);
//     return null;
//   }
// };
