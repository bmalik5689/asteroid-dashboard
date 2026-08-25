import { Outlet, Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <Link to="/">Dashboard</Link>
        <Link to="/about">About</Link>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Sidebar;
