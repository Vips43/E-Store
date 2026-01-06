import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";


export default function ProtectedRoute({ children }) {
  const isAuth = useAuthStore((state) => state.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
