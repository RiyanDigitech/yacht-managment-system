import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Navigate } from "react-router-dom";

// import ProtectedRoute from "./protected-routes";
import ChangePassword from "@/pages/auth/change-password";
import ResetNewPassword from "@/pages/auth/reset-new-password";
import FranchiseList from "@/pages/franchise/franchise-list";
import LeadList from "@/pages/lead-management/lead-management";
//import ProtectedRoute from "./protected-routes";
import ForGetPassword from "@/pages/auth/forget-password";
import LoginPage from "@/pages/auth/login-page";
import FranchiseLeadList from "@/pages/lead-management/targeted-franchise-lead-list";
import FranchiseDashboardPage from "@/pages/dashboard/dashboard";
import DashboardPage from "@/pages/dashboard";
import Yatch from "@/pages/yatch/Yatch";
import YachtDetail from "@/components/modules/yatch/YachtDetail";

import BlockPeriodsTable from "@/components/modules/BlockedPeriods/BlockedPeriodsTable";
import AddonsTable from "@/components/modules/Addons/AddonsTable";
import IncentiveLevelTable from "@/components/modules/Incentive-level/IncentivelevelTable";
import UserTable from "@/components/modules/users/UserTable";

import Facilities from "@/pages/facilities/facilities";
import InvoiceTable from "@/components/modules/invoice/InvoiceTable";
import DetailPageBooking from "@/components/modules/booking/DetailsPageBooking";
import Booking from "@/pages/booking/Booking";
import Celender from "@/components/modules/celender/Celender";
import Home from "@/pages/home/home";
import AboutPage from "@/pages/About/AboutPage";
import NotFound from "@/components/NotFound";
import ProtectedRoute from "./protected-routes";
// import AddressAutocomplete from "@/pages/location";


const router = createBrowserRouter([
  {
  path: "/reset-password",
  element: <ResetNewPassword />,
  index: true,
},
  {
  path: "/login",
  element: <LoginPage />,
  index: true,
},

  {
    // element: <ProtectedRoute roleAllowed={["Owner", "Sales Person"]} />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
     
     
      {
        path: "/admin/change-password",
        element: <ChangePassword />,
        index: true,
      },
       { path: "*", element: <NotFound /> },
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
          { path: "/facilities", element: <Facilities /> },
          { path: "/bookings", element: <Booking /> },
        ],
      },
    ],
  },
  

  
  // Salesman routes
  

      {
        element: <ProtectedRoute roleAllowed={["Sales Person"]} />,
        children: [
          { path: "/", element: <DashboardPage /> },
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/bookings", element: <Booking /> },
          { path: "/franchise-list", element: <FranchiseList /> },
          { path: "/lead-list", element: <LeadList /> },
        ],
      },
 
// Admin-only routes
  
      {
        element: <ProtectedRoute roleAllowed={["Owner"]} />,
        children: [
          { path: "/", element: <Navigate to="/dashboard" replace /> },
          { path: "/dashboard", element: <FranchiseDashboardPage /> },
          { path: "/lead", element: <FranchiseLeadList /> },
          { path: "/yacht", element: <Yatch /> },
          { path: "/addons", element: <AddonsTable /> },
          { path: "/bookings", element: <Booking /> },
          { path: "/celender", element: <Celender /> },
          { path: "/view-booking/:id", element: <DetailPageBooking /> },
          { path: "/invoices/:id", element: <InvoiceTable /> },
          { path: "/blockedperiods", element: <BlockPeriodsTable /> },
          { path: "/incentivelevels", element: <IncentiveLevelTable /> },
          { path: "/users", element: <UserTable /> },


          { path: "/yatch/:id", element: <YachtDetail /> },
           { path: "/", element: <Home /> },
  
        ],
      },
    
  
  // Websites Routes
  { path: "/", element: <Home /> },
  { path: "/about", element: <AboutPage /> },
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
