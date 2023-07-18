import { useState } from "react";
import rest, { setAuthToken } from "../utilities/rest";
import { AuthDispatch, Auth } from "../utilities/auth";

const useVerifyCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = Auth();

  const verifyCode = async ({ verificationCode }) => {
    // debugger; // eslint-disable-line no-debugger
    let response;
    try {
      setIsLoading(true);
      setError(null);
      await rest()
        .post("/verify", { verifyEmailToken: verificationCode })
        .then(async (result) => {
          if (result) {
            // console.log("response result hook", result)
            // console.log('pre dispatch sign in', result.data?.data)
            const currentUser = result.data?.data?.user;
            const accessToken = result.data?.data?.user?.accessToken;
            const data = { ...currentUser, accessToken };
            dispatch({
              type: AuthDispatch.SignIn,
              payload: { data },
            });

            // User is verified, proceed to store user data
            // get token from response
            // set JWT token to local
            await localStorage.setItem("token", accessToken);
            localStorage.setItem("id", currentUser.email);
            // set token to axios common header
            setAuthToken(accessToken);
            // Return the user data to pass it to the next `then` block in 'SignupVerification.js'
            response = result;
          }
        });
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
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', err.message);
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
    return response;
  };

  return {
    isLoading,
    error,
    verifyCode,
  };
};

export default useVerifyCode;
