import PropTypes from "prop-types";
import { useEffect, useReducer, useState, useMemo } from "react";
import {
  AuthDispatch,
  DispatchContext,
  getCurrentUser,
  StateContext,
} from "../utilities/auth";

function authReducer(state, action) {
  // console.log("action", action)
  switch (action.type) {
    case AuthDispatch.Authenticated:
    case AuthDispatch.SignIn: {
      const isVerified = action.payload?.data.isVerified;
      const user = isVerified
        ? {
            _id: action.payload?.data._id,
            name: action.payload?.data.name,
            email: action.payload?.data.email,
            phoneNumber: action.payload?.data.phone_number,
            address: action.payload?.data.address,
            createdAt: action.payload?.data.createdAt,
            isVerified: action.payload?.data.isVerified,
            receivePromotionalEmails:
              action.payload?.data.receivePromotionalEmails,
            access_token: action.payload?.data.accessToken,
            refreshToken: action.payload?.data.refreshToken,
            updatedAt: action.payload?.data.updatedAt,
            photo: action.payload?.data.profilePhoto ?? "/avatar.png",
            favourites: action.payload?.data.favourites,
          }
        : {
            name: action.payload?.data.name,
            email: action.payload?.data.email,
          };

      return {
        isLoading: false,
        isAuthenticated: isVerified,
        isVerified,
        user,
      };
    }
    case AuthDispatch.UpdateProfile: {
      const user = action.payload;
      return { ...state, user };
    }
    case AuthDispatch.SignOut: {
      return { isAuthenticated: false };
    }
    default:
      return state;
  }
}

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [state, dispatch] = useReducer(authReducer, { isAuthenticated: false });

  const fetchData = async () => {
    const userid = localStorage.getItem("id");
    try {
      await getCurrentUser(userid).then(async (user) => {
        if (user) {
          const data = user.data?.data?.user;
          dispatch({
            type: AuthDispatch.Authenticated,
            payload: { data },
          });
        }
      });
    } catch (error) {
      // console.error('Error fetching user data:', error);
      if (error.response && error.response.status === 404) {
        // Navigate to sign in page by dispatching signout
        dispatch({
          type: AuthDispatch.SignOut,
        });
      } else {
        // console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const authState = useMemo(
    () => ({ ...state, isLoading }),
    [state, isLoading],
  );
  // console.log("auth state", state);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={authState}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
