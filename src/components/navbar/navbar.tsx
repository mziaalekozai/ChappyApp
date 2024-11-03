// import { Navbar, Container } from "react-bootstrap";

// const MyNavbar = () => {
//   return (
//     <Navbar
//       bg="dark"
//       variant="dark"
//       className="mb-4"
//       style={{ height: "3.75rem" }}
//     >
//       <Container>
//         <h2>
//           <link to="/">ChattApp</link>
//         </h2>
//         {/* <Navbar.Brand href="#home">ChattApp</Navbar.Brand> */}
//       </Container>
//     </Navbar>
//   );
// };

// export default MyNavbar;

// import Logo from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="nav-Left">
          {/* <NavLink to="/">
            <img className="logo" src={Logo} alt="logo" />
          </NavLink> */}
          <NavLink to="/">Chat</NavLink>
        </div>
        <div className="nav-Center">
          <NavLink to="/channel">Channel</NavLink>
        </div>
        <div className="nav-Right">
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
