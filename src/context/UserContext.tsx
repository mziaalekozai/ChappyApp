import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  username: string;
}

interface UserContextType {
  user: User | null;
  isGuest: boolean;
  setUser: (user: User | null) => void;
  setIsGuest: (isGuest: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ user, setUser, isGuest, setIsGuest }}>
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
