import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, roles }) {
  const { user, authLoading } = useAuth();
  const token = localStorage.getItem("token");

  if (authLoading) {
    return null;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/events" replace />;
  }

  return children;
}

export default ProtectedRoute;