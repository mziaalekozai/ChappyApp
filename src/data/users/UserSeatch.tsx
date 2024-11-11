import React, { useState } from "react";
import { User } from "../../models/User"; // Adjust the import path to your User interface

interface UserSearchProps {
  onUserSelect: (user: User) => void; // Optional: callback when a user is selected
}

const UserSearch: React.FC<UserSearchProps> = ({ onUserSelect }) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      setError(null);
      const response = await fetch(`/api/users/search?q=${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users: User[] = await response.json();
      setResults(users);
    } catch (err) {
      setError("An error occurred while searching for users.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Search Users</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}

      <div>
        {results.length > 0 ? (
          <ul>
            {results.map((user) => (
              <li key={user.id} onClick={() => onUserSelect(user)}>
                {user.username}
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
