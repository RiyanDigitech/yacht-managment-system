import { Navigate, Outlet, useLocation } from "react-router-dom";
import tokenService from "@/services/token.service";

interface ProtectedRouteProps {
  roleAllowed: string[];
}

const AUTH_ROUTES = [
  "/admin/login",
  "/admin/forgot-password",
  "/admin/reset-password",
];

const isAuthRoute = (path: string) =>
  AUTH_ROUTES.some((route) => path.startsWith(route));

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roleAllowed }) => {
  const accessToken = tokenService.getLocalAccessToken();
  const userRole = tokenService.getUserRoleFromCookie();
  const { pathname } = useLocation();

  // 1️⃣ If not logged in, redirect to login
  if (!accessToken && !isAuthRoute(pathname)) {
    return <Navigate to="/admin/login" replace />;
  }

  // 2️⃣ If logged in but accessing login/forgot pages — redirect to dashboard
  if (accessToken && isAuthRoute(pathname)) {
    return <Navigate to="/" replace />;
  }

  // 3️⃣ If logged in but role not allowed
  if (accessToken && userRole && !roleAllowed.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Otherwise render the route
  return <Outlet />;
};

export default ProtectedRoute;

// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import tokenService from "@/services/token.service";
// interface ProtectedRouteProps {
//   roleAllowed: string[]; // Array of allowed roles
// }

// const AUTH_ROUTES = [
//   "/admin/login",
//   "/admin/forgot-password",
//   "/admin/reset-password/:token",
// ];
// const isRouteMatch = (pathname: string) => {
//   return AUTH_ROUTES.some((route) => {
//     if (route.includes(":")) {
//       // Handle dynamic routes like "/admin/reset-password/:id"
//       const baseRoute = route.split(":")[0]; // Extract base route "/admin/reset-password/"
//       return pathname.startsWith(baseRoute);
//     }
//     return route === pathname; // Match static routes
//   });
// };
// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roleAllowed }) => {
//   const userRole = tokenService?.getUserRoleFromCookie();
//   const { pathname } = useLocation();
//   const accessToken = tokenService.getLocalAccessToken();

//   if (!accessToken && !isRouteMatch(pathname)) {
//     return <Navigate to="/admin/login" />;
//   }

//   if (accessToken && isRouteMatch(pathname)) {
//     return <Navigate to="/" />;
//   }
//   if (accessToken && (!userRole || !roleAllowed.includes(userRole))) {
//     return <Navigate to="/" />;
//   }
//   return <Outlet />;
// };

// export default ProtectedRoute;
