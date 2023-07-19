/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from "react";
import { BsLinkedin, BsTelephoneInbound } from "react-icons/bs";
import { AiFillTwitterSquare, AiOutlineMail } from "react-icons/ai";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import "./contact.css";
import Layout from "../../component/Layout";
import { FormValidationContext } from "../../hooks/UseFormValidationsContext";

const Contact = () => {
  const [requestSuccess, setRequestSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const validatePhoneNumber = () => {
    if (phoneNumber.trim() === "") {
      setPhoneNumberError("");
      return true;
    }

    // Matches formats like +11234567890, +44 208 123 4567, 1234567890, 0208 123 4567, etc.
    const phoneRegex = /^\+?\d{1,3}(\s?\d{3,})+$/;

    if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberError("Invalid phone number format.");
      return false;
    }

    setPhoneNumberError("");
    return true;
  };

  const {
    name,
    setName,
    nameError,
    validateName,
    email,
    setEmail,
    emailError,
    validateEmail,
    setNameError,
    setEmailError,
    message,
    setMessage,
    setMessageError,
    messageError,
    validateMessage,
  } = useContext(FormValidationContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    const isPhoneNumberValid = validatePhoneNumber();

    if (isNameValid && isEmailValid && isMessageValid && isPhoneNumberValid) {
      alert("msg sent");
      setLoading(false);
      setName(" ");
      setEmail(" ");
      setPhoneNumber(" ");
      setMessage(" ");
    } else {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="contact-wrapper">
        <div className="contact-header">
          <h1>Contact us</h1>
        </div>

        <div className="contact-container">
          <div className="form">
            <div className="contact-info">
              <h3 className="title">Let&apos;s get in touch</h3>
              <p className="text">
                For urgent matters related to Mealy Delivery or Mealy Pickup
                orders, please contact the Mealy Customer Care Center at:
              </p>

              <div className="info">
                <div className="information">
                  <GoLocation className="icon" />{" "}
                  <p> Mile End Rd, Bethnal Green, London E1 4NS</p>
                </div>
                <div className="information">
                  <AiOutlineMail className="icon" />
                  <p>hellomealy@gmail.com</p>
                </div>
                <div className="information">
                  <BsTelephoneInbound className="icon" />
                  <p>123-456-789</p>
                </div>
              </div>

              <div className="social-media">
                <p>Connect with us :</p>
                <div className="social-icons">
                  <a className="linkedin" href="/">
                    <BsLinkedin />
                  </a>
                  <a className="twitter" href="/">
                    <AiFillTwitterSquare />
                  </a>
                  <a className="instagram" href="/">
                    <FaInstagram />
                  </a>
                  <a className="facebook" href="/">
                    <FaFacebookSquare />
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <h3 className="title">Send a message</h3>
                <div style={{ marginBottom: "2em" }}>
                  <div className="input-container">
                    <input
                      type="text"
                      name="name"
                      className="contact-input"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setNameError("");
                      }}
                    />
                  </div>
                  <div className="validation-error-div">
                    {nameError && (
                      <span className="validation-error">{nameError}</span>
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: "2em" }}>
                  <div className="input-container">
                    <input
                      type="email"
                      name="email"
                      className="contact-input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError("");
                      }}
                    />
                  </div>
                  <div className="validation-error-div">
                    {emailError && (
                      <span className="validation-error">{emailError}</span>
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: "2em" }}>
                  <div className="input-container">
                    <input
                      type="tel"
                      name="phone"
                      className="contact-input"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        setPhoneNumberError(" ");
                      }}
                    />
                  </div>
                  <div className="validation-error-div">
                    {phoneNumberError && (
                      <span className="validation-error">
                        {phoneNumberError}
                      </span>
                    )}
                  </div>
                </div>

                <div className="input-container textarea">
                  <textarea
                    name="message"
                    className="contact-input"
                    placeholder="type text here..."
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setMessageError(" ");
                    }}
                  />
                </div>
                <div className="validation-error-div">
                  {messageError && (
                    <span className="validation-error">{messageError}</span>
                  )}
                </div>
                <div className="contact-send-div flex">
                  <button type="submit" className="btn flex">
                    {loading ? "Sending..." : "    Send"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
