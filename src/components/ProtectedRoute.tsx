import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./auth/AuthProvider";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "admin" | "seller" | "buyer";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }

    // If role checking is implemented in the future
    // This is a placeholder for when you implement role-based access
    if (requiredRole && user) {
      // Check if user has the required role
      // const userRole = user.user_metadata?.role;
      // if (userRole !== requiredRole) {
      //   navigate('/unauthorized');
      // }
    }
  }, [isAuthenticated, isLoading, navigate, requiredRole, user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
