/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { setAuthToken } from "./utilities/rest";
import VerifyEmail from "./pages/forgotPassword/VerifyEmail";
import ValidationProvider from "./hooks/UseFormValidationsContext";
import ResetPasswordEmailVerification from "./pages/resetPassword/ResetPasswordEmailVerification";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import NewPassword from "./pages/forgotPassword/NewPassword";
import SignUpVerification from "./pages/signUpVerification/SignUpVerification";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import ResturantDashboard from "./component/mealDashboard/ResturantDashboard";
import GuestHomePage from "./pages/home/GuestHomePage";
import AuthHomePage from "./pages/home/AuthHomePage";
import SignIn from "./pages/signIn/SignIn";
import PaymentCheckout from "./pages/paymentCheckout/PaymentCheckout";
import SignUp from "./pages/signUp/SignUp";
import Home from "./pages/home/Home";
import SettingsDashboard from "./pages/settingDashboard/SettingsDashboard";
import OrderTracking from "./pages/orderTracking/OrderTracking";
import "./App.css";
import Menu from "./pages/Menu";
import ForgotPasswordFlow from "./pages/forgotPassword/ForgotPasswordFlow";

const App = () => {
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
          <Route path="guest" element={<GuestHomePage />} />
          <Route path="/" element={<Home />} />
          <Route path="auth-user" element={<AuthHomePage />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPasswordFlow />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route
            path="forgot-password-verification"
            element={<VerifyEmail />}
          />
          <Route path="create-new-password" element={<NewPassword />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route
            path="/meal-dashboard/:vendorName/:foodId"
            element={<ResturantDashboard />}
          />
          <Route path="order-tracking" element={<OrderTracking />} />
          <Route path="sign-up-verification" element={<SignUpVerification />} />
          <Route
            path="reset-password-verification"
            element={<ResetPasswordEmailVerification />}
          />
          <Route path="checkout" element={<PaymentCheckout />} />
          <Route path="setting-dashboard" element={<SettingsDashboard />} />
          <Route path="menu" element={<Menu />} />
        </Routes>
      </ValidationProvider>
    </div>
  );
};

export default App;
