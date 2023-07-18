import React, { useState } from "react";
import styled from "styled-components";
import Input from "../../component/Input";
import Button from "../../component/Button";
import signupVerImage from "../../assets/images/verification-image.png";
import "../authPagesStyles.css";

const ResetPasswordEmailVerification = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="forgot-flex">
      <div className="all">
        <a href="/">
          <header className="logo-header">
            <h1>Mealy</h1>
          </header>
        </a>
        <div className="form-container">
          <div className="form-minScreen">
            <div className="text">
              <h4 className="form-title">Reset Password</h4>
              <p className="form-description">
                Enter the verification code sent to your email address.
              </p>
            </div>
            <div className="input">
              <form onSubmit={handleSubmit}>
                <Input
                  type="email"
                  className="input-width"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter code"
                  required
                />

                <p className="forgot-password">
                  If you did not recieve a code?
                  <a href="/reset-password"> Resend</a>.
                </p>

                <Button type="submit" className="input-width">
                  Next
                </Button>
                <div className="cancel-reset-div">
                  <a href="/" className="cancel-reset">
                    Cancel
                  </a>
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

const RightSideImage = styled.div`
  width: 50%;
  min-height: 100vh;
  background-image: url(${signupVerImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media (max-width: 830px) {
    display: none;
  }
`;

export default ResetPasswordEmailVerification;
