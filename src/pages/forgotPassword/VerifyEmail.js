/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { RightSideImage } from "../authPageBgImg";

const VerifyEmail = ({
  onCodeSubmit,
  onResendCode,
  error,
  setIsLoading,
  isLoading,
}) => {
  const [code, setCode] = useState("");
  const [resendMessage, setResendMessage] = useState(false);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onCodeSubmit(code);
    setCode("");
  };

  const handleResendCode = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onResendCode();
    setCode("");
    setResendMessage(true);
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
              <h4 className="form-title">Account Verification</h4>
              <p className="form-description">
                Enter the verification code sent to your email address.
              </p>
            </div>
            <div className="input verify-input">
              <form onSubmit={handleSubmit}>
                <Input
                  type="number"
                  className="input-width"
                  value={code}
                  onChange={handleCodeChange}
                  placeholder="Enter code"
                  required
                />
                <div className="form-btn-margin-top">
                  {error && <div className="endpoint-error">{error}</div>}
                  <Button type="submit" className="input-width">
                    {isLoading ? "Verifying..." : "Verify"}
                  </Button>
                </div>
              </form>
            </div>

            <p className="forgot-password">
              {resendMessage && <span>Code has been resent! </span>}
              If you did not recieve a code?
              <span onClick={handleResendCode} className="resend-link">
                {" "}
                Resend
              </span>
              .
            </p>
          </div>
        </div>
      </div>
      <RightSideImage className="image" />
    </div>
  );
};

export default VerifyEmail;
