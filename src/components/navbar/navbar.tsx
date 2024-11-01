import Logo from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="nav-Left">
          <NavLink to="/">
            <img className="logo" src={Logo} alt="logo" />
          </NavLink>
        </div>
        <div className="nav-Center">
          <NavLink to="/">Home</NavLink>
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
