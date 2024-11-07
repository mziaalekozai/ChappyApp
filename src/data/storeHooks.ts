// import { createContext, useContext, useState, ReactNode } from "react";
// import { Room } from "../models/Room.js";
// import { User } from "../models/User.js";

// interface StoreContextType {
//   rooms: Room[];
//   setRooms: (rooms: Room[]) => void;
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

// const StoreContext = createContext<StoreContextType | undefined>(undefined);

// export const StoreProvider = ({ children }: { children: ReactNode }) => {
//   const [rooms, setRooms] = useState<Room[]>([]);
//   const [user, setUser] = useState<User | null>(null);

//   return (
//     <StoreContext.Provider value={{ rooms, setRooms, user, setUser }}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

// export const useStore = (): StoreContextType => {
//   const context = useContext(StoreContext);
//   if (!context) {
//     throw new Error("useStore must be used within a StoreProvider");
//   }
//   return context;
// };
