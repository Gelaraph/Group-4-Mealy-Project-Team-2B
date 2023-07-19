import PropTypes from "prop-types";

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

export const ProtectRoute = ({ children }) => children;

ProtectRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
