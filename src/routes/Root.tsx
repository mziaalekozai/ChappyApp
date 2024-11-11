import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; // Adjust the path if necessary

const Root = () => (
  <section>
    <Navbar /> {/* No need to pass user and setUser as props */}
    <Outlet />
  </section>
);

export default Root;

// import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar"; // Adjust the path if necessary
// import { useUser } from "../context/UserContext";

// const Root = () => {
//   const { user, setUser } = useUser();

//   return (
//     <section>
//       <Navbar user={user} setUser={setUser} />
//       <Outlet />
//     </section>
//   );
// };

// export default Root;
