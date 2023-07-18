import React, { useContext } from "react";
import styled from "styled-components";
import Input from "../../component/Input";
import Button from "../../component/Button";
import signupImage from "../../assets/images/signup.svg";
import { FormValidationContext } from "../../hooks/UseFormValidationsContext";
import "../authPagesStyles.css";

const ResetPassword = () => {
  const {
    password,
    setPassword,
    passwordError,
    setPasswordError,
    validatePassword,
    confirmPassword,
    setConfirmPassword,
    confirmPasswordError,
    setConfirmPasswordError,
    validateConfirmPassword,
  } = useContext(FormValidationContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isPasswordValid && isConfirmPasswordValid) {
      setPasswordError("");
      setConfirmPasswordError("");
      setPassword("");
      setConfirmPassword("");
    }
  };
  return (
    <div className="create-new-passwd-page">
      <div className="left-side">
        <a href="/">
          <header className="logo-header create-new-passwd-header">
            <h1>Mealy</h1>
          </header>
        </a>

        <form className="input-wrapper" onSubmit={handleSubmit}>
          <h2 className="input-wrapper-margin">Reset Password</h2>
          <div className="input-div input-cont">
            <Input
              type="password"
              id="password"
              placeholder="Enter old password"
              className="input-width"
            />
          </div>

          <div className="input-div input-cont">
            <Input
              type="password"
              id="password"
              placeholder="Enter new password"
              className="input-width"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="validation-error-div">
            {passwordError && (
              <span className="validation-error">{passwordError}</span>
            )}
          </div>

          <div className="input-div input-cont">
            <Input
              type="password"
              id="forget-password"
              placeholder="Confirm new password"
              className="input-width"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="validation-error-div">
            {confirmPasswordError && (
              <span className="validation-error">{confirmPasswordError}</span>
            )}
          </div>
          <div className="create-new-passwd-btn">
            <Button type="submit" className="input-width">
              Reset Password
            </Button>
          </div>
        </form>
      </div>
      <RightSideImage />
    </div>
  );
};

const RightSideImage = styled.div`
  width: 50%;
  min-height: 100vh;
  background-image: url(${signupImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media (max-width: 850px) {
    display: none;
  }
`;

export default ResetPassword;
