import React, { createContext, useState, useEffect, useContext } from "react";

interface User {
  username: string;
  role: string;
}

interface UserContextProps {
  user: User | null;
  isGuest: boolean;
  setUser: (user: User | null) => void;
  setIsGuest: (isGuest: boolean) => void;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  isGuest: false,
  setUser: () => {},
  setIsGuest: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isGuest, setIsGuestState] = useState<boolean>(false);

  const setUser = (user: User | null) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    setUserState(user);
  };

  const setIsGuest = (isGuest: boolean) => {
    localStorage.setItem("isGuest", JSON.stringify(isGuest));
    setIsGuestState(isGuest);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedIsGuest = localStorage.getItem("isGuest");

    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }

    if (storedIsGuest) {
      setIsGuestState(JSON.parse(storedIsGuest) === true);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, isGuest, setUser, setIsGuest }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook för att använda UserContext
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
