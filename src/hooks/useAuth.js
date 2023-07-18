import { useState } from "react";
import rest from "../utilities/rest";
import { Auth, AuthDispatch, getCurrentUser } from "../utilities/auth";

export default function UseAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = Auth();

  function getUser(userEmail) {
    return getCurrentUser(userEmail)
      .then(async (user) => {
        if (user) {
          // update user context with actual user data
          // console.log("pre dispatch auth", user.data?.data?.user);
          const data = user.data?.data?.user;
          dispatch({
            type: AuthDispatch.Authenticated,
            payload: { data },
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }

  const signIn = async (email, password) => {
    let response;
    try {
      setIsLoading(true);
      setError(null);
      response = await rest().post("/signin", { email, password });
      // return response;
    } catch (err) {
      let errorMessage = "An error occurred";
      if (
        err &&
        err?.response &&
        err?.response.data &&
        err?.response.status &&
        err.response.headers
      ) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = err.response.data;
      } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        errorMessage = err.request;
      } else {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
    return response;
  };

  const signUp = async (userData) => {
    let response;
    try {
      setIsLoading(true);
      setError(null);
      response = await rest().post("/signup", userData);
      // Handle successful response if needed
      return response;
    } catch (err) {
      let errorMessage = "An error occurred";
      if (
        err &&
        err?.response &&
        err?.response.data &&
        err?.response.status &&
        err.response.headers
      ) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        errorMessage = err.response.data;
      } else if (err.request) {
        // The request was made but no response was received
        // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in Node.js
        errorMessage = err.request;
      } else {
        // Something else went wrong, capture the error message
        errorMessage = err.message;
      }
      setError(errorMessage);
      // Handle the error in any other necessary way
    } finally {
      setIsLoading(false);
    }
    return response;
  };

  return {
    signIn,
    signUp,
    error,
    isLoading,
    getUser,
  };
}
