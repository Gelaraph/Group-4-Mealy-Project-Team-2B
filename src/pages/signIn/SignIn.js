/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apple from "../../assets/images/apple 1.svg";
import google from "../../assets/images/google 1.svg";
import facebook from "../../assets/images/facebook 1.svg";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { RightSideImage } from "../authPageBgImg";
import { FormValidationContext } from "../../hooks/FormValidationsContext";
import UseGoogleSignIn from "../../hooks/useGogleSignIn";
import UseAuth from "../../hooks/useAuth"
import { AuthDispatch, useAuth } from '../../utilities/auth';
import { setAuthToken } from "../../utilities/rest";

const SignIn = () => {
  const [res, setres] = useState("")

  const {
    dispatch,
  } = useAuth() 

  const {
    email,
    setEmail,
    emailError,
    validateEmail,
    password,
    setPassword,
    passwordError,
    validatePassword,
    setEmailError,
    setPasswordError,
  } = useContext(FormValidationContext);

  const history = useNavigate();

  const { signIn, isLoading, error, getUser } = UseAuth();
  const { signInWithGoogle } = UseGoogleSignIn();

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      setEmailError("");
      setPasswordError("");
      setEmail("");
      setPassword("");
      signIn(email, password)
      .then((response) => {
        setres(response)
      });
    }
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      setEmailError("");
      setPasswordError("");
      setEmail("");
      setPassword("");
    }
    signInWithGoogle();
  };

  useEffect(() => {
    if (res) {
      // console.log(res)
      const currentUser = res.data?.data?.user
      const accessToken = res.data?.data?.access_token
      const data = {...currentUser, accessToken}
      
      // set JWT token to local
      localStorage.setItem("token", accessToken);
      localStorage.setItem("id", currentUser.email)
      // set token to axios common header
      setAuthToken(accessToken);
      dispatch({
        type: AuthDispatch.SignIn,
        payload: {data},
      })
    }
  });

  return (
    <div className="sign-up-page">
      <div className="left-side">
        <a href="/">
          <header className="logo-header signup-header">
            <h1>Mealy</h1>
          </header>
        </a>

        <form className="input-wrapper" onSubmit={handleSubmit}>
          <div className="sign-in-header">
            <h2>Sign In</h2>
          </div>

          
          <div>
            <div className="input-div input-cont">
              <Input
                type="email"
                id="email"
                placeholder="Email"
                className="input-width"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="validation-error-div">
                {emailError && (
                  <span className="validation-error">{emailError}</span>
                )}
              </div>
            </div>

            <div className="input-div input-cont">
              <Input
                type="password"
                id="password"
                placeholder="Password"
                className="input-width"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="validation-error-div sign-in-validation-div">
                {passwordError && (
                  <div className="sign-in-password-div flex">
                    <span className="validation-error">{passwordError}</span>
                    <a href="/forgot-password">
                      <span className="forgot-password-link validation-error">
                        Forgot password?
                      </span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="create-acc-btn">
              {error && <p className="validation-error"> {error}</p>}
              <Button type="submit" className="input-width">
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </div>
          </div>
        </form>

        <div className="button-icons-div">
          <p>Sign in using</p>
          <div className="icons">
            <img src={apple} alt="apple-icon" />
            <img
              src={google}
              alt="google-icon"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            />
            <img src={facebook} alt="facebook-icon" />
          </div>
          <p className="sign-in-link">
            Do not have an account?
            <a href="/sign-up" className="sign-up-link">
              Sign Up
            </a>
          </p>
          <p className="no-p-margin">or</p>
          <p>
            <a href="/guest" className="guest-sign-in">
              Continue as guest
            </a>
          </p>
        </div>
      </div>
      <RightSideImage />
    </div>
  );
};

export default SignIn;
