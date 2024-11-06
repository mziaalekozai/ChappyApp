import { useAuth } from "./AuthContext"; // Importera din useAuth hook

const HandleLogout = () => {
  const { setUser } = useAuth(); // Använd useAuth för att få tillgång till setUser

  const handleLogout = () => {
    setUser(null); // Nollställ användartillståndet
    localStorage.removeItem("token"); // Ta bort token från localStorage
    window.location.href = "/login";
  };

  return { handleLogout };
};

export default HandleLogout;
