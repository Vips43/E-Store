import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../store/store";

export default function AdminRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but NOT admin
  if (user?.role != "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin → allow access
  return children;
}