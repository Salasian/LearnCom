import { Navigate, useLocation } from "react-router-dom";
import useServices from "../services/useServices";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useServices();
  const location = useLocation();

  if (!user.username) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
