import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import MainLayout from "../components/layout/MainLayout";
import {
  commonRouterNavbarItemsInMainLayout,
  routerNavbarItemsInDashboardLayout,
} from "../constant/routes.constant";
import Login from "../pages/authentication/login/Login";
import ResetPassword from "../pages/authentication/passwordRecovery/ResetPassword";
import Signup from "../pages/authentication/signup/Signup";
import ErrorPage from "../pages/errorPage/ErrorPage";
import { generateRoutes } from "../utils/route.utils";
import ProtectedResetPasswordRoute from "./ProtectedResetPasswordRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: generateRoutes(commonRouterNavbarItemsInMainLayout),
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: routerNavbarItemsInDashboardLayout,
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
