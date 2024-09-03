import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ErrorPage from "../pages/errorPage/ErrorPage";
import { generateRoutes } from "../utils/route.utils";
import { commonRouterNavbarItems } from "../constant/routes.constant";
import Login from "../pages/authentication/login/Login";
import Signup from "../pages/authentication/signup/Signup";
import ResetPassword from "../pages/authentication/passwordRecovery/ResetPassword";
import ProtectedResetPasswordRoute from "./ProtectedResetPasswordRoute";

export const routes = createBrowserRouter([
  // common route
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: generateRoutes(commonRouterNavbarItems),
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
    element: (
      <ProtectedResetPasswordRoute>
        <ResetPassword />
      </ProtectedResetPasswordRoute>
    ),
  },
]);
