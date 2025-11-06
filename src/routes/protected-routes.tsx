import { Navigate, Outlet, useLocation } from "react-router-dom";
import tokenService from "@/services/token.service";

interface ProtectedRouteProps {
  roleAllowed: string[];
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  roleAllowed,
  children,
}) => {
  const accessToken = tokenService.getLocalAccessToken();
  const userRole = tokenService.getUserRoleFromCookie();
  const location = useLocation();

  // 🔒 Token missing → redirect to /login
  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ❌ Role missing → redirect to login
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Normalize roles for safe comparison
  const normalizedUserRole = userRole.trim().toLowerCase();
  const allowedRoles = roleAllowed.map((r) => r.trim().toLowerCase());

  // ❌ If role not allowed → redirect based on actual role
  if (!allowedRoles.includes(normalizedUserRole)) {
    if (normalizedUserRole === "Owner") {
      return <Navigate to="/dashboard" replace />;
    }
    if (normalizedUserRole === "Sales Person") {
      return <Navigate to="/dashboard" replace />;
    }
    if (normalizedUserRole === "Customer") {
      return <Navigate to="/" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  // ✅ Authorized → show layout
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
