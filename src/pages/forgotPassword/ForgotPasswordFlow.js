import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerifyEmail from "./VerifyEmail";
import ForgotPassword from "./ForgotPassword";
import NewPassword from "./NewPassword";
import "../authPagesStyles.css";

const ForgotPasswordFlow = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [codeSent, setCodeSent] = useState(false);
  const [resetPasswordToken, setResetPasswordToken] = useState("");
  const [codeValidated, setCodeValidated] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(true);
  const [showCodeForm, setShowCodeForm] = useState(false);
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailSubmit = (Inputcode) => {
    setError("");
    setIsLoading(true);
    fetch("https://mealy.onrender.com/api/v1/user/forgotpassword", {
      method: "POST",
      body: JSON.stringify({ email: Inputcode }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "Success") {
          setEmail(Inputcode);
          setCodeSent(true);
          setShowEmailForm(false);
          setShowCodeForm(true);
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("An error occurred. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCodeSubmit = (code) => {
    setError("");
    setIsLoading(true);
    // Call the API endpoint to validate the forgot password code
    fetch("https://mealy.onrender.com/api/v1/user/resetpassword/code", {
      method: "POST",
      body: JSON.stringify({ resetPasswordToken: code }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "Success") {
          setCodeValidated(true);
          setResetPasswordToken(code);
          setShowCodeForm(false);
          setShowNewPasswordForm(true);
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("An error occurred. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleResendCode = () => {
    setError("");
    setIsLoading(true);
    fetch("https://mealy.onrender.com/api/v1/user/forgotpassword", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "Success") {
          // Show success message or handle accordingly
          console.log("Verification code resent successfully");
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setError("An error occurred. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePasswordSubmit = (password, confirmPassword) => {
    setError("");
    fetch(
      `https://mealy.onrender.com/api/v1/user/resetpassword/${resetPasswordToken}`,
      {
        method: "PUT",
        body: JSON.stringify({ password, confirmPassword }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "Success") {
          alert("Password updated successfully!");
          navigate("/auth-user");
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("An error occurred. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let currentForm = null;

  if (showEmailForm) {
    currentForm = (
      <ForgotPassword
        onEmailSubmit={handleEmailSubmit}
        error={error}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    );
  } else if (showCodeForm) {
    currentForm = (
      <VerifyEmail
        onCodeSubmit={handleCodeSubmit}
        onResendCode={handleResendCode}
        error={error}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
    );
  } else if (showNewPasswordForm) {
    currentForm = (
      <NewPassword
        onPasswordSubmit={handlePasswordSubmit}
        error={error}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    );
  }

  return <div>{currentForm}</div>;
};

export default ForgotPasswordFlow;
