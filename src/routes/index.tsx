import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Navigate } from "react-router-dom";

// import ProtectedRoute from "./protected-routes";
import ChangePassword from "@/pages/auth/change-password";
import ResetNewPassword from "@/pages/auth/reset-new-password";
import FranchiseList from "@/pages/franchise/franchise-list";
import LeadList from "@/pages/lead-management/lead-management";
import ProtectedRoute from "./protected-routes";
import ForGetPassword from "@/pages/auth/forget-password";
import LoginPage from "@/pages/auth/login-page";
import FranchiseLeadList from "@/pages/lead-management/targeted-franchise-lead-list";
import FranchiseDashboardPage from "@/pages/dashboard/dashboard";
// import AddressAutocomplete from "@/pages/location";

const router = createBrowserRouter([
  {
    path: "/admin/reset-password/:token",
    element: <ResetNewPassword />,
    index: true,
  },
  {
    element: <ProtectedRoute roleAllowed={["Admin", "Franchise"]} />,
    children: [
      {
        path: "/admin/login",
        element: <LoginPage />,
        index: true,
      },
     
     
      {
        path: "/admin/change-password",
        element: <ChangePassword />,
        index: true,
      },
      {
        path: "/admin/forgot-password",
        element: <ForGetPassword />,
        index: true,
      },
      {
        element: <DashboardLayout />,
        children: [
          { path: "/", element: <Navigate to="/dashboard" replace /> }, // 👈 added this
          { path: "/dashboard", element: <FranchiseDashboardPage /> },
          { path: "/lead", element: <FranchiseLeadList /> },

        ],
      },
    ],
  },

  // Admin-only routes
  {
    element: <ProtectedRoute roleAllowed={["Admin"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          // { path: "/", element: <DashboardPage /> },

          { path: "/franchise-list", element: <FranchiseList /> },
          { path: "/lead-list", element: <LeadList /> },
        ],
      },
    ],
  },

  // Catch-all for 404 errors
  {
    path: "/admin/login",
    element: <LoginPage />,
  },
]);

export default router;
