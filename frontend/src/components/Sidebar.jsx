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
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      <div className="px-6 py-6 border-b border-slate-800">
        <h1 className="text-lg font-semibold tracking-tight">
          Volunteer System
        </h1>
        {user?.role === "admin" && (
          <span className="mt-1 inline-block text-xs font-medium text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded">
            Admin
          </span>
        )}
      </div>

      <nav className="p-3 space-y-1 flex-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-full bg-indigo-500" />
              )}
              <span className="text-base">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;