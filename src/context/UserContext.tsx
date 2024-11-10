import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  username: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// import React, {
//   createContext,
//   useState,
//   useContext,
//   ReactNode,
//   Dispatch,
//   SetStateAction,
// } from "react";
// import { User } from "../models/User.js"; // Import your User interface here

// interface UserContextProps {
//   user: User | null;
//   setUser: Dispatch<SetStateAction<User | null>>;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const useUser = (): UserContextProps => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// };

// export const UserProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | null>(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
