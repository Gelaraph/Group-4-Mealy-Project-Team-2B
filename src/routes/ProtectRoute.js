import { useEffect } from "react";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Auth } from "../utilities/auth";

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

export const isUnprotected = (path) =>
  UNPROTECTED_PAGE_PATHS.includes(path.toLowerCase());

export const isProtected = (path) => !isUnprotected(path.toLowerCase());

export const ProtectRoute = ({ children }) => {
  const {
    state: { isAuthenticated, isLoading, isVerified },
  } = Auth();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(location.pathname)
    // console.log("isAuthenticated =",isAuthenticated)
    // console.log(UNPROTECTED_PAGE_PATHS.includes(location.pathname) ? "this page is not Protected": "this page is Protected")
  }, [location.pathname.toLowerCase()]);

  if (isLoading) {
    return <div>LOADING....</div>; // <LoadingScreen />
  } else if (isAuthenticated && isUnprotected(location.pathname)) {
    navigate("/auth-user");
  } else if (isAuthenticated && isProtected(location.pathname)) {
    // history("/auth-user")
    return children;
  } else if (!isAuthenticated && isProtected(location.pathname)) {
    navigate("/sign-in");
  }

  return children ? children : <Outlet />;
};

ProtectRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
