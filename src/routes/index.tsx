import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./protected-routes";

// Layout
import DashboardLayout from "@/components/layouts/dashboard-layout";

// Auth
import LoginPage from "@/pages/auth/login-page";
import ForGetPassword from "@/pages/auth/forget-password";
import ResetNewPassword from "@/pages/auth/reset-new-password";
import ChangePassword from "@/pages/auth/change-password";

// Pages
import FranchiseDashboardPage from "@/pages/dashboard/dashboard";
// import DashboardPage from "@/pages/dashboard";
// import FranchiseList from "@/pages/franchise/franchise-list";
// import LeadList from "@/pages/lead-management/lead-management";
import FranchiseLeadList from "@/pages/lead-management/targeted-franchise-lead-list";
import YachtDetail from "@/components/modules/yatch/YachtDetail";
import BlockPeriodsTable from "@/components/modules/BlockedPeriods/BlockedPeriodsTable";
import AddonsTable from "@/components/modules/Addons/AddonsTable";
import IncentiveLevelTable from "@/components/modules/Incentive-level/IncentivelevelTable";
import UserTable from "@/components/modules/users/UserTable";
import InvoiceTable from "@/components/modules/invoice/InvoiceTable";
import DetailPageBooking from "@/components/modules/booking/DetailsPageBooking";
import Booking from "@/pages/booking/Booking";
import Celender from "@/components/modules/celender/Celender";
import Facilities from "@/pages/facilities/facilities";
import Yatch from "@/pages/yatch/Yatch";
import Home from "@/pages/home/home";
import AboutPage from "@/pages/About/AboutPage";
import NotFound from "@/components/NotFound";
import CustomerPage from "@/pages/Customers/CustomerPage"
import CustomerBooking from "@/pages/booking/CustomerBooking";


const router = createBrowserRouter([
  // Public Pages
  { path: "/", element: <Home /> },
  { path: "/about", element: <AboutPage /> },

  // Auth Pages
  { path: "/login", element: <LoginPage /> },
  { path: "/forgot-password", element: <ForGetPassword /> },
  { path: "/reset-password", element: <ResetNewPassword /> },

  // Admin (Owner)
  {
    element: (
      <ProtectedRoute roleAllowed={["Owner" , "Sales Person" , "Customer"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: <FranchiseDashboardPage /> },
      { path: "/lead", element: <FranchiseLeadList /> },
      { path: "/yacht", element: <Yatch /> },
      { path: "/addons", element: <AddonsTable /> },
      { path: "/customers", element: <CustomerPage /> },
      { path: "/bookings", element: <Booking /> },
      { path: "/celender", element: <Celender /> },
      { path: "/view-booking/:id", element: <DetailPageBooking /> },
      { path: "/invoices/:id", element: <InvoiceTable /> },
      { path: "/blockedperiods", element: <BlockPeriodsTable /> },
      { path: "/incentivelevels", element: <IncentiveLevelTable /> },
      { path: "/users", element: <UserTable /> },
      { path: "/yatch/:id", element: <YachtDetail /> },
      { path: "/change-password", element: <ChangePassword /> },
      { path: "/facilities", element: <Facilities /> },
    ],
  },

  // Sales Person
  {
    element: (
      <ProtectedRoute roleAllowed={["Sales Person"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: <FranchiseDashboardPage /> },
      { path: "/yacht", element: <Yatch /> },
      { path: "/addons", element: <AddonsTable /> },
      { path: "/customers", element: <CustomerPage /> },
      { path: "/bookings", element: <Booking /> },
    ],
  },

  // Customer Routes
  {
    element: (
      <ProtectedRoute roleAllowed={["Customer"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
     { path: "/booking", element: <CustomerBooking /> },
    ],
  },

  //  404
  { path: "*", element: <NotFound /> },
]);

export default router;
