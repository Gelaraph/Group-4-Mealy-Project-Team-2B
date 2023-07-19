/* eslint-disable consistent-return */
import { useEffect, useState } from "react";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Auth } from "../utilities/auth";
import Preloader from "../component/Preloader/Preloader";

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

  // useEffect(() => {
  if (!isLoading && !isAuthenticated && isProtected(location.pathname)) {
    navigate("/sign-in");
  }
  // }, [isLoading, isAuthenticated, location.pathname, navigate]);

  if (isLoading) {
    return <Preloader />;
  }

  return children;
};

ProtectRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
