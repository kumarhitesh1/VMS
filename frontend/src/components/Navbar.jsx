import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">
        Volunteer Registration System
      </h2>

      <div className="font-medium">
        Welcome, {user?.name || "User"}
      </div>
    </header>
  );
}

export default Navbar;