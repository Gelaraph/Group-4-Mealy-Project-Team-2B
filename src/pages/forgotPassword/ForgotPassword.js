/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { RightSideImage } from "../authPageBgImg";
import { FormValidationContext } from "../../hooks/UseFormValidationsContext";

const ForgotPassword = ({ onEmailSubmit, error, setIsLoading, isLoading }) => {
  const { email, setEmail, validateEmail, emailError, setEmailError } =
    useContext(FormValidationContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    if (isEmailValid) {
      setEmailError("");
      setIsLoading(true);
      onEmailSubmit(email);
    }
  };

  return (
    <div className="forgot-flex">
      <div className="all">
        <header className="logo-header">
          <h1>Mealy</h1>
        </header>
        <div className="form-container">
          <div className="form-minScreen">
            <div className="text">
              <h4 className="form-title">Forgot your Password?</h4>
              <p className="form-description">
                Enter the email address associated with your account
              </p>
            </div>
            <div className="input">
              <form onSubmit={handleSubmit}>
                <Input
                  type="email"
                  className="input-width"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                />
                <div className="validation-error-div">
                  {emailError && (
                    <span className="validation-error">{emailError}</span>
                  )}
                </div>
                <div className="form-btn-margin-top">
                  {error && <div className="endpoint-error">{error}</div>}
                  <Button type="submit" className="input-width">
                    {isLoading ? "Getting code..." : "Get code"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <RightSideImage className="image" />
    </div>
  );
};

export default ForgotPassword;
