/* eslint-disable consistent-return */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import BaseRoutes from "./routes/BaseRoutes";
import CartContextProvider from "./hooks/CartContext";
import "./App.css";
import { useAuth } from "./utilities/auth";
import Preloader from "./component/Preloader/Preloader";

const UNPROTECTED_PAGE_PATHS = [
  "/",
  "/guest",
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/forgot-password-verification",
  "/sign-up-verification",
  "/create-new-password",
  "/reset-password",
  "/reset-password-verification",
  "/contact",
  "/about",
];

export const isUnprotected = (path) => UNPROTECTED_PAGE_PATHS.includes(path);

export const isProtected = (path) => !isUnprotected(path);

const App = () => {
  const {
    state: { isAuthenticated, isLoading },
  } = useAuth();

  const [showContent, setShowContent] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      // If authentication check is complete
      if (!isAuthenticated && isProtected(location.pathname)) {
        navigate("/sign-in");
      } else {
        setShowContent(true); // Show the protected content
      }
    }
  }, [isAuthenticated, isLoading, location.pathname, navigate]);

  if (isLoading && !isAuthenticated && isProtected(location.pathname)) {
    return <Preloader />;
  }

  return showContent ? (
    <CartProvider>
      <CartContextProvider>
        <BaseRoutes />
      </CartContextProvider>
    </CartProvider>
  ) : null;
};

export default App;
