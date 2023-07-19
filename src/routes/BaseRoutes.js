import { useEffect, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { setAuthToken } from "../utilities/rest";
import "../App.css";

const Home = lazy(() => import("../pages/home/Home"));
const VerifyEmail = lazy(() => import("../pages/forgotPassword/VerifyEmail"));
const ValidationProvider = lazy(() =>
  import("../hooks/UseFormValidationsContext"),
);
const ResetPasswordEmailVerification = lazy(() =>
  import("../pages/resetPassword/ResetPasswordEmailVerification"),
);
const NewPassword = lazy(() => import("../pages/forgotPassword/NewPassword"));
const SignUpVerification = lazy(() =>
  import("../pages/signUpVerification/SignUpVerification"),
);
const ResetPassword = lazy(() =>
  import("../pages/resetPassword/ResetPassword"),
);
const ResturantDashboard = lazy(() =>
  import("../component/mealDashboard/ResturantDashboard"),
);
const GuestHomePage = lazy(() => import("../pages/home/GuestHomePage"));
const AuthHomePage = lazy(() => import("../pages/home/AuthHomePage"));
const SignIn = lazy(() => import("../pages/signIn/SignIn"));
const PaymentCheckout = lazy(() =>
  import("../pages/paymentCheckout/PaymentCheckout"),
);
const SignUp = lazy(() => import("../pages/signUp/SignUp"));
const SettingsDashboard = lazy(() =>
  import("../pages/settingDashboard/SettingsDashboard"),
);
const OrderTracking = lazy(() =>
  import("../pages/orderTracking/OrderTracking"),
);
const ForgotPasswordFlow = lazy(() =>
  import("../pages/forgotPassword/ForgotPasswordFlow"),
);
const Menu = lazy(() => import("../pages/Menu"));
const DeleteVerification = lazy(() =>
  import("../pages/settingDashboard/delete/DeleteVerification"),
);
const ErrorPage = lazy(() => import("../pages/errorPage/error404"));
const Contact = lazy(() => import("../pages/contactPage/Contact"));
const Aboutus = lazy(() => import("../pages/about/Aboutus"));

export const routes = {
  HOME: "/",
  About: "/about",
  Menu: "/menu",
  Contact: "/contact",
  ErrorPage: "/*",
  GuestUserHomepage: "/guest",
  AuthUserHomepage: "/auth-user",
  Signup: "/sign-up",
  Signin: "/sign-in",
  Dashboard: "/meal-dashboard/:vendorName/:foodId",
  SettingsDashboard: "/settings",
  Checkout: "/checkout",
  ForgotPassword: "/forgot-password",
  VerifyResetLink: "/verifyresetlink/",
  ResetPassword: "/reset-password",
  VerifyPasswordLink: "/verify-password/",
  VerifyDeleteLink: "/verify-delete-account/",
  OrderTrack: "/order-tracking",
  CreatePassword: "/create-password",
  VerifySignUp: "/sign-up-verification",
};

const BaseRoutes = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <div className="App">
      <ValidationProvider>
        <Routes>
          <Route path={routes.HOME} element={<Home />} />
          <Route path={routes.GuestUserHomepage} element={<GuestHomePage />} />
          <Route path={routes.About} element={<Aboutus />} />
          <Route path={routes.AuthUserHomepage} element={<AuthHomePage />} />
          <Route path={routes.Signup} element={<SignUp />} />
          <Route
            path={routes.ForgotPassword}
            element={<ForgotPasswordFlow />}
          />
          <Route path={routes.VerifyPasswordLink} element={<VerifyEmail />} />
          <Route
            path={routes.VerifyDeleteLink}
            element={<DeleteVerification />}
          />

          <Route path={routes.CreatePassword} element={<NewPassword />} />
          <Route path={routes.Signin} element={<SignIn />} />
          <Route path={routes.ResetPassword} element={<ResetPassword />} />
          <Route path={routes.Dashboard} element={<ResturantDashboard />} />
          <Route path={routes.OrderTrack} element={<OrderTracking />} />
          <Route path={routes.VerifySignUp} element={<SignUpVerification />} />
          <Route
            path={routes.VerifyResetLink}
            element={<ResetPasswordEmailVerification />}
          />
          <Route path={routes.Checkout} element={<PaymentCheckout />} />
          <Route
            path={routes.SettingsDashboard}
            element={<SettingsDashboard />}
          />
          <Route path={routes.Menu} element={<Menu />} />
          <Route path={routes.ErrorPage} element={<ErrorPage />} />
          <Route path={routes.Contact} element={<Contact />} />
        </Routes>
      </ValidationProvider>
    </div>
  );
};

export default BaseRoutes;
