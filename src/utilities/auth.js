import { createContext, useContext } from "react";
import rest from "./rest";

export const AuthDispatch = {
  Authenticated: "authenticated",
  SignIn: "sign-in",
  UpdateProfile: "update-profile",
  SignOut: "sign-out",
};

export const SignOut = async (token) =>
  rest().get("/logout", {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

export const StateContext = createContext({});
StateContext.displayName = "StateContext";

export const DispatchContext = createContext(() => {});
DispatchContext.displayName = "DispatchContext";

export const getCurrentUser = async (email) => rest().get(`/${email}`);

export function Auth() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  if (state === undefined || dispatch === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return { state, dispatch };
}
