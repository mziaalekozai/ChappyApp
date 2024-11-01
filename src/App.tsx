import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Root from "./router/Root.js";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Root />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
