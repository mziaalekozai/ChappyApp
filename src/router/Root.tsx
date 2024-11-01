import "../App.css";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar.js";
const Root = () => {
  return (
    <div>
      <div className="root">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Root;
