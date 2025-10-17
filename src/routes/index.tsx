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
import DashboardPage from "@/pages/dashboard";
import Yatch from "@/pages/yatch/Yatch";
import Invoice from "@/pages/invoice/Invoice";
import Booking from "@/pages/booking/Booking";
import DetailPageBooking from "@/components/modules/booking/DetailsPageBooking";


import AddonsTable from "@/components/modules/Addons/AddonsTable";
import BlockPeriodsTable from "@/components/modules/BlockedPeriods/BlockedPeriodsTable";

import YachtDetail from "@/components/modules/yatch/YachtDetail";

// import AddressAutocomplete from "@/pages/location";
import Invoice from "@/pages/invoice/Invoice";
import Booking from "@/pages/booking/Booking";
import DetailPageBooking from "@/components/modules/booking/DetailsPageBooking";
import YachtDetail from "@/components/modules/yatch/YachtDetail";
import BlockPeriodsTable from "@/components/modules/BlockedPeriods/BlockedPeriodsTable";
import AddonsTable from "@/components/modules/Addons/AddonsTable";

const router = createBrowserRouter([
  {
  path: "/reset-password",
  element: <ResetNewPassword />,
  index: true,
},

  {
    element: <ProtectedRoute roleAllowed={["Owner", "Salesman"]} />,
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
          { path: "/yatch", element: <Yatch /> },
          { path: "/invoices", element: <Invoice /> },
          { path: "/bookings", element: <Booking /> },
          { path: "/view-booking/:id", element: <DetailPageBooking /> },

        ],
      },
    ],
  },

  // Admin-only routes
  {
    element: <ProtectedRoute roleAllowed={["Salesman"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/", element: <Navigate to="/dashboard" replace /> },
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/franchise-list", element: <FranchiseList /> },
          { path: "/lead-list", element: <LeadList /> },
        ],
      },
    ],
  },

  // Salesman routes
  {
    element: <ProtectedRoute roleAllowed={["Owner"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/", element: <Navigate to="/dashboard" replace /> },
          { path: "/dashboard", element: <FranchiseDashboardPage /> },
          { path: "/lead", element: <FranchiseLeadList /> },
          { path: "/yacht", element: <Yatch /> },

          { path: "/addons", element: <AddonsTable /> },
          { path: "/blockedperiods", element: <BlockPeriodsTable /> },

          { path: "/yatch/:id", element: <YachtDetail /> },

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

// import { createBrowserRouter } from "react-router-dom";
// import DashboardLayout from "@/components/layouts/dashboard-layout";
// import { Navigate } from "react-router-dom";

// // import ProtectedRoute from "./protected-routes";
// import ChangePassword from "@/pages/auth/change-password";
// import ResetNewPassword from "@/pages/auth/reset-new-password";
// import FranchiseList from "@/pages/franchise/franchise-list";
// import LeadList from "@/pages/lead-management/lead-management";
// import ProtectedRoute from "./protected-routes";
// import ForGetPassword from "@/pages/auth/forget-password";
// import LoginPage from "@/pages/auth/login-page";
// import FranchiseLeadList from "@/pages/lead-management/targeted-franchise-lead-list";
// import FranchiseDashboardPage from "@/pages/dashboard/dashboard";
// import DashboardPage from "@/pages/dashboard";
// import Yatch from "@/pages/yatch/Yatch";
// // import AddressAutocomplete from "@/pages/location";

// const router = createBrowserRouter([
//   {
//   path: "/reset-password",
//   element: <ResetNewPassword />,
//   index: true,
// },

//   {
//     element: <ProtectedRoute roleAllowed={["Owner", "Salesman"]} />,
//     children: [
//       {
//         path: "/admin/login",
//         element: <LoginPage />,
//         index: true,
//       },
     
     
//       {
//         path: "/admin/change-password",
//         element: <ChangePassword />,
//         index: true,
//       },
//       {
//         path: "/admin/forgot-password",
//         element: <ForGetPassword />,
//         index: true,
//       },
//       {
//         element: <DashboardLayout />,
//         children: [
//           { path: "/", element: <Navigate to="/dashboard" replace /> }, // 👈 added this
//           { path: "/dashboard", element: <FranchiseDashboardPage /> },
//           { path: "/lead", element: <FranchiseLeadList /> },
//           { path: "/yatch", element: <Yatch /> },

//         ],
//       },
//     ],
//   },

//   // Admin-only routes
//   {
//     element: <ProtectedRoute roleAllowed={["Owner"]} />,
//     children: [
//       {
//         element: <DashboardLayout />,
//         children: [
//           { path: "/", element: <DashboardPage /> },

//           { path: "/franchise-list", element: <FranchiseList /> },
//           { path: "/lead-list", element: <LeadList /> },
//         ],
//       },
//     ],
//   },

//   // Catch-all for 404 errors
//   {
//     path: "/admin/login",
//     element: <LoginPage />,
//   },
// ]);

// export default router;
