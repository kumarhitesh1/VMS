import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
        Volunteer Registration System
      </h2>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-semibold flex items-center justify-center">
          {(user?.name || "U").charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-slate-600">
          {user?.name || "User"}
        </span>
      </div>
    </header>
  );
}

export default Navbar;