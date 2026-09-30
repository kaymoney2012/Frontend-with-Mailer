import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
