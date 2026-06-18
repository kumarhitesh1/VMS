import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaUsers,
  FaCalendarAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaChartBar />,
      adminOnly: true,
    },
    {
      name: "Volunteers",
      path: "/volunteers",
      icon: <FaUsers />,
      adminOnly: true,
    },
    {
      name: "Events",
      path: "/events",
      icon: <FaCalendarAlt />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
  ].filter((item) => !item.adminOnly || user?.role === "admin");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">
          Volunteer System
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-slate-700"
                : "hover:bg-slate-800"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;