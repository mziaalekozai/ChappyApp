import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar"; // Adjust the path if necessary
import { useUser } from "../context/UserContext";

const Root = () => {
  const { user, setUser } = useUser();

  return (
    <section>
      <Navbar user={user} setUser={setUser} />
      <Outlet />
    </section>
  );
};

export default Root;
