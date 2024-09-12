import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ErrorPage from "../pages/errorPage/ErrorPage";
import { generateRouteItems, generateRoutes } from "../utils/route.utils";
import {
  adminDashboardNames,
  commonRouterNavbarItemsInMainLayout,
} from "../constant/routes.constant";
import Login from "../pages/authentication/login/Login";
import Signup from "../pages/authentication/signup/Signup";
import ResetPassword from "../pages/authentication/passwordRecovery/ResetPassword";
import ProtectedResetPasswordRoute from "./ProtectedResetPasswordRoute";
import DashboardLayout from "../components/layout/DashboardLayout";

export const routes = createBrowserRouter([
  // common route
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: generateRoutes(commonRouterNavbarItemsInMainLayout),
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: generateRouteItems(adminDashboardNames),
  },
  {
    path: "/admin",
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/reset-password",
    element:
      // prettier-ignore
      <ProtectedResetPasswordRoute> <ResetPassword /></ProtectedResetPasswordRoute>,
  },
]);
