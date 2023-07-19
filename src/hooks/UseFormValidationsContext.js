import React, { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const FormValidationContext = createContext();

const ValidationProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [receivePromotionalEmails, setReceivePromotionalEmails] =
    useState(false);

  const [agreeChecked, setAgreeChecked] = useState(false);
  const [agreeCheckedError, setAgreeCheckedError] = useState("");

  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  const validateMessage = () => {
    if (message.trim() === "") {
      setMessageError("Message cannot be empty.");
      return false;
    } else if (message.length < 10) {
      setMessageError("Message should be at least 10 characters long.");
      return false;
    }

    setMessageError("");
    return true;
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePhoneNumber = () => {
    if (!phoneNumber) {
      setPhoneNumberError("Phone number is required.");
      return false;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      setPhoneNumberError("Invalid phone number format.");
      return false;
    }
    setPhoneNumberError("");
    return true;
  };

  const validateName = () => {
    if (name.trim() === "") {
      setNameError("Name is required.");
      return false;
    }
    setNameError("");
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required.");
      return false;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required.");
      return false;
    }
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const validateReceivePromotionalEmails = () => {
    if (!receivePromotionalEmails) {
      return true;
    }
    return false;
  };

  const validateAgreeChecked = () => {
    if (!agreeChecked) {
      setAgreeCheckedError("You must agree to the Terms of Service.");
      return false;
    }
    setAgreeCheckedError("");
    return true;
  };

  const value = useMemo(
    () => ({
      email,
      setEmail,
      emailError,
      setEmailError,
      validateEmail,
      phoneNumber,
      setPhoneNumber,
      phoneNumberError,
      setPhoneNumberError,
      validatePhoneNumber,
      name,
      setName,
      nameError,
      setNameError,
      validateName,
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
      receivePromotionalEmails,
      setReceivePromotionalEmails,
      validateReceivePromotionalEmails,
      agreeChecked,
      setAgreeChecked,
      agreeCheckedError,
      setAgreeCheckedError,
      validateAgreeChecked,
      message,
      setMessage,
      setMessageError,
      messageError,
      validateMessage,
    }),
    [
      email,
      setEmail,
      emailError,
      setEmailError,
      validateEmail,
      phoneNumber,
      setPhoneNumber,
      phoneNumberError,
      setPhoneNumberError,
      validatePhoneNumber,
      name,
      setName,
      nameError,
      setNameError,
      validateName,
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
      receivePromotionalEmails,
      setReceivePromotionalEmails,
      validateReceivePromotionalEmails,
      agreeChecked,
      setAgreeChecked,
      agreeCheckedError,
      setAgreeCheckedError,
      validateAgreeChecked,
      message,
      setMessage,
      setMessageError,
      messageError,
      validateMessage,
    ],
  );

  return (
    <FormValidationContext.Provider value={value}>
      {children}
    </FormValidationContext.Provider>
  );
};

ValidationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ValidationProvider;
